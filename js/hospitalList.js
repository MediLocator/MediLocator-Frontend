// 병원 목록을 가져오는 함수
async function fetchHospitalList(latitude, longitude) {
    try {
        // 위치 기반으로 근처 병원 목록 조회
        const response = await fetch(`http://localhost:8080/api/aaa`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                latitude: latitude,
                longitude: longitude,
            }),
        });

        const hospitals = await response.json();
        if (hospitals && Array.isArray(hospitals)) {
            displayHospitals(hospitals); // 병원 목록을 화면에 표시
        } else {
            console.error("병원 목록을 가져오는 데 실패했습니다.");
        }
    } catch (error) {
        console.error("API 호출 오류:", error);
    }
}

// 병원 목록을 화면에 표시하는 함수
function displayHospitals(hospitals) {
    const hospitalListContainer = document.getElementById('hospitalList');

    // 기존의 목록을 지우고 새로 업데이트
    hospitalListContainer.innerHTML = '';

    hospitals.forEach(hospital => {
        const hospitalCard = document.createElement('div');
        hospitalCard.classList.add('hospital-card');

        hospitalCard.innerHTML = `
            <h2>${hospital.hospital_name}</h2>
            <p>연락처: ${hospital.contact || '정보 없음'}</p>
            <p>주소: ${hospital.address || '정보 없음'}</p>
            <p>진료시간: ${hospital.operating_hours || '정보 없음'}</p>
            <button onclick="fetchHospitalDetails(${hospital.hospital_id})">상세 보기</button>
        `;

        hospitalListContainer.appendChild(hospitalCard);
    });
}

// 병원 상세 정보를 가져오는 함수
async function fetchHospitalDetails(hospitalId) {
    try {
        const response = await fetch(`http://localhost:8080/api/bbb?hospital_id=${hospitalId}`);
        const details = await response.json();
        console.log('병원 상세 정보:', details);

        // 상세 정보를 화면에 표시할 수 있도록 추가 로직을 작성할 수 있습니다.
    } catch (error) {
        console.error("병원 상세 정보 가져오기 오류:", error);
    }
}

// 현재 위치를 가져오는 함수
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // 병원 목록을 가져오기
            fetchHospitalList(latitude, longitude);
        }, error => {
            console.error('위치 정보 오류:', error);
        });
    } else {
        console.error('이 브라우저는 위치 정보를 지원하지 않습니다.');
    }
}

// 페이지 로드 시 위치 정보를 가져와 병원 목록을 표시
window.onload = getCurrentLocation;
