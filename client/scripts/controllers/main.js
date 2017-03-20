'use strict';

/**
 * @ngdoc function
 * @name vidApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vidApp
 */
vidApp.controller('MainCtrl', MainCtrlDetail);


	MainCtrlDetail.inject = ['$scope', '$routeParams', '$location', 'VidSereviceMain','vidServiceAuth'];

	function MainCtrlDetail($scope,$routeParams, $location, VidSereviceMain,vidServiceAuth){

		// console.log($routeParams.sessionID);

		var mcd = this;

		// console.log(vidServiceAuth.username);

		$scope.username = vidServiceAuth.username;

		mcd.count = 1;
		
		$scope.videoLimit = 10;
		$scope.videoLength = 100;

		mcd.videoData = {
			url : 'http://localhost:3000/video',
			sessionId : $routeParams.sessionID,
			limit : '10',
			skip : '0'
		}

		mcd.urlMain = mcd.videoData.url + 's' + '?sessionId=' + mcd.videoData.sessionId + '&limit=' + mcd.videoData.limit;

		console.log('URL' + ":" + mcd.urlMain);


		var getVideo = VidSereviceMain.serverFetch(mcd.urlMain);

		getVideo.then(function(result){

			// CHECK IF SUCCESSFUL BEFORE PROCEEDING
			
				$scope.videos = result.data;
			
		});


		$scope.goDetail = function(VideoId){

			mcd.urlSingle = mcd.videoData.url + '?sessionId=' + mcd.videoData.sessionId + '&videoId=' + VideoId;

			mcd.getSingleVideo = VidSereviceMain.serverFetch(mcd.urlSingle);
			mcd.getSingleVideo.then(function (result){

				VidSereviceMain.singleVideoData = result.data;
				$location.url('/detail/' + mcd.videoData.sessionId);
			})

		};


		$scope.goNext = function(page){



			mcd.videoData.skip = (page) * 10  ;

			mcd.urlMain = mcd.videoData.url + 's' + '?sessionId=' + mcd.videoData.sessionId + '&limit=' + mcd.videoData.skip;
			// mcd.urlMain = mcd.videoData.url + 's' + '?sessionId=' + mcd.videoData.sessionId + '&skip=' + mcd.videoData.skip + '&limit=' + mcd.videoData.limit;

			console.log(mcd.urlMain);

		mcd.getNextVideo = VidSereviceMain.serverFetch(mcd.urlMain);

		mcd.getNextVideo.then(function(result){
			$scope.videos = result.data;
		});


			console.log(mcd.urlMain);

		}

		$scope.logout = function(){
			mcd.logoutUrl = 'http://localhost:3000/user/logout?sessionId=' + mcd.videoData.sessionId;
			mcd.logoutUser = VidSereviceMain.serverFetch(mcd.logoutUrl);
			mcd.logoutUser.then(function(result){
				// if (result.status == success){
					$location.url('/');
				// }

			});

		}


		$scope.loadMore = function() {


			  $scope.goNext(mcd.count);
			  mcd.count = mcd.count + 1;
			  // console.log("bla");
		    };

		
	}
