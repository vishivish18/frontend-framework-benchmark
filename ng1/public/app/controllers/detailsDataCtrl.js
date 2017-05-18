angular.module('app')
    .controller('detailsDataCtrl', function($scope, $http, $stateParams) {
        $http.get('data/show/' + $stateParams.id).then(function(response) {
            console.log(response)
            $scope.customer = response.data[0];

            function generateRandmCode() {
                var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                var stringLength = 5;

                function pickRandom() {
                    return possible[Math.floor(Math.random() * possible.length)];
                }

                var randomString = Array.apply(null, Array(stringLength)).map(pickRandom).join('');
                return randomString
            }
            $scope.customer.ernrollment_id = generateRandmCode()
        })
    })
