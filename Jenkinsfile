pipeline {

    agent any

    environment {

        AWS_REGION = "us-east-1"
        AWS_ACCOUNT_ID = "279391564753"

        BACKEND_IMAGE = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/employee-backend:latest"
        FRONTEND_IMAGE = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/employee-frontend:latest"

        EC2_IP = "52.207.246.220"

        PEM_FILE = "C:\\Users\\sagar\\Desktop\\Stackly.pem"
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

                bat """
                ssh -i "%PEM_FILE%" -o StrictHostKeyChecking=no ubuntu@%EC2_IP% ^
                "cd ~/employee-app && docker compose pull && docker compose up -d"
                """

            }

        }

        stage('Verify Deployment') {

            steps {

                bat """
                ssh -i "%PEM_FILE%" -o StrictHostKeyChecking=no ubuntu@%EC2_IP% ^
                "cd ~/employee-app && docker compose ps"
                """

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