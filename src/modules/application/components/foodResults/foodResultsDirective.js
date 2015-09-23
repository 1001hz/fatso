(function () {

    'use strict';

    angular
        .module("app.application")
        .directive("foodResults", foodResults);

    foodResults.$inject = [];

    function foodResults(){
        return{
            restrict: 'E',
            replace: true,
            link: linkFn,
            template: '<div><ul><li data-ng-repeat="result in foodManagerCtrl.searchResults" data-ng-click="selectResult(result)">{{result.name}}</li></ul><div></div></div>',
            require: '^foodManager'
        }

        function linkFn(scope, elem, attrs, foodManagerCtrl){

            // let controller know that a result item has been selected
            scope.selectResult = function(result){
                foodManagerCtrl.getNutritionalData(result);
            }

        }
    }

})();