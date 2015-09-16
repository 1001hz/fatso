(function () {

    'use strict';

    angular
        .module("app.application")
        .directive("navbar", navbar);

    navbar.$inject = ["SessionSrv"];

    function navbar(SessionSrv){
        return{
            templateUrl: 'modules/application/components/navbar/navbarView.html',
            replace: true,
            restrict: 'E',
            link: linkFn
        }

        function linkFn(scope, elem, attrs){
            SessionSrv.getUser()
                .then(function(user){
                    scope.username = user.name;
                });

        }
    }

})();