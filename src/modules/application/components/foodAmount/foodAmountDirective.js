(function () {

    'use strict';

    angular
        .module("app.application")
        .directive("foodAmount", foodAmount);

    foodAmount.$inject = [];

    function foodAmount(){
        return{
            restrict: 'E',
            link: linkFn,
            templateUrl: 'modules/application/components/foodAmount/foodAmountView.html',
            require: '^foodManager'
        }

        function linkFn(scope, elem, attrs, foodManagerCtrl){

            scope.getNutritionalInfo = function(){
                foodManagerCtrl.getNutritionalDataForWeight(scope.weight, scope.unit);
            }

        }
    }

})();