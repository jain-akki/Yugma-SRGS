angular.module('yugma')

.controller('addTeacherCommentCtrl', function ($scope, $state, $stateParams, $timeout, $ionicScrollDelegate, $ionicHistory, USER, commentService, customService) {

    var vm = this;

    vm.headetTilte = $stateParams.title;
    vm.statusId = $stateParams.statusId;

    function getComment() {

        customService._on();

        commentService.getComment($stateParams.complaintId).then(function (response) {
            vm.comments = response;
            customService._off();
        });
    }

    getComment();

    vm.addComment = function (teacher) {

        var comment = {
            csaId: Number($stateParams.complaintId),
            id: USER.parentId(),
            comment: teacher.comment
        }

        console.log(comment)

        commentService.setComment(comment).then(function (response) {

            if (response) {
                vm.comments.push({
                    comment: teacher.comment,
                    parentName: USER.parentName()
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

})