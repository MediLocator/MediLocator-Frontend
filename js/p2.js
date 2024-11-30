let map;
let userLocation = { lat: 0, lng: 0 };

// Google Maps 초기화
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: userLocation,
        zoom: 12,
    });

    // 사용자 위치 가져오기
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                // 위치를 지도 중심으로 설정
                map.setCenter(userLocation);
                // 사용자 위치에 마커 추가
                new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    title: "내 위치",
                });

                // 주변 병원 정보 가져오기
                getNearbyHospitals(userLocation.lat, userLocation.lng);
            },
            function () {
                alert("위치 정보를 가져올 수 없습니다.");
            }
        );
    } else {
        alert("이 브라우저는 Geolocation을 지원하지 않습니다.");
    }
}

// 주변 병원 목록 가져오기
function getNearbyHospitals(lat, lng) {
    fetch(`http://localhost:8080/api/nearby-hospitals?lat=${lat}&lng=${lng}`)
        .then((response) => response.json())
        .then((hospitals) => {
            const hospitalListElement = document.getElementById("hospital-list");
            hospitalListElement.innerHTML = ""; // 기존 목록 초기화

            hospitals.forEach((hospital) => {
                // 병원 리스트에 추가
                const listItem = document.createElement("li");
                listItem.textContent = hospital.name;
                listItem.addEventListener("click", () => {
                    // 병원 클릭 시 병원 상세 페이지로 이동
                    window.location.href = `hospital-detail.html?name=${hospital.name}`;
                });
                hospitalListElement.appendChild(listItem);

                // 병원 위치에 마커 추가
                const hospitalLocation = {
                    lat: hospital.lat,
                    lng: hospital.lon,
                };

                new google.maps.Marker({
                    position: hospitalLocation,
                    map: map,
                    title: hospital.name,
                });
            });
        })
        .catch((error) => {
            console.error("병원 정보 불러오기 실패:", error);
        });
}
