'use strict';

myApp.onPageInit('*', function (page) {

    /*
    |------------------------------------------------------------------------------
    | Chips
    |------------------------------------------------------------------------------
    */

    /* Delete Chip */
    $$('.chip-delete').on('click', function (e) {
        e.preventDefault();
        var chip = $$(this).parents('.chip');
        if ($$(this).hasClass('confirm')) {
            myApp.confirm('Do you want to delete this?', function () {
                chip.remove();
            });
        }
        else {
            chip.remove();
        }
    });

    /*
    |------------------------------------------------------------------------------
    | Side Panel
    |------------------------------------------------------------------------------
    */

    $$('.panel-left').on('open', function () {
        $$('.hamburger').addClass('is-active');
    });

    $$('.panel-left').on('close', function () {
        $$('.hamburger').removeClass('is-active');
    });

    /*
    |------------------------------------------------------------------------------
    | Tooltip
    |------------------------------------------------------------------------------
    */

    $('[title]').tooltipster({
        theme: 'tooltipster-borderless'
    });

    $('[data-tooltip-content]').tooltipster({
        interactive: true,
        theme: 'tooltipster-borderless'
    });

});

/*
|------------------------------------------------------------------------------
| Helpers
|------------------------------------------------------------------------------
*/

/* nl2br Method Implementation */
Dom7.nl2br = function (str) {
    return str.replace(/(\r\n|\n\r|\r|\n)/g, '<br>');
};

/* br2nl Method Implementation */
Dom7.br2nl = function (str) {
    return str.replace(/<br>/g, '\r');
};