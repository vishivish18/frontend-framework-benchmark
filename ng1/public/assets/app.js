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
    }])

angular.module('app')
    .controller('homeCtrl', ["$scope", "$http", "$rootScope", "$timeout", function($scope, $http, $rootScope, $timeout) {
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
  .component("helloWorld",{
      templateUrl: 'components/helloWorld.html',
      controller: 'helloWorldCtrl'
  });
angular.module('app')
    .controller('helloWorldCtrl', ["$scope", function($scope) {
      console.log("contoller loaded for component")
    }])

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImNvbnRyb2xsZXJzL2RldGFpbHNEYXRhQ3RybC5qcyIsImNvbnRyb2xsZXJzL2hvbWVDdHJsLmpzIiwiY29udHJvbGxlcnMvbWFzdGVyQ3RybC5qcyIsImNvbnRyb2xsZXJzL25hdkN0cmwuanMiLCJjb250cm9sbGVycy9vbkZpbmlzaFJlbmRlci5qcyIsImNvbnRyb2xsZXJzL3JvdXRlcy5qcyIsImNvbnRyb2xsZXJzL3Rlc3RDdHJsLmpzIiwic2VydmljZXMvYXV0aC5qcyIsImNvbXBvbmVudHMvaGVsbG9Xb3JsZC5qcyIsImNvbnRyb2xsZXJzL2NvbXBvbmVudHMvaGVsbG9Xb3JsZEN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBQSxPQUFBLE1BQUE7QUFDQSxVQUFBOztBQ0RBLFFBQUEsT0FBQTtLQUNBLFdBQUEsdURBQUEsU0FBQSxRQUFBLE9BQUEsY0FBQTtRQUNBLE1BQUEsSUFBQSxlQUFBLGFBQUEsSUFBQSxLQUFBLFNBQUEsVUFBQTtZQUNBLFFBQUEsSUFBQTtZQUNBLE9BQUEsV0FBQSxTQUFBLEtBQUE7O1lBRUEsU0FBQSxvQkFBQTtnQkFDQSxJQUFBLFdBQUE7Z0JBQ0EsSUFBQSxlQUFBOztnQkFFQSxTQUFBLGFBQUE7b0JBQ0EsT0FBQSxTQUFBLEtBQUEsTUFBQSxLQUFBLFdBQUEsU0FBQTs7O2dCQUdBLElBQUEsZUFBQSxNQUFBLE1BQUEsTUFBQSxNQUFBLGVBQUEsSUFBQSxZQUFBLEtBQUE7Z0JBQ0EsT0FBQTs7WUFFQSxPQUFBLFNBQUEsaUJBQUE7Ozs7QUNqQkEsUUFBQSxPQUFBO0tBQ0EsV0FBQSwwREFBQSxTQUFBLFFBQUEsT0FBQSxZQUFBLFVBQUE7UUFDQSxNQUFBLElBQUE7YUFDQSxLQUFBLFNBQUEsVUFBQTs7Z0JBRUEsSUFBQSxRQUFBLFlBQUE7Z0JBQ0EsUUFBQSxJQUFBO2dCQUNBLE9BQUEsTUFBQSxTQUFBOzs7Ozs7Ozs7Ozs7Z0JBWUEsT0FBQSxJQUFBLG9CQUFBLFNBQUEsdUJBQUE7O29CQUVBLElBQUEsTUFBQSxZQUFBO29CQUNBLElBQUEsYUFBQSxNQUFBO29CQUNBLFFBQUEsSUFBQTtvQkFDQSxJQUFBLFdBQUEsT0FBQSxZQUFBLE9BQUEsMkJBQUEsT0FBQSxZQUFBLE9BQUE7O29CQUVBLFFBQUEsSUFBQTs7Ozs7Ozs7QUMxQkEsUUFBQSxPQUFBO0tBQ0EsV0FBQSwwREFBQSxTQUFBLFFBQUEsWUFBQSxRQUFBLE9BQUE7UUFDQSxRQUFBLElBQUE7O1FBRUEsSUFBQSxhQUFBLFFBQUEsZ0JBQUE7WUFDQSxXQUFBLGNBQUEsYUFBQSxRQUFBO1lBQ0EsTUFBQSxTQUFBLFFBQUEsT0FBQSxZQUFBLGFBQUEsUUFBQTtZQUNBLFFBQUEsSUFBQSxhQUFBLFFBQUE7O1FBRUEsT0FBQSxJQUFBLFNBQUEsU0FBQSxHQUFBLE1BQUE7WUFDQSxRQUFBLElBQUE7WUFDQSxPQUFBLGNBQUE7WUFDQSxXQUFBLGNBQUE7WUFDQSxhQUFBLFFBQUEsZUFBQSxXQUFBLFlBQUE7Ozs7QUNiQSxRQUFBLE9BQUE7S0FDQSxXQUFBLDJDQUFBLFNBQUEsUUFBQSxNQUFBLFdBQUE7UUFDQSxPQUFBLFNBQUEsV0FBQTtZQUNBLEtBQUE7Ozs7O0FDSEEsUUFBQSxPQUFBO0tBQ0EsVUFBQSwrQkFBQSxVQUFBLFVBQUE7SUFDQSxPQUFBO1FBQ0EsVUFBQTtRQUNBLE1BQUEsVUFBQSxPQUFBLFNBQUEsTUFBQTtZQUNBLElBQUEsTUFBQSxVQUFBLE1BQUE7Z0JBQ0EsU0FBQSxZQUFBO29CQUNBLE1BQUEsTUFBQSxLQUFBOzs7Ozs7QUNQQSxRQUFBLE9BQUE7S0FDQSxxRUFBQSxTQUFBLGdCQUFBLG9CQUFBLG1CQUFBOztRQUVBLG1CQUFBLFVBQUE7O1FBRUE7YUFDQSxNQUFBLE9BQUE7Z0JBQ0EsS0FBQTtnQkFDQSxPQUFBO29CQUNBLFVBQUE7d0JBQ0EsYUFBQTt3QkFDQSxZQUFBOztvQkFFQSxXQUFBO3dCQUNBLGFBQUE7d0JBQ0EsWUFBQTs7Ozs7OztTQU9BLE1BQUEsWUFBQTtZQUNBLEtBQUE7WUFDQSxPQUFBO2dCQUNBLFlBQUE7b0JBQ0EsYUFBQTtvQkFDQSxZQUFBOzs7Ozs7U0FNQSxNQUFBLG9CQUFBO1lBQ0EsS0FBQTtZQUNBLGNBQUE7WUFDQSxPQUFBO2dCQUNBLFlBQUE7b0JBQ0EsYUFBQTtvQkFDQSxZQUFBOzs7Ozs7UUFNQSxrQkFBQSxVQUFBOzs7O0FDN0NBLFFBQUEsT0FBQTtLQUNBLFdBQUEsZ0NBQUEsU0FBQSxRQUFBLE9BQUE7UUFDQSxTQUFBLGlCQUFBO1lBQ0EsSUFBQSxRQUFBOztZQUVBLFFBQUEsT0FBQSxPQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsTUFBQSxDQUFBLFFBQUEsU0FBQSxXQUFBOzs7O1FBSUEsUUFBQSxPQUFBLFNBQUE7YUFDQSxVQUFBLGtCQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsWUFBQTs7YUFFQSxVQUFBLGtCQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsWUFBQTs7OztRQUlBLFNBQUEsY0FBQSxPQUFBO1lBQ0EsSUFBQSxRQUFBO2dCQUNBLE1BQUEsU0FBQSxZQUFBOztZQUVBLE9BQUEsUUFBQSxRQUFBO1lBQ0EsVUFBQSxRQUFBLFFBQUE7WUFDQSxLQUFBLE9BQUE7WUFDQSxRQUFBLFVBQUEsU0FBQSxDQUFBOztZQUVBLFlBQUEsUUFBQTtZQUNBLGFBQUEsVUFBQSxJQUFBOztZQUVBLFFBQUEsT0FBQSxPQUFBO2dCQUNBLFdBQUE7Z0JBQ0EsUUFBQTtnQkFDQSxTQUFBOzs7WUFHQSxTQUFBLFVBQUEsWUFBQTtnQkFDQSxJQUFBLFNBQUEsUUFBQSxRQUFBLE1BQUEsYUFBQTtvQkFDQSxXQUFBLFVBQUEsSUFBQTs7Z0JBRUEsU0FBQSxRQUFBO2dCQUNBLFFBQUEsT0FBQTs7O1lBR0EsU0FBQSxTQUFBO2dCQUNBLFdBQUE7OztZQUdBLFNBQUEsVUFBQTtnQkFDQSxXQUFBO2dCQUNBLFFBQUE7O2dCQUVBLFFBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLFlBQUE7Ozs7UUFJQSxTQUFBLFVBQUEsT0FBQSxRQUFBO1lBQ0EsSUFBQSxNQUFBLElBQUEsY0FBQTtZQUNBLElBQUEsVUFBQTtZQUNBLE9BQUE7OztRQUdBLElBQUEsZUFBQSxTQUFBLGVBQUE7UUFDQSxJQUFBLFNBQUEsU0FBQSxlQUFBO1FBQ0EsSUFBQSxNQUFBLFNBQUEsZUFBQTs7O1FBR0EsSUFBQSxVQUFBLFNBQUEsV0FBQTs7WUFFQSxJQUFBLGFBQUEsV0FBQTtZQUNBLGFBQUEsWUFBQTtZQUNBLE9BQUEsY0FBQTs7WUFFQSxJQUFBLFFBQUEsSUFBQSxVQUFBOztZQUVBLElBQUEsT0FBQTs7O1lBR0E7aUJBQ0EsSUFBQSxtQkFBQSxXQUFBO29CQUNBLE1BQUE7O2lCQUVBLElBQUEsbUJBQUEsV0FBQTtvQkFDQSxNQUFBOztpQkFFQSxHQUFBLFNBQUEsV0FBQTtvQkFDQSxRQUFBLFVBQUEsUUFBQTtvQkFDQSxRQUFBLFVBQUEsUUFBQTs7O2lCQUdBLEdBQUEsU0FBQSxTQUFBLE9BQUE7b0JBQ0EsSUFBQSxTQUFBLFNBQUEsY0FBQTtvQkFDQSxPQUFBLGNBQUEsT0FBQSxNQUFBOztvQkFFQSxTQUFBLGVBQUE7eUJBQ0EsWUFBQTs7aUJBRUEsR0FBQSxZQUFBLFdBQUE7b0JBQ0EsT0FBQSxjQUFBLGdCQUFBLEtBQUEsT0FBQSxXQUFBLE1BQUE7b0JBQ0EsSUFBQSxhQUFBLFdBQUE7O29CQUVBLE1BQUE7b0JBQ0EsTUFBQTtvQkFDQSxRQUFBO29CQUNBLFFBQUE7OztpQkFHQSxJQUFBLEVBQUEsU0FBQTs7OztBQ2xIQSxRQUFBLE9BQUE7S0FDQSxRQUFBLHdEQUFBLFNBQUEsT0FBQSxTQUFBLFdBQUEsWUFBQTs7O1FBR0EsT0FBQTtZQUNBLFNBQUE7WUFDQSxPQUFBO1lBQ0EsVUFBQTtZQUNBLFFBQUE7WUFDQSxZQUFBO1lBQ0EsVUFBQTtZQUNBLGNBQUE7WUFDQSx1QkFBQTs7OztRQUlBLFNBQUEsVUFBQTtZQUNBLE9BQUEsTUFBQSxJQUFBOzs7UUFHQSxTQUFBLE1BQUEsVUFBQSxVQUFBOztZQUVBLE9BQUEsTUFBQSxLQUFBLGdCQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsVUFBQTs7OztRQUlBLFNBQUEsU0FBQSxNQUFBLFVBQUEsVUFBQTs7YUFFQSxPQUFBLE1BQUEsS0FBQSxhQUFBO2dCQUNBLE1BQUE7Z0JBQ0EsVUFBQTtnQkFDQSxVQUFBOzs7OztRQUtBLFNBQUEsU0FBQTtZQUNBLGFBQUEsV0FBQTtZQUNBLGFBQUEsV0FBQTtZQUNBLE9BQUEsTUFBQSxTQUFBLFFBQUEsT0FBQTtZQUNBLFdBQUEsV0FBQTtZQUNBLFdBQUEsY0FBQTtZQUNBLFVBQUEsS0FBQTs7Ozs7O1FBTUEsU0FBQSxXQUFBLEtBQUEsSUFBQTtZQUNBLFFBQUEsZUFBQSxnQkFBQTtZQUNBLGFBQUEsUUFBQSxjQUFBO1lBQ0EsTUFBQSxTQUFBLFFBQUEsT0FBQSxZQUFBLFFBQUEsZUFBQTtZQUNBLElBQUEsT0FBQSxPQUFBLE9BQUEsYUFBQTtnQkFDQTs7OztRQUlBLFNBQUEsV0FBQTs7OztRQUlBLFNBQUEsYUFBQSxLQUFBLElBQUE7OztZQUdBLFdBQUEsY0FBQSxJQUFBO1lBQ0EsYUFBQSxRQUFBLGVBQUEsV0FBQTtZQUNBLFdBQUEsV0FBQTtZQUNBLElBQUEsT0FBQSxPQUFBLE9BQUEsYUFBQTtnQkFDQTs7Ozs7UUFLQSxTQUFBLHdCQUFBO1lBQ0EsSUFBQSxXQUFBLGVBQUE7Z0JBQ0EsVUFBQSxLQUFBLFdBQUE7bUJBQ0E7Z0JBQ0EsVUFBQSxLQUFBOzs7Ozs7O0FDL0VBLFFBQUEsT0FBQTtHQUNBLFVBQUEsYUFBQTtNQUNBLGFBQUE7TUFDQSxZQUFBOztBQ0hBLFFBQUEsT0FBQTtLQUNBLFdBQUEsNkJBQUEsU0FBQSxRQUFBO01BQ0EsUUFBQSxJQUFBOztBQUVBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnLFtcbiduZ1JvdXRlJywndWkucm91dGVyJ1xuXSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignZGV0YWlsc0RhdGFDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgJHN0YXRlUGFyYW1zKSB7XG4gICAgICAgICRodHRwLmdldCgnZGF0YS9zaG93LycgKyAkc3RhdGVQYXJhbXMuaWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgJHNjb3BlLmN1c3RvbWVyID0gcmVzcG9uc2UuZGF0YVswXTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gZ2VuZXJhdGVSYW5kbUNvZGUoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBvc3NpYmxlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaMDEyMzQ1Njc4OSc7XG4gICAgICAgICAgICAgICAgdmFyIHN0cmluZ0xlbmd0aCA9IDU7XG5cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBwaWNrUmFuZG9tKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcG9zc2libGVbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGUubGVuZ3RoKV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHJhbmRvbVN0cmluZyA9IEFycmF5LmFwcGx5KG51bGwsIEFycmF5KHN0cmluZ0xlbmd0aCkpLm1hcChwaWNrUmFuZG9tKS5qb2luKCcnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmFuZG9tU3RyaW5nXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkc2NvcGUuY3VzdG9tZXIuZXJucm9sbG1lbnRfaWQgPSBnZW5lcmF0ZVJhbmRtQ29kZSgpXG4gICAgICAgIH0pXG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCdob21lQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsICRyb290U2NvcGUsICR0aW1lb3V0KSB7XG4gICAgICAgICRodHRwLmdldCgnZGF0YS9saXN0JylcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgLy8gJHNjb3BlLmRhdGEgPSByZXNwb25zZS5kYXRhLnJlc3VsdHNcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzdGFydClcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YT0gcmVzcG9uc2UuZGF0YS8vLnJlc3VsdHNbMF1cbiAgICAgICAgICAgICAgICAvLyAkc2NvcGUuZGF0YSA9IFtdXG4gICAgICAgICAgICAgICAgLy8gZm9yICh2YXIgaSA9IDA7IGkgPCAxMDAwMDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgICRzY29wZS5kYXRhLnB1c2gocmVzdWx0KVxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAvLyAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgLy8gTG9ncyB3aGVuIEFuZ3VsYXIgaXMgZG9uZSBwcm9jZXNzaW5nIHJlcGVhdGVyXG4gICAgICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCdQcm9jZXNzIHRpbWU6ICcgKyAobmV3IERhdGUoKSAtIHN0YXJ0KSk7XG4gICAgICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKHBlcmZvcm1hbmNlLnRpbWluZy5kb21Db21wbGV0ZSlcbiAgICAgICAgICAgICAgICAvLyAgICAgdmFyIGxvYWRUaW1lID0gd2luZG93LnBlcmZvcm1hbmNlLnRpbWluZy5kb21Db250ZW50TG9hZGVkRXZlbnRFbmQgLSB3aW5kb3cucGVyZm9ybWFuY2UudGltaW5nLm5hdmlnYXRpb25TdGFydDtcbiAgICAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ1BhZ2UgbG9hZCB0aW1lIGlzICcgKyBsb2FkVGltZSk7XG4gICAgICAgICAgICAgICAgLy8gfSk7IC8vIExlYXZlIHRpbWVvdXQgZW1wdHkgdG8gZmlyZSBvbiBuZXh0IHRpY2tcbiAgICAgICAgICAgICAgICAkc2NvcGUuJG9uKCduZ1JlcGVhdEZpbmlzaGVkJywgZnVuY3Rpb24obmdSZXBlYXRGaW5pc2hlZEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIC8veW91IGFsc28gZ2V0IHRoZSBhY3R1YWwgZXZlbnQgb2JqZWN0XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbmQgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlbmRlclRpbWUgPSBlbmQgLSBzdGFydDtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVuZGVyVGltZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsb2FkVGltZSA9IHdpbmRvdy5wZXJmb3JtYW5jZS50aW1pbmcuZG9tQ29udGVudExvYWRlZEV2ZW50RW5kIC0gd2luZG93LnBlcmZvcm1hbmNlLnRpbWluZy5uYXZpZ2F0aW9uU3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgIC8vZG8gc3R1ZmYsIGV4ZWN1dGUgZnVuY3Rpb25zIC0tIHdoYXRldmVyLi4uXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGxvYWRUaW1lKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSlcblxuICAgIH0pXG5cbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCdtYXN0ZXJDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkcm9vdFNjb3BlLCAkcm91dGUsICRodHRwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibWFzdGVyQ3RybFwiKTtcblxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvZ2dlZF91c2VyJykpIHsgICAgICAgIFx0XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmN1cnJlbnRVc2VyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvZ2dlZF91c2VyJylcbiAgICAgICAgICAgICRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWyd4LWF1dGgnXSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyX3Rva2VuJylcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyX3Rva2VuJykpXG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLiRvbignbG9naW4nLCBmdW5jdGlvbihfLCB1c2VyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvZ2dlZCBJblwiKTtcbiAgICAgICAgICAgICRzY29wZS5jdXJyZW50VXNlciA9IHVzZXJcbiAgICAgICAgICAgICRyb290U2NvcGUuY3VycmVudFVzZXIgPSB1c2VyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbG9nZ2VkX3VzZXInLCAkcm9vdFNjb3BlLmN1cnJlbnRVc2VyLnVzZXJuYW1lKVxuICAgICAgICB9KVxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignbmF2Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgYXV0aCwgJGxvY2F0aW9uKSB7ICAgICAgICBcbiAgICAgICAgJHNjb3BlLmxvZ291dCA9IGZ1bmN0aW9uKCkgeyAgICAgICAgICAgIFxuICAgICAgICAgICAgYXV0aC5sb2dvdXQoKSAgICAgICAgICAgICAgICBcblxuICAgICAgICB9XG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5kaXJlY3RpdmUoJ29uRmluaXNoUmVuZGVyJywgZnVuY3Rpb24gKCR0aW1lb3V0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRyKSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUuJGxhc3QgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRlbWl0KGF0dHIub25GaW5pc2hSZW5kZXIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xuXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblxuICAgICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAgICAgLnN0YXRlKCdhcHAnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnLycsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2hlYWRlcic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL25hdi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICduYXZDdHJsJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnY29udGVudCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndXNlcnMvaG9tZS5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdob21lQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cblxuXG4gICAgICAgIC5zdGF0ZSgnYXBwLmhvbWUnLCB7XG4gICAgICAgICAgICB1cmw6ICdob21lJyxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgJ2NvbnRlbnRAJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3VzZXJzL2hvbWUuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdob21lQ3RybCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2FwcC5ob21lLmRldGFpbHMnLCB7XG4gICAgICAgICAgICB1cmw6ICcvZGV0YWlscy86aWQnLFxuICAgICAgICAgICAgYXV0aGVudGljYXRlOiB0cnVlLFxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAnY29udGVudEAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndXNlcnMvZGV0YWlsc0RhdGEuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdkZXRhaWxzRGF0YUN0cmwnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpXG5cbiAgICB9KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCd0ZXN0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHApIHtcbiAgICAgICAgZnVuY3Rpb24gVGVzdENvbnRyb2xsZXIoKSB7XG4gICAgICAgICAgICB2YXIgJGN0cmwgPSB0aGlzO1xuXG4gICAgICAgICAgICBhbmd1bGFyLmV4dGVuZCgkY3RybCwge1xuICAgICAgICAgICAgICAgIGhlbGxvOiAnSGVsbG8gV29ybGQhJyxcbiAgICAgICAgICAgICAgICB0YWJzOiBbJ0hvbWUnLCAnTGVhcm4nLCAnRGV2ZWxvcCcsICdEaXNjdXNzJ11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYW5ndWxhci5tb2R1bGUoJ3Rlc3RzJywgW10pXG4gICAgICAgICAgICAuY29tcG9uZW50KCdyZWd1bGFyQmluZGluZycsIHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJzxzcGFuPnt7ICRjdHJsLmhlbGxvIH19PC9zcGFuPjx1bD48bGkgbmctcmVwZWF0PVwidGFiIGluICRjdHJsLnRhYnNcIj57e3RhYn19PC9saT48L3VsPicsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogVGVzdENvbnRyb2xsZXJcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY29tcG9uZW50KCdvbmV0aW1lQmluZGluZycsIHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJzxzcGFuPnt7IDo6JGN0cmwuaGVsbG8gfX08L3NwYW4+PHVsPjxsaSBuZy1yZXBlYXQ9XCJ0YWIgaW4gOjokY3RybC50YWJzXCI+e3t0YWJ9fTwvbGk+PC91bD4nLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFRlc3RDb250cm9sbGVyXG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIGZ1bmN0aW9uIEFuZ3VsYXJUZXN0ZXIoYXBwSWQpIHtcbiAgICAgICAgICAgIHZhciAkY3RybCA9IHRoaXMsXG4gICAgICAgICAgICAgICAgYXBwcywgYXBwTm9kZSwgJHJvb3RTY29wZSwgJGluamVjdG9yO1xuXG4gICAgICAgICAgICBhcHBzID0gYW5ndWxhci5lbGVtZW50KCcjQXBwcycpO1xuICAgICAgICAgICAgYXBwTm9kZSA9IGFuZ3VsYXIuZWxlbWVudCgnPGRpdj4nKTtcbiAgICAgICAgICAgIGFwcHMuYXBwZW5kKGFwcE5vZGUpO1xuICAgICAgICAgICAgYW5ndWxhci5ib290c3RyYXAoYXBwTm9kZSwgWyd0ZXN0cyddKTtcblxuICAgICAgICAgICAgJGluamVjdG9yID0gYXBwTm9kZS5pbmplY3RvcigpO1xuICAgICAgICAgICAgJHJvb3RTY29wZSA9ICRpbmplY3Rvci5nZXQoJyRyb290U2NvcGUnKTtcblxuICAgICAgICAgICAgYW5ndWxhci5leHRlbmQoJGN0cmwsIHtcbiAgICAgICAgICAgICAgICBhZGRNb2R1bGU6IGFkZE1vZHVsZSxcbiAgICAgICAgICAgICAgICBkaWdlc3Q6IGRpZ2VzdCxcbiAgICAgICAgICAgICAgICBkZXN0cm95OiBkZXN0cm95XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gYWRkTW9kdWxlKG1vZHVsZU5hbWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbW9kdWxlID0gYW5ndWxhci5lbGVtZW50KCc8JyArIG1vZHVsZU5hbWUgKyAnPicpLFxuICAgICAgICAgICAgICAgICAgICAkY29tcGlsZSA9ICRpbmplY3Rvci5nZXQoJyRjb21waWxlJyk7XG5cbiAgICAgICAgICAgICAgICAkY29tcGlsZShtb2R1bGUpKCRyb290U2NvcGUpO1xuICAgICAgICAgICAgICAgIGFwcE5vZGUuYXBwZW5kKG1vZHVsZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGRpZ2VzdCgpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRkZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgYXBwTm9kZS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgICAgICRjdHJsID0gbnVsbDtcbiAgICAgICAgICAgICAgICBhcHBOb2RlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkaW5qZWN0b3IgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0dXBUZXN0KGFwcElkLCBtb2R1bGUpIHtcbiAgICAgICAgICAgIHZhciByZXQgPSBuZXcgQW5ndWxhclRlc3RlcihhcHBJZCk7XG4gICAgICAgICAgICByZXQuYWRkTW9kdWxlKG1vZHVsZSk7XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGN5Y2xlUmVzdWx0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjeWNsZVJlc3VsdHMnKTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHQnKTtcbiAgICAgICAgdmFyIGJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4nKTtcblxuICAgICAgICAvLyBCRU5DSE1BUksgPT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgYnRuLm9uY2xpY2sgPSBmdW5jdGlvbiBydW5UZXN0cygpIHtcblxuICAgICAgICAgICAgYnRuLnNldEF0dHJpYnV0ZSgnZGlzYWJsZScsIHRydWUpO1xuICAgICAgICAgICAgY3ljbGVSZXN1bHRzLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgcmVzdWx0LnRleHRDb250ZW50ID0gJ1Rlc3RzIHJ1bm5pbmcuLi4nO1xuXG4gICAgICAgICAgICB2YXIgc3VpdGUgPSBuZXcgQmVuY2htYXJrLlN1aXRlO1xuXG4gICAgICAgICAgICB2YXIgdGVzdDEsIHRlc3QyO1xuXG4gICAgICAgICAgICAvLyBhZGQgdGVzdHNcbiAgICAgICAgICAgIHN1aXRlXG4gICAgICAgICAgICAgICAgLmFkZCgncmVndWxhci1iaW5kaW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlc3QxLmRpZ2VzdCgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmFkZCgnb25ldGltZS1iaW5kaW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlc3QyLmRpZ2VzdCgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKCdzdGFydCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB0ZXN0MSA9IHNldHVwVGVzdCgnQXBwMScsICdyZWd1bGFyLWJpbmRpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgdGVzdDIgPSBzZXR1cFRlc3QoJ0FwcDInLCAnb25ldGltZS1iaW5kaW5nJyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvLyBhZGQgbGlzdGVuZXJzXG4gICAgICAgICAgICAgICAgLm9uKCdjeWNsZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQudGV4dENvbnRlbnQgPSBTdHJpbmcoZXZlbnQudGFyZ2V0KTtcblxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3ljbGVSZXN1bHRzJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRDaGlsZChyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKCdjb21wbGV0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQudGV4dENvbnRlbnQgPSAnRmFzdGVzdCBpcyAnICsgdGhpcy5maWx0ZXIoJ2Zhc3Rlc3QnKS5wbHVjaygnbmFtZScpO1xuICAgICAgICAgICAgICAgICAgICBidG4uc2V0QXR0cmlidXRlKCdkaXNhYmxlJywgZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRlc3QxLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICAgICAgdGVzdDIuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgICAgICB0ZXN0MSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRlc3QyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC8vIHJ1biBhc3luY1xuICAgICAgICAgICAgICAgIC5ydW4oeyAnYXN5bmMnOiB0cnVlIH0pO1xuICAgICAgICB9O1xuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuc2VydmljZSgnYXV0aCcsIGZ1bmN0aW9uKCRodHRwLCAkd2luZG93LCAkbG9jYXRpb24sICRyb290U2NvcGUpIHtcblxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXRVc2VyOiBnZXRVc2VyLFxuICAgICAgICAgICAgbG9naW46IGxvZ2luLFxuICAgICAgICAgICAgcmVnaXN0ZXI6IHJlZ2lzdGVyLFxuICAgICAgICAgICAgbG9nb3V0OiBsb2dvdXQsXG4gICAgICAgICAgICBzdG9yZVRva2VuOiBzdG9yZVRva2VuLFxuICAgICAgICAgICAgaXNMb2dnZWQ6IGlzTG9nZ2VkLFxuICAgICAgICAgICAgcG9zdExvZ2luT3BzOiBwb3N0TG9naW5PcHMsXG4gICAgICAgICAgICBwb3N0TG9naW5Sb3V0ZUhhbmRsZXI6IHBvc3RMb2dpblJvdXRlSGFuZGxlclxuXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRVc2VyKCkge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnYXBpL3VzZXJzJylcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGxvZ2luKHVzZXJuYW1lLCBwYXNzd29yZCkge1xuXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnYXBpL3Nlc3Npb25zJywge1xuICAgICAgICAgICAgICAgIHVzZXJuYW1lOiB1c2VybmFtZSxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByZWdpc3RlcihuYW1lLCB1c2VybmFtZSwgcGFzc3dvcmQpIHtcblxuICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCdhcGkvdXNlcnMnLCB7XG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cblxuICAgICAgICBmdW5jdGlvbiBsb2dvdXQoKSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndXNlcl90b2tlbicpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2xvZ2dlZF91c2VyJyk7XG4gICAgICAgICAgICBkZWxldGUgJGh0dHAuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ3gtYXV0aCddXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmlzTG9nZ2VkID0gZmFsc2U7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmN1cnJlbnRVc2VyID0gbnVsbDtcbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL2xvZ2luXCIpXG5cblxuXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzdG9yZVRva2VuKHJlcywgY2IpIHtcbiAgICAgICAgICAgICR3aW5kb3cuc2Vzc2lvblN0b3JhZ2VbXCJ1c2VyX3Rva2VuXCJdID0gcmVzXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcl90b2tlbicsIHJlcyk7XG4gICAgICAgICAgICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsneC1hdXRoJ10gPSAkd2luZG93LnNlc3Npb25TdG9yYWdlLnVzZXJfdG9rZW5cbiAgICAgICAgICAgIGlmIChjYiAmJiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKSkge1xuICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBpc0xvZ2dlZCgpIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcG9zdExvZ2luT3BzKHJlcywgY2IpIHtcblxuICAgICAgICAgICAgXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmN1cnJlbnRVc2VyID0gcmVzLm5hbWVcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsb2dnZWRfdXNlcicsICRyb290U2NvcGUuY3VycmVudFVzZXIpXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmlzTG9nZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChjYiAmJiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKSkge1xuICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHBvc3RMb2dpblJvdXRlSGFuZGxlcigpIHtcbiAgICAgICAgICAgIGlmICgkcm9vdFNjb3BlLmludGVuZGVkUm91dGUpIHtcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgkcm9vdFNjb3BlLmludGVuZGVkUm91dGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2hvbWUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcblxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgLmNvbXBvbmVudChcImhlbGxvV29ybGRcIix7XG4gICAgICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudHMvaGVsbG9Xb3JsZC5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdoZWxsb1dvcmxkQ3RybCdcbiAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ2hlbGxvV29ybGRDdHJsJywgZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImNvbnRvbGxlciBsb2FkZWQgZm9yIGNvbXBvbmVudFwiKVxuICAgIH0pXG4iXX0=
