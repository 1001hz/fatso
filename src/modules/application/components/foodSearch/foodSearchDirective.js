(function () {

    'use strict';

    angular
        .module('app.application')
        .directive('foodSearch', foodSearch);

    foodSearch.$inject = ["SearchSrv", "FoodProfile"];

    function foodSearch(SearchSrv, FoodProfile) {
        return {
            restrict: 'E',
            link: foodSearchLink,
            templateUrl: 'modules/application/components/foodSearch/foodSearchView.html',
            scope: {
                foodProfile: '='
            }
        }

        function foodSearchLink(scope, elem, attr){

            scope.searchResults = null;
            scope.selectedResult = null;

            scope.search = function(){
                SearchSrv.searchFood(scope.query)
                    .then(function(results){
                        scope.searchResults = results;
                    })
                    .catch(function(error){
                        console.error(error);
                    });
            }

            scope.searchAgain = function(){
                scope.selectedResult = null;
                scope.searchResults = null;
                scope.foodProfile = null;
            }

            scope.selectResult = function(foodItem){
                scope.selectedResult = foodItem;
                scope.searchResults = null;
                SearchSrv.searchNutrition(foodItem.ndbno)
                    .then(function(nutritionalData){
                        scope.foodProfile = FoodProfile.createFromApiData(nutritionalData);
                    })
                    .catch(function(error){
                        console.error(error);
                    });
            }



        }

    }
})();