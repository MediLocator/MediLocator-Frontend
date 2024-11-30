let map;

function initMap() {
    // 사용자의 위치를 중심으로 지도를 생성
    const mapOptions = {
        center: { lat: 37.5665, lng: 126.978 },
        zoom: 12,
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // 병원 위치 마커를 지도에 추가하는 예시
    const marker = new google.maps.Marker({
        position: { lat: 37.5665, lng: 126.978 },
        map: map,
        title: "서울 아프지마 정형외과",
    });
}

// `window.onload` 이벤트에서 `initMap()`을 호출하도록 설정
window.initMap = initMap;
