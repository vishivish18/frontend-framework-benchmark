angular.module('app')
    .controller('homeCtrl', function($scope, $http) {

        $http.get('https://randomapi.com/api/5c416965db8365e8e6e353162fdd7b38?key=QDA1-245Z-598E-LOPI&results=10')
        .then(function(response){
            $scope.data = response.data.results
        })
    })
