'use strict';

(function () {

    /*
    |------------------------------------------------------------------------------
    | Initialize Framework7
    | For more parameters visit https://framework7.io/docs/init-app.html
    |------------------------------------------------------------------------------
    */

    window.myApp = new Framework7({
        cache: false,
        init: false,
        material: true,
        pushState: true,
        modalTitle: "Bi'SesVar",
        notificationCloseButtonText: 'Tamam',
        scrollTopOnNavbarClick: true,
        onPageInit: function (app, page) {
            if (page.name.indexOf("player") > -1) {
                UtilityCommands.HideBanner();
                //UtilityCommands.ShowInterstitial();
            }
            window.FirebasePlugin.setScreenName(page.name);
        },
        onPageBeforeRemove: function (app, page) {
            if (page.name.indexOf("player") > -1) {
                UtilityCommands.ShowBanner();
            }
        }
    });

    /*
    |------------------------------------------------------------------------------
    | Initialize Main View
    |------------------------------------------------------------------------------
    */

    window.mainView = myApp.addView('.view-main');

    /*
    |------------------------------------------------------------------------------
    | Assign Dom7 Global Function to a variable $$ to prevent conflicts with other
    | libraries like jQuery or Zepto.
    |------------------------------------------------------------------------------
    */

    window.$$ = Dom7;

})();

/*
|------------------------------------------------------------------------------
| Function performed on every AJAX request
|------------------------------------------------------------------------------
*/

$$(document).on('ajaxStart', function (e) {
    myApp.showIndicator();
});

$$(document).on('ajaxError', function (e) {
    UtilityCommands.ShowError();
});


$$(document).on('ajaxComplete', function (e) {
    myApp.hideIndicator();
});

/* Sound List */
$$('body').on('click', ".page[data-page=sound-detail] [name='liGoDetail']", function (e) {
    e.preventDefault();
    var ndx = $(this).attr("ndx");
    var catId = $(this).attr("catId");

    mainView.router.load({
        url: 'player.html?index=' + ndx + '&catId=' + catId
    });
    return false;
});

/* Category List */
$$('body').on('click', ".page[data-page=category-detail] [name='liGoDetail']", function (e) {
    var ndx = $(this).attr("ndx");
    mainView.router.load({
        url: 'sound-list.html?index=' + ndx
    });
});

/* Most Favorites */
$$('body').on('click', " .page[data-page=most-favorites] [name='liGoDetail']", function (e) {
    var ndx = $(this).attr("ndx");
    mainView.router.load({
        url: 'player-favorites.html?index=' + ndx
    });
});

/* All Content List */
$$('body').on('click', ".page[data-page=category-detail] [name='btnSelectAll'], ", function (e) {
    e.preventDefault();
    var ndx = $(".page[data-page=category-detail] [name='btnSelectAll']").val();
    mainView.router.load({
        url: 'sound-list.html?index=' + ndx
    });
});

/* Rate App */
$$('body').on('click', "[name='btnRateApp']", function (e) {
    UtilityCommands.OpenAppRate();
});
