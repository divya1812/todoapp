pipeline {
    agent any

    environment {
        // FRONTEND_ENV = credentials('frontend-env')
        // BACKEND_ENV = credentials('backend-env')
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/divya1812/todoapp.git'
            }
        }

        stage('Load Environment Variables') {
            steps {
                script {
                    echo 'Loading environment variables...'
                withCredentials([
                    file(credentialsId: 'frontend-env', variable: 'FRONTEND_ENV_FILE'),
                    file(credentialsId: 'backend-env', variable: 'BACKEND_ENV_FILE')
                ]) {
                    // Source the .env files for frontend and backend
                    sh '''
                    echo "Loading Frontend Environment Variables..."
                    set -a
                    source $FRONTEND_ENV_FILE
                    set +a
                    echo "Frontend API URL: $REACT_APP_BACKEND_URL"

                    echo "Loading Backend Environment Variables..."
                    set -a
                    source $BACKEND_ENV_FILE
                    set +a
                    echo "Backend DB Host: $DB_HOST"
                    '''


                
                    // // Load frontend environment variables
                    // sh '''
                    // echo "Loading Frontend Environment..."
                    // export $(cat $FRONTEND_ENV | xargs)
                    // echo "REACT_APP_BACKEND_URL: $REACT_APP_BACKEND_URL"
                    // '''

                    // // Load backend environment variables
                    // sh '''
                    // echo "Loading Backend Environment..."
                    // export $(cat $BACKEND_ENV | xargs)
                    // echo "DB_HOST: $DB_HOST"
                    // echo "DB_PORT: $DB_PORT"
                    // '''
                }
            }
        }

        stage('Build and Deploy') {
            steps {
                script {
                    // Stop existing containers
                    sh 'docker-compose down || true'
                    
                    // Pull updated code and build
                    sh 'docker-compose pull'
                    sh 'docker-compose up -d --build'

                    // Optionally, clean up unused Docker images/volumes
                    // sh 'docker system prune -f || true'
                }
            }
        }
    }
}
