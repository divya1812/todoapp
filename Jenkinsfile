pipeline {
    agent any

    environment {
        FRONTEND_ENV = credentials('frontend-env')
        BACKEND_ENV = credentials('backend-env')
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
              withCredentials([
                    file(credentialsId: 'frontend-env', variable: 'FRONTEND_ENV_FILE'),
                    file(credentialsId: 'backend-env', variable: 'BACKEND_ENV_FILE')
                ]) {
                    sh '''
                    echo "Loading Frontend Environment..."
                    cp $FRONTEND_ENV_FILE ./frontend/frontend.env
                    echo "REACT_APP_BACKEND_URL: $REACT_APP_BACKEND_URL"
                    echo "Frontend Environment Loaded"

                    echo "Loading Backend Environment..."
                    cp $BACKEND_ENV_FILE ./backend/backend.env
                    echo "DB_HOST: $DB_HOST"
                    echo "DB_PORT: $DB_PORT"
                    echo "Backend Environment Loaded"
                    '''
                }

                
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
