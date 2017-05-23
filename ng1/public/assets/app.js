angular.module('app',[
'ngRoute','ui.router'
])
angular.module('app')
    .controller('detailsDataCtrl', ["$scope", "$http", "$stateParams", function($scope, $http, $stateParams) {
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

    }])

angular.module('app')
    .controller('homeCtrl', ["$scope", "$http", "$rootScope", "$timeout", function($scope, $http, $rootScope, $timeout) {
        $http.get('data/list')
            .then(function(response) {
                // $scope.data = response.data.results
                var start = performance.now();
                console.log(start)
                $scope.data = response.data //.results[0]
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
            .catch(function(error) {
                console.log(error)
            });

    }])

angular.module('app')
    .controller('masterCtrl', ["$scope", "$rootScope", "$route", "$http", function($scope, $rootScope, $route, $http) {
        console.log("masterCtrl");

        if (localStorage.getItem('logged_user')) {        	
            $rootScope.currentUser = localStorage.getItem('logged_user')
            $http.defaults.headers.common['x-auth'] = localStorage.getItem('user_token')
            console.log(localStorage.getItem('user_token'))
        }
        $scope.$on('login', function(_, user) {
            console.log("Logged In");
            $scope.currentUser = user
            $rootScope.currentUser = user
            localStorage.setItem('logged_user', $rootScope.currentUser.username)
        })
    }])

angular.module('app')
    .controller('navCtrl', ["$scope", "auth", "$location", function($scope, auth, $location) {        
        $scope.logout = function() {            
            auth.logout()                

        }
    }])

angular.module('app')
    .directive('onFinishRender', ["$timeout", function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit(attr.onFinishRender);
                });
            }
        }
    }
}]);
angular.module('app')
    .config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('app', {
                url: '/',
                views: {
                    'header': {
                        templateUrl: '/nav.html',
                        controller: 'navCtrl'
                    },
                    'content': {
                        templateUrl: 'users/home.html',
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

        .state('app.home.details', {
            url: '/details/:id',
            authenticate: true,
            views: {
                'content@': {
                    templateUrl: 'users/detailsData.html',
                    controller: 'detailsDataCtrl'
                }
            }

        })

        $locationProvider.html5Mode(true)

    }]);

angular.module('app')
    .controller('testCtrl', ["$scope", "$http", function($scope, $http) {
        function TestController() {
            var $ctrl = this;

            angular.extend($ctrl, {
                hello: 'Hello World!',
                tabs: ['Home', 'Learn', 'Develop', 'Discuss']
            });
        }

        angular.module('tests', [])
            .component('regularBinding', {
                template: '<span>{{ $ctrl.hello }}</span><ul><li ng-repeat="tab in $ctrl.tabs">{{tab}}</li></ul>',
                controller: TestController
            })
            .component('onetimeBinding', {
                template: '<span>{{ ::$ctrl.hello }}</span><ul><li ng-repeat="tab in ::$ctrl.tabs">{{tab}}</li></ul>',
                controller: TestController
            });


        function AngularTester(appId) {
            var $ctrl = this,
                apps, appNode, $rootScope, $injector;

            apps = angular.element('#Apps');
            appNode = angular.element('<div>');
            apps.append(appNode);
            angular.bootstrap(appNode, ['tests']);

            $injector = appNode.injector();
            $rootScope = $injector.get('$rootScope');

            angular.extend($ctrl, {
                addModule: addModule,
                digest: digest,
                destroy: destroy
            });

            function addModule(moduleName) {
                var module = angular.element('<' + moduleName + '>'),
                    $compile = $injector.get('$compile');

                $compile(module)($rootScope);
                appNode.append(module);
            }

            function digest() {
                $rootScope.$digest();
            }

            function destroy() {
                $rootScope.$destroy();
                appNode.remove();

                $ctrl = null;
                appNode = null;
                $rootScope = null;
                $injector = null;
            }
        }

        function setupTest(appId, module) {
            var ret = new AngularTester(appId);
            ret.addModule(module);
            return ret;
        }

        var cycleResults = document.getElementById('cycleResults');
        var result = document.getElementById('result');
        var btn = document.getElementById('btn');

        // BENCHMARK ====================
        btn.onclick = function runTests() {

            btn.setAttribute('disable', true);
            cycleResults.innerHTML = '';
            result.textContent = 'Tests running...';

            var suite = new Benchmark.Suite;

            var test1, test2;

            // add tests
            suite
                .add('regular-binding', function() {
                    test1.digest();
                })
                .add('onetime-binding', function() {
                    test2.digest();
                })
                .on('start', function() {
                    test1 = setupTest('App1', 'regular-binding');
                    test2 = setupTest('App2', 'onetime-binding');
                })
                // add listeners
                .on('cycle', function(event) {
                    var result = document.createElement('li');
                    result.textContent = String(event.target);

                    document.getElementById('cycleResults')
                        .appendChild(result);
                })
                .on('complete', function() {
                    result.textContent = 'Fastest is ' + this.filter('fastest').pluck('name');
                    btn.setAttribute('disable', false);

                    test1.destroy();
                    test2.destroy();
                    test1 = null;
                    test2 = null;
                })
                // run async
                .run({ 'async': true });
        };
    }])

angular.module('app')
  .component("helloWorld",{
      templateUrl: 'components/helloWorld.html',
      controller: 'helloWorldCtrl'
  });
angular.module('app')
    .service('auth', ["$http", "$window", "$location", "$rootScope", function($http, $window, $location, $rootScope) {


        return {
            getUser: getUser,
            login: login,
            register: register,
            logout: logout,
            storeToken: storeToken,
            isLogged: isLogged,
            postLoginOps: postLoginOps,
            postLoginRouteHandler: postLoginRouteHandler

        }

        function getUser() {
            return $http.get('api/users')
        }

        function login(username, password) {

            return $http.post('api/sessions', {
                username: username,
                password: password
            })
        }

        function register(name, username, password) {

             return $http.post('api/users', {
                name: name,
                username: username,
                password: password
            })
        }


        function logout() {
            localStorage.removeItem('user_token');
            localStorage.removeItem('logged_user');
            delete $http.defaults.headers.common['x-auth']
            $rootScope.isLogged = false;
            $rootScope.currentUser = null;
            $location.path("/login")



        }

        function storeToken(res, cb) {
            $window.sessionStorage["user_token"] = res
            localStorage.setItem('user_token', res);
            $http.defaults.headers.common['x-auth'] = $window.sessionStorage.user_token
            if (cb && (typeof cb === 'function')) {
                cb();
            }
        }

        function isLogged() {

        }

        function postLoginOps(res, cb) {

            
            $rootScope.currentUser = res.name
            localStorage.setItem('logged_user', $rootScope.currentUser)
            $rootScope.isLogged = true;
            if (cb && (typeof cb === 'function')) {
                cb();
            }
            
        }

        function postLoginRouteHandler() {
            if ($rootScope.intendedRoute) {
                $location.path($rootScope.intendedRoute);
            } else {
                $location.path('/home');
            }
        }
        

    }])

angular.module('app')
    .controller('helloWorldCtrl', ["$scope", function($scope) {
      console.log("contoller loaded for component")
    }])

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImNvbnRyb2xsZXJzL2RldGFpbHNEYXRhQ3RybC5qcyIsImNvbnRyb2xsZXJzL2hvbWVDdHJsLmpzIiwiY29udHJvbGxlcnMvbWFzdGVyQ3RybC5qcyIsImNvbnRyb2xsZXJzL25hdkN0cmwuanMiLCJjb250cm9sbGVycy9vbkZpbmlzaFJlbmRlci5qcyIsImNvbnRyb2xsZXJzL3JvdXRlcy5qcyIsImNvbnRyb2xsZXJzL3Rlc3RDdHJsLmpzIiwiY29tcG9uZW50cy9oZWxsb1dvcmxkLmpzIiwic2VydmljZXMvYXV0aC5qcyIsImNvbnRyb2xsZXJzL2NvbXBvbmVudHMvaGVsbG9Xb3JsZEN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBQSxPQUFBLE1BQUE7QUFDQSxVQUFBOztBQ0RBLFFBQUEsT0FBQTtLQUNBLFdBQUEsdURBQUEsU0FBQSxRQUFBLE9BQUEsY0FBQTtRQUNBLE1BQUEsSUFBQSxlQUFBLGFBQUEsSUFBQSxLQUFBLFNBQUEsVUFBQTtZQUNBLFFBQUEsSUFBQTtZQUNBLE9BQUEsV0FBQSxTQUFBLEtBQUE7OztZQUdBLFNBQUEsb0JBQUE7Z0JBQ0EsSUFBQSxXQUFBO2dCQUNBLElBQUEsZUFBQTs7Z0JBRUEsU0FBQSxhQUFBO29CQUNBLE9BQUEsU0FBQSxLQUFBLE1BQUEsS0FBQSxXQUFBLFNBQUE7OztnQkFHQSxJQUFBLGVBQUEsTUFBQSxNQUFBLE1BQUEsTUFBQSxlQUFBLElBQUEsWUFBQSxLQUFBO2dCQUNBLE9BQUE7O1lBRUEsT0FBQSxTQUFBLGlCQUFBOztRQUVBLE9BQUEsWUFBQTtRQUNBLE9BQUEsWUFBQTtRQUNBLE9BQUEsZUFBQSxTQUFBLEtBQUE7U0FDQSxNQUFBLFNBQUEsS0FBQTtZQUNBLFFBQUEsSUFBQSxrQkFBQSxPQUFBO1lBQ0EsT0FBQSxJQUFBLE1BQUE7O1FBRUEsT0FBQSxlQUFBLFNBQUEsS0FBQTtTQUNBLE1BQUEsU0FBQSxLQUFBO1lBQ0EsUUFBQSxJQUFBLGtCQUFBLE9B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QTtZQUNBLElBQUEsV0FBQSxlQUFBO2dCQUNBLFVBQUEsS0FBQSxXQUFBO21CQUNBO2dCQUNBLFVBQUEsS0FBQTs7Ozs7OztBQy9FQSxRQUFBLE9BQUE7S0FDQSxXQUFBLDZCQUFBLFNBQUEsUUFBQTtNQUNBLFFBQUEsSUFBQTs7QUFFQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJyxbXG4nbmdSb3V0ZScsJ3VpLnJvdXRlcidcbl0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ2RldGFpbHNEYXRhQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsICRzdGF0ZVBhcmFtcykge1xuICAgICAgICAkaHR0cC5nZXQoJ2RhdGEvc2hvdy8nICsgJHN0YXRlUGFyYW1zLmlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgICRzY29wZS5jdXN0b21lciA9IHJlc3BvbnNlLmRhdGFbMF07XG5cblxuICAgICAgICAgICAgZnVuY3Rpb24gZ2VuZXJhdGVSYW5kbUNvZGUoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBvc3NpYmxlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaMDEyMzQ1Njc4OSc7XG4gICAgICAgICAgICAgICAgdmFyIHN0cmluZ0xlbmd0aCA9IDU7XG5cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBwaWNrUmFuZG9tKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcG9zc2libGVbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGUubGVuZ3RoKV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHJhbmRvbVN0cmluZyA9IEFycmF5LmFwcGx5KG51bGwsIEFycmF5KHN0cmluZ0xlbmd0aCkpLm1hcChwaWNrUmFuZG9tKS5qb2luKCcnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmFuZG9tU3RyaW5nXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkc2NvcGUuY3VzdG9tZXIuZXJucm9sbG1lbnRfaWQgPSBnZW5lcmF0ZVJhbmRtQ29kZSgpXG4gICAgICAgIH0pXG4gICAgICAgICRzY29wZS5udW1iZXJPbmUgPSA1MDBcbiAgICAgICAgJHNjb3BlLm51bWJlclR3byA9IDUwMFxuICAgICAgICAkc2NvcGUuZ2V0TnVtYmVyT25lID0gZnVuY3Rpb24obnVtKSB7XG4gICAgICAgIFx0bnVtID0gcGFyc2VJbnQobnVtLCAxMClcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicnVubmluZyBnZXRudW1cIiwgdHlwZW9mKG51bSkpXG4gICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5KG51bSk7XG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLmdldE51bWJlclR3byA9IGZ1bmN0aW9uKG51bSkge1xuICAgICAgICBcdG51bSA9IHBhcnNlSW50KG51bSwgMTApXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJ1bm5pbmcgZ2V0bnVtXCIsIHR5cGVvZihudW0pKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheShudW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnbnVtYmVyT25lJywgZnVuY3Rpb24obmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlZCcpOyAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbm90IGNoYW5nZWQnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCdob21lQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsICRyb290U2NvcGUsICR0aW1lb3V0KSB7XG4gICAgICAgICRodHRwLmdldCgnZGF0YS9saXN0JylcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgLy8gJHNjb3BlLmRhdGEgPSByZXNwb25zZS5kYXRhLnJlc3VsdHNcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzdGFydClcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YSA9IHJlc3BvbnNlLmRhdGEgLy8ucmVzdWx0c1swXVxuICAgICAgICAgICAgICAgICAgICAvLyAkc2NvcGUuZGF0YSA9IFtdXG4gICAgICAgICAgICAgICAgICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgMTAwMDA7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgJHNjb3BlLmRhdGEucHVzaChyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyBMb2dzIHdoZW4gQW5ndWxhciBpcyBkb25lIHByb2Nlc3NpbmcgcmVwZWF0ZXJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCdQcm9jZXNzIHRpbWU6ICcgKyAobmV3IERhdGUoKSAtIHN0YXJ0KSk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS50aW1pbmcuZG9tQ29tcGxldGUpXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB2YXIgbG9hZFRpbWUgPSB3aW5kb3cucGVyZm9ybWFuY2UudGltaW5nLmRvbUNvbnRlbnRMb2FkZWRFdmVudEVuZCAtIHdpbmRvdy5wZXJmb3JtYW5jZS50aW1pbmcubmF2aWdhdGlvblN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ1BhZ2UgbG9hZCB0aW1lIGlzICcgKyBsb2FkVGltZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIH0pOyAvLyBMZWF2ZSB0aW1lb3V0IGVtcHR5IHRvIGZpcmUgb24gbmV4dCB0aWNrXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRvbignbmdSZXBlYXRGaW5pc2hlZCcsIGZ1bmN0aW9uKG5nUmVwZWF0RmluaXNoZWRFdmVudCkge1xuICAgICAgICAgICAgICAgICAgICAvL3lvdSBhbHNvIGdldCB0aGUgYWN0dWFsIGV2ZW50IG9iamVjdFxuICAgICAgICAgICAgICAgICAgICB2YXIgZW5kID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZW5kZXJUaW1lID0gZW5kIC0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlbmRlclRpbWUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbG9hZFRpbWUgPSB3aW5kb3cucGVyZm9ybWFuY2UudGltaW5nLmRvbUNvbnRlbnRMb2FkZWRFdmVudEVuZCAtIHdpbmRvdy5wZXJmb3JtYW5jZS50aW1pbmcubmF2aWdhdGlvblN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICAvL2RvIHN0dWZmLCBleGVjdXRlIGZ1bmN0aW9ucyAtLSB3aGF0ZXZlci4uLlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhsb2FkVGltZSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgICAgICAgIH0pO1xuXG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCdtYXN0ZXJDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkcm9vdFNjb3BlLCAkcm91dGUsICRodHRwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibWFzdGVyQ3RybFwiKTtcblxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvZ2dlZF91c2VyJykpIHsgICAgICAgIFx0XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmN1cnJlbnRVc2VyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvZ2dlZF91c2VyJylcbiAgICAgICAgICAgICRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWyd4LWF1dGgnXSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyX3Rva2VuJylcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyX3Rva2VuJykpXG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLiRvbignbG9naW4nLCBmdW5jdGlvbihfLCB1c2VyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvZ2dlZCBJblwiKTtcbiAgICAgICAgICAgICRzY29wZS5jdXJyZW50VXNlciA9IHVzZXJcbiAgICAgICAgICAgICRyb290U2NvcGUuY3VycmVudFVzZXIgPSB1c2VyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbG9nZ2VkX3VzZXInLCAkcm9vdFNjb3BlLmN1cnJlbnRVc2VyLnVzZXJuYW1lKVxuICAgICAgICB9KVxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignbmF2Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgYXV0aCwgJGxvY2F0aW9uKSB7ICAgICAgICBcbiAgICAgICAgJHNjb3BlLmxvZ291dCA9IGZ1bmN0aW9uKCkgeyAgICAgICAgICAgIFxuICAgICAgICAgICAgYXV0aC5sb2dvdXQoKSAgICAgICAgICAgICAgICBcblxuICAgICAgICB9XG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5kaXJlY3RpdmUoJ29uRmluaXNoUmVuZGVyJywgZnVuY3Rpb24gKCR0aW1lb3V0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRyKSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUuJGxhc3QgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRlbWl0KGF0dHIub25GaW5pc2hSZW5kZXIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xuXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblxuICAgICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAgICAgLnN0YXRlKCdhcHAnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnLycsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2hlYWRlcic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL25hdi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICduYXZDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnY29udGVudCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndXNlcnMvaG9tZS5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdob21lQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cblxuXG4gICAgICAgIC5zdGF0ZSgnYXBwLmhvbWUnLCB7XG4gICAgICAgICAgICB1cmw6ICdob21lJyxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgJ2NvbnRlbnRAJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3VzZXJzL2hvbWUuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdob21lQ3RybCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2FwcC5ob21lLmRldGFpbHMnLCB7XG4gICAgICAgICAgICB1cmw6ICcvZGV0YWlscy86aWQnLFxuICAgICAgICAgICAgYXV0aGVudGljYXRlOiB0cnVlLFxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAnY29udGVudEAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndXNlcnMvZGV0YWlsc0RhdGEuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdkZXRhaWxzRGF0YUN0cmwnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpXG5cbiAgICB9KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCd0ZXN0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHApIHtcbiAgICAgICAgZnVuY3Rpb24gVGVzdENvbnRyb2xsZXIoKSB7XG4gICAgICAgICAgICB2YXIgJGN0cmwgPSB0aGlzO1xuXG4gICAgICAgICAgICBhbmd1bGFyLmV4dGVuZCgkY3RybCwge1xuICAgICAgICAgICAgICAgIGhlbGxvOiAnSGVsbG8gV29ybGQhJyxcbiAgICAgICAgICAgICAgICB0YWJzOiBbJ0hvbWUnLCAnTGVhcm4nLCAnRGV2ZWxvcCcsICdEaXNjdXNzJ11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYW5ndWxhci5tb2R1bGUoJ3Rlc3RzJywgW10pXG4gICAgICAgICAgICAuY29tcG9uZW50KCdyZWd1bGFyQmluZGluZycsIHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJzxzcGFuPnt7ICRjdHJsLmhlbGxvIH19PC9zcGFuPjx1bD48bGkgbmctcmVwZWF0PVwidGFiIGluICRjdHJsLnRhYnNcIj57e3RhYn19PC9saT48L3VsPicsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogVGVzdENvbnRyb2xsZXJcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY29tcG9uZW50KCdvbmV0aW1lQmluZGluZycsIHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJzxzcGFuPnt7IDo6JGN0cmwuaGVsbG8gfX08L3NwYW4+PHVsPjxsaSBuZy1yZXBlYXQ9XCJ0YWIgaW4gOjokY3RybC50YWJzXCI+e3t0YWJ9fTwvbGk+PC91bD4nLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFRlc3RDb250cm9sbGVyXG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIGZ1bmN0aW9uIEFuZ3VsYXJUZXN0ZXIoYXBwSWQpIHtcbiAgICAgICAgICAgIHZhciAkY3RybCA9IHRoaXMsXG4gICAgICAgICAgICAgICAgYXBwcywgYXBwTm9kZSwgJHJvb3RTY29wZSwgJGluamVjdG9yO1xuXG4gICAgICAgICAgICBhcHBzID0gYW5ndWxhci5lbGVtZW50KCcjQXBwcycpO1xuICAgICAgICAgICAgYXBwTm9kZSA9IGFuZ3VsYXIuZWxlbWVudCgnPGRpdj4nKTtcbiAgICAgICAgICAgIGFwcHMuYXBwZW5kKGFwcE5vZGUpO1xuICAgICAgICAgICAgYW5ndWxhci5ib290c3RyYXAoYXBwTm9kZSwgWyd0ZXN0cyddKTtcblxuICAgICAgICAgICAgJGluamVjdG9yID0gYXBwTm9kZS5pbmplY3RvcigpO1xuICAgICAgICAgICAgJHJvb3RTY29wZSA9ICRpbmplY3Rvci5nZXQoJyRyb290U2NvcGUnKTtcblxuICAgICAgICAgICAgYW5ndWxhci5leHRlbmQoJGN0cmwsIHtcbiAgICAgICAgICAgICAgICBhZGRNb2R1bGU6IGFkZE1vZHVsZSxcbiAgICAgICAgICAgICAgICBkaWdlc3Q6IGRpZ2VzdCxcbiAgICAgICAgICAgICAgICBkZXN0cm95OiBkZXN0cm95XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gYWRkTW9kdWxlKG1vZHVsZU5hbWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbW9kdWxlID0gYW5ndWxhci5lbGVtZW50KCc8JyArIG1vZHVsZU5hbWUgKyAnPicpLFxuICAgICAgICAgICAgICAgICAgICAkY29tcGlsZSA9ICRpbmplY3Rvci5nZXQoJyRjb21waWxlJyk7XG5cbiAgICAgICAgICAgICAgICAkY29tcGlsZShtb2R1bGUpKCRyb290U2NvcGUpO1xuICAgICAgICAgICAgICAgIGFwcE5vZGUuYXBwZW5kKG1vZHVsZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGRpZ2VzdCgpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRkZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgYXBwTm9kZS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgICAgICRjdHJsID0gbnVsbDtcbiAgICAgICAgICAgICAgICBhcHBOb2RlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkaW5qZWN0b3IgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0dXBUZXN0KGFwcElkLCBtb2R1bGUpIHtcbiAgICAgICAgICAgIHZhciByZXQgPSBuZXcgQW5ndWxhclRlc3RlcihhcHBJZCk7XG4gICAgICAgICAgICByZXQuYWRkTW9kdWxlKG1vZHVsZSk7XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGN5Y2xlUmVzdWx0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjeWNsZVJlc3VsdHMnKTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHQnKTtcbiAgICAgICAgdmFyIGJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4nKTtcblxuICAgICAgICAvLyBCRU5DSE1BUksgPT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgYnRuLm9uY2xpY2sgPSBmdW5jdGlvbiBydW5UZXN0cygpIHtcblxuICAgICAgICAgICAgYnRuLnNldEF0dHJpYnV0ZSgnZGlzYWJsZScsIHRydWUpO1xuICAgICAgICAgICAgY3ljbGVSZXN1bHRzLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgcmVzdWx0LnRleHRDb250ZW50ID0gJ1Rlc3RzIHJ1bm5pbmcuLi4nO1xuXG4gICAgICAgICAgICB2YXIgc3VpdGUgPSBuZXcgQmVuY2htYXJrLlN1aXRlO1xuXG4gICAgICAgICAgICB2YXIgdGVzdDEsIHRlc3QyO1xuXG4gICAgICAgICAgICAvLyBhZGQgdGVzdHNcbiAgICAgICAgICAgIHN1aXRlXG4gICAgICAgICAgICAgICAgLmFkZCgncmVndWxhci1iaW5kaW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlc3QxLmRpZ2VzdCgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmFkZCgnb25ldGltZS1iaW5kaW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlc3QyLmRpZ2VzdCgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKCdzdGFydCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB0ZXN0MSA9IHNldHVwVGVzdCgnQXBwMScsICdyZWd1bGFyLWJpbmRpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgdGVzdDIgPSBzZXR1cFRlc3QoJ0FwcDInLCAnb25ldGltZS1iaW5kaW5nJyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvLyBhZGQgbGlzdGVuZXJzXG4gICAgICAgICAgICAgICAgLm9uKCdjeWNsZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQudGV4dENvbnRlbnQgPSBTdHJpbmcoZXZlbnQudGFyZ2V0KTtcblxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3ljbGVSZXN1bHRzJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRDaGlsZChyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKCdjb21wbGV0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQudGV4dENvbnRlbnQgPSAnRmFzdGVzdCBpcyAnICsgdGhpcy5maWx0ZXIoJ2Zhc3Rlc3QnKS5wbHVjaygnbmFtZScpO1xuICAgICAgICAgICAgICAgICAgICBidG4uc2V0QXR0cmlidXRlKCdkaXNhYmxlJywgZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRlc3QxLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICAgICAgdGVzdDIuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgICAgICB0ZXN0MSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRlc3QyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC8vIHJ1biBhc3luY1xuICAgICAgICAgICAgICAgIC5ydW4oeyAnYXN5bmMnOiB0cnVlIH0pO1xuICAgICAgICB9O1xuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgLmNvbXBvbmVudChcImhlbGxvV29ybGRcIix7XG4gICAgICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudHMvaGVsbG9Xb3JsZC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdoZWxsb1dvcmxkQ3RybCdcbiAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLnNlcnZpY2UoJ2F1dGgnLCBmdW5jdGlvbigkaHR0cCwgJHdpbmRvdywgJGxvY2F0aW9uLCAkcm9vdFNjb3BlKSB7XG5cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0VXNlcjogZ2V0VXNlcixcbiAgICAgICAgICAgIGxvZ2luOiBsb2dpbixcbiAgICAgICAgICAgIHJlZ2lzdGVyOiByZWdpc3RlcixcbiAgICAgICAgICAgIGxvZ291dDogbG9nb3V0LFxuICAgICAgICAgICAgc3RvcmVUb2tlbjogc3RvcmVUb2tlbixcbiAgICAgICAgICAgIGlzTG9nZ2VkOiBpc0xvZ2dlZCxcbiAgICAgICAgICAgIHBvc3RMb2dpbk9wczogcG9zdExvZ2luT3BzLFxuICAgICAgICAgICAgcG9zdExvZ2luUm91dGVIYW5kbGVyOiBwb3N0TG9naW5Sb3V0ZUhhbmRsZXJcblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0VXNlcigpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2FwaS91c2VycycpXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBsb2dpbih1c2VybmFtZSwgcGFzc3dvcmQpIHtcblxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJ2FwaS9zZXNzaW9ucycsIHtcbiAgICAgICAgICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcmVnaXN0ZXIobmFtZSwgdXNlcm5hbWUsIHBhc3N3b3JkKSB7XG5cbiAgICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnYXBpL3VzZXJzJywge1xuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZnVuY3Rpb24gbG9nb3V0KCkge1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXJfdG9rZW4nKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdsb2dnZWRfdXNlcicpO1xuICAgICAgICAgICAgZGVsZXRlICRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWyd4LWF1dGgnXVxuICAgICAgICAgICAgJHJvb3RTY29wZS5pc0xvZ2dlZCA9IGZhbHNlO1xuICAgICAgICAgICAgJHJvb3RTY29wZS5jdXJyZW50VXNlciA9IG51bGw7XG4gICAgICAgICAgICAkbG9jYXRpb24ucGF0aChcIi9sb2dpblwiKVxuXG5cblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc3RvcmVUb2tlbihyZXMsIGNiKSB7XG4gICAgICAgICAgICAkd2luZG93LnNlc3Npb25TdG9yYWdlW1widXNlcl90b2tlblwiXSA9IHJlc1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXJfdG9rZW4nLCByZXMpO1xuICAgICAgICAgICAgJGh0dHAuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ3gtYXV0aCddID0gJHdpbmRvdy5zZXNzaW9uU3RvcmFnZS51c2VyX3Rva2VuXG4gICAgICAgICAgICBpZiAoY2IgJiYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJykpIHtcbiAgICAgICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaXNMb2dnZWQoKSB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHBvc3RMb2dpbk9wcyhyZXMsIGNiKSB7XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJHJvb3RTY29wZS5jdXJyZW50VXNlciA9IHJlcy5uYW1lXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbG9nZ2VkX3VzZXInLCAkcm9vdFNjb3BlLmN1cnJlbnRVc2VyKVxuICAgICAgICAgICAgJHJvb3RTY29wZS5pc0xvZ2dlZCA9IHRydWU7XG4gICAgICAgICAgICBpZiAoY2IgJiYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJykpIHtcbiAgICAgICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBwb3N0TG9naW5Sb3V0ZUhhbmRsZXIoKSB7XG4gICAgICAgICAgICBpZiAoJHJvb3RTY29wZS5pbnRlbmRlZFJvdXRlKSB7XG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJHJvb3RTY29wZS5pbnRlbmRlZFJvdXRlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9ob21lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICB9KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ2hlbGxvV29ybGRDdHJsJywgZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImNvbnRvbGxlciBsb2FkZWQgZm9yIGNvbXBvbmVudFwiKVxuICAgIH0pXG4iXX0=
