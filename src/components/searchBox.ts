export function searchBox() {
    const searchInput = document.querySelector("#searchInput") as HTMLInputElement;
    const searchButton = document.querySelector("#searchButton") as HTMLButtonElement;

    searchButton.addEventListener("click", () => {
        const query = searchInput.value;
        console.log(`검색어: ${query}`);
        // API 호출 로직 추가
    });
}
