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

//task 3-hbnh.js - fatch data about places.

function getPlaces() {
    $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function (data) {
           const placesSection =  $('section.places');
           data.forEach(function (place) {
            const article = $('<article></article>');
            article.html(`
            <div class="headline">
                <h2>{{ place.name }}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
                <div class="max_guest">
                    <div class="guest_icon"></div>
                    <p>${place.max_guest} Guests${place.max_guest !== 1 ? 's' : ''}</p>
                </div>
                <div class="number_rooms">
                    <div class="bed_icon"></div>
                    <p>${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</p>
                </div>
                <div class="number_bathrooms">
                    <div class="bath_icon"></div>
                    <p>${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</p>
                </div>
            </div>
            <div class="description">
                ${place.description}
            </div>
            `);
            placesSection.append(article);
           });           
        },

    });
    getPlaces();
}