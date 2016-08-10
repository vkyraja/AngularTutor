mTut.controller('indexController', function indexCtrl($scope, $timeout, $mdSidenav, $log) {
    $scope.header = "Welcome to first demo";
    $scope.openMenu = function() {
        alert(1);
        $mdSidenav('left').close();
    };
});
