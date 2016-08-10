var mTut = angular.module('MaterialTutor', ['ngMaterial', 'ngRoute']);

mTut.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'views/indexView.html',
        controller: 'indexController'
    })
});
