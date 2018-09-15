(function() {
    'use strict';

    angular.module('test.app.Core')
        .run(RunApp);

    RunApp.$inject = [];

    function RunApp() {
        console.log('app.run activated');
    }

}());