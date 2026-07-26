pipeline {

    agent any

    environment {
        EC2_HOST = "52.207.246.220"
    }

    stages {

        stage('Checkout Source Code') {
            steps {
                checkout scm
            }
        }

        stage('Show Docker Version') {
            steps {
                bat 'docker --version'
                bat 'docker compose version'
            }
        }

        stage('Build Application') {
            steps {
                bat 'docker compose build'
            }
        }

        stage('Push Images to Amazon ECR') {
            steps {
                bat '''
                aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 279391564753.dkr.ecr.us-east-1.amazonaws.com

                docker push 279391564753.dkr.ecr.us-east-1.amazonaws.com/employee-backend:latest

                docker push 279391564753.dkr.ecr.us-east-1.amazonaws.com/employee-frontend:latest
                '''
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(credentials: ['ec2-ssh-key']) {

                    bat """
                    ssh -o StrictHostKeyChecking=no ubuntu@%EC2_HOST% ^
                    "cd ~/employee-app && docker compose pull && docker compose up -d"
                    """

                }
            }
        }

        stage('Verify Deployment') {
            steps {
                bat """
                ssh -o StrictHostKeyChecking=no ubuntu@%EC2_HOST% ^
                "docker compose -f ~/employee-app/docker-compose.yml ps"
                """
            }
        }

    }

    post {

        success {
            echo 'Application deployed successfully to EC2.'
        }

        failure {
            echo 'Deployment failed.'
        }

        always {
            echo 'Pipeline execution completed.'
        }

    }

}