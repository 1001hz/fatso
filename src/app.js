(function () {

    'use strict';

    angular.module('app', ['ngRoute', 'app.aws', 'app.google', 'app.application']);

    angular
        .module("app")
        .config(['AwsSrvProvider', function (AWSSrvProvider) {
            AWSSrvProvider.setRegion('us-east-1');
            AWSSrvProvider.setRoleArn('arn:aws:iam::063990526105:role/googleAuthFatso');
            AWSSrvProvider.setDynamoEndpoint('dynamodb.us-east-1.amazonaws.com');
        }]);

    angular
        .module("app")
        .config(['GoogleSrvProvider', function (GoogleSrvProvider) {
            GoogleSrvProvider.setClientId("533519621566-g873o4k46kkcmsmoci6n9a72obsuqm15");
        }]);

    angular
        .module("app")
        .config(['$routeProvider',
            function ($routeProvider) {
                $routeProvider.
                    when('/login', {
                        templateUrl: 'modules/application/routes/login/login.html',
                        controller: 'LoginCtrl',
                        controllerAs: 'login',
                        data: {
                            accessLevel: 'public'
                        }
                    }).
                    when('/application', {
                        templateUrl: 'modules/application/routes/index/index.html',
                        controller: 'IndexCtrl',
                        controllerAs: 'index',
                        data: {
                            accessLevel: 'private'
                        }
                    }).
                    otherwise({
                        redirectTo: '/login'
                    });
            }
        ]);

    angular
        .module("app")
        .run(function ($rootScope, $location, AUTH_EVENTS, SessionSrv) {
            // redirect on login
            $rootScope.$on(AUTH_EVENTS.logInSuccess, function (event, data) {
                SessionSrv.setUser(data.user);
                $location.path('/application');
            });

            // redirect on log out
            $rootScope.$on(AUTH_EVENTS.logOutSuccess, function (event, data) {
                SessionSrv.setUser(data.user);
                $location.path('/login');
            });

            // protect logged in routes
            $rootScope.$on('$routeChangeStart', function (event, next, current) {
                // if route requires auth and user is not logged in
                var accessLevel = next.data.accessLevel;
                if (accessLevel=='private' && !SessionSrv.isLoggedIn()) {
                    // redirect back to login
                    event.preventDefault();
                    $location.path('/login');
                }
            });

        });

})();