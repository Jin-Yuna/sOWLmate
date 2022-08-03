pipeline {
	environment {
		registry = "sowlmate308/sowlmate"
		registryCredential = 'docker-credentials'
		dockerImage = ''
		PATH = "$PATH:/usr/local/bin"
	}
	agent any
	stages {
		stage('Build image') {
			steps {
				echo "$PATH"
				sh 'docker-compose build'
				// sh 'docker image tag $registry:$BUILD_NUMBER $registry:latest'
				echo 'Build image...'
			}
		}
		// stage('Test image') {
		// 	steps {
		// 		sh 'docker run -d -p 80:80 --name apm $registry:$BUILD_NUMBER'
		// 		echo 'Test image...'
		// 	}
		// }
		// stage('Push image') {
		// 	steps {
		// 			withDockerRegistry([ credentialsId: registryCredential, url: "" ]) {
		// 				sh 'docker push $registry:back'
		// 				sh 'docker push $registry:front'
		// 			}
		// 			echo 'Push image...'
		// 	}
		// }
		// stage('Clean image') {
		// 	steps {
		// 		sh 'docker rm -f `docker ps -aq --filter="name=sowlmate-front"`'
		// 		sh 'docker rm -f `docker ps -aq --filter="name=sowlmate-back"`'
		// 		sh 'docker rmi $registry:back'
		// 		sh 'docker rmi $registry:front'
		// 		echo 'Clean image...'
		// 	}
		// }
		stage('Deploy image') {
			steps {
				sh 'docker run -d -p 8080:8080 --name sowlmate-back sowlmate308/sowlmate:back'
				sh 'docker run -d -p 3000:80 --name sowlmate-front sowlmate308/sowlmate:front'
				echo 'Deploy image...'
			}
		}
	}
}