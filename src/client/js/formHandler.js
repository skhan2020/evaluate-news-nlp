function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('input').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8050/test')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message
    })
}

function handleClear(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('input')
    formText.value = '';
}

export { handleSubmit, handleClear }
