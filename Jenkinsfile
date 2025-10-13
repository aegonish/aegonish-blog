pipeline {
    agent any

    environment {
        // Docker image names
        FRONTEND_IMAGE = "anishkapuskar/aegonish-frontend"
        BACKEND_IMAGE  = "anishkapuskar/aegonish-backend"

        // Docker Hub credentials ID from Jenkins
        DOCKERHUB_CREDENTIALS = 'dockerhub-creds'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Cloning repository...'
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    echo 'Building backend Docker image...'
                    dir('backend') {
                        sh 'docker build -t ${BACKEND_IMAGE}:latest -f Dockerfile ..'
                    }
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    echo 'Building frontend Docker image...'
                    dir('frontend') {
                        sh 'docker build -t ${FRONTEND_IMAGE}:latest -f Dockerfile ..'
                    }
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDENTIALS}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh """
                            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                            docker push ${BACKEND_IMAGE}:latest
                            docker push ${FRONTEND_IMAGE}:latest
                        """
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo 'Deploying using docker-compose.prod.yml...'
                    sh 'docker compose -f docker-compose.prod.yml down'
                    sh 'docker compose -f docker-compose.prod.yml up -d'
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
