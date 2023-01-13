pipeline {
  agent {
    kubernetes {
      yaml '''
        apiVersion: v1
        kind: Pod
        spec:
          containers:
            - name: node
              image: timbru31/java-node:8-jdk-14
              command:
              - sleep
              args:
              - 99d
            - name: argocd
              image: argoproj/argocd:v2.1.3
              securityContext:
                runAsUser: 0
              command:
                - sleep
              args:
               - 99d
            - name: kaniko
              image: gcr.io/kaniko-project/executor:debug
              command:
              - sleep
              args:
              - 9999999
              volumeMounts:
              - name: docker-config
                mountPath: /kaniko/.docker
              restartPolicy: Never

          volumes:
            - name: docker-config
              configMap:
                name: docker-config
        '''
    }
  }
  options {
    preserveStashes(buildCount: 10) // Save last 10 stashes so we can restart stage without issues
  }
  environment {
    IMAGE = "frontend"
    PROJECT = "frontend-ui-dev"
    PROJECT_ST_PROD = "frontend-ui"
    DOCKERFILE = "Dockerfile"
    MSTEAMS_HOOK = credentials('sparkmind-team-url')
  }
  stages {
    stage('Pre-flight') {
      stages {
        stage('Install node dependencies') {
          steps {
            milestone label: 'Hack to stop old builds 1/2', ordinal:  Integer.parseInt(env.BUILD_ID) - 1
            milestone label: 'Hack to stop old builds 2/2', ordinal:  Integer.parseInt(env.BUILD_ID)
            container('node') {
              sh label: 'Download dependencies', script:'''
              npm install
              '''
            }
          }
        }
        stage('SonarQube analysis') {
          steps {
            container('node') {
              withSonarQubeEnv('SonarQube') {
                sh label: 'Check Sonarqube', script:'''
                CI=false npm run sonar
                '''
              }
              timeout(time: 1, unit: 'HOURS') {
                // Parameter indicates whether to set pipeline to UNSTABLE if Quality Gate fails
                // true = set pipeline to UNSTABLE, false = don't
                waitForQualityGate abortPipeline: false
              }
            }
          }
        }
        stage('build app to dev') {
          when {
            beforeAgent true
            branch 'develop'
          }
          steps {
            container('node') {
              sh label: 'build app', script:'''
              CI=false npx gulp less
              CI=false GENERATE_SOURCEMAP=false npm run build
              '''
            }
          }
        }
        stage('build app to stg') {
          when {
            beforeAgent true
            branch 'release/*'
          }
          steps {
            container('node') {
              sh label: 'build app', script:'''
              mv .env.stg .env
              CI=false npx gulp less
              CI=false GENERATE_SOURCEMAP=false npm run build
              '''
            }
          }
        }
        stage('build app to prod') {
          when {
            beforeAgent true
            branch 'main'
          }
          steps {
            container('node') {
              sh label: 'build app', script:'''
              mv .env.prod .env
              CI=false npx gulp less
              CI=false GENERATE_SOURCEMAP=false npm run build
              '''
            }
          }
        }
        stage('Post Build') {
          parallel {
            stage('Build Image') {
              when {
                beforeAgent true
                  anyOf {
                    branch 'develop'
                    branch 'main'
                    branch 'release/*'
                  }
              }
              steps {
                script {
                  env.VERSION = "${GIT_BRANCH.replaceFirst(/^.*\//, '')}"
                  env.DATE= (new Date()).format("yyyyMMdd", TimeZone.getTimeZone('UTC'));
                }
                container('kaniko') {
                  sh '''#!/busybox/sh
                    /kaniko/executor --context `pwd` --destination="948579270262.dkr.ecr.ap-southeast-1.amazonaws.com/${IMAGE}:latest" \
                    --destination="948579270262.dkr.ecr.ap-southeast-1.amazonaws.com/${IMAGE}:$GIT_COMMIT" \
                    --destination="948579270262.dkr.ecr.ap-southeast-1.amazonaws.com/${IMAGE}:$VERSION"
                    '''
		        }
                echo "Image Name: 170372803937.dkr.ecr.ap-southeast-1.amazonaws.com/${IMAGE}\nImage Tag: ${env.GIT_COMMIT}"
              }
            }
          }
        }
        stage('Deploy to Dev') {
          when {
            beforeAgent true
            branch 'develop'
          }
          steps {
            container('argocd') {
              withCredentials([usernamePassword(credentialsId: 'argocd', passwordVariable: 'ARGO_PASSWORD', usernameVariable: 'ARGO_USERNAME')]) {
                retry(5) {
                  sh label: "Setting image tag", script: '''
                  argocd --grpc-web login argocd.maxbit-dev.com --username $ARGO_USERNAME --password $ARGO_PASSWORD
                  argocd --grpc-web app set $PROJECT -p container.image.repository=948579270262.dkr.ecr.ap-southeast-1.amazonaws.com/${IMAGE}
                  argocd --grpc-web app set $PROJECT -p container.image.tag=$GIT_COMMIT
                  '''
                }
                retry(3) {
                  timeout(time: 25, unit: 'MINUTES') {
                    sh label: "Wait for sync to finish", script: '''
                    argocd --grpc-web app sync $PROJECT
                    argocd --grpc-web app wait $PROJECT --health --timeout 900
                    '''
                  }
                }
              }
            }
          }
        }
        stage('Deploy to Staging') {
          when {
            beforeAgent true
            branch 'release/*'
          }
          steps {
            container('argocd') {
              withCredentials([usernamePassword(credentialsId: 'argocd-staging', passwordVariable: 'ARGO_PASSWORD', usernameVariable: 'ARGO_USERNAME')]) {
                retry(5) {
                  sh label: "Setting image tag", script: '''
                  argocd --grpc-web login  argocd.maxbit-st.com --username $ARGO_USERNAME --password $ARGO_PASSWORD
                  argocd --grpc-web app set $PROJECT_ST_PROD -p container.image.repository=948579270262.dkr.ecr.ap-southeast-1.amazonaws.com/${IMAGE}
                  argocd --grpc-web app set $PROJECT_ST_PROD -p container.image.tag=$GIT_COMMIT
                  '''
                }
                retry(3) {
                  timeout(time: 25, unit: 'MINUTES') {
                    sh label: "Wait for sync to finish", script: '''
                    argocd --grpc-web app sync $PROJECT_ST_PROD
                    argocd --grpc-web app wait $PROJECT_ST_PROD --health --timeout 900
                    '''
                  }
                }
              }
            }
          }
        }
        stage('Deploy to Prod') {
          when {
            beforeAgent true
            branch 'main'
          }
          steps {
            container('argocd') {
              withCredentials([usernamePassword(credentialsId: 'argocd-prod', passwordVariable: 'ARGO_PASSWORD', usernameVariable: 'ARGO_USERNAME')]) {
                retry(5) {
                  sh label: "Setting image tag", script: '''
                  argocd --grpc-web login  argocd.maxbit.com --username $ARGO_USERNAME --password $ARGO_PASSWORD
                  argocd --grpc-web app set $PROJECT_ST_PROD -p container.image.repository=948579270262.dkr.ecr.ap-southeast-1.amazonaws.com/${IMAGE}
                  argocd --grpc-web app set $PROJECT_ST_PROD -p container.image.tag=$GIT_COMMIT
                  '''
                }
                retry(3) {
                  timeout(time: 25, unit: 'MINUTES') {
                    sh label: "Wait for sync to finish", script: '''
                    argocd --grpc-web app sync $PROJECT_ST_PROD
                    argocd --grpc-web app wait $PROJECT_ST_PROD --health --timeout 900
                    '''
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  post {
    failure {
      office365ConnectorSend (
        status: "Pipeline Status",
        webhookUrl: "${MSTEAMS_HOOK}",
        color: '#FF0000',
        message: "Failure: ${JOB_NAME} - ${BUILD_DISPLAY_NAME}<br>Pipeline duration: ${currentBuild.durationString}"
      )
    }
    success {
      office365ConnectorSend (
        status: "Pipeline Status",
        webhookUrl: "${MSTEAMS_HOOK}",
        color: '#00FF00',
        message: "Successful: ${JOB_NAME} - ${BUILD_DISPLAY_NAME}<br>Pipeline duration: ${currentBuild.durationString}"
      )
    }
  }
}
