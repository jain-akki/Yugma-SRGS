(function () {

    'use strict';

    angular.module('yugma')

        .controller('addOtherCommentCtrl', function ($scope, $state, $stateParams, $timeout, $ionicScrollDelegate, $ionicHistory, USER, respondService, customService) {

            var vm = this;

            vm.headetTilte = $stateParams.title;
            vm.statusId = $stateParams.statusId;

            function getComment() {

                customService._on();

                respondService.getOtherComment($stateParams.suggestionId).then(function (response) {

                    vm.comments = response;

                    _.forEach(response, function (val, index) {
                        if (val.parentId) {
                            val.parentName = "ME";
                        } else {
                            val.parentName = val.employeeName;
                        }
                    });

                    customService._off();

                });
            }

            getComment();

            vm.addComment = function (teacher) {

                customService._on();

                var comment = {
                    csaId: Number($stateParams.suggestionId),
                    id: USER.parentId(),
                    comment: teacher.comment
                }

                respondService.setOtherComment(comment).then(function (response) {

                    customService._off();

                    if (response) {
                        vm.comments.push({
                            comment: teacher.comment,
                            parentName: "ME",
                            dateTime: new Date()
                        });
                        vm.teacher = {};
                    }

                });

            }

            vm.goBack = function () {
                $ionicHistory.goBack();
            }

            $scope.$watch('vm.comments', function (newValue, oldValue) {
                $ionicScrollDelegate.scrollBottom(false);
            }, true);

            $("#comment-textarea").keyup(function () {

                if ($(this).val() !== '') {
                    $("#send").css('color', 'blue');
                } else {
                    $("#send").css('color', '#000000');
                }

            });

        })

})();