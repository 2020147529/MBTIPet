var request = require('request');
// var fs = require('fs');
var convert = require('xml-js');

var url = 'http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=nArkXW%2FsW5n8DloufcdJXhfDdnSIOoMQpfxWro7yomCX1KCKrycz7vPAfXnPU8EX%2FE5astdqsRQVlW5BLQ%2BcNA%3D%3D';
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('3');
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
queryParams += '&' + encodeURIComponent('_type') + '=' + encodeURIComponent(' ');

request({
    url: url + queryParams,
    method: 'GET'
}, function (error, response, body) {
    //console.log('Status', response.statusCode);
    //console.log('Headers', JSON.stringify(response.headers));
    //console.log('Response received', body);

    var jsonData = convert.xml2json(body, { compact: true, spaces: 1 });
    var parsedData = JSON.parse(jsonData);
    var items = parsedData.response.body.items.item; //item : 유기동물
    // Extracting the desired fields from each item
    var extractedData = items.map(function(item) {
      return {
        filename : item.filename._text,
        happenDt : item.happenDt._text,
        kindCd : item.kindCd._text,
        colorCd : item.colorCd._text,
        age : item.age._text,
        sexCd : item.sexCd._text,
        specialMark :item.specialMark._text,
        careNm : item.careNm._text,
        careTel : item.careTel._text,
        careAddr : item.careAddr._text,
      };
    
  });

  console.log(extractedData);


    
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