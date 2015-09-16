(function () {

    'use strict';

    angular
        .module('app.aws')
        .provider("AwsSrv", AwsSrv);

    function AwsSrv() {
        var self = this;
        self.client = null;
        self.RoleArn = null;
        self.Region = null;
        self.DynamoEndpoint = null;

        var dynamoDB = null;
        var credentialsDefer = null,
            credentialsPromise = null;

        self.$get = function ($q) {
            credentialsDefer = $q.defer();
            credentialsPromise = credentialsDefer.promise;
            return {
                credentials: function(){
                    return credentialsPromise;
                },
                setToken: function (id_token) {
                    AWS.config.region = self.Region;
                    var awsConfig = {
                        RoleArn: self.RoleArn,
                        WebIdentityToken: id_token
                    };

                    AWS.config.credentials = new AWS.WebIdentityCredentials(awsConfig);

                    dynamoDB = new AWS.DynamoDB({
                        region: self.Region,
                        endpoint: self.DynamoEndpoint
                    });

                    credentialsDefer.resolve(AWS.config.credentials);
                },
                dbGet: function (params) {
                    var dbGetDefer = $q.defer();
                    var dbGetPromise = dbGetDefer.promise;
                    credentialsPromise.then(function () {
                        dynamoDB.getItem(params, function (dbError, data) {
                            if (!dbError) {
                                dbGetDefer.resolve(data);
                            }else{
                                dbGetDefer.reject(dbError);
                            };
                        });
                    }, function (requestError) {
                        dbGetDefer.reject(requestError);
                    });
                    return dbGetPromise;
                },
                dbPut: function (params) {
                    var dbPutDefer = $q.defer();
                    var dbPutPromise = dbPutDefer.promise;
                    credentialsPromise.then(function () {
                        dynamoDB.putItem(params, function (dbError, data) {
                            if (!dbError) {
                                dbPutDefer.resolve(data);
                            }else{
                                dbPutDefer.reject(dbError);
                            };
                        });
                    }, function (requestError) {
                        dbPutDefer.reject(requestError);
                    });
                    return dbPutPromise;
                },
                dbQuery: function (params) {
                    var dbQueryDefer = $q.defer();
                    var dbQueryPromise = dbQueryDefer.promise;
                    credentialsPromise.then(function () {
                        dynamoDB.query(params, function (dbError, data) {
                            if (!dbError) {
                                dbQueryDefer.resolve(data);
                            }else{
                                dbQueryDefer.reject(dbError);
                            };
                        });
                    }, function (requestError) {
                        dbQueryDefer.reject(requestError);
                    });
                    return dbQueryPromise;
                },
                dbDelete: function (params) {
                    var dbDeleteDefer = $q.defer();
                    var dbDeletePromise = dbDeleteDefer.promise;
                    credentialsPromise.then(function () {
                        dynamoDB.deleteItem(params, function (dbError, data) {
                            if (!dbError) {
                                dbDeleteDefer.resolve(data);
                            } else {
                                dbDeleteDefer.reject(dbError);
                            };
                        });
                    }, function (requestError) {
                        dbDeleteDefer.reject(requestError);
                    });
                    return dbDeletePromise;
                }
            };
        }


        self.setRegion = function (Region) {
            if (Region) {
                self.Region = Region;
            }
        }

        self.setRoleArn = function (RoleArn) {
            if (RoleArn) {
                self.RoleArn = RoleArn;
            }
        }

        self.setDynamoEndpoint = function (DynamoEndpoint) {
            if (DynamoEndpoint) {
                self.DynamoEndpoint = DynamoEndpoint;
            }
        }

    }
})();