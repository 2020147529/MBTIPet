document.querySelector("#reselectMBTI")
.addEventListener("click", ()=>updateMBTI());

updateSectionInfo()


function updateMBTI(){
    //새로운 MBTI 값에 따른 메인 컨텐츠 업데이트
    let mbti = "promptNewMBTI();" //todo
 
    updateSectionInfo(mbti);
}

function updateSectionInfo(mbtiString){
    //메인 컨텐츠 MBTI parameter에 맞추어 display
   // let doginfo = getDogInfo(mbtiString);

    let dogName = Math.random(); 
    let imageSource = "https://picsum.photos/500"; //todo: 추후데이터 사용
    let description = "doginfo[1]";

    let result = `<h2>${dogName}</h2>
    <div class="imgcontainer">
        <img src="${imageSource}" alt='${dogName}'>
    </div>
    <p>${description}</p>`;

    document.querySelector("#dogresult").innerHTML = result;

    
}
