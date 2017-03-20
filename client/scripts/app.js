'use strict';

/**
 * @ngdoc overview
 * @name vidApp
 * @description
 * # vidApp
 *
 * Main module of the application.
 */
var vidApp = angular
  .module('vidApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'angular-md5',
    'infinite-scroll'
  ]);
  

  vidApp.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/signin.html',
        controller: 'SignCtrl',
        controllerAs: 'sign'
      })
      .when('/main/:sessionID', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/detail/:sessionID', {
        templateUrl: 'views/detail.html',
        controller: 'DetailCtrl',
        controllerAs: 'detail'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
