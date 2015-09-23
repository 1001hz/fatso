(function () {

    'use strict';

    angular
        .module("app.application")
        .controller("IndexCtrl", IndexCtrl);

    IndexCtrl.$inject = ["AuthSrv"];

    function IndexCtrl(AuthSrv){
        var vm = this;

        vm.selectedItem = "test";

        vm.save = function(){

            AuthSrv.getUser()
                .then(function(user){
                    user.addDailyRecordItem(vm.input);
                    return user;
                })
                .then(function(user){
                    return AuthSrv.setUser(user);
                })
                .then(function(data){
                    console.log(data);
                });

        }
    }

})();