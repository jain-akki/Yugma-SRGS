angular.module('yugma')

   .controller('addTeacherComplaintsCtrl', function ($scope, USER, complaintService, customService) {

      $scope.childs = USER.parentChilds();

      $scope.totalChilds = $scope.childs.length;

      var getTeacher = function (standardId) {
         complaintService.getTeacher(standardId).then(function (response) {
            $scope.teachers = response;
            console.log(response)
            customService._off();
            $("#category").css("display", "none");
            $("#teacher").css("display", "table").addClass("animated bounceInLeft");
         });
      }

      var getAllCategory = function () {
         complaintService.getAllCategory().then(function (response) {
            $scope.category = response;
            customService._off();
            $("#category").css("display", "table").addClass("animated bounceInLeft");
         })
      }

      $scope.selectChild = function (child) {
         $scope.studentName = child.studentName;
         $scope.studentId = child.studentId;
         $(".add-complaint-child-name").html("Student Name: "+child.studentName);
         $(".button-positive").addClass("animated bounceOutRight");
         $(".studentName").css("display", "none");
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
               
               console.log("SASASASASASASA")
               $("#category").addClass("animated bounceOutLeft");
               $scope.subCategory = newval.idName;
               $("#category").css("display", "none");
               $("#subCategory").addClass("animated bounceInRight");
               $("#subCategory").css("display", "inherit");
            } else {

               console.log("SASASAs", newval);
               $("#category").addClass("animated bounceOutLeft");
               $(".teachersName").addClass("animated bounceInRight");
               $(".teachersName").css("display", "inherit");
               getTeacher($scope.studentId);
               customService._on();

            }

         } else {

            $("#category").addClass("animated bounceOutLeft");
            $("#category").css("display", "none");
            $("#subCategory").addClass("animated bounceOutLeft");
            $("#subCategory").css("display", "none");
            $("#other").html("Title: " + newval.categoryName);
            $("#other").addClass("animated bounceInLeft");
            $("#other").css("display", "inherit");
            
         }
         console.log(newval)
      }, true);
      // if (_.isEqual(newval, oldval) == false) {

      //    if (newval.childDepth === 1) {

      //       if (newval.idName != null) {

      //          $scope.subCategory = newval.idName;

      //       } else {

      //          if ($scope.standardId == undefined) {
      //             getTeacher($scope.childs[0].standardId)
      //          } else {
      //             getTeacher($scope.standardId);
      //          }
      //       }

      //       $scope.complaint.comment = "";
      //       $scope.subCategorySelection = true;

      //    } else {
      //       $scope.subCategorySelection = false;
      //       $scope.complaint.comment = "";
      //    }
      // }

      $scope.$watch("category.teacher", function (newval, oldval) {
         if (newval) {
            $scope.teachersName = newval.name;
            $("#teacher").addClass("animated bounceOutLeft").css("display","none");
            $("#teachersName").html("Teacher Name: " + newval.name);
            $("#teachersName").addClass("animated bounceInLeft");
            $("#teachersName").css("display", "inherit");
         }
      });
      
      $scope.$watch("category.subCategory", function (newval, oldval) {

         if (newval) {
            $("#subCategory").addClass("animated bounceOutLeft");
            $("#subCategory").css("display", "none");
            $scope.extraCircular = newval.name;
            console.log("AAAA");
            $("#extraCircular").html("complaint against: " + newval.name);
            $("#extraCircular").addClass("animated bounceInLeft");
            $("#extraCircular").css("display", "inherit");
         }
      }, true);

   })