(function () {

    'use strict';

    angular
        .module("app.application")
        .directive("foodNutritionalInfo", foodNutritionalInfo);

    foodNutritionalInfo.$inject = [];

    function foodNutritionalInfo(){
        return{
            restrict: 'E',
            replace: true,
            link: linkFn,
            templateUrl: 'modules/application/components/foodNutritionalInfo/foodNutritionalInfoView.html',
            require: '^foodManager'
        }

        function linkFn(scope, elem, attrs, foodManagerCtrl){

        }
    }

})();