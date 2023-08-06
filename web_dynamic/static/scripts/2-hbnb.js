$(document).ready(function () {
	const amenities = {};
	$('INPUT[type="checkbox"]').change(function () {
        if ($(this).is(':checked')) {
            amenities[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete amenities[$(this).attr('data-id')];
        }
        $('.amenities h4').text(Object.values(amenities).join(', '));
    });
		
});
// updating the API STATUS.
$(document).ready(function () {
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
        if (data.status === 'OK') {
            // add available class if the status is ok
            $('div#api_status').addClass('available');
        } else {
            // remove the available class if status is not OK
            $('div#api_status').remove('available');
        }
    });
});