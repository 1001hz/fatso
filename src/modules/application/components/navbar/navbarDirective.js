(function () {

    'use strict';

    angular
        .module("app.application")
        .directive("navbar", navbar);

    navbar.$inject = ["AuthSrv"];

    function navbar(AuthSrv){
        return{
            templateUrl: 'modules/application/components/navbar/navbarView.html',
            replace: true,
            restrict: 'E',
            link: linkFn
        }

        function linkFn(scope, elem, attrs){
            AuthSrv.getUser()
                .then(function(user){
                    scope.username = user.details.name;
                })
                .catch(function(){
                    scope.username = "User account";
                });

        }
    }

})();