(function () {
    'use strict';

    angular
        .module('test.app.Core')
        .controller('CoreController', CoreController);

    CoreController.$inject = ['CoreService'];

    function CoreController(CoreService) {

        var vm = this;
        vm.categories = {};
        vm.difficulty = {

        };

        vm.generate = generate;

		
        activate();
        
        function activate() {
            getAllCategories();
            var getAmount = document.getElementById('amount');
            vm.amount = getAmount.value
        }

        function getAllCategories() {
            CoreService.getAllCategories().then(function (categories) {
                vm.categories = categories.trivia_categories;
            }).catch(function (error) {
                console.log('Error in getAllCategories', error);
            })
        }

        function generate() {
            console.log('vm.selectedCategory', vm.selectedCategory);
            console.log('vm.amount', vm.amount);
        }



        }

})();