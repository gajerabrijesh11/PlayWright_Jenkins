pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo '📥 Checking out source code...'
                git branch: 'main', credentialsId: 'github-token', url: 'https://github.com/gajerabrijesh11/PlayWright_Jenkins.git'
            }
        }

        stage('Install Node.js') {
            steps {
                echo '🔧 Installing Node.js dependencies...'
                sh '''
                    node -v || curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install -y nodejs
                    npm ci
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo '🧪 Running Playwright tests...'
                sh 'npx playwright test --reporter=line,allure-playwright'
            }
        }

        stage('Generate Allure Report') {
            steps {
                echo '📊 Generating Allure report...'
                sh 'npx allure generate allure-results --clean -o allure-report'
            }
        }

        stage('Publish HTML Report') {
            steps {
                echo '🌐 Publishing Allure report...'
                publishHTML(target: [
                    reportDir: 'allure-report',
                    reportFiles: 'index.html',
                    reportName: 'Allure Test Report'
                ])
            }
        }
    }

    post {
        always {
            echo "✅ Pipeline completed."
        }
        failure {
            echo "❌ Pipeline failed. Check logs for more info."
        }
    }
}
