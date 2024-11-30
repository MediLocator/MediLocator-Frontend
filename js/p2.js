let map;
let userLocation = { lat: 0, lng: 0 };

// Google Maps 초기화 및 사용자 위치 가져오기
function initMap() {
    // HTML 요소에 지도 생성
    map = new google.maps.Map(document.getElementById("map"), {
        center: userLocation,
        zoom: 14,
    });

    // Geolocation을 통해 사용자 위치 가져오기
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                // 지도 중심을 사용자 위치로 설정
                map.setCenter(userLocation);

                // 사용자 위치에 마커 추가
                new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    title: "내 위치",
                });

                // 병원 목록 가져오기
                fetchHospitals(userLocation.lat, userLocation.lng);
            },
            function () {
                alert("위치 정보를 가져올 수 없습니다.");
            }
        );
    } else {
        alert("이 브라우저는 Geolocation을 지원하지 않습니다.");
    }
}

// 병원 목록 가져오기 (서버 요청)
function fetchHospitals(lat, lng) {
    fetch(`http://localhost:8080/api/nearby-hospitals?lat=${lat}&lng=${lng}`)
        .then((response) => response.json())
        .then((hospitals) => {
            displayHospitals(hospitals); // 병원 목록 표시
            addMarkers(hospitals); // 병원 마커 추가
        })
        .catch((error) => {
            console.error("병원 정보를 불러오지 못했습니다:", error);
        });
}

// 병원 목록 표시
function displayHospitals(hospitals) {
    const hospitalList = document.getElementById("hospital-list");
    hospitalList.innerHTML = ""; // 기존 목록 비우기

    hospitals.forEach((hospital) => {
        const listItem = document.createElement("li");
        listItem.className = "hospital-item";
        listItem.innerHTML = `
            <h3>${hospital.name}</h3>
            <p>주소: ${hospital.address}</p>
            <p>전화번호: ${hospital.phone}</p>
        `;
        listItem.addEventListener("click", () => {
            map.setCenter({ lat: hospital.lat, lng: hospital.lon });
            map.setZoom(16);
        });
        hospitalList.appendChild(listItem);
    });
}

// 병원 위치에 마커 추가
function addMarkers(hospitals) {
    hospitals.forEach((hospital) => {
        const marker = new google.maps.Marker({
            position: { lat: hospital.lat, lng: hospital.lon },
            map: map,
            title: hospital.name,
        });

        // 마커 클릭 이벤트
        const infoWindow = new google.maps.InfoWindow({
            content: `<div>
                        <h3>${hospital.name}</h3>
                        <p>${hospital.address}</p>
                    </div>`,
        });

        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });
    });
}

// 페이지 로드 시 지도 초기화
window.onload = initMap;
