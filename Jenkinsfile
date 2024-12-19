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
                script {
                     // Load frontend environment variables into env
                    def frontendEnv = readFile('frontend.env').trim()
                    def backendEnv = readFile('backend.env').trim()

                    // Setting environment variables for the entire pipeline
                    env.REACT_APP_BACKEND_URL = frontendEnv.split('\n').find { it.contains('REACT_APP_BACKEND_URL') }?.split('=')?.get(1)
                    env.DB_HOST = backendEnv.split('\n').find { it.contains('DB_HOST') }?.split('=')?.get(1)
                    env.DB_PORT = backendEnv.split('\n').find { it.contains('DB_PORT') }?.split('=')?.get(1)

                    echo "Frontend REACT_APP_BACKEND_URL: ${env.REACT_APP_BACKEND_URL}"
                    echo "Backend DB_HOST: ${env.DB_HOST}, DB_PORT: ${env.DB_PORT}"



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
