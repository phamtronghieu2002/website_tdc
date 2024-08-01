
function updateContent(language) {
    const texts = dataLang[language];
    console.log("texts", texts);
    for (const key in texts) {
        // Sử dụng querySelectorAll để chọn tất cả các element có data-lang
        const elements = document.querySelectorAll(`[data-lang="${key}"]`);
        
        // Lặp qua mỗi element
        elements.forEach(element => {
            element.textContent = texts[key]; 
        });
    }
}


updateContent(lang)