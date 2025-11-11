pipeline {
    agent any

    tools {
        nodejs 'NodeJS' // Make sure NodeJS tool is configured under Manage Jenkins → Global Tool Configuration
    }

    environment {
        PATH = "$PATH:node_modules/.bin"
    }

    stages {
        stage('Checkout') {
            steps {
                echo '📥 Checking out source code...'
                git branch: 'main', credentialsId: 'github-token', url: 'https://github.com/yourname/playwright-tests.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 Installing dependencies...'
                sh 'npm ci'
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

        stage('Publish Reports') {
            steps {
                echo '🌐 Publishing reports...'
                publishHTML(target: [
                    reportDir: 'allure-report',
                    reportFiles: 'index.html',
                    reportName: 'Allure Test Report',
                    keepAll: true,
                    alwaysLinkToLastBuild: true,
                    allowMissing: true
                ])
            }
        }
    }

    post {
        always {
            echo "✅ Pipeline completed. Allure report available in the Jenkins build page."
        }
        failure {
            echo "❌ Build failed! Check logs for more details."
        }
    }
}
