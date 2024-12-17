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

    /**
     * 병원 정보 가져오기 및 화면에 표시
     */
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('hospital-name').textContent = data.name || '이름 정보 없음';
            document.getElementById('contact').textContent = `연락처: ${data.phoneNumber || '정보 없음'}`;
            document.getElementById('address').textContent = `주소: ${data.address || '정보 없음'}`;
            document.getElementById('category').textContent = `병원종류: ${data.category || '정보 없음'}`;
            document.getElementById('total-doctors').textContent = `의사 수: ${data.totalDoctors || 0}`;

            // 병상 수 확인 및 예약 버튼 관리
            const availableBeds = data.availableERbeds || 0;
            document.getElementById('available-beds').textContent = `사용 가능한 병상 수: ${availableBeds}`;

            const reserveBtn = document.getElementById('reserve-btn');
            if (availableBeds > 0) {
                reserveBtn.disabled = false;
                reserveBtn.classList.add("active"); // 활성화 클래스 추가 (스타일 변경용)
            } else {
                reserveBtn.disabled = true;
                reserveBtn.classList.remove("active"); // 비활성화 클래스 제거
            }
        })
        .catch(error => {
            console.error('Error fetching hospital data:', error);
            alert('병원 정보를 가져오는 중 오류가 발생했습니다.');
        });

    /**
     * 예약 폼 모달 열기/닫기 관리
     */
    const reservationModal = document.getElementById("reservation-modal");
    const openModalButton = document.getElementById("reserve-btn");
    const closeModalButton = document.getElementById("close-modal");
    let isModalOpen = false;

    const openModal = () => {
        if (!isModalOpen) {
            reservationModal.style.display = "flex";
            isModalOpen = true;
        }
    };

    const closeModal = () => {
        if (isModalOpen) {
            reservationModal.style.display = "none";
            isModalOpen = false;
        }
    };

    openModalButton.addEventListener("click", openModal);
    closeModalButton.addEventListener("click", closeModal);

    // 모달 외부 클릭 시 닫기
    window.addEventListener("click", (event) => {
        if (event.target === reservationModal) {
            closeModal();
        }
    });

    /**
     * 예약 폼 제출 처리
     */
    const reservationForm = document.getElementById("reservation-form");

    reservationForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const date = document.getElementById("reserve-date").value;
        const time = document.getElementById("reserve-time").value;
        const patientName = document.getElementById("reserve-name").value;
        const additionalInfo = document.getElementById("reserve-info").value;

        if (!date || !time || !patientName) {
            alert("날짜, 시간, 예약자 이름은 필수 항목입니다.");
            return;
        }

        alert(`예약이 완료되었습니다:\n병원: ${document.getElementById('hospital-name').textContent}\n예약일: ${date}\n예약시간: ${time}\n예약자: ${patientName}\n추가 정보: ${additionalInfo || '없음'}`);

        reservationForm.reset();
        closeModal();
    });
});
