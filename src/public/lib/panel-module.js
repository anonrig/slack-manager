var app = angular.module('panelModule', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/home'
        }).state('questions', {
            url: '/questions/create',
            templateUrl: '/questions',
            controller: 'questionCtrl'
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
        }).state('settings', {
            url: '/settings',
            templateUrl: '/settings'
    });
});

app.run(['$state', function($state) {
    $state.transitionTo('home');
}]);

app.controller('meetingCountCtrl', function($scope, $http) {
    $http.get('../meetings/unread/count').then(function(response) {
        $scope.meetingNum = response.data.meetingCount;
    });
});

app.controller('settingsCtrl', function ($scope, $http) {
    $http.get('/setting').then(function (doc) {
        doc = doc.data[0];
        $scope.slackToken = doc.slackToken;
        $scope.github = doc.github.repo;
        $scope.branch = doc.github.branch;
        $scope.mailService = doc.mailer.service;
        $scope.ownerMailLeft = doc.mailer.email.split('@')[0];
        $scope.ownerMailRight = doc.mailer.email.split('@')[1];
        $scope.mailPass = doc.mailer.pass;
        $scope.receiverLeft = doc.mail.to.split('@')[0];
        $scope.receiverRight = doc.mail.to.split('@')[1];
        $scope.mongoHost = doc.mongo.host;
        $scope.mongoDb = doc.mongo.db;
        $scope.name = doc.name;
        $scope.surname = doc.surname;
    }).catch(function (err) {
        alert(err);
    });

    $scope.sendRequest = function() {
        var mailOwner = $scope.ownerMailLeft + '@' + $scope.ownerMailRight;
        var receiver = $scope.receiverLeft + '@' + $scope.receiverRight;
        var request = {
            slackToken: $scope.slackToken,
            mailer: {
                service: $scope.mailService,
                email: mailOwner,
                pass: $scope.mailPass
            },
            mail: {
                from: '<' + $scope.name + ' ' + $scope.surname,
                to: receiver
            },
            mongo: {
                host: $scope.mongoHost,
                db: $scope.mongoDb
            },
            github: {
                repo: $scope.github,
                branch: $scope.branch
            }
        };

        $http.post('/setting/new', request, {
            headers: {ContentType: 'application/json'}
        });
    };
});

app.controller('questionCtrl', function ($scope, $http) {
    $scope.questions = [{'id': 'question1'}];
    $http.get('/questions/list').then(function (res) {
        if(res.data[0].questions) {
            res.data[0].questions.forEach(function (entry, index) {
                if ($scope.questions[index])
                    $scope.questions[index].question = entry;
                else{
                    $scope.questions.push({'id':'question'+index});
                    $scope.questions[index].question = entry;
                }
            });
        }
    });

    $scope.addNewQuestion = function() {
        var newItemNo = $scope.questions.length+1;
        $scope.questions.push({'id':'question'+newItemNo});
    };

    $scope.sendRequest = function() {
        var questionList = [];
        $scope.questions.forEach(function (question) {
            if(question.question)
                questionList.push(question.question);
        });

        $http.post('/questions/new', {
            title: 'MeetingQuestions',
            questions: questionList
        }).then(function (doc) {
            $scope.questions.forEach(function (question, index) {
                question.question = doc.data.questions[index];
            });
        });
    };
});
