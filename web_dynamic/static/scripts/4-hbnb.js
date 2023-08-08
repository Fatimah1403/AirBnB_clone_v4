$('document').ready(function () {
  let amenities = {};
  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenities[$(this).attr('data-id')];
    }
    $('.amenities h4').text(Object.values(amenities).join(', '));
  });
  
  // Function to update the API status
  function updateApiStatus() {
      $.get("http://localhost:5001/api/v1/status/", function(data) {
          if (data.status === "OK") {
              $("#api_status").addClass("available");
          } else {
              $("#api_status").removeClass("available");
          }
      });
  }
  // Initial update
  updateApiStatus();
  // Refresh status every 5 seconds
  setInterval(updateApiStatus, 5000);

  // Function to send a POST request and get places data
  $.ajax({
      type: 'POST',
      url: 'http://localhost:5001/api/v1/places_search',
      contentType: 'application/json',
      data: JSON.stringify({}), // Empty dictionary as the body
      success: getPlacesData,
      error: function (error) {
          console.error('Error fetching places data:', error);
          // Display error message in the article section
          displayErrorMessage('Error fetching places data. Please try again later or check your API connection.');
      },
  });

  // 3-hbnb.js
  $('button').click(function () {
      $.ajax({
        url: 'http://localhost:5001/api/v1/places_search',
        type: 'POST',
        data: JSON.stringify({ 'amenities': Object.keys(amenities) }),
        contentType: 'application/json',
        dataType: 'json',
        success: getPlacesData
      });
  });


  
  //  DISPLAY ERROR MESSAGES
  function displayErrorMessage(message) {
      const errorMessageElement = $('#error-message');
      errorMessageElement.text(message);
  }

});
// Function to create articles based on places data
function getPlacesData(data) {
  const placesSection = $('section.places');
  const articles = data.map(place => {
    return `
      <article>
        <div class="headline">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">
            <div class="guest_icon"></div>
            <p>${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</p>
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
      </article>
    `;
  });

  placesSection.empty(); // Clear any existing content
  placesSection.append(articles.join('')); // Add the new articles to the DOM
}    