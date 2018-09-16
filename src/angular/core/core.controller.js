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

        vm.generateQuestions = generateQuestions;


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

        function generateQuestions() {
            var getAmount = document.getElementById('amount');
            vm.amount = parseInt(getAmount.value);
            if (vm.amount !== null && vm.amount !== undefined) {
                vm.total.amount = vm.amount;
            }
            if (vm.selectedCategory !== null && vm.selectedCategory !== undefined) {
                vm.total.category = vm.selectedCategory;
            }
            if (vm.selectedDifficulty !== null && vm.selectedDifficulty !== undefined && vm.selectedDifficulty.name !== null && vm.selectedDifficulty.name !== undefined) {
                console.log('DO NOT WORK');
                vm.total.difficulty = vm.selectedDifficulty.name.toLowerCase();
            }
            if (vm.total !== null && vm.total !== undefined) {
                if (vm.amount === null || vm.amount === undefined || isNaN(vm.amount)) {
                    alert('Amount cannot be empty')
                } else {
                    getQuestionsByFilter();
                }
            }

            function getQuestionsByFilter() {
                CoreService.getQuestions(vm.total).then(function (response) {
                    //тут надо что то придумать, очищает фронт но на бекенд идет хрень
                    vm.selectedDifficulty = {};
                    vm.selectedCategory = {};
                    vm.amount = 10;
                    //
                    vm.questions = response.results;
                    _.forEach(vm.questions, function (q) {
                        q.incorrect_answers.push(q.correct_answer);
                        q.incorrect_answers.shuffle();
                    });


                }).catch(function (error) {
                    console.log('error in generate', error)
                })
            }

            Array.prototype.shuffle = function (b) {
                var i = this.length, j, t;
                while (i) {
                    j = Math.floor(( i-- ) * Math.random());
                    t = b && typeof this[i].shuffle !== 'undefined' ? this[i].shuffle() : this[i];
                    this[i] = this[j];
                    this[j] = t;
                }
                return this;
            };

        }
    }

})();