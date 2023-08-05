$(document).ready(function () {
	const amenitiesId = {};
	$('INPUT[type="checkbox"]').change(function () {
		if (this.checked) {
			amenitiesId[this.dataset.name] =  this.dataset.id;
		} else {
			delete amenitiesId[this.dataset.name];
		}
		$(".amenities h4").text(object.values(amenitiesId).sort().join(", "));
	});
});
