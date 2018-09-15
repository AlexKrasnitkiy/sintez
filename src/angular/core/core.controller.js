(function () {
    'use strict';

    angular
        .module('test.app.Core')
        .controller('CoreController', CoreController);

    CoreController.$inject = ['CoreService'];

    function CoreController(CoreService) {

        var vm = this;
        vm.categories = {};
        vm.difficulty = [
        {
            name: 'Easy'
        },
        {
            name: 'Medium'
        },
        {
            name: 'Hard'
        }];
        vm.total = {};

        vm.generate = generate;

		
        activate();
        
        function activate() {
            getAllCategories();
        }

        function getAllCategories() {
            CoreService.getAllCategories().then(function (categories) {
                vm.categories = categories.trivia_categories;
            }).catch(function (error) {
                console.log('Error in getAllCategories', error);
            })
        }

        function generate() {
            var getAmount = document.getElementById('amount');
            vm.amount = parseInt(getAmount.value);
            if (vm.amount !== null && vm.amount !== undefined){
                vm.total.amount = vm.amount;
            }
            if (vm.selectedCategory !== null && vm.selectedCategory !== undefined){
                vm.total.category = vm.selectedCategory;
            }
            if (vm.selectedDifficulty !== null && vm.selectedDifficulty !== undefined &&  vm.selectedDifficulty.name !== null && vm.selectedDifficulty.name !== undefined){
                console.log('DO NOT WORK');
                vm.total.difficulty = vm.selectedDifficulty.name.toLowerCase();
            }
            if (vm.total !== null && vm.total !== undefined){
               if (vm.amount === null || vm.amount === undefined || isNaN(vm.amount)){
                   alert('Amount cannot be empty')
               } else {
                   CoreService.getQuestions(vm.total).then(function (response) {
                       //тут надо что то придумать, очищает фронт но на бекенд идет хрень
                       vm.selectedDifficulty  = {};
                       vm.selectedCategory = {};
                       vm.amount = 10;
                       vm.questions = response.results;
                   }).catch(function (error) {
                       console.log('error in generate', error)
                   })
               }
            }



        }



        }

})();