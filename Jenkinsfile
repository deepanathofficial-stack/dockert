pipeline {
    agent any

    tools {
        nodejs 'node-24'
    }

    environment {
        APP_NAME = 'deepanath'
        PORT     = '3000'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sh 'echo Deploying $APP_NAME on port $PORT'
            }
        }
    }

    post {
        success { echo 'Pipeline finished successfully.' }
        failure { echo 'Pipeline failed.' }
    }
}
