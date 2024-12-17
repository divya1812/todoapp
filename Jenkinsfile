pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/divya1812/todoapp.git'
            }
        }

        stage('Build and Deploy') {
            steps {
                script {
                    // Stop existing containers
                    sh 'sudo docker-compose down || true'
                    
                    // Pull updated code and build
                    sh 'sudo docker-compose pull'
                    sh 'sudo docker-compose up -d --build'
                }
            }
        }
    }
}
