node {

	

	stage('Preparation') {
		echo "Current workspace : ${workspace}"
		
	}

	stage('checkout') {
		echo "Checkout Run..."
		checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'jenkins', url: 'http://gitlab.eduwill.net/dev_team/jarvis-lib.git']]])
		echo "Checkout Success!"
	}

	stage('Build') {
		echo "Deploy Run..."
		echo "Deploy Success"
	}

	stage('Test') {
		echo "Test Run..."
		echo "Test Success!"
	}

	stage('Deply') {
		echo "Deploy Run..."
		echo "Deploy Success"
	}
}