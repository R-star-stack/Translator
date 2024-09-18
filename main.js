document.addEventListener("DOMContentLoaded", function() {
    let langOptions = document.querySelectorAll("select");
    let fromText = document.querySelector(".fromtext");
    let transText = document.querySelector(".totranslate");
    let fromVoice = document.querySelector(".from");
    let toVoice = document.querySelector(".to");
    let copyBtn = document.querySelector(".bx-copy");
    let countValue = document.querySelector(".code_length");

    // Populate language dropdown options
    const languages = {
        "en": "English",
        "kn-IN": "Kannada",
        "hi-IN": "Hindi",
        "ta-LK": "Tamil"
        // Add more language options as needed
    };

    langOptions.forEach(select => {
        for (let code in languages) {
            let option = `<option value="${code}">${languages[code]}</option>`;
            select.insertAdjacentHTML("beforeend", option);
        }
    });

    // Translate text
    fromText.addEventListener("input", function() {
        let content = fromText.value;
        let fromLang = langOptions[0].value;
        let toLang = langOptions[1].value;

        let transLink = `https://api.mymemory.translated.net/get?q=${content}&langpair=${fromLang}|${toLang}`;

        fetch(transLink)
            .then(response => response.json())
            .then(data => {
                transText.value = data.responseData.translatedText;
            })
            .catch(error => console.error("Translation error:", error));
    });

    // Speak original text
    fromVoice.addEventListener("click", function() {
        let utterance = new SpeechSynthesisUtterance(fromText.value);
        utterance.lang = langOptions[0].value;
        speechSynthesis.speak(utterance);
    });

    // Speak translated text
    toVoice.addEventListener("click", function() {
        let utterance = new SpeechSynthesisUtterance(transText.value);
        utterance.lang = langOptions[1].value;
        speechSynthesis.speak(utterance);
    });

    // Copy translated text to clipboard
    copyBtn.addEventListener("click", function() {
        navigator.clipboard.writeText(transText.value)
            .then(() => console.log("Text copied successfully"))
            .catch(error => console.error("Copy error:", error));
    });

    // Update character count
    fromText.addEventListener("input", function() {
        countValue.textContent = `${fromText.value.length}/5000`;
    });
});
