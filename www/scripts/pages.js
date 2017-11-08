'use strict';

/*
|------------------------------------------------------------------------------
| Contact Us
|------------------------------------------------------------------------------
*/

myApp.onPageInit('contact-us', function (page) {
    /* Load Map */
    $(function () {
        var map = new GMaps({
            el: '#map',
            lat: 37.441169,
            lng: -122.143249,
            zoom: 14,
            zoomControl: true,
            zoomControlOpt: {
                style: 'SMALL',
                position: 'TOP_LEFT'
            },
            panControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            overviewMapControl: false
        });

        map.addMarker({
            lat: 37.441169,
            lng: -122.143249,
            icon: {
                path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
                fillColor: '#DBBD31',
                fillOpacity: 1,
                strokeColor: '#000000',
                strokeWeight: 2,
                scale: 1
            },
            animation: google.maps.Animation.DROP
        });

        map.addStyle({
            styledMapName: 'Light Monochrome',
            styles: snazzyMaps.lightMonochrome,
            mapTypeId: 'lightMonochrome'
        });

        map.setStyle('lightMonochrome');
    });

    /* Validate & Submit Form */
    $('.popup-contact-us-write form[name=write-us]').validate({
        rules: {
            name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            subject: {
                required: true
            },
            message: {
                required: true
            }
        },
        messages: {
            name: {
                required: 'Please enter name.'
            },
            email: {
                required: 'Please enter email address.',
                email: 'Please enter a valid email address.'
            },
            subject: {
                required: 'Please enter subject.'
            },
            message: {
                required: 'Please enter message.'
            }
        },
        onkeyup: false,
        errorElement: 'div',
        errorPlacement: function (error, element) {
            error.appendTo(element.parent().siblings('.input-error'));
        },
        submitHandler: function (form) {
            myApp.addNotification({
                message: 'Thank you for contacting us. We will get back to you soon.',
                hold: 3000,
                button: {
                    text: ''
                }
            });
            myApp.closeModal('.popup-contact-us-write');
        }
    });
});

/*
|------------------------------------------------------------------------------
| Category Detail
|------------------------------------------------------------------------------
*/

myApp.onPageInit('category-detail', function (page) {
    var url = UtilityCommands.ServerUrl() + "Service/GetCategoriesWCategoryTypes?typeId=" + page.query.index;
    $.post(url, function (data) {
        if (data.status) {
            $(".page[data-page=category-detail] [name='divTypeName']").text(data.mainData[0].TypeName);
            $(".page[data-page=category-detail] [name='divTypeDetail']").text(data.mainData[0].TypeDetail);
            $(".page[data-page=category-detail] [name='btnSelectAll']").text("Tüm '" + data.mainData[0].TypeName + "' sesleri");

            var elem = $(".page[data-page=category-detail] [name='divResults']");
            elem.html("");
            $(data.innerData).each(function (index, value) {
                var vl = $(".page[data-page=category-detail] [name='btnSelectAll']");
                vl.val(vl.val() + ";" + value.Id);
                var node = "<li name='liGoDetail' id='cat" + value.Id + "' ndx='" + value.Id + "'>";
                node += '<div class="item-content">';
                node += '<div class="item-inner">';
                node += '<div class="item-title">' + value.Title + '</div>';
                node += '</div>';
                node += '</div>';
                node += '</li>';
                elem.append(node);
            });
        }
        else {
            UtilityCommands.ShowError();
        }
    });


});



/*
|------------------------------------------------------------------------------
| Sound List
|------------------------------------------------------------------------------
*/

myApp.onPageInit('sound-detail', function (page) {

    var url = UtilityCommands.ServerUrl() + "Service/GetContentsWCategories?catId=" + page.query.index;
    $.post(url, function (data) {
        if (data.status) {
            var elem = $(".page[data-page=sound-detail] [name='divResults']");
            elem.html("");
            $(data.innerData).each(function (index, value) {
                var node = "<li name='liGoDetail' catId='" + page.query.index + "' id='sound" + value.Id + "' ndx='" + value.Id + "'>";
                node += '<div class="item-content">';
                node += '<div class="item-inner">';
                node += '<div class="item-title">' + value.Title + '</div>';
                node += '</div>';
                node += '</div>';
                node += '</li>';
                elem.append(node);
            });
        }
        else {
            UtilityCommands.ShowError();
        }
    });

    ///* All Content List*/
    //$$('body').on('click', ".page[data-page=category-detail] [name='btnSelectAll']", function () {
    //    e.preventDefault();
    //    alert($(".page[data-page=category-detail] [name='btnSelectAll']").val());
    //});

    /* Player */
    //$$(".page[data-page=sound-detail] [name='liGoDetail']").on('click', function (e) {
    //$(".page[data-page=sound-detail] [name='liGoDetail']").on("submit", function(e){

});


/*
|------------------------------------------------------------------------------
| Most Favorites
|------------------------------------------------------------------------------
*/

myApp.onPageInit('most-favorites', function (page) {

    var url = UtilityCommands.ServerUrl() + "Service/GetMostShared";
    $.post(url, function (data) {
        if (data.status) {
            //$(".page[data-page=most-favorites] [name='divTypeName']").text(data.mainData[0].TypeName);
            //$(".page[data-page=most-favorites] [name='divTypeDetail']").text(data.mainData[0].TypeDetail);
            //$(".page[data-page=most-favorites] [name='btnSelectAll']").text("Tüm '" + data.mainData[0].TypeName + "' sesleri");

            var elem = $(".page[data-page=most-favorites] [name='divResults']");
            elem.html("");
            $(data.innerData).each(function (index, value) {
                var node = "<li name='liGoDetail' id='cat" + value.Id + "' ndx='" + value.Id + "'>";
                node += '<div class="item-content">';
                node += '<div class="item-inner">';
                node += '<div class="item-title">' + value.Title + '</div>';
                //node += '<div class="item-title">' + value.Count + '</div>';
                node += '</div>';
                node += '</div>';
                node += '</li>';
                elem.append(node);
            });
        }
        else {
            UtilityCommands.ShowError();
        }
    });
});



/*
|------------------------------------------------------------------------------
| Player
|------------------------------------------------------------------------------
*/

myApp.onPageInit('player', function (page) {
    UtilityCommands.HideBanner();

    var control = document.getElementById('js-control'),
    controlButton = document.getElementById('js-control-button'),
    hdnPlayedId = $("#hdnPlayedId"),
    playerElement = document.getElementById('ctrlAudio'),
    btnPlayPause = $("#btnPlayPause");

    /* Play - Pause Button */
    $$('.page[data-page=player] #btnPlayPause').on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass("morph-pause")) {
            StartPlayer();
        }
        else {
            StopPlayer();
        }
    });

    playerElement.addEventListener('ended', function (e) {
        e.preventDefault();

        StopPlayer();
    });

    /* Share Button */
    $$('.page[data-page=player] #btnShare').on('click', function (e) {
        e.preventDefault();

        StopPlayer();

        var lastFile = playerElement.src;
        var SoundId = playerElement.getAttribute("SoundId");

        var options = {
            message: 'senin için BiSesVar',
            files: [lastFile],
            chooserTitle: 'Hangi uygulamada paylaşalım?'
        }

        var onSuccess = function (result) {
            var url = UtilityCommands.ServerUrl() + "Service/PostShared?id=" + SoundId;
            $.post(url, function (data) {
               
            });
        }

        window.plugins.socialsharing.shareWithOptions(options, onSuccess, null);
    });

    /* Next Button */
    $$('.page[data-page=player] #btnNext').on('click', function (e) {
        e.preventDefault();

        StopPlayer();

        var url = UtilityCommands.ServerUrl() + "Service/GetContentsWCategoriesForPlay?catId=" + page.query.catId + "&playedId=" + hdnPlayedId.val();

        $.post(url, function (data) {
            if (data.status) {
                UtilityCommands.PreparePlayer(data.innerData[0].Title, data.innerData[0].Detail, data.innerData[0].Path, data.innerData[0].Id);
                UtilityCommands.ShowInterstitial();
            }
            else {
                UtilityCommands.ShowAlert(data.innerData);
            }
        });
    });

    var url = UtilityCommands.ServerUrl() + "Service/GetContentForPlay?contentId=" + page.query.index + "&playedId=" + hdnPlayedId.val();

    $.post(url, function (data) {
        if (data.status) {
            UtilityCommands.PreparePlayer(data.innerData[0].Title, data.innerData[0].Detail, data.innerData[0].Path, data.innerData[0].Id);
        }
        else {
            UtilityCommands.ShowError();
        }
    });

    function StopPlayer() {
        btnPlayPause.removeClass("morph-play").addClass("morph-pause");
        control.classList.add('is-paused');
        playerElement.pause();
        playerElement.currentTime = 0;
    }

    function StartPlayer() {
        btnPlayPause.addClass("morph-play").removeClass("morph-pause");
        control.classList.remove('is-paused');
        playerElement.play();
    }


});


/*
|------------------------------------------------------------------------------
| Player Favorites
|------------------------------------------------------------------------------
*/

myApp.onPageInit('player-favorites', function (page) {
    UtilityCommands.HideBanner();

    var control = document.getElementById('js-control'),
    controlButton = document.getElementById('js-control-button'),
    hdnPlayedId = $("#hdnPlayedId"),
    playerElement = document.getElementById('ctrlAudio'),
    btnPlayPause = $("#btnPlayPause");

    /* Play - Pause Button */
    $$('.page[data-page=player-favorites] #btnPlayPause').on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass("morph-pause")) {
            StartPlayer();
        }
        else {
            StopPlayer();
        }
    });

    playerElement.addEventListener('ended', function (e) {
        e.preventDefault();

        StopPlayer();
    });

    /* Share Button */
    $$('.page[data-page=player-favorites] #btnShare').on('click', function (e) {
        e.preventDefault();

        StopPlayer();

        var lastFile = playerElement.src;
        var SoundId = playerElement.getAttribute("SoundId");

        var options = {
            message: 'senin için BiSesVar',
            files: [lastFile],
            chooserTitle: 'Hangi uygulamada paylaşalım?'
        }

        var onSuccess = function (result) {
            var url = UtilityCommands.ServerUrl() + "Service/PostShared?id=" + SoundId;
            $.post(url, function (data) {
                if (!data.result) {
                    UtilityCommands.ShowAlert("Paylaşım kaydedilemedi. Lütfen bizimle iletişime geçiniz.");
                }
            });
        }

        window.plugins.socialsharing.shareWithOptions(options, onSuccess, null);
    });

    /* Next Button */
    $$('.page[data-page=player-favorites] #btnNext').on('click', function (e) {
        e.preventDefault();

        StopPlayer();

        var url = UtilityCommands.ServerUrl() + "Service/GetMostSharedForPlay?&playedId=" + hdnPlayedId.val();

        $.post(url, function (data) {
            if (data.status) {
                UtilityCommands.PreparePlayer(data.innerData[0].Title, data.innerData[0].Detail, data.innerData[0].Path, data.innerData[0].Id);
                UtilityCommands.ShowInterstitial();
            }
            else {
                UtilityCommands.ShowAlert(data.innerData);
            }
        });
    });

    var url = UtilityCommands.ServerUrl() + "Service/GetContentForPlay?contentId=" + page.query.index;

    $.post(url, function (data) {
        if (data.status) {
            UtilityCommands.PreparePlayer(data.innerData[0].Title, data.innerData[0].Detail, data.innerData[0].Path, data.innerData[0].Id);
        }
        else {
            UtilityCommands.ShowError();
        }
    });

    function StopPlayer() {
        btnPlayPause.removeClass("morph-play").addClass("morph-pause");
        control.classList.add('is-paused');
        playerElement.pause();
        playerElement.currentTime = 0;
    }

    function StartPlayer() {
        btnPlayPause.addClass("morph-play").removeClass("morph-pause");
        control.classList.remove('is-paused');
        playerElement.play();
    }


});


/*
|------------------------------------------------------------------------------
| Player Lucky
|------------------------------------------------------------------------------
*/

myApp.onPageInit('player-lucky', function (page) {
    UtilityCommands.HideBanner();

    var control = document.getElementById('js-control'),
    controlButton = document.getElementById('js-control-button'),
    hdnPlayedId = $("#hdnPlayedId"),
    playerElement = document.getElementById('ctrlAudio'),
    btnPlayPause = $("#btnPlayPause");

    /* Play - Pause Button */
    $$('.page[data-page=player-lucky] #btnPlayPause').on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass("morph-pause")) {
            StartPlayer();
        }
        else {
            StopPlayer();
        }
    });

    playerElement.addEventListener('ended', function (e) {
        e.preventDefault();

        StopPlayer();
    });

    /* Share Button */
    $$('.page[data-page=player-lucky] #btnShare').on('click', function (e) {
        e.preventDefault();

        StopPlayer();

        var lastFile = playerElement.src;
        var SoundId = playerElement.getAttribute("SoundId");

        var options = {
            message: 'senin için BiSesVar',
            files: [lastFile],
            chooserTitle: 'Hangi uygulamada paylaşalım?'
        }

        var onSuccess = function (result) {
            var url = UtilityCommands.ServerUrl() + "Service/PostShared?id=" + SoundId;
            $.post(url, function (data) {
                if (!data.result) {
                    UtilityCommands.ShowAlert("Paylaşım kaydedilemedi. Lütfen bizimle iletişime geçiniz.");
                }
            });
        }

        window.plugins.socialsharing.shareWithOptions(options, onSuccess, null);
    });

    /* Next Button */
    $$('.page[data-page=player-lucky] #btnNext').on('click', function (e) {
        e.preventDefault();

        StopPlayer();

        var url = UtilityCommands.ServerUrl() + "Service/GetContentsWFullShuffle?playedId=" + hdnPlayedId.val();

        $.post(url, function (data) {
            if (data.status) {
                UtilityCommands.PreparePlayer(data.innerData[0].Title, data.innerData[0].Detail, data.innerData[0].Path, data.innerData[0].Id);
                UtilityCommands.ShowInterstitial();
            }
            else {
                UtilityCommands.ShowAlert(data.innerData);
            }
        });
    });

    var url = UtilityCommands.ServerUrl() + "Service/GetContentsWFullShuffle?playedId=0";

    $.post(url, function (data) {
        if (data.status) {
            UtilityCommands.PreparePlayer(data.innerData[0].Title, data.innerData[0].Detail, data.innerData[0].Path, data.innerData[0].Id);
        }
        else {
            UtilityCommands.ShowError();
        }
    });

    function StopPlayer() {
        btnPlayPause.removeClass("morph-play").addClass("morph-pause");
        control.classList.add('is-paused');
        playerElement.pause();
        playerElement.currentTime = 0;
    }

    function StartPlayer() {
        btnPlayPause.addClass("morph-play").removeClass("morph-pause");
        control.classList.remove('is-paused');
        playerElement.play();
    }


});

/*
|------------------------------------------------------------------------------
| Feedback
|------------------------------------------------------------------------------
*/

myApp.onPageInit('feedback', function (page) {
    $$('.page[data-page=feedback] form[name=feedback]').on('submit', function (e) {
        e.preventDefault();
        myApp.addNotification({
            message: 'Thank you for your valuable feedback.',
            hold: 2000,
            button: {
                text: ''
            }
        });
        mainView.router.load({
            url: 'home.html'
        });
    });
});

/*
|------------------------------------------------------------------------------
| Home
|------------------------------------------------------------------------------
*/

myApp.onPageInit('home', function (page) {

    var url = UtilityCommands.ServerUrl() + "Service/GetCategoryTypes";
    $.post(url, function (data) {
        if (data.status) {
            var elem = $(".page[data-page=home] .features-list");
            elem.html("");
            $(data.innerData).each(function (index, value) {
                var node = "<li name='liGoDetail' ndx='" + value.Id + "'>";
                node += '<div class="item-content">';
                node += '<div class="item-media">';
                node += '<i class="material-icons">' + value.Icon + '</i>';
                node += '</div>';
                node += '<div class="item-inner">';
                node += '<div class="item-title-row">';
                node += '<div class="item-title">' + value.Title + '</div>';
                node += '</div>';
                node += '<div class="item-text">' + value.Desc + ' <br /> İçerikler : ' + value.ContentCount + ' </div>';
                node += '</div>';
                node += '</div>';
                node += '</li>';
                elem.append(node);
            });
        }
        else {
            UtilityCommands.ShowError();
        }
    });

    /* Category Detail */
    $$('body').on('click', ".page[data-page=home] [name='liGoDetail']", function () {
        var ndx = $(this).attr("ndx");
        mainView.router.load({
            url: 'category-detail.html?index=' + ndx
        });
    });
});

/*
|------------------------------------------------------------------------------
| Settings
|------------------------------------------------------------------------------
*/

myApp.onPageInit('settings', function (page) {
    /* Share App */
    $$('.page[data-page=settings] [data-action=share-app]').on('click', function (e) {
        e.preventDefault();
        var buttons = [
            {
                text: 'Share Nectar',
                label: true
            },
            {
                text: '<i class="fa fa-fw fa-lg fa-envelope-o color-red"></i>&emsp;<span>Email</span>'
            },
            {
                text: '<i class="fa fa-fw fa-lg fa-facebook color-facebook"></i>&emsp;<span>Facebook</span>'
            },
            {
                text: '<i class="fa fa-fw fa-lg fa-google-plus color-googleplus"></i>&emsp;<span>Google+</span>'
            },
            {
                text: '<i class="fa fa-fw fa-lg fa-linkedin color-linkedin"></i>&emsp;<span>LinkedIn</span>'
            },
            {
                text: '<i class="fa fa-fw fa-lg fa-twitter color-twitter"></i>&emsp;<span>Twitter</span>'
            },
            {
                text: '<i class="fa fa-fw fa-lg fa-whatsapp color-whatsapp"></i>&emsp;<span>WhatsApp</span>'
            }
        ];
        myApp.actions(buttons);
    });
});

/*
|------------------------------------------------------------------------------
| Walkthrough
|------------------------------------------------------------------------------
*/

myApp.onPageInit('walkthrough', function (page) {
    var url = UtilityCommands.ServerUrl() + "Service/GetAndroidVersion";
    $.post(url, function (data) {
        if (data.status) {
            DbCommands.SetInfo('versiyon', data.innerData.Value, 2, null);
            DbCommands.SetInfo('versiyon tarihi', data.innerData.InsertDate, 2, null);
        }
        else {
            UtilityCommands.ShowError();
        }
    });



    /* Initialize Slider */
    myApp.swiper('.page[data-page=walkthrough] .walkthrough-container', {
        pagination: '.page[data-page=walkthrough] .walkthrough-pagination',
        paginationClickable: true,
    });

    /* Recipe Photos Browser */
    $$('body').on('click', '.page[data-page=walkthrough] .walkthrough-actions', function () {
        //DbCommands.Init();
        DbCommands.SetInfo('acilis', '1', 1, function (data) {
            if (data) {
                mainView.router.load({
                    url: 'home.html'
                });
            }
            else {
                UtilityCommands.ShowError();
            }
        })
    });
});