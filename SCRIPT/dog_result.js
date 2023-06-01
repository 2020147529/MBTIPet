let recievedMBTI = location.href.split('?')[1] // url에 있는 mbti값을 받음(1페이지에서 전송)  

updateSectionInfo(recievedMBTI);

function updateSectionInfo(mbtiString) {
  //메인 컨텐츠 MBTI parameter에 맞추어 display
  // let doginfo = getDogInfo(mbtiString);

  let dogName = mbtiString ;
  let imageSource = "https://picsum.photos/500"; //todo: 추후데이터 사용
  let description = "doginfo[1]";

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


