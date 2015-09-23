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
        }

        FoodProfile.createFromApiData = function (data) {
            var nutrients = {};
            angular.forEach(data.nutrients, function(nutrient){
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

        FoodProfile.prototype.getNutrientsForWeight = function(weight, unit){

            if(unit == 'kilograms'){
                weight = weight * 1000;
            }
            if(unit == 'lb'){
                weight = weight * 453.592;
            }
            if(unit == 'oz'){
                weight = weight * 28.349;
            }
            var nutrientsForWeight = [];
            angular.forEach(this.nutrients, function(nutrient){
                if(!isNaN(nutrient.gm)) {
                    var value = (nutrient.gm / 100) * weight;
                    nutrientsForWeight.push(
                        {
                            nutrient: nutrient.nutrient,
                            unit: nutrient.unit,
                            value: Math.round(value * 100) / 100,
                            rda: RdaSrv.men[nutrient.nutrient_id]
                        });
                }
            });
            return nutrientsForWeight;
        }

        return (FoodProfile);

    }
})();