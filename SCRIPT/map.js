navigator.geolocation.getCurrentPosition(function (pos) {
	var latitude = pos.coords.latitude;
	var longitude = pos.coords.longitude;

	var centerLocation = new naver.maps.LatLng(latitude, longitude);
	var fixedPosition = new naver.maps.LatLng(36.31175, 127.3754709); // Replace with your desired fixed position

	var distance = naver.maps.Geometry.distance(centerLocation, fixedPosition);

	console.log('Current Location:', latitude, longitude);
	console.log('Fixed Position:', fixedPosition.lat(), fixedPosition.lng());
	console.log('Distance:', distance.toFixed(2), 'meters');

	// Displaying the map
	var map = new naver.maps.Map('map', {
	  center: centerLocation,
	  zoom: 13
	});

	// Creating a marker for the fixed position
	var fixedMarker = new naver.maps.Marker({
	  map: map,
	  position: fixedPosition
	});

	// Creating an info window for the fixed position marker
	var fixedInfoWindow = new naver.maps.InfoWindow({
	  content: 'Fixed Position'
	});
	fixedInfoWindow.open(map, fixedMarker);

	// Creating a text overlay for the distance
	var distanceOverlay = new naver.maps.CustomOverlay({
	  position: fixedPosition,
	  content: '<div class="distance-overlay">' + distance.toFixed(2) + ' meters</div>',
	  map: map
	});

	// Styling the distance overlay
	var distanceOverlayElement = distanceOverlay.getElement();
	distanceOverlayElement.style.padding = '5px';
	distanceOverlayElement.style.backgroundColor = '#fff';
	distanceOverlayElement.style.border = '1px solid #000';
	distanceOverlayElement.style.fontSize = '12px';

	// Centering the map on both the current location and the fixed position
	var bounds = new naver.maps.LatLngBounds();
	bounds.extend(centerLocation);
	bounds.extend(fixedPosition);
	map.fitBounds(bounds);
  });
