let output;

output = document.getElementById("title");
output.innerHTML = "<strong>Shopping List</strong>";//changed title look

output = document.querySelector(".btn");

// ------ sub Title ---------
const div = document.createElement('div');//creates a div html tag
div.className = 'sub-title';
const text = document.createTextNode("This is a To Do app for anything");//create a text
div.appendChild(text);// append to div
document.querySelector('.title-container').appendChild(div);//add the div to the html page
// ---------------------------
 
//declaring function to create a to-do item and add it at the end of the list
function addItem(text) {
    const li = document.createElement("li");

    li.className = document.body.classList.contains("body-dark") ? "lst-item item-dark" : "lst-item";

    const txt = document.createTextNode(text);
    const btn = createButton("remove-item btn-link text-red");
    
    //merge the list item parts
    li.appendChild(txt);
    li.appendChild(btn);

    //place the item the page
    document.querySelector('ul').appendChild(li);

    checkUI();

    //reset the text input to empty string
    document.querySelector("#item-input").value = "";
}

// function to add item to local storage of browser
function addToStorage(item) {
    let itemsStored;
    
    // check if local storage has been used
    if (localStorage.getItem('items') === null) {
        itemsStored = []
    }
    else {
        itemsStored = JSON.parse(localStorage.getItem("items"));
    }

    // add new item to array
    itemsStored.push(item);

    // store to local storage
    localStorage.setItem('items', JSON.stringify(item))

}

function createButton(classes) {
    const btn = document.createElement("button");
    btn.className = classes;
    const ic = createIcon("fa-solid fa-xmark");
    btn.appendChild(ic);
    return btn;
}

function createIcon(classes) {
    const icon = document.createElement("i");
    icon.className = classes;
    return icon;
}

// replace an existing item
function replaceItem(num, txt) {
    const item = document.querySelector(`li:nth-child(${num})`);
    const cl = document.querySelector("li")

    const li = document.createElement("li");
    li.className = cl.className;
    li.innerText = txt;

    const btn = createButton("remove-item btn-link text-red");
    li.appendChild(btn);

    //replace the item
    item.replaceWith(li);
}

//deletes an item from the list
function removeItem(e) {
    // make sure the user clicks the x symbol button to delete item
    if (e.target.parentElement.classList.contains("remove-item"))
    {
        if (confirm("Are you sure?")) {
            // removes list item 
            e.target.parentElement.parentElement.remove();
            checkUI();
        }
    }
}

//handle event for clear button
function onClear() {
    if (confirm("Are you sure?")) {
        const items = document.querySelectorAll(".lst-item");
        console.log(items);
        items.forEach(element => element.remove());
        checkUI();
    }
}

const clearBtn = document.querySelector("#clear");

// primitive way of event listening
// clearBtn.onclick = () => onClear();

// modern event listening
// make clear button useful
clearBtn.addEventListener("click", onClear);


// make an event listener for the image logo which toggles dark mode
function onDblClick() {

    if (!document.body.classList.contains("body-dark")) {
        document.body.classList.add("body-dark");
        document.querySelectorAll("li").forEach(item => item.classList.add("item-dark"));
        document.querySelector("#clear").classList.add("clear-dark");
    }
    else {
        document.body.classList.remove("body-dark");
        document.querySelectorAll("li").forEach(item => item.classList.remove("item-dark"));
        document.querySelector("#clear").classList.remove("clear-dark");  
    }
    console.log(document.body.classList);
}

const logo = document.querySelector("img");
logo.addEventListener("dblclick", onDblClick );// call event listener



// using the event handle when an object is clicked
function onSubmit(e) {
    e.preventDefault();

    // get the text of the input form
    let inputTxt = document.querySelector("#item-input").value;
    console.log(inputTxt);

    // check if the text is empty string or some characters
    if (inputTxt === "") {
        alert("Please fill form");
        return;
    }
    addItem(inputTxt);
}

// form selected
const formItem = document.querySelector("#item-form");
formItem.addEventListener("submit", onSubmit);

//delete specific item
const ulList = document.querySelector("#item-list");
ulList.addEventListener("click", removeItem);


// function to check UI to update page
function checkUI() {
    const items = document.querySelectorAll("li");
    const itemFilter = document.querySelector("#filter");
    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = "none";
    }
    else{
        clearBtn.style.display = 'block';
        itemFilter.style.display = "block";
    }
}

// function to filter items on page
function filterText(e) {
    // prepare varaibels to filter
    const items = document.querySelectorAll("li");
    let text = e.target.value.toLowerCase();

    items.forEach(item => {
        const itemText = item.firstChild.textContent.toLowerCase();// get text of item
        // display items who have similar substrings
        if (itemText.indexOf(text) != -1) {
            item.style.display = 'flex';
        }
        else {
            item.style.display = 'none';
        }
    })
}
const filter = document.querySelector("#filter");
filter.addEventListener("input", filterText);

// upon loading the page we first check the UI
checkUI();

// using LocalStorage
localStorage.setItem('Joshua', "Lisa");