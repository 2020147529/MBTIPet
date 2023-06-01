API_KEY_ENCODING="Qco1SCBm1hj7qH%2BSComJvfC%2BNuj%2FRve27Bpv5nUvdv5lO%2FE4MtdALLIqlbPmG%2BtgNyI2A4OS9I0qHoz4LcbARg%3D%3D"
API_KEY_DECODING="Qco1SCBm1hj7qH+SComJvfC+Nuj/Rve27Bpv5nUvdv5lO/E4MtdALLIqlbPmG+tgNyI2A4OS9I0qHoz4LcbARg=="

var xhr = new XMLHttpRequest();
var url = 'http://apis.data.go.kr/1543061/abandonmentPublicSrvc/sido'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'서비스키'; /*Service Key*/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('3'); /**/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('_type') + '=' + encodeURIComponent(' '); /**/
xhr.open('GET', url + queryParams);
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        alert('Status: '+this.status+'nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'nBody: '+this.responseText);
    }
};

xhr.send('');


//    json 저장용 -> 전체 json을 보고싶으면 주석해제 후 실행, json 가서 전부 선택 후 ctrl+k+f 누르면 포맷 정렬됨
/*
with open('./sample.json', 'a+', encoding="UTF-8") as fp:
    json.dump(response, fp, ensure_ascii=False)
*/

const response_ary = response.response.body.items.item;

for (let i = 0; i < response_ary.length; i++) {
    console.log(response_ary[i].kindCd);
}




