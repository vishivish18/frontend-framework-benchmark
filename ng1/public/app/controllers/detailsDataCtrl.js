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
        $scope.numberOne = 500
        $scope.numberTwo = 500
        $scope.getNumberOne = function(num) {
        	num = parseInt(num, 10)
            console.log("running getnum", typeof(num))
            return new Array(num);
        }
        $scope.getNumberTwo = function(num) {
        	num = parseInt(num, 10)
            console.log("running getnum", typeof(num))
            return new Array(num);
        }

        $scope.$watch('numberOne', function(newValue, oldValue) {
            if (newValue) {
                console.log('changed');               
            } else {
                console.log('not changed')
            }
        })

    })
