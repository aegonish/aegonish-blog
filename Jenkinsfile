@Library('jenkins-shared-libs') _

pipeline {
    agent { label 'local-agent' }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                buildDocker('aegonish-blog:latest')
            }
        }

        stage('Run Tests') {
            steps {
                echo '🧪 Running tests (placeholder)...'
            }
        }
    }
}
