export function searchBox() {
    const searchInput = document.querySelector("#searchInput") as HTMLInputElement;
    const searchButton = document.querySelector("#searchButton") as HTMLButtonElement;

    searchButton.addEventListener("click", () => {
        const query = searchInput.value;
        console.log(`�˻���: ${query}`);
        // API ȣ�� ���� �߰�
    });
}
