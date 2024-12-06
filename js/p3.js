document.addEventListener("DOMContentLoaded", () => {
    const hospitalList = document.getElementById("hospital-list");
    const mapContainer = document.getElementById("map");

    // URL에서 hospital_id 파라미터를 가져옵니다.
    const urlParams = new URLSearchParams(window.location.search);
    const hospitalId = urlParams.get('hospital_id'); // hospital_id 파라미터 값

    if (!hospitalId) {
        alert('병원 ID가 URL에 포함되지 않았습니다.');
        return;
    }

    const apiUrl = `http://localhost:8080/api/hospital/${hospitalId}`;
    
    // API 호출
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // 병원 정보를 화면에 표시
            document.getElementById('hospital-name').textContent = data.name;
            document.getElementById('contact').textContent = `연락처: ${data.phoneNumber || '정보 없음'}`;
            document.getElementById('address').textContent = `주소: ${data.address || '정보 없음'}`;
            document.getElementById('category').textContent = `병원종류: ${data.category || '정보 없음'}`;
            document.getElementById('total-doctors').textContent = `의사 수: ${data.totalDoctors || 0}`;
        })
        .catch(error => {
            console.error('Error fetching hospital data:', error);
            alert('병원 정보를 가져오는 중 오류가 발생했습니다.');
        });
});
