pipeline {

    agent any

    environment {
        AWS_REGION = "us-east-1"
        AWS_ACCOUNT_ID = "279391564753"

        BACKEND_IMAGE = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/employee-backend:latest"
        FRONTEND_IMAGE = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/employee-frontend:latest"
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

                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-ecr'
                ]]) {

                    bat """
                    aws ecr get-login-password --region %AWS_REGION% | docker login --username AWS --password-stdin %AWS_ACCOUNT_ID%.dkr.ecr.%AWS_REGION%.amazonaws.com
                    """

                    bat """
                    docker tag employee-management-ci-cd-backend:latest %BACKEND_IMAGE%
                    docker push %BACKEND_IMAGE%
                    """

                    bat """
                    docker tag employee-management-ci-cd-frontend:latest %FRONTEND_IMAGE%
                    docker push %FRONTEND_IMAGE%
                    """

                }

            }

        }

        stage('Deploy to EC2') {

            steps {

                sshagent(credentials: ['ec2-ssh-key']) {

                    bat """
                    ssh -o StrictHostKeyChecking=no ubuntu@52.207.246.220 ^
                    "cd ~/employee-app && docker compose pull && docker compose up -d"
                    """

                }

            }

        }

        stage('Verify Deployment') {

            steps {

                sshagent(credentials: ['ec2-ssh-key']) {

                    bat """
                    ssh -o StrictHostKeyChecking=no ubuntu@52.207.246.220 ^
                    "docker compose -f ~/employee-app/docker-compose.yml ps"
                    """

                }

            }

        }

    }

    post {

        always {
            echo 'Pipeline execution completed.'
        }

        success {
            echo 'Application deployed successfully!'
        }

        failure {
            echo 'Deployment failed.'
        }

    }

}