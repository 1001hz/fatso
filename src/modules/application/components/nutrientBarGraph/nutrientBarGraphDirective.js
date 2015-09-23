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
            require: '^foodManager',
            scope: {
                nutrient: '='
            }
        }

        function linkFn(scope, elem, attrs, foodManagerCtrl){

            var data = google.visualization.arrayToDataTable([
                ['Nutrient', 'Weight'+scope.nutrient.unit, { role: 'style' }],
                ['Amount', scope.nutrient.value, '#b87333'],
                ['RDA', scope.nutrient.rda, 'silver']
            ]);


            var options = {
                title: scope.nutrient.nutrient
            };

            var chart = new google.visualization.ColumnChart(elem[0]);
            chart.draw(data, options);
        }
    }

})();