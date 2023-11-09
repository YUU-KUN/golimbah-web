<template>
    <div id="game-container" ref="gameContainer">
        <div class="trash-bin">
            <div id="organic-bin" ref="organicBin" class="bin">
                <img src="../assets/img/game/bin1.png" alt="Organic Bin" />
            </div>
            <div id="non-organic-bin" ref="nonOrganicBin" class="bin">
                <img src="../assets/img/game/bin2.png" alt="Non-Organic Bin" />
            </div>
            <div id="metal-bin" ref="metalBin" class="bin">
                <img src="../assets/img/game/bin3.png" alt="Metal Bin" />
            </div>
            <img src="../assets/img/game/ground.png" class="ground" />
        </div>
        <div id="trash-container" ref="trashContainer"></div>
    </div>
    <div>
        <p>Score: <span id="score">{{ score }}</span></p>
        <button @click="startGame" :disabled="gameStarted">Start</button>
        <button @click="togglePause" :disabled="!gameStarted">{{ pauseButtonText }}</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const gameContainer = ref(null);
const organicBin = ref(null);
const nonOrganicBin = ref(null);
const metalBin = ref(null);
const trashContainer = ref(null);

let trashElements = [];
let currentTrash = null;
let score = ref(0);
let gameStarted = ref(false);
let isPaused = ref(false);
let trashInterval = null;
const pauseButtonText = ref('');

const trashItems = [
    { name: "News Paper", type: "organic" },
    { name: "Plastic Bottle", type: "non-organic" },
    { name: "Pizza Box", type: "organic" },
    { name: "Soda Can", type: "non-organic" },
    // Add more trash items as needed
];

onMounted(() => {
    // Your setup logic here...

    // Set the game container width for positioning

    // Additional setup logic...
    pauseButtonText.value = 'Pause'; // Set the initial text for the pause button

    // Attach event listeners and initiate the game...
});

function createRandomTrash() {
    const randomIndex = Math.floor(Math.random() * trashItems.length);
    const trash = trashItems[randomIndex];

    const trashElement = document.createElement("img");
    trashElement.src = "/assets/" + trash.name.toLowerCase().replace(" ", "_") + ".png";
    trashElement.alt = trash.name;
    trashElement.className = "trash " + trash.type;

    // Set initial position within the game container
    const containerWidth = gameContainer.value.clientWidth;
    trashElement.style.left = Math.random() * (containerWidth - 50) + "px"; // Random initial position
    trashElement.style.top = "0"; // Start from the top

    trashElement.style.objectFit = "contain";
    trashElement.style.background = "none";

    return trashElement;
}

function createTrashElement() {
    const newTrash = createRandomTrash();
    trashElements.push(newTrash);
    trashContainer.value.appendChild(newTrash);
    currentTrash = newTrash;
}

function removeTrashElement(trashElement) {
    const index = trashElements.indexOf(trashElement);
    if (index > -1) {
        trashElements.splice(index, 1);
    }
}

function moveTrash() {
    createTrashElement();

    trashElements.forEach((trash) => {
        let position = parseInt(trash.style.top) || 0;
        let trashSpeed = Math.random() * 5 + 1;
        position += trashSpeed;
        trash.style.top = position + "px";

        if (position >= gameContainer.value.clientHeight - trash.clientHeight - 180) {
            removeTrashElement(trash);

            if (
                trash.classList.contains("organic") &&
                trash.offsetLeft >= organicBin.value.offsetLeft &&
                trash.offsetLeft <= organicBin.value.offsetLeft + binWidth
            ) {
                score.value += 1;
            } else if (
                trash.classList.contains("non-organic") &&
                trash.offsetLeft >= nonOrganicBin.value.offsetLeft &&
                trash.offsetLeft <= nonOrganicBin.value.offsetLeft + binWidth
            ) {
                score.value += 1;
            } else {
                score.value -= 1;
            }

            trash.remove();
            if (currentTrash === trash) {
                currentTrash = null;
            }
        }
    });
}


function startGame() {
    if (!gameStarted.value) {
        trashElements = [];
        score.value = 0;
        gameStarted.value = true;
        isPaused.value = false;
        trashInterval = setInterval(() => moveTrash(), 3000);
    }
}


function togglePause() {
    if (isPaused) {
        isPaused = false;
        trashInterval = setInterval(() => moveTrash(), 3000);
    } else {
        isPaused = true;
        clearInterval(trashInterval);
    }
}

</script>

<style scoped>
body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    gap: 10px;
}

#game-container {
    background-color: #b2eaf9;
    position: relative;
    width: 450px;
    height: 700px;
    border: 1px solid #000;
    overflow: hidden;
}

.ground {
    position: absolute;
    bottom: 0;
    z-index: 3;
    width: 500px;
    height: 20px;
}

.bin {
    z-index: 5;
    position: absolute;
    bottom: 20px;
    width: 150px;
    height: 170px;
    text-align: center;
    line-height: 50px;
}

#metal-bin {
    left: 150px;
}

#organic-bin {
    left: 20px;
}

#non-organic-bin {
    right: 10px;
}

.trash {
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
}

.bin img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
