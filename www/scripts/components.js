'use strict';

/*
|------------------------------------------------------------------------------
| Action Sheet
|------------------------------------------------------------------------------
*/

myApp.onPageInit('action-sheet', function(page) {

	$$('body').on('click', '.page[data-page=action-sheet] [data-action=open-action-sheet]', function(e) {
		e.preventDefault();

		var target = this; /* For Action Sheet to Popover conversion on tablets */
		
		/* Define Action Sheet Buttons */
		var buttons = [
			[
				{
					text: 'Share Nectar',
					label: true
				}
			],
			[
				{
					text: '<i class="fa fa-fw fa-lg fa-comment-o color-blue"></i>&emsp;<span>SMS</span>',
					onClick: function() {
						myApp.prompt('Mobile Number', function(value) {
							if (value.trim().length > 0) {
								window.open('sms:' + value);
							}
						});
					}
				},
				{
					text: '<i class="fa fa-fw fa-lg fa-envelope-o color-red"></i>&emsp;<span>Email</span>',
					onClick: function() {
						myApp.prompt('Email Address', function(value) {
							if (value.trim().length > 0) {
								window.open('mailto:' + value);
							}
						});
					}
				},
				{
					text: '<i class="fa fa-fw fa-lg fa-print color-green"></i>&emsp;<span>Print</span>',
					disabled: true
				}
			],
			[
				{
					text: '<i class="fa fa-fw fa-lg fa-facebook color-facebook"></i>&emsp;<span>Facebook</span>',
					onClick: function() {
						window.open('https://facebook.com', '_blank');
					}
				},
				{
					text: '<i class="fa fa-fw fa-lg fa-twitter color-twitter"></i>&emsp;<span>Twitter</span>',
					onClick: function() {
						window.open('https://twitter.com', '_blank');
					}
				},
				{
					text: '<i class="fa fa-fw fa-lg fa-whatsapp color-whatsapp"></i>&emsp;<span>WhatsApp</span>',
					onClick: function() {
						window.open('whatsapp://send');
					}
				}
			],
			[
				{
						text: 'Cancel',
            color: 'red'
        }
			]
		];

		/* Open Action Sheet */
		myApp.actions(target, buttons);
	});

});

/*
|------------------------------------------------------------------------------
| Autocomplete
|------------------------------------------------------------------------------
*/

myApp.onPageInit('autocomplete', function(page) {

	/* Populate Autocomplete Array */
	var fruits = [ 'Apple', 'Apricot', 'Banana', 'Blackberry', 'Cherry', 'Grapes', 'Guava', 'Mango', 'Mulberry', 'Orange', 'Papaya', 'Peach', 'Pear', 'Pineapple', 'Pomegranate', 'Strawberry', 'Tamarind' ];

	/* Single Value Dropdown Autocomplete */
	var singleValueDropdownAutocomplete = myApp.autocomplete({
		dropdownPlaceholderText: "Try to type 'Apple'",
		input: '.page[data-page=autocomplete] #single-value-dropdown-autocomplete',
		openIn: 'dropdown',
		source: function(autocomplete, query, render) {
			var results = [];
      if (query.length === 0) {
				render(results);
        return;
      }
      for (var i=0; i < fruits.length; i++) {
        if (fruits[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) {
					results.push(fruits[i]);
        }
			}
      render(results);
    }
	});

	/* Single Value Standalone Autocomplete */
	var singleValueStandaloneAutocomplete = myApp.autocomplete({
    autoFocus: true,
		backOnSelect: true,
		notFoundText: 'No such fruit found.',
		opener: $$('.page[data-page=autocomplete] #single-value-standalone-autocomplete'),
		openIn: 'page',
    source: function (autocomplete, query, render) {
      var results = [];
      for (var i=0; i < fruits.length; i++) {
        if (fruits[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) {
					results.push(fruits[i]);
        }
			}
      render(results);
    },
    onChange: function(autocomplete, value) {
      $$('.page[data-page=autocomplete] #single-value-standalone-autocomplete').find('.item-after').text(value[0]);
      $$('.page[data-page=autocomplete] #single-value-standalone-autocomplete').find('input').val(value[0]);
    }
	});

	/* Multiple Values Standalone Autocomplete */
	var multipleValuesStandaloneAutocomplete = myApp.autocomplete({
    autoFocus: true,
		multiple: true,
		notFoundText: 'No such fruit found.',
    opener: $$('.page[data-page=autocomplete] #multiple-values-standalone-autocomplete'),
    openIn: 'page',
    source: function (autocomplete, query, render) {
      var results = [];
      for (var i=0; i < fruits.length; i++) {
        if (fruits[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) {
					results.push(fruits[i]);
        }
			}
      render(results);
    },
    onChange: function(autocomplete, value) {
      $$('.page[data-page=autocomplete] #multiple-values-standalone-autocomplete').find('.item-after').text(value.join(', '));
      $$('.page[data-page=autocomplete] #multiple-values-standalone-autocomplete').find('input').val(value.join(', '));
    }
	});

});

/*
|------------------------------------------------------------------------------
| Calendar
|------------------------------------------------------------------------------
*/

myApp.onPageInit('calendar', function(page) {

	/* Basic Calendar */
	var calendarBasic = myApp.calendar({
    input: '.page[data-page=calendar] #calendar-basic'
	});

	/* Calendar with Custom Date Format */
	var calendarCustomDateFormat = myApp.calendar({
    dateFormat: 'DD, MM dd, yyyy',
		input: '.page[data-page=calendar] #calendar-custom-date-format'
	});

	/* Calendar with Multiple Dates */
	var calendarMultipleDates = myApp.calendar({
    dateFormat: 'M dd, yyyy',
		input: '.page[data-page=calendar] #calendar-multiple-dates',
    multiple: true
	});

	/* Calendar with Date Range */
	var calendarDateRange = myApp.calendar({
    dateFormat: 'dd MM yyyy',
		input: '.page[data-page=calendar] #calendar-date-range',
    rangePicker: true
	});

	/* Calendar with Disabled Dates */
	var dateToday = new Date();
	var dateWeekLater = new Date().setDate(dateToday.getDate() + 7);

	var calendarDisabledDates = myApp.calendar({
    dateFormat: 'MM dd, yyyy',
    disabled: {
      from: dateToday,
      to: dateWeekLater
    },
		input: '.page[data-page=calendar] #calendar-disabled-dates'
	});

});

/*
|------------------------------------------------------------------------------
| Form Validation
|------------------------------------------------------------------------------
*/

myApp.onPageInit('form-validation', function(page) {

	$('.page[data-page=form-validation] form[name=validation]').validate({
		rules: {
			name: {
				required: true
			},
			age: {
				required: true,
				range: [1, 100]
			},
			email: {
				required: true,
				email: true
			},
			url: {
				required: true,
				url: true
			},
			number: {
				required: true,
				number: true
			},
			digits: {
				required: true,
				digits: true
			},
			us_phone: {
				required: true,
				phoneUS: true
			},
			credit_card: {
				required: true,
				creditcard: true
			}
		},
    errorElement : 'div',
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().siblings('.input-error'));
		},
		submitHandler: function(form) {
			myApp.addNotification({
				message: 'Yay! All the fields are valid.',
				hold: 1500,
				button: {
					text: ''
				}
			});
		}
	});

});

/*
|------------------------------------------------------------------------------
| Hamburgers
|------------------------------------------------------------------------------
*/

myApp.onPageInit('hamburgers', function(page) {

	$$('body').on('click', '.page[data-page=hamburgers] .hamburgers a', function(e) {
		e.preventDefault();
		$(this).children('.hamburger').toggleClass('is-active');
	});

});

/*
|------------------------------------------------------------------------------
| Indexed List
|------------------------------------------------------------------------------
*/

myApp.onPageInit('indexed-list', function(page) {

	/* Initialize Search Bar */
	var mySearchbar = myApp.searchbar('.page[data-page=indexed-list] .searchbar', {
    searchList: '.page[data-page=indexed-list] .list-block-search',
    searchIn: '.page[data-page=indexed-list] .list-block-search .item-title'
	});

});

/*
|------------------------------------------------------------------------------
| Infinite Scroll
|------------------------------------------------------------------------------
*/

myApp.onPageInit('infinite-scroll', function(page) {

	/* Loading Flag */
	var loading = false;

	/* Last Loaded Index */
	var lastIndex = $$('.page[data-page=infinite-scroll] .list-block li').length;

	/* Max Items to Load */
	var maxItems = 100;

	/* Append Items per Load */
	var itemsPerLoad = 20;

	/* Attach 'infinite scroll' Event Handler */
	$$('.page[data-page=infinite-scroll] .infinite-scroll').on('infinite', function() {

		/* Exit, If Loading in Progress */
		if (loading) return;

		/* Set Loading Flag */
		loading = true;

		/* Emulate 1s Loading */
		setTimeout(function() {
			/* Reset Loading Flag */
			loading = false;

			if (lastIndex >= maxItems) {
				/* Nothing more to load, detach infinite scroll events to prevent unnecessary loadings */
				myApp.detachInfiniteScroll($$('.page[data-page=infinite-scroll] .infinite-scroll'));
				/* Remove Preloader */
				$$('.page[data-page=infinite-scroll] .infinite-scroll-preloader').remove();
				return;
			}
 
			/* Generate New Items HTML */
			var html = '';
			for (var i = lastIndex + 1; i <= lastIndex + itemsPerLoad; i++) {
				html += '<li><div class="item-content"><div class="item-inner"><div class="item-title">Item ' + i + '</div></div></div></li>';
			}
 
			/* Append New Items */
			$$('.page[data-page=infinite-scroll] .list-block ul').append(html);
 
			/* Update Last Loaded Index */
			lastIndex = $$('.page[data-page=infinite-scroll] .list-block li').length;
		}, 1000);
	});       

});

/*
|------------------------------------------------------------------------------
| Keypad
|------------------------------------------------------------------------------
*/

myApp.onPageInit('keypad', function(page) {

	var myNumpadLimitedValueLength = myApp.keypad({
    input: '.page[data-page=keypad] #numpad-limited-value-length',
		valueMaxLength: 2,
    dotButton: false
	});

});

/*
|------------------------------------------------------------------------------
| Modals
|------------------------------------------------------------------------------
*/

myApp.onPageInit('modals', function(page) {

	/* Alert with Text */
	$$('.page[data-page=modals] #modal-alert-text').on('click', function(e) {
		e.preventDefault();
		myApp.alert('Neque porro quisquam est qui.');
	});

	/* Alert with Title and Text */
	$$('.page[data-page=modals] #modal-alert-title-text').on('click', function(e) {
		e.preventDefault();
		myApp.alert('Neque porro quisquam est qui.', 'Lorem Ipsum');
	});

	/* Alert with Text and Callback */
	$$('.page[data-page=modals] #modal-alert-text-callback').on('click', function(e) {
		e.preventDefault();
		myApp.alert('Neque porro quisquam est qui.', function() {
			myApp.alert('Button Clicked!')
    });
	});

	/* Alert with Title, Text and Callback */
	$$('.page[data-page=modals] #modal-alert-title-text-callback').on('click', function(e) {
		e.preventDefault();
		myApp.alert('Neque porro quisquam est qui.', 'Lorem Ipsum', function() {
			myApp.alert('Button Clicked!', 'Lorem Ipsum');
    });
	});

	/* Confirm with Text and OK Callback */
	$$('.page[data-page=modals] #modal-confirm-text-ok-callback').on('click', function(e) {
		e.preventDefault();
		myApp.confirm('Are you sure?', function() {
			myApp.alert('You clicked OK button.');
    });
	});

	/* Confirm with Text, OK and Cancel Callbacks */
	$$('.page[data-page=modals] #modal-confirm-text-ok-cancel-callback').on('click', function(e) {
		e.preventDefault();
		myApp.confirm('Are you sure?', 
      function() {
        myApp.alert('You clicked OK button.');
      },
      function() {
        myApp.alert('You clicked Cancel button.');
      }
    );
	});

	/* Confirm with Title, Text and OK Callback */
	$$('.page[data-page=modals] #modal-confirm-title-text-ok-callback').on('click', function(e) {
		e.preventDefault();
		myApp.confirm('Are you sure?', 'Confirm', function() {
			myApp.alert('You clicked OK button.');
    });
	});

	/* Confirm with Title, Text, OK and Cancel Callbacks */
	$$('.page[data-page=modals] #modal-confirm-title-text-ok-cancel-callback').on('click', function(e) {
		e.preventDefault();
		myApp.confirm('Are you sure?', 'Confirm',
      function() {
        myApp.alert('You clicked OK button.');
      },
      function() {
        myApp.alert('You clicked Cancel button.');
      }
    );
	});

	/* Prompt with Text and OK Callback */
	$$('.page[data-page=modals] #modal-prompt-text-ok-callback').on('click', function(e) {
		e.preventDefault();
		myApp.prompt('What is your name?', function(value) {
			myApp.alert('Your name is ' + value + '. You clicked OK button.');
    });
	});

	/* Prompt with Text, OK and Cancel Callbacks */
	$$('.page[data-page=modals] #modal-prompt-text-ok-cancel-callback').on('click', function(e) {
		e.preventDefault();
		myApp.prompt('What is your name?', 
      function(value) {
        myApp.alert('Your name is ' + value + '. You clicked OK button.');
      },
      function(value) {
        myApp.alert('Your name is ' + value + '. You clicked Cancel button.');
      }
    );
	});

	/* Prompt with Title, Text and OK Callback */
	$$('.page[data-page=modals] #modal-prompt-title-text-ok-callback').on('click', function(e) {
		e.preventDefault();
		myApp.prompt('What is your name?', 'Identity Required', function(value) {
			myApp.alert('Your name is ' + value + '. You clicked OK button.');
    });
	});

	/* Prompt with Title, Text, OK and Cancel Callbacks */
	$$('.page[data-page=modals] #modal-prompt-title-text-ok-cancel-callback').on('click', function(e) {
		e.preventDefault();
		myApp.prompt('What is your name?', 'Identity Required', 
      function(value) {
        myApp.alert('Your name is ' + value + '. You clicked OK button.');
      },
      function(value) {
        myApp.alert('Your name is ' + value + '. You clicked Cancel button.');
      }
    );
	});

	/* Login Modal */
	$$('.page[data-page=modals] #modal-login').on('click', function(e) {
		e.preventDefault();
		myApp.modalLogin('Authentication Required', function(username, password) {
			myApp.alert('Your username is: ' + username);
			myApp.alert('Your password is: ' + password);
    });
	});

	/* Password Modal */
	$$('.page[data-page=modals] #modal-password').on('click', function(e) {
		e.preventDefault();
		myApp.modalPassword('Enter your password', function(password) {
			myApp.alert('Your password is: ' + password);
    });
	});

	/* Preloader */
	$$('.page[data-page=modals] #modal-preloader').on('click', function(e) {
		e.preventDefault();
		myApp.showPreloader();
    setTimeout(function() {
			myApp.hidePreloader();
    }, 2000);
	});

	/* Preloader with Custom Title */
	$$('.page[data-page=modals] #modal-preloader-custom-title').on('click', function(e) {
		e.preventDefault();
		myApp.showPreloader('Please wait...')
    setTimeout(function() {
			myApp.hidePreloader();
    }, 2000);
	});

	/* Indicator */
	$$('.page[data-page=modals] #modal-indicator').on('click', function(e) {
		e.preventDefault();
		myApp.showIndicator();
		setTimeout(function() {
      myApp.hideIndicator();
		}, 2000);
	});

	/* Nested Modal */
	$$('.page[data-page=modals] #modal-nested').on('click', function(e) {
		e.preventDefault();
		myApp.prompt('What is your name?', function(value) {
			myApp.confirm('Are you sure that your name is ' + value + '?', function() {
				myApp.alert('OK, Your name is ' + value + '.');
      });
    });
	});

	/* Modal with 3 Buttons */
	$$('.page[data-page=modals] #modal-custom-3-buttons').on('click', function(e) {
		e.preventDefault();
		myApp.modal({
			title: 'Lorem Ipsum',
			text: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
			buttons: [
				{
					text: 'Yes',
					onClick: function() {
						myApp.alert("You clicked 'Yes'");
					}
				},
				{
					text: 'No',
					onClick: function() {
						myApp.alert("You clicked 'No'");
					}
				},
				{
					text: 'Maybe',
					onClick: function() {
						myApp.alert("You clicked 'Maybe'");
					}
				}
			]
		});
	});

	/* Modal with Image Slider */
	$$('.page[data-page=modals] #modal-custom-image-slider').on('click', function(e) {
		e.preventDefault();
		var modal = myApp.modal({
			title: 'Awesome Photos?',
			text: 'What do you think about my photos?',
			afterText:  '<div class="swiper-container" style="width: auto; margin: 5px -15px -15px;">' +
										'<div class="swiper-wrapper">' +
											'<div class="swiper-slide">' +
												'<img src="https://source.unsplash.com/320x180?nature" height="150" style="display: block;" alt="Image" />' +
											'</div>' +
											'<div class="swiper-slide">' +
												'<img src="https://source.unsplash.com/320x180?girl" height="150" style="display: block;" alt="Image" />' +
											'</div>' +
										'</div>'+
										'<div class="swiper-pagination"></div>' +
									'</div>',
			buttons: [
				{
					text: '<i class="fa fa-fw fa-thumbs-o-down"></i>&ensp;<span>Bad</span>'
				},
				{
					text: '<i class="fa fa-fw fa-thumbs-o-up"></i>&ensp;<span>Awesome</span>',
						onClick: function() {
						myApp.alert('Thank You!');
					}
				}
			]
		});
		myApp.swiper($$(modal).find('.swiper-container'), {pagination: '.swiper-pagination'});
	});

});

/*
|------------------------------------------------------------------------------
| Photo Browser
|------------------------------------------------------------------------------
*/

myApp.onPageInit('photo-browser', function(page) {

	var photos = [
		{
			url: 'https://source.unsplash.com/Qo51KwK1dKg',
			caption: 'Santorini, Greece'
		},
		{
			url: 'https://source.unsplash.com/ZyotUjWek9g',
			caption: 'Venice, Italy'
		},
		{
			html: '<iframe src="https://www.youtube.com/embed/jNQXAC9IVRw" style="border: 0;"></iframe>',
			caption: 'Me at the Zoo - The First Youtube Video'
		},
		{
			url: 'https://source.unsplash.com/BAgwNyjPFUc',
			caption: 'Amsterdam, Netherlands'
		},
		{
			url: 'https://source.unsplash.com/XkHK1VWIIx4',
			caption: 'Antelope Canyon, Arizona, USA'
		}
	];

	$$('.page[data-page=photo-browser] #photo-browser-light-standalone').on('click', function(e) {
		e.preventDefault();
		var myPhotoBrowserLightStandalone = myApp.photoBrowser({
			photos: photos
		});
		myPhotoBrowserLightStandalone.open();
	});

	$$('.page[data-page=photo-browser] #photo-browser-light-popup').on('click', function(e) {
		e.preventDefault();
		var myPhotoBrowserLightPopup = myApp.photoBrowser({
			photos: photos,
			type: 'popup'
		});
		myPhotoBrowserLightPopup.open();
	});

	$$('.page[data-page=photo-browser] #photo-browser-light-page').on('click', function(e) {
		e.preventDefault();
		var myPhotoBrowserLightPage = myApp.photoBrowser({
			photos: photos,
			type: 'page',
			backLinkText: 'Back'
		});
		myPhotoBrowserLightPage.open();
	});

	$$('.page[data-page=photo-browser] #photo-browser-dark-standalone').on('click', function(e) {
		e.preventDefault();
		var myPhotoBrowserDarkStandalone = myApp.photoBrowser({
			photos: photos,
			theme: 'dark'
		});
		myPhotoBrowserDarkStandalone.open();
	});

	$$('.page[data-page=photo-browser] #photo-browser-dark-popup').on('click', function(e) {
		e.preventDefault();
		var myPhotoBrowserDarkPopup = myApp.photoBrowser({
			photos: photos,
			theme: 'dark',
			type: 'popup'
		});
		myPhotoBrowserDarkPopup.open();
	});

});

/*
|------------------------------------------------------------------------------
| Picker
|------------------------------------------------------------------------------
*/

myApp.onPageInit('picker', function(page) {

	$$('.page[data-page=picker] #picker-single-value').on('click', function(e) {
		var pickerSingleValue = myApp.picker({
			input: '.page[data-page=picker] #picker-single-value',
			cols: [
				{
          textAlign: 'center',
          values: ['iPhone', 'iPhone 3G', 'iPhone 3GS', 'iPhone 4', 'iPhone 4S', 'iPhone 5', 'iPhone 5S', 'iPhone 5C', 'iPhone 6', 'iPhone 6 Plus', 'iPhone 6S', 'iPhone 6S Plus', 'iPhone SE', 'iPhone 7', 'iPhone 7 Plus']
				}
			]
		});
		pickerSingleValue.open();
	});

	$$('.page[data-page=picker] #picker-2-values-3d-rotate').on('click', function(e) {
		var picker2Values3DRotate = myApp.picker({
			input: '.page[data-page=picker] #picker-2-values-3d-rotate',
			rotateEffect: true,
			cols: [
        {
          textAlign: 'left',
          values: ('Super Lex Amazing Bat Iron Rocket Lex Cool Beautiful Wonderful Raining Happy Amazing Funny Cool Hot').split(' ')
        },
        {
					values: ('Man Luthor Woman Boy Girl Person Cutie Babe Raccoon').split(' ')
				}
			]
		});
		picker2Values3DRotate.open();
	});

	$$('.page[data-page=picker] #picker-dependent-values').on('click', function(e) {
		var cars = {
			Japanese : ['Honda', 'Lexus', 'Mazda', 'Nissan', 'Toyota'],
			German : ['Audi', 'BMW', 'Mercedes', 'Volkswagen', 'Volvo'],
			American : ['Cadillac', 'Chrysler', 'Dodge', 'Ford']
		};
		var pickerDependentValues = myApp.picker({
			input: '.page[data-page=picker] #picker-dependent-values',
			rotateEffect: true,
			formatValue: function(picker, values) {
        return values[1];
			},
			cols: [
        {
          textAlign: 'left',
          values: ['Japanese', 'German', 'American'],
          onChange: function(picker, country) {
						if(picker.cols[1].replaceValues) {
							picker.cols[1].replaceValues(cars[country]);
            }
          }
        },
        {
					values: cars.Japanese,
          width: 160,
        }
			]
		});
		pickerDependentValues.open();
	});

	$$('.page[data-page=picker] #picker-custom-toolbar').on('click', function(e) {
		var pickerCustomToolbar = myApp.picker({
			input: '.page[data-page=picker] #picker-custom-toolbar',
			rotateEffect: true,
			toolbarTemplate: 
				'<div class="toolbar">' +
					'<div class="toolbar-inner">' +
						'<div class="left">' +
							'<a href="#" class="link toolbar-randomize-link">Randomize</a>' +
						'</div>' +
						'<div class="right">' +
							'<a href="#" class="link close-picker">That\'s Me</a>' +
						'</div>' +
					'</div>' +
				'</div>',
			cols: [
				{
					values: ['Mr', 'Ms'],
				},
				{
					textAlign: 'left',
					values: ('Super Lex Amazing Bat Iron Rocket Lex Cool Beautiful Wonderful Raining Happy Amazing Funny Cool Hot').split(' ')
				},
				{
					values: ('Man Luthor Woman Boy Girl Person Cutie Babe Raccoon').split(' ')
				},
			],
			onOpen: function(picker) {
				picker.container.find('.toolbar-randomize-link').on('click', function() {
					var col0Values = picker.cols[0].values;
					var col0Random = col0Values[Math.floor(Math.random() * col0Values.length)];
 
					var col1Values = picker.cols[1].values;
					var col1Random = col1Values[Math.floor(Math.random() * col1Values.length)];

					var col2Values = picker.cols[2].values;
					var col2Random = col2Values[Math.floor(Math.random() * col2Values.length)];

					picker.setValue([col0Random, col1Random, col2Random]);
				});
			}
		});
		pickerCustomToolbar.open();
	});

	$$('.page[data-page=picker] #picker-date-time').on('click', function(e) {
		var today = new Date();

		var pickerDateTime = myApp.picker({
			input: '.page[data-page=picker] #picker-date-time',
			rotateEffect: true,

			value: [today.getMonth(), today.getDate(), today.getFullYear(), today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())],

			onChange: function(picker, values, displayValues) {
				var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
        if (values[1] > daysInMonth) {
					picker.cols[1].setValue(daysInMonth);
				}
			},

			formatValue: function(p, values, displayValues) {
				return displayValues[0] + ' ' + values[1] + ', ' + values[2] + ' ' + values[3] + ':' + values[4];
			},

			cols: [
        /* Months */
        {
					values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
          displayValues: ('January February March April May June July August September October November December').split(' '),
          textAlign: 'left'
        },
        /* Days */
        {
					values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        },
        /* Years */
        {
					values: (function() {
						var arr = [];
            for (var i = 1950; i <= 2030; i++) {
							arr.push(i);
						}
            return arr;
          })(),
        },
        /* Space Divider */
        {
					divider: true,
          content: '  '
        },
        /* Hours */
        {
					values: (function() {
						var arr = [];
            for (var i = 0; i <= 23; i++) {
							arr.push(i);
						}
            return arr;
          })(),
        },
        /* Divider */
        {
					divider: true,
          content: ':'
        },
        /* Minutes */
        {
					values: (function() {
						var arr = [];
            for (var i = 0; i <= 59; i++) {
							arr.push(i < 10 ? '0' + i : i);
						}
            return arr;
          })(),
        }
			]
		});
		pickerDateTime.open();
	});

});

/*
|------------------------------------------------------------------------------
| Progress Bars
|------------------------------------------------------------------------------
*/

myApp.onPageInit('progress-bars', function(page) {

	/* Inline Determinate Progress Bar */
	$$('body').on('click', '.page[data-page=progress-bars] #progress-bar-determinate-inline .button', function() {
    var progress = $$(this).attr('data-progress');
    var progressbar = $$('.page[data-page=progress-bars] #progress-bar-determinate-inline .progressbar');
		myApp.setProgressbar(progressbar, progress);
	});

	/* Inline Determinate Progress Bar (Load & Hide) */
	$$('body').on('click', '.page[data-page=progress-bars] #progress-bar-determinate-inline-load-hide .button', function() {
    var container = $$('.page[data-page=progress-bars] #progress-bar-determinate-inline-load-hide p:first-child');
    if (container.children('.progressbar').length) {
			return; /* Don't run all this if there is a current progressbar loading */
		}

    myApp.showProgressbar(container, 0);

    /* Simluate Loading Something */
    var progress = 0;
    function simulateLoading() {
			setTimeout(function() {
				var progressBefore = progress;
				progress += Math.random() * 20;
        myApp.setProgressbar(container, progress);
        if (progressBefore < 100) {
					simulateLoading(); /* Keep Loading */
        }
        else {
					myApp.hideProgressbar(container); /* Hide */
				}
      }, Math.random() * 200 + 200);
    }
    simulateLoading();
	});

	/* Overlay Determinate Progress Bar */
	$$('body').on('click', '.page[data-page=progress-bars] #progress-bar-determinate-overlay .button', function() {
		var container = $$('body');
    if (container.children('.progressbar, .progressbar-infinite').length) {
			return; /* Don't run all this if there is a current progressbar loading */
		}

    myApp.showProgressbar(container, 0, 'yellow');

    /* Simluate Loading Something */
    var progress = 0;
    function simulateLoading() {
			setTimeout(function() {
				var progressBefore = progress;
        progress += Math.random() * 20;
        myApp.setProgressbar(container, progress);
        if (progressBefore < 100) {
					simulateLoading(); /* Keep Loading */
        }
        else {
					myApp.hideProgressbar(container); /* Hide */
				}
      }, Math.random() * 200 + 200);
    }
    simulateLoading();
	});

	/* Overlay Infinite Progress Bar */
	$$('body').on('click', '.page[data-page=progress-bars] #progress-bar-infinite-overlay .button', function() {
		var container = $$('body');
    if (container.children('.progressbar, .progressbar-infinite').length) {
			return; /* Don't run all this if there is a current progressbar loading */
		}
    myApp.showProgressbar(container, 'yellow');
    setTimeout(function() {
			myApp.hideProgressbar();
    }, 5000);
	});

	/* Overlay Infinite Progress Bar (Multicolor) */
	$$('body').on('click', '.page[data-page=progress-bars] #progress-bar-infinite-overlay-multicolor .button', function() {
		var container = $$('body');
    if (container.children('.progressbar, .progressbar-infinite').length) {
			return; /* Don't run all this if there is a current progressbar loading */
		}
    myApp.showProgressbar(container, 'multi');
    setTimeout(function() {
			myApp.hideProgressbar();
    }, 5000);
	});

});

/*
|------------------------------------------------------------------------------
| Pull to Refresh
|------------------------------------------------------------------------------
*/

myApp.onPageInit('pull-to-refresh', function(page) {

	var people = [
		{
			name: 'Christopher Douglas',
			photo: 'https://randomuser.me/api/portraits/men/64.jpg'
		},
		{
			name: 'Craig Griffin',
			photo: 'https://randomuser.me/api/portraits/men/51.jpg'
		},
		{
			name: 'Evan Mccoy',
			photo: 'https://randomuser.me/api/portraits/men/62.jpg'
		},
		{
			name: 'Jacqueline Turner',
			photo: 'https://randomuser.me/api/portraits/women/46.jpg'
		},
		{
			name: 'Jane Lopez',
			photo: 'https://randomuser.me/api/portraits/women/32.jpg'
		},
		{
			name: 'Maggie Barrett',
			photo: 'https://randomuser.me/api/portraits/women/50.jpg'
		},
		{
			name: 'Miranda Norris',
			photo: 'https://randomuser.me/api/portraits/women/91.jpg'
		},
		{
			name: 'Taylor Baker',
			photo: 'https://randomuser.me/api/portraits/men/42.jpg'
		},
		{
			name: 'Teresa Watson',
			photo: 'https://randomuser.me/api/portraits/women/9.jpg'
		},
		{
			name: 'Will Smith',
			photo: 'https://randomuser.me/api/portraits/men/40.jpg'
		}
	];

	var ptrContent = $$('.page[data-page=pull-to-refresh] .pull-to-refresh-content');
	ptrContent.on('ptr:refresh', function(e) {
		/* Emulate 2s Loading */
    setTimeout(function() {
			/* Random Person */
      var person = people[Math.floor(Math.random() * people.length)];

			var itemHTML =	'<li>' +	 
												'<div class="item-content">' +
                          '<div class="item-media">' +
														'<img class="img-circle" src="' + person.photo + '" width="40" alt="Avatar" />' +
													'</div>' +
                          '<div class="item-inner">' +
														'<div class="item-title">' + person.name + '</div>' +
                          '</div>' +
                        '</div>' +
                      '</li>';
      /* Prepend New List Element */
      ptrContent.find('ul').prepend(itemHTML);
      /* When loading is done, we need to reset it */
      myApp.pullToRefreshDone();
    }, 2000);
	});

});

/*
|------------------------------------------------------------------------------
| Rating
|------------------------------------------------------------------------------
*/

myApp.onPageInit('rating', function(page) {

	$('.page[data-page=rating] #rating-basic').rateYo({
		normalFill: '#9E9E9E',
		ratedFill: '#FFC107',
		spacing: '4px'
	});

	$('.page[data-page=rating] #rating-multicolor').rateYo({
		normalFill: '#9E9E9E',
		multiColor: {
			startColor: '#F44336',
			endColor: '#8BC34A'
		},
		spacing: '4px'
	});

	$('.page[data-page=rating] #rating-half-star').rateYo({
		normalFill: '#9E9E9E',
		ratedFill: '#00BCD4',
		halfStar: true,
		rating: 1.5,
		spacing: '4px'
	});

	$('.page[data-page=rating] #rating-full-star').rateYo({
		normalFill: '#9E9E9E',
		ratedFill: '#9C27B0',
		fullStar: true,
		rating: 3,
		spacing: '4px'
	});

	$('.page[data-page=rating] #rating-read-only').rateYo({
		normalFill: '#9E9E9E',
		ratedFill: '#CDDC39',
		readOnly: true,
		rating: 4,
		spacing: '4px'
	});

	$('.page[data-page=rating] #rating-rtl').rateYo({
		normalFill: '#9E9E9E',
		rtl: true,
		spacing: '4px'
	});

	$('.page[data-page=rating] #rating-7-stars').rateYo({
		normalFill: '#9E9E9E',
		numStars: 7,
		spacing: '4px'
	});
	
	$('.page[data-page=rating] #rating-heart').rateYo({
		normalFill: '#9E9E9E',
		ratedFill: '#FF78AE',
		halfStar: true,
		starSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.248C8.852-1.154 0 .423 0 7.192 0 11.853 5.571 16.619 12 23c6.43-6.381 12-11.147 12-15.808C24 .4 15.125-1.114 12 4.248z"/></svg>',
		spacing: '5px'
	});
	
	$('.page[data-page=rating] #rating-flame').rateYo({
		normalFill: '#9E9E9E',
		multiColor: {
			startColor: '#FFC107', 
			endColor: '#FF5722'
		},
		fullStar: true,
		starWidth: '24px',
		starSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill-rule="evenodd" clip-rule="evenodd"><path d="M8.625 0C9.235 7.189 3 9.664 3 15.996c0 4.301 3.069 7.972 9 8.004 5.931.032 9-4.414 9-8.956 0-4.141-2.062-8.046-5.952-10.474.924 2.607-.306 4.988-1.501 5.808.07-3.337-1.125-8.289-4.922-10.378zm4.711 13c3.755 3.989 1.449 9-1.567 9C9.934 22 8.99 20.735 9 19.423c.019-2.433 2.737-2.435 4.336-6.423z"/></svg>'
	});

});

/*
|------------------------------------------------------------------------------
| Snackbars
|------------------------------------------------------------------------------
*/

myApp.onPageInit('snackbars', function(page) {

	/* Single-Line Snackbar */
	$$('.page[data-page=snackbars] #snackbar-single-line').on('click', function(e) {
		e.preventDefault();
		myApp.addNotification({
			message: 'Lorem Ipsum'
    });
	});

	/* Multi-Line Snackbar */
	$$('.page[data-page=snackbars] #snackbar-multi-line').on('click', function(e) {
		e.preventDefault();
		myApp.addNotification({
			message: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.'
    });
	});

	/* Snackbar with Custom Button */
	$$('.page[data-page=snackbars] #snackbar-custom-button').on('click', function(e) {
		e.preventDefault();
		myApp.addNotification({
			message: 'Finibus Bonorum et Malorum',
      button: {
				text: 'Done',
        color: 'yellow'
      }
    });
	});

	/* Snackbar with Callback */
	$$('.page[data-page=snackbars] #snackbar-callback').on('click', function(e) {
		e.preventDefault();
		myApp.addNotification({
			message: 'Close me to see Alert.',
      button: {
				text: 'Close',
        color: 'lightgreen'
      },
      onClose: function() {
				myApp.alert('Snackbar Closed');
			}
    });
	});

});

/*
|------------------------------------------------------------------------------
| Sortable List
|------------------------------------------------------------------------------
*/

myApp.onPageInit('sortable-list', function(page) {
	
	setTimeout(function() {
		$$('.page[data-page=sortable-list] [data-action=toggle-sortable]').trigger('mouseover');
	}, 1500);

	$$('.page[data-page=sortable-list] [data-action=toggle-sortable]').on('click', function(e) {
		e.preventDefault();
		myApp.sortableToggle('.page[data-page=sortable-list] .list-block.sortable');
	});
	
});

/*
|------------------------------------------------------------------------------
| Swiper Slider
|------------------------------------------------------------------------------
*/

myApp.onPageInit('swiper-slider', function(page) {

	var mySwiper = myApp.swiper('.page[data-page=swiper-slider] .swiper-container', {
    pagination:'.page[data-page=swiper-slider] .swiper-pagination',
		paginationClickable: true
  });

});

/*
|------------------------------------------------------------------------------
| Toasts
|------------------------------------------------------------------------------
*/

myApp.onPageInit('toasts', function(page) {

	$$('body').on('click', '.page[data-page=toasts] [data-action=show-toast]', function(e) {
		e.preventDefault();
		var toast = myApp.toast('Marked as Favorite', '<i class="fa fa-star-o"></i>');
		toast.show();
	});

});

/*
|------------------------------------------------------------------------------
| Virtual List
|------------------------------------------------------------------------------
*/

myApp.onPageInit('virtual-list', function(page) {

	/* Populate Virtual List Items Array */
	var items=[];
	for(var i=1; i<=10000; i++) {
		items.push({
			title:'Item ' + i
		});
	}

	/* Initialize Virtual List */
	var myVirtualList = myApp.virtualList('.page[data-page=virtual-list] .virtual-list', {
		items: items,
		template: '<li>' +
								'<div class="item-content">' +
									'<div class="item-inner">' +
										'<div class="item-title">{{title}}</div>' +
									'</div>' +
								'</div>' +
              '</li>',
		searchAll: function (query, items) {
			var foundItems = [];
      for (var i = 0; i < items.length; i++) {
				if (items[i].title.toLowerCase().indexOf(query.trim().toLowerCase()) >= 0) {
					foundItems.push(i);
				}
			}
      return foundItems; 
    }
	});

	/* Initialize Searchbar */
	var mySearchbar = myApp.searchbar('.page[data-page=virtual-list] .searchbar', {
    searchList: '.page[data-page=virtual-list] .virtual-list',
    searchIn: '.page[data-page=virtual-list] .virtual-list .item-title'
	});

});