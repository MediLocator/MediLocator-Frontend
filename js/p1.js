// 위치 기반 병원 검색
document.getElementById("locationSearchButton").addEventListener("click", function () {
    // 브라우저에서 현재 위치 정보를 가져옵니다.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            // 두 번째 페이지로 이동하며, 쿼리 파라미터로 위치 정보를 전달
            window.location.href = `../p_2/index.html?lat=${lat}&lng=${lng}`;
        }, function (error) {
            alert("위치 정보를 가져오는 데 실패했습니다.");
        });
    } else {
        alert("이 브라우저는 Geolocation을 지원하지 않습니다.");
    }
});

// 병원 검색 버튼 클릭 이벤트
document.getElementById("searchButton").addEventListener("click", () => {
    const searchInput = document.getElementById("searchInput").value;
    if (searchInput.trim() !== "") {
        
        alert(`"${searchInput}" 검색 중...`);
    } else {
        alert("검색어를 입력해주세요.");
    }
});
