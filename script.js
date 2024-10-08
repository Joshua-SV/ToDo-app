let output;
let isEditMode = false;

output = document.getElementById("title");
output.innerHTML = "<strong>Shopping List</strong>";//changed title look

output = document.querySelector(".btn");

const formBtn = document.querySelector(".btn");

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
    const itemsStored = getStorageItems();

    // add new item to array
    itemsStored.push(item);

    // store to local storage
    localStorage.setItem('items', JSON.stringify(itemsStored));
}

// retrieve items from local storage
function getStorageItems() {
    let itemsStored;
    
    // check if local storage has been used
    if (localStorage.getItem('items') === null) {
        itemsStored = []
    }
    else {
        itemsStored = JSON.parse(localStorage.getItem("items"));
    }

    return itemsStored;
}

// function for displaying stored items
function displayStoredItems() {
    const itemsStored = getStorageItems();

    itemsStored.forEach((item) => {
        addItem(item);
    })
    checkUI();
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

function removeItemStorage(txt) {
    let itemsStored = getStorageItems();

    // remove item from the local storage array
    itemsStored = itemsStored.filter((item) => item != txt);

    // store to local storage
    localStorage.setItem('items', JSON.stringify(itemsStored));
}

//deletes an item from the list
function removeItem(item) {
    if (confirm("Are you sure?")) {
        // removes list item 
        item.remove();

        // remove from storage
        removeItemStorage(item.textContent);
        
        checkUI();
    }
}

function setItemToEdit(item) {
    isEditMode = true;
    // remove edit mode of previous items
    document.querySelectorAll('li').forEach((i) => {
        i.classList.remove('edit-mode');
    });

    // change display of item and button
    item.classList.add('edit-mode')
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item!'

    // set the text input to edit string
    document.querySelector("#item-input").value = item.textContent;

}

function onClick(e) {
    // make sure the user clicks the x symbol button to delete item
    if (e.target.parentElement.classList.contains("remove-item"))
    {
        removeItem(e.target.parentElement.parentElement);
    }
    else {
        setItemToEdit(e.target);
    }
}

function checkDuplicates(item)
{
    // check if item exist in storage
    const itemsStored = getStorageItems();

    return itemsStored.includes(item);
}

//handle event for clear button
function onClear() {
    if (confirm("Are you sure?")) {
        const items = document.querySelectorAll(".lst-item");
        console.log(items);
        items.forEach(element => element.remove());

        // remove all items from storage
        localStorage.removeItem('items');

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
    // check that edit mode is true
    if (isEditMode) {
        // select the item that is being edited
        const item = document.querySelector('.edit-mode');
        // remove from local storage first
        removeItemStorage(item.textContent);
        // then remove form every other place
        item.classList.remove('edit-mode');
        item.remove();
        isEditMode = false;
    } 
    else {
        if (checkDuplicates(inputTxt))
        {
            alert("Item already exist!");
            return;
        }
    }
    addItem(inputTxt);
    addToStorage(inputTxt);
}

// form selected
const formItem = document.querySelector("#item-form");
formItem.addEventListener("submit", onSubmit);

//upon clicking a specific item we can either delete or modify
const ulList = document.querySelector("#item-list");
ulList.addEventListener("click", onClick);


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

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    isEditMode = false;
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

// upon loading the page we first load items saved on local storage and check the UI
document.addEventListener("DOMContentLoaded", displayStoredItems);
checkUI();

// using LocalStorage
localStorage.setItem('Joshua', "Lisa");