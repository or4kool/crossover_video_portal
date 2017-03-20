vidApp.directive('ratingDir', ['vidServiceAuth', '$routeParams', function(vidServiceAuth, $routeParams){


		//Template variable for the star rating
		this.starsTemp = '<ul class="starboy">'+
						'<li ng-repeat="star in stars"  ng-click="clickStar($index)" ng-class="star">'+
						'\u2605'+
						'</li>';

		//Link variable for directive link
		this.linker = function(scope,elem,attr){

			var maxRating = 5;

			var ratingUrl = 'http://localhost:3000/video/ratings?sessionId=' + $routeParams.sessionID;

			var ratingData = {
				videoId: scope.videoId,
				rating: ''
			}

			//update rating and change color
			var changeStarColor = function(){
				scope.stars = [];
				for (var i=0; i < maxRating; i++){
					console.log(scope.currentStar);
					// console.log('I::' + i);
					scope.stars.push({
						colored: i < scope.currentStar
					});
				}
			}

			//click functon, add to previous rating
			scope.clickStar = function(index){
					console.log("cliked me::" + index);
					scope.currentStar = index + 1;
					pushRating(scope.currentStar);
			}


			// send rating to server.
			var pushRating = function(index){
				ratingData.rating = index;

				console.log(ratingData);
				var sendRating = vidServiceAuth.doAuth(ratingData, ratingUrl);
					sendRating.then(function(result){
						console.log("RATING RESULT" + ':' + result);
					})
			}

			scope.$watch('currentStar', function(oldVal,newVal){
					if (newVal){
						changeStarColor();
					}
			})
		}

	return{

		restric: 'E',
		template: starsTemp,
		scope: {
			currentStar : "=",
			videoId : "="
		},
		link: linker

	}

}]);


//page scroll directive
vidApp.directive("whenScrolled", function(){
  return{
    
    restrict: 'A',
    link: function(scope, elem, attrs){
    
      // we get a list of elements of size 1 and need the first element
      raw = elem[0];
    
      // we load more elements when scrolled past a limit
      elem.bind("scroll", function(){
        if(raw.scrollTop+raw.offsetHeight >= raw.scrollHeight){
          scope.loading = true;
        // we can give any function which loads more elements into the list
          scope.$apply(attrs.whenScrolled);
        }
      });
    }
  }

});


