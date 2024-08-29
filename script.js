let output;

output = document.getElementById("title");
output.innerHTML = "<strong>Shopping List</strong>";//changed title look

output = document.querySelector(".btn");
 
// --- change color of text ---
const listItems = document.querySelectorAll(".items");//get all elements tags with class name 'items'
listItems[0].firstElementChild.style.color = 'orange';//change color text of the first child tag

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
    const cl = document.querySelector("li");

    li.className = cl.className;

    const txt = document.createTextNode(text);
    const btn = createButton("remove-item btn-link text-red");
    
    //merge the list item parts
    li.appendChild(txt);
    li.appendChild(btn);

    //place the item the page
    document.querySelector('ul').appendChild(li);
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

addItem("Wife");

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

replaceItem(2, "Chocolate");

//deletes an item from the list
function removeItem(num) {
    document.querySelector(`li:nth-child(${num})`).remove()
}

//handle event for clear button
function onClear() {
   const items = document.querySelectorAll(".lst-item");
   console.log(items);
   items.forEach(element => element.remove());
}

const clearBtn = document.querySelector("#clear");

// primitive way of event listening
// clearBtn.onclick = () => onClear();

// modern event listening
// make clear button useful
clearBtn.addEventListener("click", () => onClear());


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
    else {
        addItem(inputTxt);
        return;
    }

}
// form selected
const formItem = document.querySelector("#item-form");
formItem.addEventListener("submit", onSubmit);

//delete specific item
const ULlist = document.querySelector("ul");

ULlist.addEventListener("click", (e) => { e.target.remove() });

