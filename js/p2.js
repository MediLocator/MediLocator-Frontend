document.addEventListener("DOMContentLoaded", () => {
    const hospitalList = document.getElementById("hospital-list");
    const mapContainer = document.getElementById("map");

    const urlParams = new URLSearchParams(window.location.search);
    const userLat = parseFloat(urlParams.get("lat"));
    const userLng = parseFloat(urlParams.get("lng"));

    let map;
    const markers = [];

    if (userLat && userLng) {
        initializeMap(userLat, userLng);
        fetchNearbyHospitals(userLat, userLng);
    } else {
        alert("위치 정보가 URL에 포함되어 있지 않습니다.");
    }

    function initializeMap(lat, lng) {
        map = new google.maps.Map(mapContainer, {
            center: { lat: lat, lng: lng },
            zoom: 16,
        });

        new google.maps.Marker({
            position: { lat: lat, lng: lng },
            map: map,
            title: "현재 위치",
            icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            },
        });
    }

    async function fetchNearbyHospitals(latitude, longitude) {
        try {
            const response = await fetch(
                `http://localhost:8080/api/hospital/nearby?lat=${latitude}&lng=${longitude}`
            );

            if (response.ok) {
                const hospitals = await response.json();
                displayHospitals(hospitals);
                addMarkers(hospitals);
            } else {
                console.error("Failed to fetch hospitals:", response.status);
            }
        } catch (error) {
            console.error("Error fetching hospitals:", error);
        }
    }

    function displayHospitals(hospitals) {
        const hospitalListContainer = document.getElementById("hospital-list");
        hospitalListContainer.innerHTML = "";

        hospitals.forEach((hospital, index) => {
            const card = document.createElement("div");
            card.classList.add("hospital-card");

            const hospitalName = document.createElement("h3");
            hospitalName.textContent = hospital.name;
            card.appendChild(hospitalName);

            const hospitalInfo = document.createElement("p");
            hospitalInfo.textContent = `연락처: ${hospital.phoneNumber || '정보 없음'} | 주소: ${hospital.address || '정보 없음'} | 카테고리: ${hospital.category || '정보 없음'}`;
            card.appendChild(hospitalInfo);

            // 병원 카드 클릭: 지도 이동 및 마커 강조
            card.addEventListener("click", () => {
                const marker = markers[index];
                if (marker) {
                    map.setCenter(marker.getPosition());
                    map.setZoom(18);
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(() => marker.setAnimation(null), 1500);
                }
            });

            // 병원 카드 더블 클릭: 병원 상세 페이지로 이동
            card.addEventListener("dblclick", () => {
                window.location.href = `../p_3/index.html?hospital_id=${hospital.id}`;
            });

            // 병원 카드 안에 버튼 추가
            const button = document.createElement("button");
            button.textContent = "병원 상세보기";
            button.classList.add("hospital-button");
            button.addEventListener("click", () => {
                window.location.href = `../p_3/index.html?hospital_id=${hospital.id}`;
            });
            card.appendChild(button);

            hospitalListContainer.appendChild(card);
        });
    }

    function addMarkers(hospitals) {
        hospitals.forEach((hospital) => {
            const marker = new google.maps.Marker({
                position: { lat: hospital.ycoordinate, lng: hospital.xcoordinate },
                map: map,
                title: hospital.name,
            });

            markers.push(marker);

            marker.addListener("click", () => {
                alert(`
                    병원명: ${hospital.name}
                    카테고리: ${hospital.category}
                    주소: ${hospital.address}
                    전화번호: ${hospital.phoneNumber}
                    의사 수: ${hospital.totalDoctors}
                `);
            });
        });
    }
});
