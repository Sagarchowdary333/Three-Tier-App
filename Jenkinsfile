pipeline {

    agent any

    environment {

        AWS_REGION = "us-east-1"
        AWS_ACCOUNT_ID = "279391564753"

        BACKEND_IMAGE = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/employee-backend:latest"
        FRONTEND_IMAGE = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/employee-frontend:latest"

        EC2_IP = "52.207.246.220"

        PEM_FILE = "C:\\JenkinsKeys\\Stackly.pem"
    }

    stages {

        stage('Checkout Source Code') {
            steps {
                checkout scm
            }
        }

        stage('Setup Buildx') {
            steps {
                bat '''
                docker buildx use amd64builder
                docker buildx inspect --bootstrap
                docker buildx ls
                '''
            }
        }

        stage('Show Docker Version') {
            steps {
                bat 'docker --version'
                bat 'docker compose version'
            }
        }

        stage('Build and Push Backend') {
            steps {

                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-ecr'
                ]]) {

                    bat '''
                    aws ecr get-login-password --region %AWS_REGION% | docker login --username AWS --password-stdin %AWS_ACCOUNT_ID%.dkr.ecr.%AWS_REGION%.amazonaws.com
                    '''

                    bat '''
                    docker buildx build ^
                    --builder amd64builder ^
                    --platform linux/amd64 ^
                    -t %BACKEND_IMAGE% ^
                    --push ^
                    Backend
                    '''
                }
            }
        }

        stage('Build and Push Frontend') {
            steps {

                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-ecr'
                ]]) {

                    bat '''
                    docker buildx build ^
                    --builder amd64builder ^
                    --platform linux/amd64 ^
                    -t %FRONTEND_IMAGE% ^
                    --push ^
                    Frontend
                    '''
                }
            }
        }

        stage('Deploy to EC2') {

            steps {

                bat '''
                ssh -i "%PEM_FILE%" -o StrictHostKeyChecking=no ubuntu@%EC2_IP% ^
                "cd ~/employee-app && docker compose pull && docker compose up -d"
                '''
            }
        }

        stage('Verify Deployment') {

            steps {

                bat '''
                ssh -i "%PEM_FILE%" -o StrictHostKeyChecking=no ubuntu@%EC2_IP% ^
                "cd ~/employee-app && docker compose ps"
                '''
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