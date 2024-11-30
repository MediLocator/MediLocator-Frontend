// 예시: 서버에서 병원 상세 정보를 받아와서 HTML에 채워넣는 코드
document.addEventListener("DOMContentLoaded", function () {
    // URL 파라미터에서 병원 식별자를 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const hospitalId = urlParams.get('hospital_id'); // 병원 ID 예시 (URL에서 hospital_id를 가져옵니다)

    // 병원 ID가 없으면 잘못된 URL로 접근했으므로 종료
    if (!hospitalId) {
        alert('잘못된 접근입니다.');
        return;
    }

    // 병원 ID를 사용하여 서버로부터 상세 정보를 받아오기
    fetch(`http://localhost:8080/api/bbb?hospital_id=${hospitalId}`)
        .then(response => response.json())
        .then(data => {
            // 병원 상세 정보 표시
            document.getElementById('hospital-name').textContent = data.hospital_name;
            document.getElementById('contact').textContent = `연락처: ${data.contact}`;
            document.getElementById('address').textContent = `주소: ${data.address}`;
            document.getElementById('hours').textContent = `진료시간: ${data.hours}`;
            document.getElementById('emergency').textContent = `응급실 운영여부: ${data.emergency ? '운영' : '미운영'}`;
            document.getElementById('waiting-patients').textContent = `대기 환자 수: ${data.waiting_patients}`;
            document.getElementById('available').textContent = `진료가능여부: ${data.available ? '가능' : '불가'}`;
        })
        .catch(error => console.error('Error:', error));
});
