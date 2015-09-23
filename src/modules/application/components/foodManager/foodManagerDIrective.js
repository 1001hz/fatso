(function () {

    'use strict';

    angular
        .module('app.application')
        .directive('foodManager', foodManager);

    foodManager.$inject = [];

    function foodManager() {
        return {
            restrict: 'E',
            link: itemAddLink,
            controller: 'foodManagerController',
            controllerAs: 'foodManagerCtrl',
            bindToController:true
        }

        function itemAddLink(scope, elem, attr, foodManagerCtrl){


        }

    }
})();