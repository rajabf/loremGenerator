let inputForm = document.querySelector('.form-input')
let API_URL = 'https://api.api-ninjas.com/v1/loremipsum?paragraphs='

// FIRST RANGE
let elParagraphs = document.querySelector('#paragraphs')
let elParagraphsValue = document.querySelector('.paragraphsValue')

// SECOND RANGE
let elWords = document.querySelector('#words')
let elWordsValue = document.querySelector('.wordsValue')

// SELECT
let elTags = document.querySelector('#tags')
let elSelect = document.querySelector('#include')

let output = document.querySelector('.output')
let elCopyBtn = document.querySelector('#copy')

elParagraphs.addEventListener('input', evt => {
    elParagraphsValue.textContent = evt.target.value
})

elWords.addEventListener('input', evt => {
    elWordsValue.textContent = evt.target.value
})

function renderResult(result){
    let newTag = elTags.value
    switch (newTag) {
        case "p":
        output.style.fontSize = "small"
        break;
        case "h1":
        output.style.fontSize = "xx-large"
        break;
        case "h2":
        output.style.fontSize = "x-large"
        break;
        default:
        output.style.fontSize = "large"
        break;
    }
    
    const paragraphs = result.text.split('\n');
    let i = 0
    paragraphs.forEach(el => {
        let newParagraph = document.createElement(newTag)
        const att = document.createAttribute("class");
        att.value = `item${i}`
        newParagraph.setAttributeNode(att)
        newParagraph.innerText = el
        let words = newParagraph.innerText.split(' ')
        let result =  words.slice(0, elWordsValue.textContent).join(' ')
        if(elSelect.value == "Yes") {
            newParagraph.innerText = `<${newTag}>${result}</${newTag}>`
        }
        else {
            newParagraph.innerText = result
        }
        output.appendChild(newParagraph)
        i++
    });
    
    let mustRemove = document.querySelector('.output').lastChild
    mustRemove.remove()
}

async function getLorem(){
    
    try {
        const response = await fetch(API_URL + elParagraphsValue.textContent, {
            method: 'GET',
            headers: {
                'X-Api-Key': 'Fty6x1zRLQ+QCb2d8EvFcg==hKmgfp6XvbffbhIA',
                "Content-Type": "application/json"
            },
        })
        const data = await response.json()
        renderResult(data)
    } catch (err) {
        console.error(err.message)
    }
}

inputForm.addEventListener('submit', evt => {
    evt.preventDefault()
    output.innerHTML = ''
    getLorem()
})

elCopyBtn.addEventListener('click', evt => {
    evt.preventDefault()
    
    elCopyBtn.textContent = "Copied"
    navigator.clipboard.writeText(output.textContent);
    
    alert("Copied the text: " + output.textContent);
})