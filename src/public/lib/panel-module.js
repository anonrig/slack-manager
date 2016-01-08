var app = angular.module('panelModule', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home'
            }).state('meetings', {
                url: '/meetings/unread',
                templateUrl: '/meetings/unread'
            }).state('meeting', {
                url: '/meeting/:id',
                templateUrl: function(params) {
                    return '/meetings/meeting/' + params.id;
                }
            }).state('meeting-archive', {
                url: '/meetings/archive',
                templateUrl: '/meetings/archive'
            });
    });

app.run(['$state', function($state) {
    $state.transitionTo('home');
}]);

app.controller('meetingCountCtrl', function($scope, $http) {
    $http.get('../meetings/unread/count').then((response) => {
        $scope.meetingNum = response.data.meetingCount;
    });
});
