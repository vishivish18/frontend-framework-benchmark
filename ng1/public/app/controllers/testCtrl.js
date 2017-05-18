angular.module('app')
    .controller('testCtrl', function($scope, $http) {
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
    })
