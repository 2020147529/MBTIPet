let recievedMBTI = location.href.split('?')[1]; // url에 있는 mbti값을 받음(1페이지에서 전송)  

(async function (){
   
  const data_mbtitodog = await fetchjson("../SCRIPT/mbtito16.json");

  updateSectionInfo(data_mbtitodog, recievedMBTI);

})();//메인 실행부

async function fetchjson(url){
  const res = await fetch(url);
  const data = await res.json(); 
  return data
}


function updateSectionInfo(data_mbtitodog, mbtiString) {
  //메인 컨텐츠 MBTI parameter에 맞추어 display
  // let doginfo = getDogInfo(mbtiString);
  let data = data_mbtitodog[mbtiString]
  let dogName = data.species ;
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


document.querySelector('#search').addEventListener('click', () => {
  window.location.href = "map.html";
})


