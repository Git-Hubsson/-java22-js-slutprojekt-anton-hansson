const sidebar = document.querySelector("#sidebar");
const [textField, amountOfPictures] = document.querySelectorAll('input');
const [sorting, sizing] = document.querySelectorAll('select');

document.querySelector('#searchButton').addEventListener('click', processUserInput);
document.querySelector('#saveFilterOptions').addEventListener('click', processUserInput);
document.querySelector('#saveFilterOptions').addEventListener('click', adjustSidebar);
document.querySelector("#filters").addEventListener('click', adjustSidebar);
textField.addEventListener('click', event => {
    textField.value = '';
})

//Takes user input and validates if all the inputs are OK. If everything is OK fetch method starts. 
//In fetch the program control that the response status is ok and in that case calls the method checkInputAndShowPictures.
function processUserInput(event) {
    event.preventDefault();
    const flickrURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b8239d9ae7dc16c9a7b0019cad12f70b&text=${textField.value}&sort=${sorting.value}&per_page=1000&format=json&nojsoncallback=1`;

    validateInput(textField.value, amountOfPictures.value);
    
    fetch(flickrURL)
        .then(response => {
            console.log(response);
            if(response.status >= 200 && response.status < 300) {
                return response.json();
            }
            else {
                throw (error);
            }
        })
        .then(data => checkInputAndShowPictures(data, amountOfPictures.value, sizing.value))
        .catch(error => {
            console.log(error);
            if (error == "TypeError: Failed to fetch") {
                createErrorMessage('There might be something wrong with your internet connection, please check your network and try again.');
            } 
            else {
                createErrorMessage(error);
            }
        });
}

//Checks if user input fulfills the requirements
function validateInput(text, amount) {
    if (text.trim() === '') {
        createErrorMessage (`Text input can not be empty`);
        throw (`Text input can not be empty`);
    }
    if (amount > 500) {
        createErrorMessage (`Cannot show more than 500 images`);
        throw (`Cannot show more than 500 images`);
    } else if (amount < 1) {
        createErrorMessage (`Amount of pictures can not be less than 1`);
        throw (`Amount of pictures can not be less than 1`);
    }
}

//Controls that there exists any match of the user input in the API.
//If amount is higher than the number of existing pictures, the program sets amount to the same number as there exists pictures.
//Then creates one image element for every value of amount.
function checkInputAndShowPictures(data, amount, size) {
    imageContainer.innerHTML = '';
    if (!data.photos.photo.length) {
        throw (`Couldn't find any pictures matching "${textField.value}"`);
    }
    if (data.photos.photo.length < amount) {
        amount = data.photos.photo.length;
    }
    for (let i = 0; i < amount; i++) {
        const serverID = data.photos.photo[i].server;
        const id = data.photos.photo[i].id;
        const secret = data.photos.photo[i].secret;
        const img = document.createElement('img');
        img.src = `https://live.staticflickr.com/${serverID}/${id}_${secret}_${size}.jpg`;
        img.addEventListener("click", event => {
            window.open(`https://live.staticflickr.com/${serverID}/${id}_${secret}_b.jpg`);
        });
        imageContainer.append(img);
    }
}

function createErrorMessage(text) {
    imageContainer.innerHTML = '';
    const p = document.createElement('p');
    p.innerHTML = text;
    p.classList.add('errorMessage');
    imageContainer.append(p);
}

//Adjust the sidebar where the user can choose what filters to apply for the search.
function adjustSidebar() {
    sidebar.classList.toggle("hidden");
    if (sidebar.classList.contains("hidden")) {
        imageContainer.style.width = '100%';
         sidebar.style.right = '-200px';
    } else {
        sidebar.style.right = '0';
        imageContainer.style.width = 'calc(100% - 200px)';
    }
}

