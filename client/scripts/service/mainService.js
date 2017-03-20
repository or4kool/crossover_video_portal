vidApp.service('vidServiceAuth',vidServiceDetail);

vidServiceDetail.$inject = ['$http', '$q', '$rootScope'];

function vidServiceDetail($http, $q, $rootScope){

	var username = '';

	var deffered = $q.defer();

	// this.sessionID = '';

	this.doAuth = function(sendData, url){

		$http({
				method: 'POST',
				url: url,
				data: sendData,
				headers : {'Content-Type': 'application/json'}

		}).then(function successCallback(response){

				// this.sessionID = response.data.sessionId;

				deffered.resolve(response);
				
		}, function errorCallback(response){

		});

		return deffered.promise;
	};

};


vidApp.service('VidSereviceMain', VidSereviceMainDetail);
	
	VidSereviceMainDetail.inject = ['$http','$q', '$rootScope'];

	function VidSereviceMainDetail($http, $q, $rootScope){

		// this.sessionID = '';
		this.singleVideoData = '';

		this.serverFetch = function(url){
		// this.getVid = function(url){

			var deffered = $q.defer();

			$http({
					method: 'GET',
					url: url,
					headers : {'Content-Type': 'application/json'}

			}).then(function successCallback(response){

					deffered.resolve(response.data);
					
			}, function errorCallback(response){

			});

			return deffered.promise;
		};

	}	


	// vidApp.service('VidSingleSerevice', VidSingleSereviceDetail);
		
	// 	VidSingleSereviceDetail.inject = ['$http','$q', '$rootScope'];

	// 	function VidSingleSereviceDetail($http, $q, $rootScope){

	// 		this.singleVideoData = '';


	// 		this.getSingleVid = function(url){

	// 			var deffered = $q.defer();
	// 			$http({
	// 					method: 'GET',
	// 					url: url,
	// 					headers : {'Content-Type': 'application/json'}

	// 			}).then(function successCallback(response){

	// 					deffered.resolve(response.data);
						
	// 			}, function errorCallback(response){

	// 			});

	// 			return deffered.promise;
	// 		};

	// 	}	