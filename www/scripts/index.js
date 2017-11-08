// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints,
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        //// Initialize Firebase
        //var config = {
        //    apiKey: "AIzaSyBaKg_jugnWgVDx8BqIIkRBD93q9VHnJS8",
        //    authDomain: "bi-ses-var.firebaseapp.com",
        //    databaseURL: "https://bi-ses-var.firebaseio.com",
        //    projectId: "bi-ses-var",
        //    storageBucket: "bi-ses-var.appspot.com",
        //    messagingSenderId: "531441806629"
        //};
        //firebase.initializeApp(config);

      

        //firebase.auth().onAuthStateChanged(function (user) {
        //    if (user) {
        //        // User is signed in.
        //        var isAnonymous = user.isAnonymous;
        //        var uid = user.uid;
        //        // [START_EXCLUDE]
        //        alert(uid);
        //        // [END_EXCLUDE]
        //    } else {
        //        // User is signed out.
        //        // [START_EXCLUDE]
            
        //        // [END_EXCLUDE]
        //    }
        //});

        firebase.auth().signInAnonymously();

        //DbCommands.ClearDatabase();
        var url = UtilityCommands.ServerUrl() + "Service/GetServerStatus";
        $.post(url, function (data) {
            if (data.status) {
                $.when(UtilityCommands.InitAd())
                    .then(function () {
                        DbCommands.Init();
                        DbCommands.GetInfo(1, function (data) {
                            if (data.count === 0) {
                                //Uygulama ilk defa açılıyorsa.
                                mainView.router.load({
                                    url: 'walkthrough.html'
                                });
                            }
                            else {
                                //Uygulama önceden açıldıysa.
                                //UtilityCommands.Init();
                                DbCommands.SetInfo('son açılış tarihi', UtilityCommands.GetDate(), 3, null);

                                mainView.router.load({
                                    url: 'home.html'
                                });
                            }
                        })
                    }
                );
            }
            else {
                UtilityCommands.ShowAlert("Sunucumuzda bakım var. Lütfen birazdan tekrar deneyin.");
            }
        })
        .fail(function () {
            UtilityCommands.ShowAlert("Sunucuya bağlanırken hata oluştu.");
        });
    };
})();