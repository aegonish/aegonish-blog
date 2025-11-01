//@Library('jenkins-shared-libs') _

pipeline {
    agent { label 'slave-node' }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        GITHUB_CREDENTIALS = credentials('github-pat')
        AWS_REGION = 'ap-south-1'
        AWS_ACCOUNT_ID = '059549668539'
        ECR_REPO = 'aegonish-eks-cluster-repo'
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
                    sh 'docker build -t aegonish-backend .'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                echo 'Building frontend Docker image...'
                dir('aegonish-frontend') {
                    sh 'docker build -t aegonish-frontend .'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing Docker images to Docker Hub...'
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker tag aegonish-backend aegonishblog/aegonish-backend:latest
                        docker tag aegonish-frontend aegonishblog/aegonish-frontend:latest
                        docker push aegonishblog/aegonish-backend:latest
                        docker push aegonishblog/aegonish-frontend:latest
                    """
                }
            }
        }

        stage('Push to AWS ECR') {
            steps {
                withAWS(credentials: 'aws-creds', region: 'ap-south-1') {
                    sh """
                        aws ecr get-login-password --region ap-south-1 \
                            | docker login \
                                --username AWS \
                                --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.ap-south-1.amazonaws.com
                        
                        docker tag aegonish-backend ${AWS_ACCOUNT_ID}.dkr.ecr.ap-south-1.amazonaws.com/${ECR_REPO}:backend-latest
                        docker tag aegonish-frontend ${AWS_ACCOUNT_ID}.dkr.ecr.ap-south-1.amazonaws.com/${ECR_REPO}:frontend-latest

                        docker push ${AWS_ACCOUNT_ID}.dkr.ecr.ap-south-1.amazonaws.com/${ECR_REPO}:backend-latest
                        docker push ${AWS_ACCOUNT_ID}.dkr.ecr.ap-south-1.amazonaws.com/${ECR_REPO}:frontend-latest
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying with Docker Compose...'
                withCredentials([file(credentialsId: 'aegonish-env', variable: 'ENV_FILE')]) {
                    sh """
                        cp "$ENV_FILE" .env
                        docker compose -f docker-compose.prod.yml down || true
                        docker compose -f docker-compose.prod.yml up -d --build
                    """
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
