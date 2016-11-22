
/**
 * Pagination
 *  
 */
(function($) {

    $('body')
    .on('click', 'ul.pagination a', function(e) {
        e.preventDefault();
        
        $.get($(this).attr('href'), function(res) {
            $('#monthly-expenses').replaceWith(res);
        });
    })
    .on('check-upload', function(e) {
        var ctx = $('#expenses-list');       
        
        var timer = setInterval(function() {
            $.get(ctx.attr('data-check'), function(res) {
                if (res.fileDone) {
                    clearInterval(timer);
                    
		            $.get(ctx.attr('data-route'), function(res) {
		                ctx.empty().append(res);
		            });        
                }
            });
        }, 1000);
    })
    .trigger('check-upload')
    ;
})(jQuery);