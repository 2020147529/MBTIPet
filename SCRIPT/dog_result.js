let recievedMBTI = location.href.split('?')[1]; // url에 있는 mbti값을 받음(1페이지에서 전송)

(async function (){

  const data_mbtitodog = await fetchjson("../SCRIPT/mbtito16.json");

  updateSectionInfo(data_mbtitodog, recievedMBTI);
  var dognameglobal = data_mbtitodog[mbtiString].species;
})();//메인 실행부

async function fetchjson(url){
  const res = await fetch(url);
  const data = await res.json();
  return data
}

let dogName = ""; // Define the dogName variable in a higher scope
function updateSectionInfo(data_mbtitodog, mbtiString) {
  //메인 컨텐츠 MBTI parameter에 맞추어 display
  // let doginfo = getDogInfo(mbtiString);
  let data = data_mbtitodog[mbtiString]
  dogName = data.species ;
  let imageSource = "../IMAGE/"+dogName+".jpg"; //저장된 이미지 사용
  let description = mbtiString.toUpperCase() +":"+data.info;

  let result = `<h2>${dogName}</h2>
    <div class="imgcontainer">
        <img src="${imageSource}" alt='${dogName}'>
    </div>
    <p>${description}</p>`;

  document.querySelector("#dogresult").innerHTML = result;
}

document.querySelector("#reselectMBTI").addEventListener("click", () => {
  window.location.href = "input_MBTI.html";
});


document.querySelector('#search').addEventListener('click', () =>
 {window.location.href = `map.html?dogName=${dognameglobal}`;});


/*
[개] 진도견
[개] 비숑 프리제
[개] 잭 러셀 테리어
[개] 시베리안 허스키
[개] 비글
[개] 슈나우져
[개] 시바
[개] 푸들
[개] 프렌치 불독
[개] 라브라도 리트리버
[개] 보더 콜리
[개] 셰퍼드
[개] 퍼그
[개] 닥스훈트
[개] 골든 리트리버
[개] 웰시 코기 카디건, [개] 웰시 코기 펨브로크
*/