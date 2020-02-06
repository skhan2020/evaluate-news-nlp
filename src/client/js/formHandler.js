import { drawHappyFace, clearFace } from './happyFace'

function urlValid(text) {
    let isUrl = document.getElementById('url').checked
    if (isUrl) {
        let valid = /^(ftp|http|https):\/\/[^ "]+$/.test(text);
        return valid;
    }
    return true;
}

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('textInput').value
    if (!formText) {
        alert('* Please enter a text or a url')
        return;
    } else if (!urlValid(formText)) {
        alert('* Please enter a correct URL')
        return;
    }

    updateUI(formText);
}

/* Function to GET Project Data */

const updateUI = async (formText) => {
    const sentiments = await fetch(`/sentiments?text=${formText}`);
    const classify = await fetch(`/classify?text=${formText}`);
    try {
        const classifyData = await classify.json();
        const sentimentsData = await sentiments.json();
        document.getElementById('text').innerHTML = `<span style="color:#000000">Entered Text:</span> ${classifyData.text}`;
        document.getElementById('language').innerHTML = `<span style="color:#000000">Language:</span> ${classifyData.language === 'en' ? 'English' : 'Other'}`;
        document.getElementById('categories').innerHTML = `Categories: '${classifyData.categories}'!`;
        document.getElementById('polarity').innerHTML = `<span style="color:#000000">Polarity:</span> ${sentimentsData.polarity}`;
        document.getElementById('subjectivity').innerHTML = `<span style="color:#000000">Subjectivity:</span> ${sentimentsData.subjectivity}`;
        document.getElementById('subjectivity').innerHTML = `<span style="color:#000000">Subjectivity:</span> ${sentimentsData.subjectivity}`;

        let canvas = document.getElementById("faceUI");
        drawHappyFace(canvas, {
            lineColor: '#6F0047',
            x: canvas.width / 2,
            y: canvas.height / 2,
            radius: 100,
            polarity: sentimentsData.polarity,
            subjectivity: sentimentsData.subjectivity,
            confidence: sentimentsData.polarity_confidence
        });
    }
    catch (error) {
        console.log("error", error);
    }
}

function handleClear(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('textInput')
    formText.value = '';
    document.getElementById('text').innerHTML = `<span style="color:#000000">Entered Text:</span> `;
    document.getElementById('language').innerHTML = `<span style="color:#000000">Language:</span> `;
    document.getElementById('categories').innerHTML = `Categories: `;
    document.getElementById('polarity').innerHTML = '<span style="color:#000000">Polarity:</span>';
    document.getElementById('subjectivity').innerHTML = '<span style="color:#000000">Subjectivity:</span>';

    let canvas = document.getElementById("faceUI");

    clearFace(canvas);
}

export { handleSubmit, handleClear }
