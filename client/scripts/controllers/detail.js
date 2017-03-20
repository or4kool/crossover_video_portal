vidApp.controller('DetailCtrl', detailCtrlDetail);


	detailCtrlDetail.inject = ['$scope', 'VidSereviceMain'];

	function detailCtrlDetail($scope,VidSereviceMain){

		console.log("INSIDE DETAILS" + ":" + VidSereviceMain.singleVideoData.name);

		$scope.detailSingleVideo = VidSereviceMain.singleVideoData;

		// console.log($scope.detailSingleVideo._id);

	}