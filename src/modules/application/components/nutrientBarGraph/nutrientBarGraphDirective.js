(function () {

    'use strict';

    angular
        .module("app.application")
        .directive("nutrientBarGraph", nutrientBarGraph);

    nutrientBarGraph.$inject = [];

    function nutrientBarGraph(){
        return{
            restrict: 'E',
            link: linkFn,
            scope: {
                nutrient: '='
            }
        }

        function linkFn(scope, elem, attrs){

            scope.$watch(function(scope) { return scope.nutrient.nutritionalValueForWeight.value },
                function() {
                    var data = google.visualization.arrayToDataTable([
                        ['Nutrient', 'Weight '+scope.nutrient.unit, { role: 'style' }],
                        ['Amount', scope.nutrient.nutritionalValueForWeight.value, '#b87333'],
                        ['RDA', scope.nutrient.nutritionalValueForWeight.rda, 'silver']
                    ]);

                    var options = {
                        title: scope.nutrient.nutrient
                    };

                    var chart = new google.visualization.ColumnChart(elem[0]);
                    chart.draw(data, options);
                }
            );

        }
    }

})();