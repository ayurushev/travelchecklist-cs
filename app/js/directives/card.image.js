app.directive('cardImage', [function() {
  return {
    replace: true,
    scope: {
      url: '=cardImage'
    },
    template: '<div style="background: url({{ url }}) center center / cover no-repeat; min-height: 200px; min-width: 300px" layout layout-align="space-between center">' +
                '<a style="text-align: center" href="javascript:;" ng-click="go(\'backward\')" flex="10">' +
                  '<md-icon style="color: #fff">chevron_left</md-icon>' +
                '</a>' +
                '<h3 style="color: #fff" class="md-title">{{ index + 1 }} of {{ images.length }}</h3>' +
                '<a style="text-align: center" href="javascript:;" ng-click="go(\'forward\')" flex="10">' +
                  '<md-icon style="color: #fff">chevron_right</md-icon>' +
                '</a>' +
              '</div>',
    link: function(scope, element, attrs) {
      scope.images = ['img/card.png', 'img/card01.jpg', 'img/card02.jpg', 'img/card03.jpg'];
      scope.index = scope.images.indexOf(scope.url);

      scope.go = function(direction) {
        scope.index = scope.images.indexOf(scope.url);
        if (direction === 'forward') {
          if (scope.index === scope.images.length - 1) {
            scope.index = -1;
          }
          scope.index++;
        } else if (direction === 'backward') {
          if (scope.index === 0) {
            scope.index = scope.images.length;
          }
          scope.index--;
        }
        scope.url = scope.images[scope.index];
      }
    }
  };
}]);
