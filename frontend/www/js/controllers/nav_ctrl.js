(function() {
  var NavCtrl = function($scope, $state, Store, Actions, $ionicModal, $ionicSideMenuDelegate, $ionicPopover) {
    $scope.currentUser = Store.getCurrentUser();

    $scope.logOut = function() {
      Actions.logOut();
      $state.go('login');
    }

    $scope.resetPreferences = function() {
      Actions.resetPreferences();
      Actions.fetchShows();
      if ($scope.moreOptionsPopoverIsOpen) {
        $scope.closePopover();
      }
    }

    /* Side Menu Delegate Setup */
    $ionicSideMenuDelegate.edgeDragThreshold(15);

    $scope.sideMenuIsOpen = function() {
      return $ionicSideMenuDelegate.isOpenLeft();
    }

    $scope.$watch($scope.sideMenuIsOpen, function(isOpen) {
      if (isOpen) {
        $scope.sideMenuWasOpen = true;
      } else {
        if ($scope.sideMenuWasOpen) {
          Actions.fetchShows();
          $scope.sideMenuWasOpen = true;
        }
      }
    });

    /* Liked Shows Modal */
    $ionicModal.fromTemplateUrl('liked.html', {
      scope: $scope,
      animation: 'fade-in',
      hideDelay: 0
    }).then(function(modal) {
      $scope.likedShowsModal = modal;
    });

    $scope.openLikedShowsModal = function() {
      Actions.fetchLikedShows();
      $scope.likedShowsModal.show();
      $scope.likedShowsModalIsOpen = true;
    };

    $scope.closeModal = function() {
      $scope.likedShowsModal.hide();
      $scope.likedShowsModalIsOpen = false;
    };

    $scope.$on('$destroy', function() {
      $scope.likedShowsModal.remove();
      $scope.likedShowsModalIsOpen = false;
    });

    $scope.$on('modal.hidden', function() {
      $scope.likedShowsModalIsOpen = false;
    });

    $scope.$on('modal.removed', function() {
      $scope.likedShowsModalIsOpen = false;
    });

    /* More options popover */
    $ionicPopover.fromTemplateUrl('more-options-menu.html', {
      scope: $scope,
    }).then(function(popover) {
      $scope.popover = popover;
    });

    $scope.openPopover = function($event) {
      $scope.popover.show($event);
      $scope.moreOptionsPopoverIsOpen = true;
    };

    $scope.closePopover = function() {
      $scope.popover.hide();
      $scope.moreOptionsPopoverIsOpen = false;
    };

    $scope.$on('$destroy', function() {
      $scope.popover.remove();
      $scope.moreOptionsPopoverIsOpen = false;
    });

    $scope.$on('popover.hidden', function() {
      $scope.moreOptionsPopoverIsOpen = false;
    });

    $scope.$on('popover.removed', function() {
      $scope.moreOptionsPopoverIsOpen = false;
    });
  }

  angular.module('app').
    controller('NavCtrl', NavCtrl);
})();
