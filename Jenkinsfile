pipeline {

    agent any

    environment {
        APP_NAME = "three-tier-app"
    }

    stages {

        stage('Checkout Source Code') {
            steps {
                checkout scm
            }
        }

        stage('Show Docker Version') {
            steps {
                sh 'docker --version || docker.exe --version'
                sh 'docker compose version || docker-compose --version || docker.exe compose version'
            }
        }

        stage('Stop Existing Containers') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker compose down -v || true'
                    } else {
                        bat 'docker compose down -v'
                    }
                }
            }
        }

        stage('Build Application') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker compose build'
                    } else {
                        bat 'docker compose build'
                    }
                }
            }
        }

        stage('Deploy Application') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker compose up -d'
                    } else {
                        bat 'docker compose up -d'
                    }
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker compose ps'
                    } else {
                        bat 'docker compose ps'
                    }
                }
            }
        }

    }

    post {

        always {
            echo 'Pipeline Finished.'
        }

        success {
            echo 'Application deployed successfully.'
        }

        failure {
            echo 'Pipeline failed. Please check the console output.'
        }

    }
}