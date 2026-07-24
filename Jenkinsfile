pipeline {

    agent any

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

        stage('Stop Existing Containers') {
            steps {
                bat 'docker compose down -v'
            }
        }

        stage('Build Application') {
            steps {
                bat 'docker compose build'
            }
        }

        stage('Deploy Application') {
            steps {
                bat 'docker compose up -d'
            }
        }

        stage('Verify Deployment') {
            steps {
                bat 'docker compose ps'
            }
        }

    }

    post {

        success {
            echo 'Application Deployed Successfully'
        }

        failure {
            echo 'Pipeline Failed'
        }

        always {
            echo 'Pipeline Finished'
        }

    }

}