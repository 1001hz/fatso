(function () {

    'use strict';

    angular
        .module('app.application')
        .factory("FoodProfile", FoodProfile);

    FoodProfile.$inject = ["RdaSrv"];

    function FoodProfile(RdaSrv) {

        function FoodProfile(nutrients, name, ndbno) {
            this.nutrients = nutrients;
            this.name = name;
            this.ndbno = ndbno;
            this.weight = null;
        }

        FoodProfile.createFromApiData = function (data) {
            var nutrients = {};
            angular.forEach(data.nutrients, function(nutrient){
                nutrient.nutritionalValueForWeight = null;
                switch (nutrient.nutrient_id) {
                    case '203':
                        nutrients.protein = nutrient;
                        break;
                    case '204':
                        nutrients.fatTotal = nutrient;
                        break;
                    case '205':
                        nutrients.carbohydrate = nutrient;
                        break;
                    case '646':
                        nutrients.fatPolyunsaturated = nutrient;
                        break;
                    case '307':
                        nutrients.sodium = nutrient;
                        break;
                    case '645':
                        nutrients.fatMonounsaturated = nutrient;
                        break;
                    case '208':
                        nutrients.energyKc = nutrient;
                        break;
                    case '291':
                        nutrients.fibre = nutrient;
                        break;
                    case '269':
                        nutrients.sugars = nutrient;
                        break;
                    case '268':
                        nutrients.energyKj = nutrient;
                        break;
                    case '606':
                        nutrients.fatSaturated = nutrient;
                        break;
                    case '605':
                        nutrients.fatTrans = nutrient;
                        break;
                }
            });

            return(
                new FoodProfile(nutrients, data.name, data.ndbno)
            );
        };

        FoodProfile.prototype.calcNutrientsForWeight = function(weight, unit){
            this.weight = weight;
            if(unit == 'kilograms'){
                weight = weight * 1000;
            }
            if(unit == 'lb'){
                weight = weight * 453.592;
            }
            if(unit == 'oz'){
                weight = weight * 28.349;
            }

            angular.forEach(this.nutrients, function(nutrient){
                var value = 0;
                if(!isNaN(nutrient.gm)) {
                    value = (nutrient.gm / 100) * weight;
                }
                nutrient.nutritionalValueForWeight = {
                    rda : RdaSrv.men[nutrient.nutrient_id],
                    value : Math.round(value * 100) / 100,
                    weight : weight
                }
            });
        }

        return (FoodProfile);

    }
})();