def runCommand(String command) {
  if (isUnix()) {
    sh command
  } else {
    bat command
  }
}

pipeline {
  agent any

  options {
    timestamps()
    skipDefaultCheckout(true)
  }

  environment {
    COMPOSE_PROJECT_NAME = 'lab27'
    REACT_APP_API_URL = 'http://localhost:5001/api'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Backend') {
      steps {
        dir('backend') {
          script {
            runCommand('npm ci')
          }
        }
      }
    }

    stage('Test Backend') {
      steps {
        dir('backend') {
          script {
            runCommand('npm test')
          }
        }
      }
    }

    stage('Install Frontend') {
      steps {
        dir('frontend') {
          script {
            runCommand('npm ci')
          }
        }
      }
    }

    stage('Test Frontend') {
      steps {
        dir('frontend') {
          withEnv(['CI=true']) {
            script {
              runCommand('npm test -- --watchAll=false --runInBand --passWithNoTests')
            }
          }
        }
      }
    }

    stage('Build Frontend') {
      steps {
        dir('frontend') {
          script {
            runCommand('npm run build')
          }
        }
      }
    }

    stage('Build Docker Images') {
      steps {
        script {
          runCommand('docker compose build')
        }
      }
    }

    stage('Deploy With Docker Compose') {
      when {
        anyOf {
          branch 'main'
          branch 'master'
          expression {
            return !env.BRANCH_NAME
          }
        }
      }
      steps {
        script {
          runCommand('docker compose up -d --build')
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'frontend/build/**', allowEmptyArchive: true
    }
  }
}
