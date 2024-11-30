// 위치 기반 병원 검색 버튼 클릭 이벤트
document.getElementById("locationSearchButton").addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                alert(`위치 정보 가져오기 성공! \n위도: ${latitude}, 경도: ${longitude}`);
                // 여기에 위치 기반 병원 검색 API 호출 추가
                // fetch('API_URL', { method: 'POST', body: JSON.stringify({ latitude, longitude }) });
            },
            (error) => {
                alert("위치 정보를 가져오는데 실패했습니다.");
                console.error(error);
            }
        );
    } else {
        alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
    }
});

// 병원 검색 버튼 클릭 이벤트
document.getElementById("searchButton").addEventListener("click", () => {
    const searchInput = document.getElementById("searchInput").value;
    if (searchInput.trim() !== "") {
        alert(`"${searchInput}" 검색 중...`);
        // 병원 검색 로직 추가
    } else {
        alert("검색어를 입력해주세요.");
    }
});
