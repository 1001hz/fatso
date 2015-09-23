(function () {

    'use strict';

    angular
        .module("app")
        .factory("RdaSrv", RdaSrv);

    RdaSrv.$inject = [];

    function RdaSrv() {

        var service = {
            men:{
                203: 75, //protein
                204: 70, //fatTotal
                205: 300, //carbohydrate
                646: 20, //fatPolyunsaturated
                307: 2000, //sodium
                645: 24, //fatMonounsaturated
                208: 2400, //energyKc
                291: 30, //fibre
                269: 90, //sugars
                268: 9900, //energyKj
                606: 20, //fatSaturated
                605: 2 //fatTrans
            },
            women:{
                203: 55,
                204: 70,
                205: 300,
                646: 20,
                307: 2000,
                645: 24,
                208: 1800,
                291: 25,
                269: 90,
                268: 7600,
                606: 20,
                605: 2
            }
        }

        return service;

    }

})();