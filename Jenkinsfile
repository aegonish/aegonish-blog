@Library('jenkins-shared-libs') _

pipeline {
    agent { label 'local-agent' }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        GITHUB_CREDENTIALS = credentials('github-pat')
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Cloning repository...'
                checkout([
                    $class: 'GitSCM',
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
                echo 'Building backend Docker image...'
                dir('backend') {
                    bat 'docker build -t aegonish-backend .'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                echo 'Building frontend Docker image...'
                dir('aegonish-frontend') {
                    bat 'docker build -t aegonish-frontend .'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    echo 'Pushing Docker images to Docker Hub...'
                    bat """
                        docker login -u ${DOCKERHUB_CREDENTIALS_USR} -p ${DOCKERHUB_CREDENTIALS_PSW}
                        docker tag aegonish-backend aegonishblog/aegonish-backend
                        docker tag aegonish-frontend aegonishblog/aegonish-frontend
                        docker push aegonishblog/aegonish-backend
                        docker push aegonishblog/aegonish-frontend
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying with Docker Compose...'
                withCredentials([string(credentialsId: 'prod-env-file', variable: 'ENV_FILE_CONTENT')]) {
                    writeFile file: '.env', text: "${ENV_FILE_CONTENT}"
                    bat 'docker compose -f docker-compose.prod.yml down'
                    bat 'docker compose -f docker-compose.prod.yml up -d'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
    }
}
