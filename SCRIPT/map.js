// 보호소를 지도에 띄움.
// window.address : 보호소 주소 , window.image: 유기견 이미지, window.distance : 가장가까운 거리

window.addEventListener('addressReady', function () {
	navigator.geolocation.getCurrentPosition(function (pos) {
	  map = new naver.maps.Map('map', {
		center: new naver.maps.LatLng(36.31175, 127.3754709),
		zoom: 13
	  });
	  console.log(pos);
	  var latitude = pos.coords.latitude;
	  var longitude = pos.coords.longitude;

	  var centerlocation = new naver.maps.LatLng(latitude, longitude);
	  var markers = [];
	  var infowindows = [];

	  // 사용자의 위치를 기본 마커로 표시합니다.
	  markers.push(
		new naver.maps.Marker({
		  map: map,
		  position: centerlocation
		})
	  );


	  // 사용자의 위치에 창을 표시합니다.
	  infowindows.push(
		new naver.maps.InfoWindow({
		  content: [
			'<div class="iw_inner">',
			'   <h3> 현재 나의 위치 </h3>',
			'</div>'
		  ].join('')
		})
	  );

	  // 이하는 유기견 보호소의 정보를 표시합니다. 아래와 같은 형식으로 두 배열에 정보를 삽입하면 정보가 표시됩니다.
	  const markerimg1 = new Image();
	  const infoimg1 = new Image();

	  markerimg1.src = window.image;
	  // 마커에 삽입될 이미지를 설정합니다.
	  infoimg1.src = window.image;
	  // 마커를 선택할 때 표시되는 창에 넣을 이미지를 설정합니다.

	  naver.maps.Service.geocode({ query: window.address }, function (
		status,
		response
	  ) {
		if (status !== naver.maps.Service.Status.OK) {
		  return console.log('Geocoding error:', status);
		}

		var result = response.result;
		if (!result.items || result.items.length === 0) {
		  return console.log('No geocoding results found.');
		}

		var points = {
			y: result.items[0].point.y,
			x: result.items[0].point.x
		  };
		var distance = calculateDistance(
		  centerlocation.lat(),
		  centerlocation.lng(),
		  points.y,
		  points.x
		);
		console.log('Distance:', distance);

		// 마커 삽입
		markers.push(
		  new naver.maps.Marker({
			// 유기견 보호소의 주소를 지도에 표시합니다.
			map: map,
			position: new naver.maps.LatLng(points.y, points.x),
			icon: {
			  // 지도의 표시될 마커의 아이콘입니다. 지도에 표시될 사진이나 사이즈를 바꿔야한다면 이 아래를 바꾸면 됩니다.
			  url: markerimg1.src, // 42줄에서 이미지의 주소를 설정할 수 있습니다.
			  size: new naver.maps.Size(70, 70),
			  scaledSize: new naver.maps.Size(70, 70),
			  origin: new naver.maps.Point(0, 0)
			}
		  })
		);

		// 마커 정보 삽입
		infowindows.push(
		  new naver.maps.InfoWindow({
			content: [
			  '<div class="iw_inner">',
			  '   <img src=',
			  infoimg1.src, // 44줄에서 이미지의 주소를 설정할 수 있습니다.
			  ' width="100px">',
			  '<p>멍멍이</p>',
			  '</div>'
			].join('')
		  })
		);

		// 유기견 보호소의 정보를 표시합니다. 위와 같은 형식으로 두 배열에 정보를 삽입하면 정보가 표시됩니다.
		for (let i = 0; i < infowindows.length; i++) {
		  naver.maps.Event.addListener(markers[i], 'click', function (e) {
			if (infowindows[i].getMap()) {
			  infowindows[i].close();
			} else {
			  infowindows[i].open(map, markers[i]);
			}
		  });
		}

		infowindows[0].open(map, markers[0]);
	  });
	});
  });
