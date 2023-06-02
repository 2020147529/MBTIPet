var url = 'http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=nArkXW%2FsW5n8DloufcdJXhfDdnSIOoMQpfxWro7yomCX1KCKrycz7vPAfXnPU8EX%2FE5astdqsRQVlW5BLQ%2BcNA%3D%3D';
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('500'); // Fetching 500 items
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
queryParams += '&' + encodeURIComponent('_type') + '=' + encodeURIComponent(' ');

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

      if (kindCd === "[개] 시바") {
        var happenDt = item.querySelector('happenDt').textContent;
        var popfile = item.querySelector('popfile').textContent; // Retrieve the popfile value
        var colorCd = item.querySelector('colorCd').textContent;
        var age = item.querySelector('age').textContent; // Retrieve the popfile value
        var sexCd = item.querySelector('sexCd').textContent;
        var specialMark = item.querySelector('specialMark').textContent; // Retrieve the popfile value
        var careNm = item.querySelector('careNm').textContent;
        var careTel = item.querySelector('careTel').textContent; // Retrieve the popfile value
        var careAddr = item.querySelector('careAddr').textContent; // Retrieve the popfile value


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
        imageElement.alt = "image of the animal";

        // Set the size of the image using CSS
        imageElement.style.width = "200px"; // Set the desired width
        imageElement.style.height = "150px"; // Set the desired height

        // Append the image element to the image container
        imageContainer.appendChild(imageElement);
        counter++; // Increment the counter

        if (counter === 1) {
          // Break the loop once 5 items are displayed
          break;
        }
      }
    }

    var textContainer = document.getElementById('text-container');
    if (textContainer) {
      textContainer.innerHTML = htmlContent;
    } else {
      console.log("Error: Element with id 'text-container' not found.");
    }
  })
  .catch(function(error) {
    console.log("Error:", error);
  });

/*
for (var i = 0; i < items.length; i++) {
  var item = items[i];

  var filename = item.filename._text;
  var happenDt = item.happenDt._text;
  var kindCd = item.kindCd._text;
  var colorCd = item.colorCd._text;
  var age = item.age._text;
  var weight = item.weight._text;
  var sexCd = item.sexCd._text;
  var specialMark = item.specialMark._text;
  var careNm = item.careNm._text;
  var careTel = item.careTel._text;
  var careAddr = item.careAddr._text;

  console.log('Filename:', filename);
  console.log('Happen Date:', happenDt);
  console.log('Kind:', kindCd);
  console.log('Color:', colorCd);
  console.log('Age:', age);
  console.log('Weight:', weight);
  console.log('Sex:', sexCd);
  console.log('Special Mark:', specialMark);
  console.log('Care Name:', careNm);
  console.log('Care Telephone:', careTel);
  console.log('Care Address:', careAddr);
}
*/