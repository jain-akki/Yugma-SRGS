angular.module('yugma')

   .controller('addTeacherComplaintsCtrl', function ($scope, $state, $ionicHistory, USER, complaintService, customService) {

      $scope.childs = USER.parentChilds();

      $scope.totalChilds = $scope.childs.length;
      
      if ($scope.totalChilds === 1) {
         customService._on();
         getAllCategory();
         $scope.standardId = $scope.childs[0].standardId;
         $scope.studentId = $scope.childs[0].studentId;
         $(".has-subheader").removeClass("has-subheader");
         $("#category").css("display", "table").addClass("animated bounceInLeft");
      }

      var getTeacher = function (standardId) {
         complaintService.getTeacher(standardId).then(function (response) {
            $scope.teachers = response;
            customService._off();
            $("#category").css("display", "none");
            $("#teacher").css("display", "table").addClass("animated bounceInLeft");
         });
      }

      function getAllCategory () {
         complaintService.getAllCategory().then(function (response) {
            $scope.category = response;
            customService._off();
            $(".studentName").css("display", "none");
            $("#category").css("display", "table").addClass("animated bounceInLeft");
         })
      }

      $scope.selectChild = function (child) {
         $scope.standardId = child.standardId;
         $scope.studentId = child.studentId;
         $scope.studentName = child.studentName;
         $(".add-complaint-child-name").html(child.studentName);
         $(".button-positive").addClass("animated bounceOutRight");
         customService._on();
         getAllCategory();
      }

      $scope.category = {};

      $scope.$watch("category.mainCategory", function (newval, oldval) {

         if (_.isEqual(newval, oldval)) {
            return;
         }

         if (newval.childDepth === 1) {

            if (newval.idName != null) {

               $scope.categoryId = newval.categoryId;
               $scope.subCategory = newval.idName;
               $("#category").addClass("animated bounceOutLeft");
               $("#category").css("display", "none");
               $("#subCategory").addClass("animated bounceInRight");
               $("#subCategory").css("display", "inherit");

            } else {

               $scope.categoryId = newval.categoryId;
               $("#category").addClass("animated bounceOutLeft");
               $(".teachersName").addClass("animated bounceInRight");
               $(".teachersName").css("display", "inherit");
               getTeacher($scope.standardId);
               customService._on();

            }

         } else {

            $scope.categoryId = newval.categoryId;
            addClassAndCss("category", "bounceOutLeft", "none");
            addClassAndCss("subCategory", "bounceOutLeft", "none");
            $("#otherData").append(newval.categoryName);
            $("#otherData").addClass("animated slideInDown");
            $("#otherData").css("display", "inherit");
            $("#addCmplTextBox").addClass("animated slideInDown");
            $("#addCmplTextBox").css("display", "inherit");
         }

      }, true);

      var addClassAndCss = function (idName, animationName, display) {
         $("#" + idName).addClass("animated" + animationName).css("display", display);
      }

      $scope.$watch("category.teacher", function (newval, oldval) {

         if (newval) {

            $scope.subCategoryId = newval.id;
            $scope.teachersName = newval.name;
            $("#teacher").addClass("animated bounceOutLeft").css("display", "none");
            $("#addCmplTextBox").addClass("animated slideInDown");
            $("#addCmplTextBox").css("display", "inherit");
            $("#otherData").html(newval.name);
            $("#otherData").css("display", "inherit");
            $("#otherData").addClass("animated slideInDown");

         }

      }, true);

      $scope.$watch("category.subCategory", function (newval, oldval) {

         if (newval) {

            $scope.subCategoryId = newval.id;
            $scope.extraCircular = newval.name;
            $("#addCmplTextBox").addClass("animated slideInDown");
            $("#addCmplTextBox").css("display", "inherit");
            addClassAndCss("subCategory", "bounceOutLeft", "none");
            $("#otherData").html(newval.name);
            $("#otherData").addClass("animated slideInDown").css("display", "inherit");

         }

      }, true);

      $scope.complaint = {
         isChecked: false
      };

      $scope.complaintSubmit = function (complaint) {

         customService._on();

         var finalData = {

            parentId: USER.parentId() || null,
            childId: $scope.studentId || null,
            standardId: $scope.standardId || null,
            categoryId: $scope.categoryId || null,
            subCategoryId: $scope.subCategoryId || null,
            title: complaint.title,
            comment: complaint.description,
            anonymous: complaint.isChecked

         }

         complaintService.saveTeacherComplaint(finalData).then(function (response) {

            customService._off();

            if ($scope.categoryId === 4) {
              $state.go("yugma.complaints.teacher-complaint", {}, { reload: true, notify: true });  
            } else {
              $state.go("yugma.complaints.other-complaint", {}, { reload: true, notify: true });
            }

         });
      }
      
      /**
       * Set back button
       */
      
      $scope.goBack = function () {
         $state.transitionTo('yugma.complaints.teacher-complaint', {}, {reload: true});
      }
      
      /**
       * To reload current state
       * so, that remove $scope from that page
       */

      $scope.clearHistory = function() {
        //  $state.reload();
         $state.go($state.current, {}, {reload:true});
      }

   })