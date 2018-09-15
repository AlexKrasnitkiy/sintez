(function () {
    'use strict';

    angular.module('test.app.Core')
        .config(Config);

    Config.$inject = [];




    function Config() {
        console.log('app.config activated');
    }

}());