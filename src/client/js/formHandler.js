import { drawHappyFace, clearFace } from './happyFace'
import regeneratorRuntime from 'regenerator-runtime'

function urlValid(text) {
    let valid = /^(ftp|http|https):\/\/[^ "]+$/.test(text);
    return valid;
}

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('textInput').value
    let isUrl = document.getElementById('url').checked
    if (!formText) {
        alert('* Please enter a text or a url to evaluate')
        return;
    } else if (isUrl && !urlValid(formText)) {
        alert('* Please enter a correct URL')
        return;
    }

    handleClear(event);
    updateUI(formText);
}

/* Function to GET Project Data */

const updateUI = async (formText) => {
    const sentiments = await fetch(`http://localhost:8050/sentiments?text=${formText}`);
    const classify = await fetch(`http://localhost:8050/classify?text=${formText}`);
    try {
        const classifyData = await classify.json();
        const sentimentsData = await sentiments.json();
        document.getElementById('text').innerHTML = `<span style="font-weight:bold">Text/URL:</span> "${classifyData.text}"`;
        document.getElementById('language').innerHTML = `<span style="font-weight:bold">Language:</span> ${classifyData.language === 'en' ? 'English' : 'Other'}`;
        document.getElementById('polarity').innerHTML = `<span style="font-weight:bold">Polarity:</span> ${sentimentsData.polarity}`;
        document.getElementById('subjectivity').innerHTML = `<span style="font-weight:bold">Subjectivity:</span> ${sentimentsData.subjectivity}`;
        
        const categoryList = document.getElementById('categoryList');
        
        if (classifyData.categories.length) {
            classifyData.categories.forEach(element => {
                let newElement = document.createElement('div');
                newElement.innerHTML = `- ${element.label}`;
                categoryList.appendChild(newElement);
            });
        }
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
    document.getElementById('text').innerHTML = `<span style="font-weight:bold">Text/URL:</span> `;
    document.getElementById('language').innerHTML = `<span style="font-weight:bold">Language:</span> `;
    document.getElementById('categories').innerHTML = `<span style="font-weight:bold">Categories:</span>`;
    document.getElementById('polarity').innerHTML = '<span style="font-weight:bold">Polarity:</span>';
    document.getElementById('subjectivity').innerHTML = '<span style="font-weight:bold">Subjectivity:</span>';

    let canvas = document.getElementById("faceUI");

    const myNode = document.getElementById("categoryList");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    clearFace(canvas);
}

export { handleSubmit, handleClear, urlValid }
