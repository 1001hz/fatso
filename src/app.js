(function () {

    'use strict';

    angular.module('app', ['app.aws', 'app.google']);

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

})();