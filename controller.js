var voteApp = angular.module('voteApp', []);

voteApp.controller('voteController', function($scope) {
    $scope.message = "hello world";
    
    var cars = [
        "public/images/peel.jpg",
        "public/images/tesla.jpg",
        "public/images/teslax.jpg",
        "public/images/yellow.jpg",
        "public/images/purp.jpg",
        "public/images/green.jpg",
        "public/images/smart.jpg",
        "public/images/dd.jpg",
        "public/images/mazda.jpg",
        "public/images/og.jpg",
        "public/images/orange.jpg",
        "public/images/ferrari.jpg",
        "public/images/lambo.jpg",
        "public/images/kfc.jpg",
        "public/images/og2.jpg",
        "public/images/tundra.jpg",
        "public/images/om.jpg",
        "public/images/bigwheel.jpg"
    ];
    $scope.cars = cars;
    console.log(cars);
});