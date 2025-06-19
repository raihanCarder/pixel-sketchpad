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

let randomColorSelector = false;
let customColorSelector = false;
let shaderSelector = false;

createGrid(16); // Starting grid size

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

gridBtn.addEventListener("click", () => {
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

});

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
        e.target.style.background = randomColor();
    } else if (customColorSelector) {
        e.target.style.background = customColor();
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
        el.style.background = "white";
    })
    return;
}

// Custom Color Section

function customColor() {
    return inputColor.value;
}

// Shader Section 

function editOpacity() {

    if (shaderSelector) {
        boxes.forEach((el) => {
            el.style.opacity = "0.1";
        });
    } else if (boxes[0].style.opacity === "1") {
        return;
    }
    else {
        boxes.forEach((el) => {
            el.style.opacity = "1";
        });
    }
}

function changeOpacity(box) {
    const opacity = Number(box.style.opacity);
    if (opacity < 1) {
        return ((opacity * 100) + 10) / 100;
    }
    return;
}

// Finds Btn Clicked

function getClickedBtn(e) {
    falsifySelectors();
    if (randomColorBtn.id === e.currentTarget.id) {
        randomColorSelector = true;
    }
    else if (customColorBtn.id === e.currentTarget.id) {
        customColorSelector = true;
    }
    console.log(e.currentTarget.id);
    console.log(shaderBtn.id);
}


// Event Listeners 

shaderBtn.addEventListener("click", (e) => getClickedBtn(e));
customColorBtn.addEventListener("click", (e) => getClickedBtn(e));
resetBtn.addEventListener("click", resetBoard);
randomColorBtn.addEventListener("click", (e) => getClickedBtn(e));


