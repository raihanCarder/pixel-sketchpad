const gridContainer = document.getElementById("grid-container");
const gridBtn = document.getElementById("create");
const inputText = document.getElementById("grid-input");
const gridSizeText = document.getElementById("current-grid-size");
const randomColorBtn = document.getElementById("random-colors");
const resetBtn = document.getElementById("reset");
let inputColor = document.getElementById("color-picker");
const customColorBtn = document.getElementById("custom-color");
const shaderBtn = document.getElementById("shader");
let allBoxes;
let boxes;

// Intialization 
createGrid(16);

// Btn Pressed Varaibles

let randomColorSelector = false;
let customColorSelector = false;
let shaderSelector = false;

// Update Grid Section

function updateBoxAmount() {
    allBoxes = document.querySelectorAll(".box");
    boxes = [...allBoxes];
}

function createGrid(size) {

    const boxSize = 700 / size;
    gridContainer.innerHTML = "";

    for (let j = 0; j < size; j++) {
        for (let i = 0; i < size; i++) {

            const newElement = document.createElement("div");
            newElement.style.width = `${boxSize}px`;
            newElement.style.height = `${boxSize}px`;
            newElement.style.background = "white";
            newElement.classList.add("box");
            gridContainer.appendChild(newElement);

        }
    }
    updateBoxAmount();
}

function validGridSize() {
    const gridSize = Number(inputText.value);
    const regex = /\./g;

    if (regex.test(gridSize)) {
        alert("Please enter an INTEGER grid size");
        inputText.value = "";
    }
    else if (gridSize <= 0 || gridSize > 100) {
        alert("Please enter a value between 1-100");
        inputText.value = "";
    }
    else {
        createGrid(gridSize);
        gridSizeText.textContent = `${gridSize} X ${gridSize}`
    }
}

// Random Color Btn Section

function randomColor() {
    const red = Math.floor(Math.random() * 255 + 1);
    const green = Math.floor(Math.random() * 255 + 1);
    const blue = Math.floor(Math.random() * 255 + 1);

    return `rgba(${red},${green},${blue}, 1)`;
}

// Update Hover Color Section

// Notes for future use : This makes it so everything inside this container
// will call this if mouse touches any child. 

gridContainer.addEventListener("mouseenter", (e) => {
    if (!e.target.classList.contains("box")) return; // Early check so doesnt alter parent.
    if (randomColorSelector) {
        e.target.opacity = undefined;
        e.target.style.background = randomColor();
    } else if (customColorSelector) {
        e.target.opacity = undefined;
        e.target.style.background = customColor();
    }
    else if (shaderSelector) {

        e.target.style.background = shaderColor(e);
    }

}, true);

function falsifySelectors() {
    randomColorSelector = false;
    customColorSelector = false;
    shaderSelector = false;
}

// Reset Btn Section

function resetBoard() {
    boxes.forEach((el) => {
        el.style.background = "rgba(255,255,255,1)";
    })
    return;
}

// Custom Color Section

function customColor() {
    console.log(inputColor.value);
    return inputColor.value;
}

// Shader Section 

function shaderColor(e) {
    const el = e.target;
    el.opacity = Math.min((el.opacity || 0.1) + 0.1, 1);
    el.style.background = `rgba(0, 0, 0, ${el.opacity})`;
    return;
}


// Finds Btn Clicked and Highlights Selected Btn

function getClickedBtn(id) {
    falsifySelectors();

    if (randomColorBtn.id === id) {
        randomColorSelector = true;
    }
    else if (customColorBtn.id === id) {
        customColorSelector = true;
    }
    else if (shaderBtn.id === id) {
        shaderSelector = true;
    }

    highlightBtn();
}

function highlightBtn() {

    // Reset Btn Colors 

    randomColorBtn.style.background = "#FCD34D";
    customColorBtn.style.background = "#FCD34D";
    shaderBtn.style.background = "#FCD34D";

    // Highlights Selected

    if (randomColorSelector) {
        randomColorBtn.style.background = "yellow";
    }
    else if (customColorSelector) {
        customColorBtn.style.background = "yellow";
    }
    else if (shaderSelector) {
        shaderBtn.style.background = "yellow";
    }
}


// Event Listeners 

gridBtn.addEventListener("click", validGridSize);
shaderBtn.addEventListener("click", (e) => getClickedBtn(e.currentTarget.id));
customColorBtn.addEventListener("click", (e) => getClickedBtn(e.currentTarget.id));
resetBtn.addEventListener("click", resetBoard);
randomColorBtn.addEventListener("click", (e) => getClickedBtn(e.currentTarget.id));
