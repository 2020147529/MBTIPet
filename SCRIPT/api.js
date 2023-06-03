var url = 'http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=nArkXW%2FsW5n8DloufcdJXhfDdnSIOoMQpfxWro7yomCX1KCKrycz7vPAfXnPU8EX%2FE5astdqsRQVlW5BLQ%2BcNA%3D%3D';
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('500'); // Fetching 500 items
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
queryParams += '&' + encodeURIComponent('_type') + '=' + encodeURIComponent(' ');

let receivedDog = location.href.split('?')[1]; // url에 있는 mbti값을 받음(1페이지에서 전송)

receivedDog = decodeURI(receivedDog).trim()

// console.log(receivedDog === '[개] 진도견') true


fetch(url + queryParams)
  .then(function(response) {
    return response.text();
  })
  .then(function(xmlData) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlData, 'text/xml');
    var items = xmlDoc.querySelectorAll('item');

    var htmlContent = "";
    var imageContainer = document.getElementById('image-container');
    var counter = 0; // Counter for limiting the number of displayed items


    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var kindCd = item.querySelector('kindCd').textContent; //kindCd 가 들어오면 확인

      if (kindCd === receivedDog) {
        var happenDt = item.querySelector('happenDt').textContent;
        var popfile = item.querySelector('popfile').textContent;
        var colorCd = item.querySelector('colorCd').textContent;
        var age = item.querySelector('age').textContent;
        var sexCd = item.querySelector('sexCd').textContent;
        var specialMark = item.querySelector('specialMark').textContent;
        var careNm = item.querySelector('careNm').textContent;
        var careTel = item.querySelector('careTel').textContent;
        var careAddr = item.querySelector('careAddr').textContent;
        window.address = careAddr;
        window.image = popfile;

        htmlContent += "<p>발견 날짜: " + happenDt + "</p>";
        htmlContent += "<p>종: " + kindCd + "</p>";
        htmlContent += "<p>색상: " + colorCd + "</p>";
        htmlContent += "<p>나이: " + age + "</p>";
        htmlContent += "<p>성별: " + sexCd + "</p>";
        htmlContent += "<p>특징: " + specialMark + "</p>";
        htmlContent += "<p>보호소이름: " + careNm + "</p>";
        htmlContent += "<p>보호소전화번호: " + careTel + "</p>";
        htmlContent += "<p>보호장소: " + careAddr + "</p>";
        htmlContent += "<hr>";

        var imageElement = document.createElement('img');
        imageElement.src = popfile;
        imageElement.alt = "유기견 이미지";

        // Set the size of the image using CSS
        imageElement.style.width = "200px"; // Set the desired width
        imageElement.style.height = "150px"; // Set the desired height

        // Append the image element to the image container
        imageContainer.appendChild(imageElement);
        counter++; // Increment the counter

        if (counter === 1) {
          break;
        }
      }
    }

    var textContainer = document.getElementById('text-container');
    if (htmlContent === "") {
        htmlContent += "<p> 유기견을 찾을 수 없습니다. 다시 시도하세요. </p>"
    }

    if (textContainer) {
        textContainer.innerHTML = htmlContent;
    } else {
        textContainer.innerHTML = "Error: Element with id 'text-container' not found.";
    }
    // Trigger an event to notify that the 'address' variable is ready
    var event = new Event('addressReady');
    window.dispatchEvent(event);

  })
  .catch(function(error) {
    console.log("Error:", error);
  });
