(function () {

    'use strict';

    angular
        .module('app.application')
        .factory("User", User);

    User.$inject = [];

    function User() {

        function User(details, dailyRecords) {
            this.details = details;
            this.dailyRecords = dailyRecords;
        }

        User.createFromGoogleData = function (googleUser) {
            var profile = googleUser.getBasicProfile();
            var details = {
                id: profile.getId(),
                name: profile.getName(),
                imageUrl: profile.getImageUrl(),
                email: profile.getEmail(),
                idToken: googleUser.getAuthResponse().id_token
            };

            return(
                new User(details, [])
            );
        };

        User.prototype.addDailyRecordItem = function(item){
            this.dailyRecords.push(item);
        }

        return (User);

    }
})();