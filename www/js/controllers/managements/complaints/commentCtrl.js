(function () {

  'use strict';

  angular.module('yugma')

  .controller('managementCommentCtrl',
  
  function($http, $scope, $state, $stateParams, USER, customService, $ionicHistory, managementCommentService, $ionicScrollDelegate) {

    var vm = this;

    customService._on();
    
    vm.statusId = $stateParams.obj.status;
    
    function getTeacherComments() {

      managementCommentService.getTeacherComments($stateParams.obj.id).then(function(response) {

        vm.comments = response;

        _.forEach(response, function(val, index) {
          if (val.parentId) {
            val.parentName = "ME";
          } else {
            val.parentName = val.employeeName;
          }
        });
        
        customService._off();

      });
    }
    
    function getOtherComments(params) {

      managementCommentService.getOtherComments($stateParams.obj.id).then(function(response) {

        vm.comments = response;

        _.forEach(response, function(val, index) {
          if (val.parentId) {
            val.parentName = "ME";
          } else {
            val.parentName = val.employeeName;
          }
        });

        customService._off();

      });
    }
    
    function setTeacherComment(data) {

      managementCommentService.saveTeacherComment(data).then(function(response) {

        customService._off();

        vm.comments.push({
            comment: data.comment,
            parentName: "ME",
            dateTime: new Date()
        });
        vm.teacher = {};
            
      });

    }
    
    function setOtherComment(data) {
      
      managementCommentService.saveOtherComment(data).then(function(response) {

        customService._off();

        vm.comments.push({
            comment: data.comment,
            parentName: "ME",
            dateTime: new Date()
        });
        vm.teacher = {};  
             
      });

    }

    if ($stateParams.obj.name === "teacher") {
      getTeacherComments();
    } else {
      getOtherComments();
    }

    vm.goBack = function() {
      $ionicHistory.goBack();
    }

    vm.setComment = function (comment) {

      customService._on();

      var comment = {
        csaId: $stateParams.obj.id,
        teacherId: USER.parentId(),
        comment: comment.comment,
        rca: null
      }

      if ($stateParams.obj.name === "teacher") {
        setTeacherComment(comment);
      } else {
        setOtherComment(comment);
      }

    }

    $scope.$watch('vm.comments', function (newValue, oldValue) {
        $ionicScrollDelegate.scrollBottom(false);
    }, true);

    $("#comment-textarea").keyup(function() {

        if ($("#comment-textarea").val() !== '') {
            $("#send").css('color', 'blue');
        } else {
            $("#send").css('color', '#000000');
        }

    });

  })

})();