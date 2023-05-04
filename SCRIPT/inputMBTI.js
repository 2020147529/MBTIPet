const FACTS_URL = "/MBTIPet/SCRIPT/fact.json";

// 유기견 사실들을 저장할 배열
let facts = [];

// JSON 파일에서 유기견 사실들을 불러와 facts 배열에 저장하는 함수
function loadFacts() {
  fetch(FACTS_URL)
    .then((response) => response.json())
    .then((data) => {
      facts = data;
      renderRandomFact();
    })
    .catch((error) => {
      console.error(`Error loading facts: ${error}`);
    });
}

loadFacts();

// 페이지가 로드되면 유기견 사실을 출력.
function renderRandomFact() {
  const ret = facts[Math.floor(Math.random() * facts.length)].fact;
  const container = document.querySelector("#dogDescription");
  container.innerHTML = ret;
}

// 유기견 사실을 새로고침할 때마다 출력합니다.
const refreshButton = document.querySelector("#refresh-button");
refreshButton.addEventListener("click", function () {
  renderRandomFact();
});

// JSON 파일에서 유기견 사실들을 불러옵니다.
