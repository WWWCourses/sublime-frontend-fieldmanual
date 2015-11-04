var NAVI = [{
        link: '#who-is-this-for',
        title: 'Whos this for',
        childs: null
    }, {
        link: '#the-magic-of-shortcuts',
        title: 'The magic of Shortcuts',
        childs: [{
            link: '#kbd-p',
            title: 'P stands for Project'
        }, {
            link: '#kbd-r',
            title: 'R stands for Read Symbols'
        }, {
            link: '#kbd-j',
            title: 'J stands for Joining'
        }, {
            link: '#kbd-l',
            title: 'L stands for Lines'
        }, {
            link: '#kbd-d',
            title: 'D stands for Duplicate'
        }, {
            link: '#kbd-b',
            title: 'B stands for Build'
        }]
    }, {
        link: '#working-with-panels-mouseless',
        title: 'Working with Panels Mouseless',
        childs: null
    }, {
        link: '#howto-configure-sublime-text',
        title: 'Howto Configure Sublime Text',
        childs: null
    }, {
        link: '#installing-packagecontrol-and-nodejs',
        title: 'Installing PackageControl and NodeJS',
        childs: null
    }, {
        link: '#favourite-javascript-plugins',
        title: 'Configs for popular JS-Plugins',
        childs: [{
            link: '#plug-evalprinter',
            title: 'EvalPrinter'
        }, {
            link: '#plug-jshintgutter',
            title: 'JSHint Gutter'
        }, {
            link: '#plug-docblockr',
            title: 'DocBlockr'
        }, {
            link: '#plug-favs',
            title: 'My favourite Sublime Text Plugins'
        }, ]
    }, {
        link: '#js-codeintelligence',
        title: 'JavaScript CodeIntelligence',
        childs: [{
            link: '#js-codeintel-install',
            title: 'Installing the Plugin'
        }, {
            link: '#js-codeintel-setup',
            title: 'Setup TernJS File'
        }, ]
    },

    {
        link: '#setup-your-projectfile',
        title: 'Setup Your Projectfile',
        childs: null
    }, {
        link: '#setup-builders',
        title: 'Setup Sublime Builders',
        childs: [{
            link: '#install-nodejs-modules',
            title: 'Installing NodeJS Modules'
        }, {
            link: '#config-builder-confs',
            title: 'Builder Configs'
        }]
    }
];

var app = angular.module('sublime-tutorial', ['duScroll', 'ngTouch', 'angularModalService']);
app.value('duScrollOffset', 100);

app.controller('tutorial', ['$scope', '$document', '$window',
    function($scope, $document, $window) {
        $parent = $scope;
        $scope.close = true;
        $scope.navi = NAVI;
        $scope.showmenu = false;

        
        angular.element(document.getElementById('searchinput')).on('blur', function() {
            setTimeout(function() {
                $scope.$apply(function() {
                    $scope.showmenu = false;
                });         
            },300);
        });

        angular.element($window).on('keydown', function(e) {
            
            if ((e.ctrlKey && e.keyCode === 70) || (e.ctrlKey && e.keyCode === 80)) {
                $scope.$apply(function() {
                    $scope.showmenu = true;                    
                });
                document.getElementById('searchinput').focus();
                e.stopImmediatePropagation();
                e.preventDefault();
                e.stopPropagation();                
            }

            if (e.keyCode === 27) {
                $scope.$apply(function() {
                   $scope.showmenu = false;
                });                
            }
        });

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


/*
                                                                                                                                                                    item in filtered = (list | property:'customfield_10841.value': cFilter.targetGroup.value | property:'customfield_10850.value': cFilter.product.value | property:'version': cFilter.version.value || undefined)  track by $index"
 */
app.directive('search', ['$document',

    function($document) {
        return {
            restrict: 'AE',
            scope: {
                show: '='
            },
            template: '<div id="search" ng-class="{show: show}"><input id="searchinput" ng-keyup="arrows($event)" ng-model="search" type="text" /><ul><li ng-class="{active: active === $index}" ng-repeat="item in filtered = (items | filter: search) track by $index"><a du-smooth-scroll href="{{item.link}}">{{item.title}}</a></li></ul></div>',
            
            link: function($scope, element, attrs) {
                $scope.items = [];
                $scope.active = 0; 

                $scope.arrows = function($event) {
                    switch($event.keyCode) {

                        case 13: // enter
                            var elem = angular.element(document.getElementById($scope.filtered[$scope.active].link.substring(1)));
                            $document.scrollToElementAnimated(elem);
                            $scope.show = false;
                        break;
                        
                        case 38:
                            if ($scope.active !== 0) {
                                $scope.active--;
                            }
                        break;

                        case 40:
                            if ($scope.active <= $scope.filtered.length) {
                                $scope.active++;
                            }
                        break;
                    }    
                };

                for (var i = 0; i < NAVI.length; i++) {
                    var el = NAVI[i];
                    $scope.items.push(el);
                    if (el.childs !== null) {
                        for (var k = 0; k < el.childs.length; k++) {
                            $scope.items.push(el.childs[k]);
                        }
                    }
                }
                
            }
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