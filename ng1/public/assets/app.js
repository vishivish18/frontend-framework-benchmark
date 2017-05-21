angular.module('app',[
'ngRoute','ui.router'
])
angular.module('app')
  .component("helloWorld",{
      templateUrl: 'components/helloWorld.html',
      controller: 'helloWorldCtrl'
  });
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
    .controller('helloWorldCtrl', ["$scope", function($scope) {
      console.log("contoller loaded for component")
    }])

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImNvbXBvbmVudHMvaGVsbG9Xb3JsZC5qcyIsImNvbnRyb2xsZXJzL2RldGFpbHNEYXRhQ3RybC5qcyIsImNvbnRyb2xsZXJzL2hvbWVDdHJsLmpzIiwiY29udHJvbGxlcnMvbWFzdGVyQ3RybC5qcyIsImNvbnRyb2xsZXJzL25hdkN0cmwuanMiLCJjb250cm9sbGVycy9vbkZpbmlzaFJlbmRlci5qcyIsImNvbnRyb2xsZXJzL3JvdXRlcy5qcyIsImNvbnRyb2xsZXJzL3Rlc3RDdHJsLmpzIiwic2VydmljZXMvYXV0aC5qcyIsImNvbnRyb2xsZXJzL2NvbXBvbmVudHMvaGVsbG9Xb3JsZEN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBQSxPQUFBLE1BQUE7QUFDQSxVQUFBOztBQ0RBLFFBQUEsT0FBQTtHQUNBLFVBQUEsYUFBQTtNQUNBLGFBQUE7TUFDQSxZQUFBOztBQ0hBLFFBQUEsT0FBQTtLQUNBLFdBQUEsdURBQUEsU0FBQSxRQUFBLE9BQUEsY0FBQTtRQUNBLE1BQUEsSUFBQSxlQUFBLGFBQUEsSUFBQSxLQUFBLFNBQUEsVUFBQTtZQUNBLFFBQUEsSUFBQTtZQUNBLE9BQUEsV0FBQSxTQUFBLEtBQUE7OztZQUdBLFNBQUEsb0JBQUE7Z0JBQ0EsSUFBQSxXQUFBO2dCQUNBLElBQUEsZUFBQTs7Z0JBRUEsU0FBQSxhQUFBO29CQUNBLE9BQUEsU0FBQSxLQUFBLE1BQUEsS0FBQSxXQUFBLFNBQUE7OztnQkFHQSxJQUFBLGVBQUEsTUFBQSxNQUFBLE1BQUEsTUFBQSxlQUFBLElBQUEsWUFBQSxLQUFBO2dCQUNBLE9BQUE7O1lBRUEsT0FBQSxTQUFBLGlCQUFBOztRQUVBLE9BQUEsWUFBQTtRQUNBLE9BQUEsWUFBQTtRQUNBLE9BQUEsZUFBQSxTQUFBLEtBQUE7U0FDQSxNQUFBLFNBQUEsS0FBQTtZQUNBLFFBQUEsSUFBQSxrQkFBQSxPQUFBO1lBQ0EsT0FBQSxJQUFBLE1BQUE7O1FBRUEsT0FBQSxlQUFBLFNB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QSxXQUFBO21CQUNBO2dCQUNBLFVBQUEsS0FBQTs7Ozs7OztBQy9FQSxRQUFBLE9BQUE7S0FDQSxXQUFBLDZCQUFBLFNBQUEsUUFBQTtNQUNBLFFBQUEsSUFBQTs7QUFFQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJyxbXG4nbmdSb3V0ZScsJ3VpLnJvdXRlcidcbl0pIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gIC5jb21wb25lbnQoXCJoZWxsb1dvcmxkXCIse1xuICAgICAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnRzL2hlbGxvV29ybGQuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnaGVsbG9Xb3JsZEN0cmwnXG4gIH0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCdkZXRhaWxzRGF0YUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCAkc3RhdGVQYXJhbXMpIHtcbiAgICAgICAgJGh0dHAuZ2V0KCdkYXRhL3Nob3cvJyArICRzdGF0ZVBhcmFtcy5pZCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICAkc2NvcGUuY3VzdG9tZXIgPSByZXNwb25zZS5kYXRhWzBdO1xuXG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdlbmVyYXRlUmFuZG1Db2RlKCkge1xuICAgICAgICAgICAgICAgIHZhciBwb3NzaWJsZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWjAxMjM0NTY3ODknO1xuICAgICAgICAgICAgICAgIHZhciBzdHJpbmdMZW5ndGggPSA1O1xuXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gcGlja1JhbmRvbSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBvc3NpYmxlW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlLmxlbmd0aCldO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciByYW5kb21TdHJpbmcgPSBBcnJheS5hcHBseShudWxsLCBBcnJheShzdHJpbmdMZW5ndGgpKS5tYXAocGlja1JhbmRvbSkuam9pbignJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJhbmRvbVN0cmluZ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJHNjb3BlLmN1c3RvbWVyLmVybnJvbGxtZW50X2lkID0gZ2VuZXJhdGVSYW5kbUNvZGUoKVxuICAgICAgICB9KVxuICAgICAgICAkc2NvcGUubnVtYmVyT25lID0gNTAwXG4gICAgICAgICRzY29wZS5udW1iZXJUd28gPSA1MDBcbiAgICAgICAgJHNjb3BlLmdldE51bWJlck9uZSA9IGZ1bmN0aW9uKG51bSkge1xuICAgICAgICBcdG51bSA9IHBhcnNlSW50KG51bSwgMTApXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJ1bm5pbmcgZ2V0bnVtXCIsIHR5cGVvZihudW0pKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheShudW0pO1xuICAgICAgICB9XG4gICAgICAgICRzY29wZS5nZXROdW1iZXJUd28gPSBmdW5jdGlvbihudW0pIHtcbiAgICAgICAgXHRudW0gPSBwYXJzZUludChudW0sIDEwKVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJydW5uaW5nIGdldG51bVwiLCB0eXBlb2YobnVtKSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXkobnVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS4kd2F0Y2goJ251bWJlck9uZScsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoYW5nZWQnKTsgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25vdCBjaGFuZ2VkJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignaG9tZUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCAkcm9vdFNjb3BlLCAkdGltZW91dCkge1xuICAgICAgICAkaHR0cC5nZXQoJ2RhdGEvbGlzdCcpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIC8vICRzY29wZS5kYXRhID0gcmVzcG9uc2UuZGF0YS5yZXN1bHRzXG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0ID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3RhcnQpXG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGE9IHJlc3BvbnNlLmRhdGEvLy5yZXN1bHRzWzBdXG4gICAgICAgICAgICAgICAgLy8gJHNjb3BlLmRhdGEgPSBbXVxuICAgICAgICAgICAgICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgMTAwMDA7IGkrKykge1xuICAgICAgICAgICAgICAgIC8vICAgICAkc2NvcGUuZGF0YS5wdXNoKHJlc3VsdClcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgLy8gJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIC8vIExvZ3Mgd2hlbiBBbmd1bGFyIGlzIGRvbmUgcHJvY2Vzc2luZyByZXBlYXRlclxuICAgICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZygnUHJvY2VzcyB0aW1lOiAnICsgKG5ldyBEYXRlKCkgLSBzdGFydCkpO1xuICAgICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS50aW1pbmcuZG9tQ29tcGxldGUpXG4gICAgICAgICAgICAgICAgLy8gICAgIHZhciBsb2FkVGltZSA9IHdpbmRvdy5wZXJmb3JtYW5jZS50aW1pbmcuZG9tQ29udGVudExvYWRlZEV2ZW50RW5kIC0gd2luZG93LnBlcmZvcm1hbmNlLnRpbWluZy5uYXZpZ2F0aW9uU3RhcnQ7XG4gICAgICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCdQYWdlIGxvYWQgdGltZSBpcyAnICsgbG9hZFRpbWUpO1xuICAgICAgICAgICAgICAgIC8vIH0pOyAvLyBMZWF2ZSB0aW1lb3V0IGVtcHR5IHRvIGZpcmUgb24gbmV4dCB0aWNrXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRvbignbmdSZXBlYXRGaW5pc2hlZCcsIGZ1bmN0aW9uKG5nUmVwZWF0RmluaXNoZWRFdmVudCkge1xuICAgICAgICAgICAgICAgICAgICAvL3lvdSBhbHNvIGdldCB0aGUgYWN0dWFsIGV2ZW50IG9iamVjdFxuICAgICAgICAgICAgICAgICAgICB2YXIgZW5kID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZW5kZXJUaW1lID0gZW5kIC0gc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlbmRlclRpbWUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbG9hZFRpbWUgPSB3aW5kb3cucGVyZm9ybWFuY2UudGltaW5nLmRvbUNvbnRlbnRMb2FkZWRFdmVudEVuZCAtIHdpbmRvdy5wZXJmb3JtYW5jZS50aW1pbmcubmF2aWdhdGlvblN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICAvL2RvIHN0dWZmLCBleGVjdXRlIGZ1bmN0aW9ucyAtLSB3aGF0ZXZlci4uLlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhsb2FkVGltZSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pXG5cbiAgICB9KVxuXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignbWFzdGVyQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHJvb3RTY29wZSwgJHJvdXRlLCAkaHR0cCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIm1hc3RlckN0cmxcIik7XG5cbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsb2dnZWRfdXNlcicpKSB7ICAgICAgICBcdFxuICAgICAgICAgICAgJHJvb3RTY29wZS5jdXJyZW50VXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsb2dnZWRfdXNlcicpXG4gICAgICAgICAgICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsneC1hdXRoJ10gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcl90b2tlbicpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcl90b2tlbicpKVxuICAgICAgICB9XG4gICAgICAgICRzY29wZS4kb24oJ2xvZ2luJywgZnVuY3Rpb24oXywgdXNlcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2dnZWQgSW5cIik7XG4gICAgICAgICAgICAkc2NvcGUuY3VycmVudFVzZXIgPSB1c2VyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmN1cnJlbnRVc2VyID0gdXNlclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xvZ2dlZF91c2VyJywgJHJvb3RTY29wZS5jdXJyZW50VXNlci51c2VybmFtZSlcbiAgICAgICAgfSlcbiAgICB9KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ25hdkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIGF1dGgsICRsb2NhdGlvbikgeyAgICAgICAgXG4gICAgICAgICRzY29wZS5sb2dvdXQgPSBmdW5jdGlvbigpIHsgICAgICAgICAgICBcbiAgICAgICAgICAgIGF1dGgubG9nb3V0KCkgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgfVxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuZGlyZWN0aXZlKCdvbkZpbmlzaFJlbmRlcicsIGZ1bmN0aW9uICgkdGltZW91dCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cikge1xuICAgICAgICAgICAgaWYgKHNjb3BlLiRsYXN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS4kZW1pdChhdHRyLm9uRmluaXNoUmVuZGVyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcblxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG5cbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgICAgIC5zdGF0ZSgnYXBwJywge1xuICAgICAgICAgICAgICAgIHVybDogJy8nLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgICdoZWFkZXInOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9uYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbmF2Q3RybCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ2NvbnRlbnQnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3VzZXJzL2hvbWUuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnaG9tZUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG5cblxuICAgICAgICAuc3RhdGUoJ2FwcC5ob21lJywge1xuICAgICAgICAgICAgdXJsOiAnaG9tZScsXG4gICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICdjb250ZW50QCc6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd1c2Vycy9ob21lLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnaG9tZUN0cmwnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgLnN0YXRlKCdhcHAuaG9tZS5kZXRhaWxzJywge1xuICAgICAgICAgICAgdXJsOiAnL2RldGFpbHMvOmlkJyxcbiAgICAgICAgICAgIGF1dGhlbnRpY2F0ZTogdHJ1ZSxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgJ2NvbnRlbnRAJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3VzZXJzL2RldGFpbHNEYXRhLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZGV0YWlsc0RhdGFDdHJsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG4gICAgICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKVxuXG4gICAgfSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcigndGVzdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwKSB7XG4gICAgICAgIGZ1bmN0aW9uIFRlc3RDb250cm9sbGVyKCkge1xuICAgICAgICAgICAgdmFyICRjdHJsID0gdGhpcztcblxuICAgICAgICAgICAgYW5ndWxhci5leHRlbmQoJGN0cmwsIHtcbiAgICAgICAgICAgICAgICBoZWxsbzogJ0hlbGxvIFdvcmxkIScsXG4gICAgICAgICAgICAgICAgdGFiczogWydIb21lJywgJ0xlYXJuJywgJ0RldmVsb3AnLCAnRGlzY3VzcyddXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFuZ3VsYXIubW9kdWxlKCd0ZXN0cycsIFtdKVxuICAgICAgICAgICAgLmNvbXBvbmVudCgncmVndWxhckJpbmRpbmcnLCB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ICc8c3Bhbj57eyAkY3RybC5oZWxsbyB9fTwvc3Bhbj48dWw+PGxpIG5nLXJlcGVhdD1cInRhYiBpbiAkY3RybC50YWJzXCI+e3t0YWJ9fTwvbGk+PC91bD4nLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFRlc3RDb250cm9sbGVyXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNvbXBvbmVudCgnb25ldGltZUJpbmRpbmcnLCB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6ICc8c3Bhbj57eyA6OiRjdHJsLmhlbGxvIH19PC9zcGFuPjx1bD48bGkgbmctcmVwZWF0PVwidGFiIGluIDo6JGN0cmwudGFic1wiPnt7dGFifX08L2xpPjwvdWw+JyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBUZXN0Q29udHJvbGxlclxuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICBmdW5jdGlvbiBBbmd1bGFyVGVzdGVyKGFwcElkKSB7XG4gICAgICAgICAgICB2YXIgJGN0cmwgPSB0aGlzLFxuICAgICAgICAgICAgICAgIGFwcHMsIGFwcE5vZGUsICRyb290U2NvcGUsICRpbmplY3RvcjtcblxuICAgICAgICAgICAgYXBwcyA9IGFuZ3VsYXIuZWxlbWVudCgnI0FwcHMnKTtcbiAgICAgICAgICAgIGFwcE5vZGUgPSBhbmd1bGFyLmVsZW1lbnQoJzxkaXY+Jyk7XG4gICAgICAgICAgICBhcHBzLmFwcGVuZChhcHBOb2RlKTtcbiAgICAgICAgICAgIGFuZ3VsYXIuYm9vdHN0cmFwKGFwcE5vZGUsIFsndGVzdHMnXSk7XG5cbiAgICAgICAgICAgICRpbmplY3RvciA9IGFwcE5vZGUuaW5qZWN0b3IoKTtcbiAgICAgICAgICAgICRyb290U2NvcGUgPSAkaW5qZWN0b3IuZ2V0KCckcm9vdFNjb3BlJyk7XG5cbiAgICAgICAgICAgIGFuZ3VsYXIuZXh0ZW5kKCRjdHJsLCB7XG4gICAgICAgICAgICAgICAgYWRkTW9kdWxlOiBhZGRNb2R1bGUsXG4gICAgICAgICAgICAgICAgZGlnZXN0OiBkaWdlc3QsXG4gICAgICAgICAgICAgICAgZGVzdHJveTogZGVzdHJveVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGFkZE1vZHVsZShtb2R1bGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1vZHVsZSA9IGFuZ3VsYXIuZWxlbWVudCgnPCcgKyBtb2R1bGVOYW1lICsgJz4nKSxcbiAgICAgICAgICAgICAgICAgICAgJGNvbXBpbGUgPSAkaW5qZWN0b3IuZ2V0KCckY29tcGlsZScpO1xuXG4gICAgICAgICAgICAgICAgJGNvbXBpbGUobW9kdWxlKSgkcm9vdFNjb3BlKTtcbiAgICAgICAgICAgICAgICBhcHBOb2RlLmFwcGVuZChtb2R1bGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBkaWdlc3QoKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIGFwcE5vZGUucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgICAgICAkY3RybCA9IG51bGw7XG4gICAgICAgICAgICAgICAgYXBwTm9kZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgJGluamVjdG9yID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNldHVwVGVzdChhcHBJZCwgbW9kdWxlKSB7XG4gICAgICAgICAgICB2YXIgcmV0ID0gbmV3IEFuZ3VsYXJUZXN0ZXIoYXBwSWQpO1xuICAgICAgICAgICAgcmV0LmFkZE1vZHVsZShtb2R1bGUpO1xuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjeWNsZVJlc3VsdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3ljbGVSZXN1bHRzJyk7XG4gICAgICAgIHZhciByZXN1bHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0Jyk7XG4gICAgICAgIHZhciBidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuJyk7XG5cbiAgICAgICAgLy8gQkVOQ0hNQVJLID09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIGJ0bi5vbmNsaWNrID0gZnVuY3Rpb24gcnVuVGVzdHMoKSB7XG5cbiAgICAgICAgICAgIGJ0bi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGUnLCB0cnVlKTtcbiAgICAgICAgICAgIGN5Y2xlUmVzdWx0cy5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIHJlc3VsdC50ZXh0Q29udGVudCA9ICdUZXN0cyBydW5uaW5nLi4uJztcblxuICAgICAgICAgICAgdmFyIHN1aXRlID0gbmV3IEJlbmNobWFyay5TdWl0ZTtcblxuICAgICAgICAgICAgdmFyIHRlc3QxLCB0ZXN0MjtcblxuICAgICAgICAgICAgLy8gYWRkIHRlc3RzXG4gICAgICAgICAgICBzdWl0ZVxuICAgICAgICAgICAgICAgIC5hZGQoJ3JlZ3VsYXItYmluZGluZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB0ZXN0MS5kaWdlc3QoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5hZGQoJ29uZXRpbWUtYmluZGluZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB0ZXN0Mi5kaWdlc3QoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5vbignc3RhcnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdGVzdDEgPSBzZXR1cFRlc3QoJ0FwcDEnLCAncmVndWxhci1iaW5kaW5nJyk7XG4gICAgICAgICAgICAgICAgICAgIHRlc3QyID0gc2V0dXBUZXN0KCdBcHAyJywgJ29uZXRpbWUtYmluZGluZycpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLy8gYWRkIGxpc3RlbmVyc1xuICAgICAgICAgICAgICAgIC5vbignY3ljbGUnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnRleHRDb250ZW50ID0gU3RyaW5nKGV2ZW50LnRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N5Y2xlUmVzdWx0cycpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kQ2hpbGQocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5vbignY29tcGxldGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnRleHRDb250ZW50ID0gJ0Zhc3Rlc3QgaXMgJyArIHRoaXMuZmlsdGVyKCdmYXN0ZXN0JykucGx1Y2soJ25hbWUnKTtcbiAgICAgICAgICAgICAgICAgICAgYnRuLnNldEF0dHJpYnV0ZSgnZGlzYWJsZScsIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgICAgICB0ZXN0MS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgICAgIHRlc3QyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICAgICAgdGVzdDEgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0ZXN0MiA9IG51bGw7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvLyBydW4gYXN5bmNcbiAgICAgICAgICAgICAgICAucnVuKHsgJ2FzeW5jJzogdHJ1ZSB9KTtcbiAgICAgICAgfTtcbiAgICB9KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLnNlcnZpY2UoJ2F1dGgnLCBmdW5jdGlvbigkaHR0cCwgJHdpbmRvdywgJGxvY2F0aW9uLCAkcm9vdFNjb3BlKSB7XG5cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0VXNlcjogZ2V0VXNlcixcbiAgICAgICAgICAgIGxvZ2luOiBsb2dpbixcbiAgICAgICAgICAgIHJlZ2lzdGVyOiByZWdpc3RlcixcbiAgICAgICAgICAgIGxvZ291dDogbG9nb3V0LFxuICAgICAgICAgICAgc3RvcmVUb2tlbjogc3RvcmVUb2tlbixcbiAgICAgICAgICAgIGlzTG9nZ2VkOiBpc0xvZ2dlZCxcbiAgICAgICAgICAgIHBvc3RMb2dpbk9wczogcG9zdExvZ2luT3BzLFxuICAgICAgICAgICAgcG9zdExvZ2luUm91dGVIYW5kbGVyOiBwb3N0TG9naW5Sb3V0ZUhhbmRsZXJcblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0VXNlcigpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2FwaS91c2VycycpXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBsb2dpbih1c2VybmFtZSwgcGFzc3dvcmQpIHtcblxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJ2FwaS9zZXNzaW9ucycsIHtcbiAgICAgICAgICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcmVnaXN0ZXIobmFtZSwgdXNlcm5hbWUsIHBhc3N3b3JkKSB7XG5cbiAgICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnYXBpL3VzZXJzJywge1xuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZnVuY3Rpb24gbG9nb3V0KCkge1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXJfdG9rZW4nKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdsb2dnZWRfdXNlcicpO1xuICAgICAgICAgICAgZGVsZXRlICRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWyd4LWF1dGgnXVxuICAgICAgICAgICAgJHJvb3RTY29wZS5pc0xvZ2dlZCA9IGZhbHNlO1xuICAgICAgICAgICAgJHJvb3RTY29wZS5jdXJyZW50VXNlciA9IG51bGw7XG4gICAgICAgICAgICAkbG9jYXRpb24ucGF0aChcIi9sb2dpblwiKVxuXG5cblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc3RvcmVUb2tlbihyZXMsIGNiKSB7XG4gICAgICAgICAgICAkd2luZG93LnNlc3Npb25TdG9yYWdlW1widXNlcl90b2tlblwiXSA9IHJlc1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXJfdG9rZW4nLCByZXMpO1xuICAgICAgICAgICAgJGh0dHAuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ3gtYXV0aCddID0gJHdpbmRvdy5zZXNzaW9uU3RvcmFnZS51c2VyX3Rva2VuXG4gICAgICAgICAgICBpZiAoY2IgJiYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJykpIHtcbiAgICAgICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaXNMb2dnZWQoKSB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHBvc3RMb2dpbk9wcyhyZXMsIGNiKSB7XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJHJvb3RTY29wZS5jdXJyZW50VXNlciA9IHJlcy5uYW1lXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbG9nZ2VkX3VzZXInLCAkcm9vdFNjb3BlLmN1cnJlbnRVc2VyKVxuICAgICAgICAgICAgJHJvb3RTY29wZS5pc0xvZ2dlZCA9IHRydWU7XG4gICAgICAgICAgICBpZiAoY2IgJiYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJykpIHtcbiAgICAgICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBwb3N0TG9naW5Sb3V0ZUhhbmRsZXIoKSB7XG4gICAgICAgICAgICBpZiAoJHJvb3RTY29wZS5pbnRlbmRlZFJvdXRlKSB7XG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJHJvb3RTY29wZS5pbnRlbmRlZFJvdXRlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9ob21lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICB9KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ2hlbGxvV29ybGRDdHJsJywgZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImNvbnRvbGxlciBsb2FkZWQgZm9yIGNvbXBvbmVudFwiKVxuICAgIH0pXG4iXX0=
