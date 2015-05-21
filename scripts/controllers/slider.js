'use strict';

angular.module('angularSlider', ['ngAnimate', 'ngTouch'])
    .controller('MainCtrl', ['$scope', '$timeout', function ($scope, $timeout) {

        // Set of Photos
        $scope.photos = [
            {src: 'http://hd.wallpaperswide.com/thumbs/carlos_tevez-t2.jpg', desc: 'Image 01', name: 'Tevez'},
            {src: 'http://hd.wallpaperswide.com/thumbs/steven_gerrard_football-t2.jpg', desc: 'Image 02', name: 'Gerrard'},
            {src: 'http://hd.wallpaperswide.com/thumbs/wayne_rooney-t2.jpg', desc: 'Image 03', name: 'Rooney'},
            {src: 'http://hd.wallpaperswide.com/thumbs/lionel_messi_2012-t2.jpg', desc: 'Image 04', name: 'Messi'},
            {src: 'http://hd.wallpaperswide.com/thumbs/cristiano_ronaldo_real_madrid_wallpaper_2014-t2.jpg', desc: 'Image 05', name: 'Ronaldo'}
        ];

        // Will render new photos if add
        $scope.$watch('photos.length', function () {
            $scope.viewPhotos = {
                next: angular.copy($scope.photos)
                ,
                prev: angular.copy($scope.photos)
            };
        });

        // initial image index
        $scope._IndexNext = 0;
        $scope._IndexPrev = $scope.photos.length - 1;
        $scope.choice = undefined;

        var timeOut,
            total = $scope.photos.length;

        // if a current image is the same as requested image
        $scope.isActive = {next: function (index) {
            return $scope._IndexNext === index;
        },
            prev: function (index) {
                return $scope._IndexPrev === index;
            }
        };

        // show a certain image
        $scope.showPhoto = {
            next: function (index) {
                $scope._IndexNext = index;
            },
            prev: function (index) {
                $scope._IndexPrev = index;
            }
        };

        // Changes shown photo
        $scope.rotate = {
            next: function () {
                $scope._IndexNext = ($scope._IndexNext < $scope.photos.length - 1 && total > 0) ? ++$scope._IndexNext : 0;
            },
            prev: function () {
                $scope._IndexPrev = ($scope._IndexPrev > 0 && total > 0) ? --$scope._IndexPrev : $scope.photos.length - 1;
            }
        };

        // Plays slider
        $scope.play = function () {
            timeOut = $timeout(function() {
                $scope.rotate.next();
                $scope.rotate.prev();
                $scope.play();
            }, 3000);
        };

        (function () {
            $scope.play();
        } ());

        // Stops slider
        $scope.stop = function () {
            $timeout.cancel(timeOut);
        };

        // Shuffles order of slides
        $scope.shuffle = function (array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        };

        // Adds new slide
        $scope.add = function () {
            $scope.photos.push($scope.choice);
            $scope.choice = undefined;
        }
    }]);
