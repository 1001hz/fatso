(function () {

    'use strict';

    angular
        .module("app.application")
        .directive("foodSearch", foodSearch);

    foodSearch.$inject = ["$compile"];

    function foodSearch($compile){
        return{
            restrict: 'E',
            link: linkFn,
            templateUrl: 'modules/application/components/foodSearch/foodSearchView.html',
            require: '^foodManager'
        }

        function linkFn(scope, elem, attrs, foodManagerCtrl){

            // fire search from controller
            scope.search = function(){
                foodManagerCtrl.search(scope.query);
            }

            scope.searchAgain = function(){
                foodManagerCtrl.clearSelectedResult();
            }

        }
    }

})();