navigator.geolocation.getCurrentPosition(function (pos) {
	map = new naver.maps.Map('map', {
	  center: new naver.maps.LatLng(36.31175, 127.3754709),
	  zoom: 13
	});
	console.log(pos);
	var latitude = pos.coords.latitude;
	var longitude = pos.coords.longitude;
	console.log(latitude, longitude);


	var centerlocation = new naver.maps.LatLng(latitude, longitude);
	var markers = [];
	var infowindows = [];

	//사용자의 위치를 기본 마커로 표시합니다.
	markers.push(new naver.maps.Marker({
	  map: map,
	  position: centerlocation,

	}))

	//사용자의 위치에 창을 표시합니다.
	infowindows.push(new naver.maps.InfoWindow({
	  content: [
		'<div class="iw_inner">',  //정보창에 삽입될 내용을 기술합니다.
		'   <h3> 현재 나의 위치 </h3>',
		'</div>'
	  ].join('')
	}))

	//이하는 유기견 보호소의 정보를 표시합니다. 아래와 같은 형식으로 두 배열에 정보를 삽입하면 정보가 표시됩니다.
	const markerimg1 = new Image();
	const infoimg1 = new Image();
	markerimg1.src = "https://animal.seoul.go.kr/comm/getImage?srvcId=MEDIA&upperNo=1121&fileTy=ADOPTIMG&fileNo=8&thumbTy=L";
	//마커에 삽입될 이미지를 설정합니다.
	infoimg1.src = "https://animal.seoul.go.kr/comm/getImage?srvcId=MEDIA&upperNo=1121&fileTy=ADOPTIMG&fileNo=8&thumbTy=L";
	//마커를 선택할 때 표시되는 창에 넣을 이미지를 설정합니다.

	//
	markers.push(new naver.maps.Marker({
	  map: map,
	  position: new naver.maps.LatLng(latitude - 0.01000, longitude - 0.0030),  //유기견 보호소의 위도와 경도를 넣어야합니다.
	  icon: {
		url: markerimg1.src,
		size: new naver.maps.Size(70, 70),
		scaledSize: new naver.maps.Size(70, 70),
		origin: new naver.maps.Point(0, 0)
	  }
	}))

	//마커 정보 삽입
	infowindows.push(new naver.maps.InfoWindow({
	  content: [
		'<div class="iw_inner">',  //유기견 보호소의 정보를 기술합니다.
		'   <img src=',
		infoimg1.src,
		' width="100px">',
		'<p>멍멍이</p>',
		'</div>'
	  ].join('')
	}))

	//이상은 유기견 보호소의 정보를 표시합니다. 위와 같은 형식으로 두 배열에 정보를 삽입하면 정보가 표시됩니다.

	for (let i = 0; i < markers.length; i++) {
	  naver.maps.Event.addListener(markers[i], "click", function (e) {
		if (infowindows[i].getMap()) {
		  infowindows[i].close();
		} else {
		  infowindows[i].open(map, markers[i]);
		}
	  });
	}

	infowindows[0].open(map, markers[0]);

  })