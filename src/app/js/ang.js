var app = angular.module('sublime-tutorial', ['duScroll', 'ngTouch', 'angularModalService']);
app.value('duScrollOffset', 100);

app.controller('tutorial', ['$scope', '$document',
    function($scope, $document) {
        $scope.close = true;

        
        $scope.$watch('close', function(nv, ov) {
            if (nv === true) {
                $document[0].querySelector('.bookmarks').className = 'bookmarks';
                $document[0].getElementById('toggle').className = '';

            } else {
                $document[0].querySelector('.bookmarks').className = 'bookmarks open';
                $document[0].getElementById('toggle').className = 'open';


            }
        });

        $scope.toggle = function() {
            $scope.close ? $scope.close = false : $scope.close = true;
        };
    }
]);

app.directive('packagecontrol', [

    function() {
        return {
            restrict: 'AE',
            scope: {
                plug: '@'
            },
            template: '<a href="https://packagecontrol.io/packages/{{enc(plug)}}" target="_blank">{{plug}}</a>',
            link: function($scope) {
                $scope.enc = encodeURIComponent;
            }
        };
    }
]);


app.directive('hlcode', [

    function() {
        return {
            restrict: 'AE',
            transclude: true,
            scope: {
                lang: '@'
            },

            template: '<pre class="customcode"><code class="{{lang}}"><ng-transclude></ng-transclude></code></pre>'
        };
    }
]);


app.directive('demo', ['ModalService', '$document', '$timeout',
    function(ModalService, $document, $timeout) {
        return {
            restrict: 'AE',
            template: '<span class="modalBtn" style={{style}} ng-click="do()"><img src="app/css/watch.png" width="20"/>  {{label}}</span>',
            scope: {
                image: '@',
                label: '@',
                right: '@'
            },

            link: function($scope) {
                $scope.style = '';
                var imageSrc = $scope.image;

                if (!$scope.label) {
                    $scope.label = 'Watch Demo';
                }

                if ($scope.right) {
                    $scope.style = 'float:right;';
                }

                $scope.do = function() {
                    $document[0].body.style.overflow = 'hidden';
                    ModalService.showModal({
                        template: '<div id="openModal" class="modalDialog" ng-click="modal.closeModal()"><div><img ng-src="{{modal.src}}" /> </div> </div>',
                        controller: function($scope, $element, close) {

                            function closeHelper() {
                                $document[0].body.style.overflow = 'auto';
                                $document[0].querySelector('.modalDialog').className = 'modalDialog kill';

                                $timeout(function() {
                                    close();
                                }, 510);
                            }

                            this.closeModal = function() {
                                closeHelper();
                            };

                            $document[0].onkeydown = function(evt) {
                                evt = evt || window.event;

                                if (evt.keyCode == 27) {
                                    closeHelper();
                                }
                            };

                            this.src = imageSrc;
                        },
                        controllerAs: 'modal'
                    });
                };
            }
        };
    }
]);


//https://github.com/oblador/angular-scroll