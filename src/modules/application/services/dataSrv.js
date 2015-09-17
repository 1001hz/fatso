(function () {

    'use strict';

    angular
        .module("app")
        .factory("DataSrv", DataSrv);

    DataSrv.$inject = ["$q", "AwsSrv"];

    function DataSrv($q, AwsSrv) {

        var awsSyncDefer = $q.defer();
        var awsSyncPromise = awsSyncDefer.promise;

        var service = {
            dbSync: dbSync,
        }

        return service;

        function dbSync(user) {

            var params = {
                TableName: 'Fatso_Users',
                Item: {
                    'Email': { S: user.details.email },
                    data: { S: JSON.stringify(user) }
                }
            };
            AwsSrv.dbPut(params)
                .then(function (data) {
                    awsSyncDefer.resolve();
                })
                .catch(function(error){
                    awsSyncDefer.reject(error);
                });

            return awsSyncPromise;
        }

    }

})();