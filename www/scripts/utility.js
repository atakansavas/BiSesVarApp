var UtilityCommands = function () {
    var _LastSelectedCatId;
    var _LastSelectedSoundId;
    var _LastTopCoordinate;
    var _PlayedIds = [];
    var _xId;

    var StartPlayer = function () {
        $("#btnPlayPause").addClass("morph-play").removeClass("morph-pause");
        document.getElementById('js-control').classList.remove('is-paused');
        document.getElementById('ctrlAudio').play();
    }

    var StopPlayer = function () {
        $("#btnPlayPause").removeClass("morph-play").addClass("morph-pause");
        document.getElementById('js-control').classList.add('is-paused');
        document.getElementById('ctrlAudio').pause();
        document.getElementById('ctrlAudio').currentTime = 0;
    }

    var registerAdEvents = function () {
        document.addEventListener('onReceiveAd', function () { });
        document.addEventListener('onFailedToReceiveAd', function (data) { });
        document.addEventListener('onPresentAd', function () { });
        document.addEventListener('onDismissAd', function () { });
        document.addEventListener('onLeaveToAd', function () { });
        document.addEventListener('onReceiveInterstitialAd', function () { });
        document.addEventListener('onPresentInterstitialAd', function () { });
        document.addEventListener('onDismissInterstitialAd', function () {
            window.plugins.AdMob.createInterstitialView();			//REMOVE THESE 2 LINES IF USING AUTOSHOW
            window.plugins.AdMob.requestInterstitialAd();			//get the next one ready only after the current one is closed
        });
    }

    return {

        CheckServerStatus: function () {
            var url = UtilityCommands.ServerUrl() + "Utility/GetServerStatus";

            $.ajaxSetup({ async: false });
            $.post(url, function (data) {
                return data.result;
            })
            .fail(function () {
                return false;
            });
            $.ajaxSetup({ async: true });
        },

        GetQueryString: function (name) {
            var url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        },

        UpdateLeftMenu: function () {
            //Sol menü varsa içeriğini yükler.
            if ($("[name='divSolMenu']").length > 0) {
                $("[name='divSolMenu']").load("content/leftmenu.html", function (response, status, xhr) {
                    if (status == "error") {
                        var msg = "Çok üzgünüm, hata oluştu. Yan sayfa yüklenemediği için uygulama kapanacak. Uygulamaya yorum olarak hatayı yazabilirsin. Böylece düzeltebilirim.";
                        alert(msg + xhr.status + " " + xhr.statusText);
                    }
                    else {
                        console.log("Sol menü yüklendi.");
                    }
                });
            }
        },

        Init: function () {
            $.post(UtilityCommands.ServerUrl() + "Service/GetAndroidVersion", function (data) {
                if (data.status) {
                    DbCommands.GetInfo(2, function (androidVer) {
                        if (androidVer.innerData != data.innerData.Value) {
                            myApp.alert("Uygulamanın " + data.innerData.Value + " sürümü yayınlanmıştır. Store'dan güncelleyebilirsiniz.", 'Güncelleme!');
                        }
                    });
                }
                else {
                    UtilityCommands.ShowError();
                }
            });


            DbCommands.GetInfo(3, function (data) {
                var lastDate = data.innerData;
                $.post(UtilityCommands.ServerUrl() + "Service/GetNews?lastDate=" + lastDate, function (data) {
                    $(data.innerData).each(function (index, value) {
                        myApp.alert(value.Desc, value.Title);
                    });
                });
            })
        },

        Ready: function () {
            //Detaya gitme butonu.
            $(document).on('click', '.liGoPlayer', function () {
                UtilityCommands.UpdateParameter($(this).attr("ndx"), 2);
                $.mobile.changePage("player.html?xid=" + $(this).attr("ndx"), { transition: "slidedown" });
            });
        },

        IsValidMail: function (email) {
            var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
            return pattern.test(email);
            //var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            //return regex.test(email);
        },

        OpenAppRate: function () {
            var devicePlatform = device.platform;

            // Check which platform
            if (devicePlatform == "iOS") {
                cordova.plugins.market.open('yourappname')
            } else if (devicePlatform == "Android") {
                cordova.plugins.market.open('io.atakansavas.bisesvar')
            }
        },

        ServerUrl: function () {
            return "http://bisesvar.xyz/";
            //return "http://localhost:59939/";
        },

        GetDate: function () {
            var date = new Date();
            var day = date.getDate();       // yields date
            var month = date.getMonth() + 1;    // yields month (add one as '.getMonth()' is zero indexed)
            var year = date.getFullYear();  // yields year
            var hour = date.getHours();     // yields hours 
            var minute = date.getMinutes(); // yields minutes
            var second = date.getSeconds(); // yields seconds

            // After this construct a string with the above results as below
            return day + "/" + month + "/" + year + " " + hour + ':' + minute + ':' + second;
        },

        ShowAlert: function (message) {
            myApp.addNotification({
                message: message,
                hold: 4000,
                button: {
                    text: 'Anladım',
                    color: 'lightgreen'
                }
            });
        },

        ShowError: function () {
            myApp.addNotification({
                message: 'En son yaptığınız işlemde hata oluştu. İletişim formundan bize bu hatayı bildirirseniz en kısa sürede düzeltmemize yardımcı olursunuz.',
                hold: 4000,
                button: {
                    text: 'Tamam',
                    color: 'lightgreen'
                }
            });
        },

        ShowBanner: function () {
            window.plugins.AdMob.createBannerView();
        },

        HideBanner: function () {
            window.plugins.AdMob.destroyBannerView();
        },

        ShowInterstitial: function () {
            window.plugins.AdMob.showInterstitialAd();
        },

        InitAd: function () {
            if (window.plugins && window.plugins.AdMob) {
                var ad_units = {
                    ios: {
                        banner: 'ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx',		//PUT ADMOB ADCODE HERE
                        interstitial: 'ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx'	//PUT ADMOB ADCODE HERE
                    },
                    android: {
                        banner: 'ca-app-pub-3404151890483150/8372751291',		//PUT ADMOB ADCODE HERE
                        interstitial: 'ca-app-pub-3404151890483150/1579757015'	//PUT ADMOB ADCODE HERE
                    }
                };
                var admobid = (/(android)/i.test(navigator.userAgent)) ? ad_units.android : ad_units.ios;

                window.plugins.AdMob.setOptions({
                    publisherId: admobid.banner,
                    interstitialAdId: admobid.interstitial,
                    adSize: window.plugins.AdMob.AD_SIZE.SMART_BANNER,	//use SMART_BANNER, BANNER, LARGE_BANNER, IAB_MRECT, IAB_BANNER, IAB_LEADERBOARD
                    bannerAtTop: false, // set to true, to put banner at top
                    overlap: true, // banner will overlap webview
                    offsetTopBar: false, // set to true to avoid ios7 status bar overlap
                    isTesting: false, // receiving test ad
                    autoShow: false // auto show interstitial ad when loaded
                });

                registerAdEvents();
                window.plugins.AdMob.createInterstitialView();	//get the interstitials ready to be shown
                window.plugins.AdMob.requestInterstitialAd();
            } else {
                //alert( 'admob plugin not ready' );
            }
        },

        PreparePlayer: function (Title, Desc, Path, Id) {
            $("#txtTitle").text(Title);
            $("#txtDesc").text(Desc);
            $("#hdnPlayedId").val($("#hdnPlayedId").val() + ";" + Id);

            var fullPath = UtilityCommands.ServerUrl() + "Uploads/" + Path;
            var playerElement = document.getElementById('ctrlAudio');
            playerElement.setAttribute("SoundId", Id);

            //playerElement.src = fullPath;
            //return;

            var localFileName = fullPath.substring(fullPath.lastIndexOf('/') + 1);
            var localPath = cordova.file.dataDirectory + localFileName;
            //Dosyanın var olup olmadığı kontrol ediliyor.
            window.resolveLocalFileSystemURL(localPath,
                 function fileExists(fileEntry) {
                     console.log("Dosya zaten var  : " + localPath);
                     playerElement.src = localPath;
                     StartPlayer();
                 },
                 function fileDoesNotExist() {
                     console.log("Dosya indiriliyor  : " + fullPath);

                     var ft = new FileTransfer();
                     ft.download(fullPath,
                         localPath, function (entry) {
                             playerElement.src = localPath;
                             StartPlayer();
                         });
                 });


        },

    };
}();
