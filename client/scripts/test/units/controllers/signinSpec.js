describe('testing angular js', function(){
	describe('testing angular', function(){
		it ('should do somthing', function(){
			module('vidApp');

			var scope = {};
			var ctrl;

			inject(function($controller){
				ctrl = $controller('SignCtrl', {$scope:scope});
			});

			expect(scope.LoginDetails).toBeDefined();
		})
	})
})