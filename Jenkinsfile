@Library('jenkins-shared-libs@main') _

pipeline {
    agent { label 'local-agent' }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')   // Jenkins credential ID for Docker Hub
        BACKEND_IMAGE = "aegonish-backend"
        FRONTEND_IMAGE = "aegonish-frontend"
        DOCKERHUB_USER = "aegonishblog"
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Cloning repository..."
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/anish-kapuskar/aegonish-blog.git',
                        credentialsId: 'github-pat'
                    ]]
                ])
            }
        }

        stage('Build Backend Image') {
            steps {
                echo "Building backend Docker image..."
                dir('backend') {
                    bat "docker build -t %BACKEND_IMAGE% ."
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                echo "Building frontend Docker image..."
                dir('aegonish-frontend') {
                    bat "docker build -t %FRONTEND_IMAGE% ."
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    echo "Pushing Docker images to Docker Hub..."
                    bat "docker login -u %DOCKERHUB_USER% -p %DOCKERHUB_CREDENTIALS_PSW%"
                    bat "docker tag %BACKEND_IMAGE% %DOCKERHUB_USER%/%BACKEND_IMAGE%"
                    bat "docker tag %FRONTEND_IMAGE% %DOCKERHUB_USER%/%FRONTEND_IMAGE%"
                    bat "docker push %DOCKERHUB_USER%/%BACKEND_IMAGE%"
                    bat "docker push %DOCKERHUB_USER%/%FRONTEND_IMAGE%"
                }
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying with Docker Compose..."
                withCredentials([string(credentialsId: 'prod-env-file', variable: 'ENV_FILE_CONTENT')]) {
                    writeFile file: '.env', text: "${ENV_FILE_CONTENT}"
                    bat "docker compose -f docker-compose.prod.yml down"
                    bat "docker compose -f docker-compose.prod.yml up -d"
            }
        }
    }

    post {
        always {
            echo "Cleaning up workspace..."
            cleanWs()
        }
    }
}
