//@Library('jenkins-shared-libs') _

pipeline {
    agent { label 'local-agent' }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        GITHUB_CREDENTIALS = credentials('github-pat')
        AWS_REGION = 'ap-south-1'
        AWS_ACCOUNT_ID = '059549668539'
        ECR_REPO = 'aegonish-eks-repo'
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
                        docker tag aegonish-backend aegonishblog/aegonish-backend:latest
                        docker tag aegonish-frontend aegonishblog/aegonish-frontend:latest
                        docker push aegonishblog/aegonish-backend:latest
                        docker push aegonishblog/aegonish-frontend:latest
                    """
                }
            }
        }

stage('Push to AWS ECR') {
    environment {
        AWS_DEFAULT_REGION = 'ap-south-1'
    }
    steps {
        withAWS(credentials: 'aws-creds', region: 'ap-south-1') {
            bat """
                aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 059549668539.dkr.ecr.ap-south-1.amazonaws.com
                docker tag aegonish-backend 059549668539.dkr.ecr.ap-south-1.amazonaws.com/aegonish-eks-cluster-repo:backend-latest
                docker tag aegonish-frontend 059549668539.dkr.ecr.ap-south-1.amazonaws.com/aegonish-eks-cluster-repo:frontend-latest
                docker push 059549668539.dkr.ecr.ap-south-1.amazonaws.com/aegonish-eks-cluster-repo:backend-latest
                docker push 059549668539.dkr.ecr.ap-south-1.amazonaws.com/aegonish-eks-cluster-repo:frontend-latest
            """
        }
    }
}


        stage('Deploy') {
            steps {
                echo 'Deploying with Docker Compose...'
                withCredentials([file(credentialsId: 'env-file', variable: 'ENV_FILE')]) {
                    bat """
                        copy "%ENV_FILE%" .env
                        docker compose -f docker-compose.prod.yml down
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
