(function () {

    'use strict';

    angular
        .module('app.application')
        .controller('foodManagerController', foodManagerController);

    foodManagerController.$inject = ["SearchSrv", "FoodProfile"];

    function foodManagerController(SearchSrv, FoodProfile) {

        var self = this;
        self.selectedResult = null;
        self.searchResults = null;
        self.foodProfile = null;
        self.nutrientInfo = null;

        self.search = function(query){
            SearchSrv.searchFood(query)
                .then(function(results){
                    self.searchResults = results;
                })
                .catch(function(error){
                    console.error(error);
                });
        }

        self.clearSelectedResult = function(){
            self.selectedResult = null;
            self.searchResults = null;
            self.foodProfile = null;
            self.nutrientInfo = null;
        }

        self.getNutritionalData = function(foodItem){
            self.selectedResult = foodItem;
            self.searchResults = null;
            SearchSrv.searchNutrition(foodItem.ndbno)
                .then(function(nutritionalData){
                    self.foodProfile = FoodProfile.createFromApiData(nutritionalData);
                })
                .catch(function(error){
                    console.error(error);
                });
        }

        self.getNutritionalDataForWeight = function(weight, unit){
            if(self.foodProfile !== null){
                self.nutrientInfo = self.foodProfile.getNutrientsForWeight(weight, unit);
            }
        }

    }

})();