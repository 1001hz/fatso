(function () {

    'use strict';

    angular
        .module("app.application")
        .directive("foodSearch", foodSearch);

    foodSearch.$inject = ["SearchSrv","$compile"];

    function foodSearch(SearchSrv, $compile){
        return{
            restrict: 'A',
            link: linkFn
        }

        function linkFn(scope, elem, attrs){

            elem.on("keyup", function(){
                if(elem[0].value.length > 2){
                    SearchSrv.searchFood(elem[0].value)
                        .then(function(results){
                            if(elem[0].nextSibling !== null){
                                elem[0].nextSibling.remove();
                            }

                            var list = angular.element("<ul></ul>");
                            angular.forEach(results, function(result){
                                var items = angular.element("<li data-ng-click=set('"+result+"')>"+result+"</li>");
                                list.append(items);
                            });

                            var compiled = $compile(list);
                            var items = compiled(scope);
                            elem.after(items);
                        })
                        .catch(function(error){
                            console.error(error);
                        });
                }
            });

            scope.set = function(value){
                elem[0].value = value;
                if(elem[0].nextSibling !== null){
                    elem[0].nextSibling.remove();
                }
            }

        }
    }

})();