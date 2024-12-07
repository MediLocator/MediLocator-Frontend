// URL에서 검색어 가져오기
const params = new URLSearchParams(window.location.search);
const keyword = params.get("keyword");

if (!keyword) {
    alert("검색어가 없습니다.");
    window.location.href = "../p_1/index.html";
}

// 서버로 검색 요청 보내기
fetch(`http://localhost:8080/api/hospital/search?keyword=${encodeURIComponent(keyword)}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("검색 요청이 실패했습니다.");
        }
        return response.json();
    })
    .then(data => displaySearchResults(data))
    .catch(error => alert(error.message));

// 검색 결과 표시 함수
function displaySearchResults(hospitals) {
    const resultsContainer = document.getElementById("searchResults");

    if (hospitals.length === 0) {
        resultsContainer.innerHTML = `<div class="no-results">검색 결과가 없습니다.</div>`;
        return;
    }

    hospitals.forEach(hospital => {
        const card = document.createElement("div");
        card.className = "hospital-card";
        card.innerHTML = `
            <h2 class="hospital-name">${hospital.name}</h2>
            <p class="hospital-info">주소: ${hospital.address || "정보 없음"}</p>

            <a href="../p_3/index.html?hospital_id=${hospital.id}" class="details-link">자세히 보기</a>
        `;
        resultsContainer.appendChild(card);
    });
}
// 첫 번째 화면으로 이동 (MediLocator 클릭 시)
document.getElementById("goToHomeButton").addEventListener("click", function () {
    window.location.href = "../p_1/index.html"; // 첫 번째 페이지로 이동
});

// 뒤로가기 버튼 클릭 시
document.getElementById("backButton").addEventListener("click", function () {
    window.history.back(); // 이전 페이지로 돌아가기
});