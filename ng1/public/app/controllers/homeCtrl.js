angular.module('app')
    .controller('homeCtrl', function($scope, $http, $rootScope, $timeout) {
        $http.get('data/list')
            .then(function(response) {
                // $scope.data = response.data.results
                var start = performance.now();
                console.log(start)
                $scope.data= response.data//.results[0]
                // $scope.data = []
                // for (var i = 0; i < 10000; i++) {
                //     $scope.data.push(result)
                // }
                // $timeout(function() {
                //     // Logs when Angular is done processing repeater
                //     console.log('Process time: ' + (new Date() - start));
                //     console.log(performance.timing.domComplete)
                //     var loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
                //     console.log('Page load time is ' + loadTime);
                // }); // Leave timeout empty to fire on next tick
                $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
                    //you also get the actual event object
                    var end = performance.now();
                    var renderTime = end - start;
                    console.log(renderTime);
                    var loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
                    //do stuff, execute functions -- whatever...
                    console.log(loadTime);
                });

            })

    })

