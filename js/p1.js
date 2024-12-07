// 위치 기반 병원 검색
document.getElementById("locationSearchButton").addEventListener("click", function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            // 위치 기반 병원 검색 페이지로 이동
            window.location.href = `../p_2/index.html?lat=${lat}&lng=${lng}`;
        }, function () {
            alert("위치 정보를 가져오는 데 실패했습니다.");
        });
    } else {
        alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
    }
});

// 병원 이름 검색
document.getElementById("searchButton").addEventListener("click", function () {
    const searchInput = document.getElementById("searchInput").value.trim();
    if (searchInput !== "") {
        // 병원 검색 결과 페이지로 이동
        window.location.href = `../p_4/index.html?keyword=${encodeURIComponent(searchInput)}`;
    } else {
        alert("검색어를 입력하세요.");
    }
});

