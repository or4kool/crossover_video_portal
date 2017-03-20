'use strict';

/**
 * @ngdoc function
 * @name vidApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the vidApp
 */
vidApp.controller('SignCtrl', SignCtrlDetail);

	SignCtrlDetail.inject = ['$scope', 'md5', 'vidServiceAuth', '$location'];

	function SignCtrlDetail($scope, md5, vidServiceAuth, $location){

		var sc = this;

		sc.url = 'http://localhost:3000/user/auth';

		sc.sessionId = '';
		// sc.sessionId = '';

		$scope.title = 'my title';

		$scope.LoginDetails = {
			username : 'tom',
			password : 'password'
		};


		//Excute Onclik and do user Authentication.
		$scope.handShake = function(){

			$scope.LoginDetails.password = md5.createHash($scope.LoginDetails.password);
			var Loginresult = vidServiceAuth.doAuth($scope.LoginDetails, sc.url);
			

			Loginresult.then(function(result){

				if (result.data.status == 'success'){
					sc.sessionId = result.data.sessionId;
					vidServiceAuth.username = result.data.username;
					// sc.sessionId = result.data.sessionId;
					$location.url('/main/' + sc.sessionId);
				}
			});

		}

	}
