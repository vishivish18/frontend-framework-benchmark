angular.module('app')
.config(function($stateProvider, $urlRouterProvider,$locationProvider){
 
    $urlRouterProvider.otherwise('/');
 
    $stateProvider
    .state('app',{
        url: '/',
        views: {
            'header': {
                templateUrl: '/nav.html',
                controller: 'navCtrl'
            },
            'content': {
                templateUrl: 'users/home.html' ,
                controller: 'homeCtrl'
            }
        }
    })

    
 
    .state('app.home', {
        url: 'home',
        views: {
            'content@': {
                templateUrl: 'users/home.html',
                controller: 'homeCtrl'
            }
        }
 
    })

     .state('app.home.data', {
        url: '/data/new',
        views: {
            'content@': {
                templateUrl: 'users/newData.html',
                controller: 'newDataCtrl'
            }
        }
 
    })    
 
    $locationProvider.html5Mode(true)
 
});

