$(function () {
        $('#start_one').datepicker({ 
            prevHtml: '<span class="material-icons">arrow_back</span>',
            nextHtml: '<span class="material-icons">arrow_forward</span>',
            clearButton: true,
            toggleSelected: false,
            minDate: new Date(),
            navTitles: {
                days: 'MM yyyy',
            },
            onShow: function (dp, animationCompleted) {
            if (!animationCompleted) {
                if (dp.$datepicker.find('button').html()===undefined) { /*ONLY when button don't existis*/
                    dp.$datepicker.append('<button type="button" class="datepicker-apply" disabled="disabled">Применить</button>');
                     
                }
            }
            },
                
        });

                       

    }); 