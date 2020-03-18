(function($) {
	var expenses = ko.observableArray([]);

	var getBaseUrl = function() {
		switch($('.webservice :radio:checked').val()) {
			case 'python':
				return 'http://127.0.0.1:8000/api/';
			case 'csharp':
				return 'http://localhost:50231/api/';
			case 'golang':
				return 'http://localhost:9000/';
		}
	};

	var updateExpenses = function(data) {
		expenses.removeAll();
		//batch add, prevene multiple update notification
		expenses.push.apply(expenses, data);
	};

	var checkServer = function(url) {
		// Upload server status check for browsers with CORS support:
        if ($.support.cors) {
            $.ajax({
                url: url,
                type: 'HEAD'
            }).fail(function () {
                $('.alert').text('Upload server currently unavailable - ' + new Date());
            });
        }
	};

	var refresh = function() {
		var baseUrl = getBaseUrl();

		$.get(baseUrl + 'index', function(data) {
			updateExpenses(data);
		});
	}

	$(function() {
		ko.applyBindings({ expenses: expenses });

		refresh();
	});

	$('.btn-upload').on('click', function() {
		var baseUrl = getBaseUrl();

		var form = $('#mainForm');

		form.attr('action', baseUrl + 'upload/');
		form.submit();
	});

	$('[name="webservice"]').on('click', function() {
		refresh();
	})
}(jQuery));