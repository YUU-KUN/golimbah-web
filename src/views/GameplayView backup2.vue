<template>
    <div id="game-container">
        <div class="trash-bin">
            <div id="organic-bin" class="bin">
                <img src="/assets/bin1.png" alt="Organic Bin" />
            </div>
            <div id="non-organic-bin" class="bin">
                <img src="/assets/bin2.png" alt="Non-Organic Bin" />
            </div>
            <div id="metal-bin" class="bin">
                <img src="/assets/bin3.png" alt="Metal Bin" />
            </div>
            <img src="/assets/ground.png" class="ground" />
        </div>
        <div id="trash-container"></div>
    </div>
    <div>
        <p>Score: <span id="score">{{ score }}</span></p>
        <button ref="startButton" @click="startGame" :disabled="startButtonDisabled">Start</button>
        <button ref="pauseButton" @click="togglePause" :disabled="pauseButtonDisabled">{{ pauseButtonText }}</button>
    </div>
</template>
  
<script>
const trashItems = [
    { name: "News Paper", type: "organic" },
    { name: "Plastic Bottle", type: "non-organic" },
    { name: "Pizza Box", type: "organic" },
    { name: "Soda Can", type: "non-organic" },
    // Add more trash items as needed
];

export default {
    data() {
        return {
            trashElements: [],
            currentTrash: null,
            score: 0,
            binPosition: 0,
            binWidth: 150,
            gameContainerWidth: 200,
            scrollSensitivity: 5,
            maxOutOfBounds: 300,
            startButtonDisabled: false,
            pauseButtonDisabled: true,
            pauseButtonText: "Pause",
        };
    },
    methods: {
        createRandomTrash() {
            // Get random trash
            const randomIndex = Math.floor(Math.random() * trashItems.length);
            const trash = trashItems[randomIndex];

            // Create the trash
            const trashElement = document.createElement("img");
            trashElement.src = "/assets/" + trash.name.toLowerCase().replace(" ", "_") + ".png";
            trashElement.alt = trash.name;
            trashElement.className = "trash " + trash.type;
            trashElement.style.left = Math.random() * 250 + "px"; // Random initial position
            trashElement.style.objectFit = "contain";
            trashElement.style.background = "none";

            return trashElement;
        },
        createTrashElement() {
            const newTrash = this.createRandomTrash();
            this.trashElements.push(newTrash);
            document.getElementById("trash-container").appendChild(newTrash);
            this.currentTrash = newTrash;
        },
        removeTrashElement(trashElement) {
            const index = this.trashElements.indexOf(trashElement);
            if (index > -1) {
                this.trashElements.splice(index, 1);
            }
        },
        moveTrash() {
            this.createTrashElement();

            const trashSpeed = 1; // Make the trash fall slower

            const trashInterval = setInterval(() => {
                this.trashElements.forEach((trash) => {
                    let position = parseInt(trash.style.top) || 0;
                    position += trashSpeed;
                    trash.style.top = position + "px";

                    // Check if the trash item has reached the bottom
                    if (position >= document.getElementById("game-container").clientHeight - trash.clientHeight - 180) {
                        clearInterval(trashInterval);
                        this.removeTrashElement(trash);

                        // Check if it was sorted correctly
                        if (
                            trash.classList.contains("organic") &&
                            trash.offsetLeft >=
                            document.getElementById("organic-bin").offsetLeft &&
                            trash.offsetLeft <=
                            document.getElementById("organic-bin").offsetLeft +
                            document.getElementById("organic-bin").clientWidth
                        ) {
                            this.score += 1;
                        } else if (
                            trash.classList.contains("non-organic") &&
                            trash.offsetLeft >=
                            document.getElementById("non-organic-bin").offsetLeft &&
                            trash.offsetLeft <=
                            document.getElementById("non-organic-bin").offsetLeft +
                            document.getElementById("non-organic-bin").clientWidth
                        ) {
                            this.score += 1;
                        } else {
                            this.score -= 1;
                        }

                        document.getElementById("score").textContent = this.score;
                        trash.remove();

                        // Update currentTrash only if it matches the removed trash
                        if (this.currentTrash === trash) {
                            this.currentTrash = null;
                        }
                    }
                });
            }, 10);
        },
        updateBinPosition() {
            document.getElementById("organic-bin").style.left = this.binPosition + "px";
            document.getElementById("metal-bin").style.left = this.binPosition + this.binWidth + "px";
            document.getElementById("non-organic-bin").style.left = this.binPosition + this.binWidth * 2 + "px";
        },
        startGame() {
            this.trashElements = [];
            this.score = 0;
            document.getElementById("score").textContent = this.score;

            const gameContainer = document.getElementById("game-container");
            const trashContainer = document.getElementById("trash-container");

            // document.getElementById("startButton").disabled = true;
            this.$refs.startButton.disabled = true;
            this.$refs.pauseButton.disabled = false;
            // document.getElementById("pauseButton").disabled = false;

            trashContainer.innerHTML = ""; // Clear trash container

            this.updateBinPosition(); // Initialize bin position

            trashContainer.addEventListener("mousedown", (event) => {
                if (event.target.classList.contains("trash")) {
                    this.currentTrash = event.target;
                    this.currentTrash.style.transition = "none";
                    this.currentTrash.style.cursor = "grabbing";
                    const initialX = event.clientX - this.currentTrash.offsetLeft;
                    function movingTrash(event) {
                        this.currentTrash.style.left =
                            Math.max(
                                0,
                                Math.min(
                                    gameContainer.clientWidth - this.currentTrash.clientWidth,
                                    event.clientX - initialX
                                )
                            ) + "px";
                    }
                    function stopMovingTrash() {
                        this.currentTrash.style.transition = "";
                        this.currentTrash.style.cursor = "pointer";
                        document.removeEventListener("mousemove", movingTrash);
                        document.removeEventListener("mouseup", stopMovingTrash);
                    }
                    document.addEventListener("mousemove", movingTrash);
                    document.addEventListener("mouseup", stopMovingTrash);
                }
            });

            let trashInterval; // Declare trashInterval using 'let' instead of 'const'
            trashInterval = setInterval(() => {
                this.moveTrash();
            }, 3000); // Make the trash fall every 3 seconds


        },
        togglePause() {
            // Pause button functionality
            let isPaused = false;
            document.getElementById("pauseButton").addEventListener("click", () => {
                if (isPaused) {
                    trashInterval = setInterval(() => {
                        this.moveTrash();
                    }, 3000);
                    isPaused = false;
                    document.getElementById("pauseButton").textContent = "Pause";
                } else {
                    clearInterval(trashInterval);
                    isPaused = true;
                    document.getElementById("pauseButton").textContent = "Resume";
                }
            });
        },
    },
    mounted() {
        const gameContainer = document.getElementById("game-container");
        const trashContainer = document.getElementById("trash-container");

        trashContainer.innerHTML = "";
        this.updateBinPosition();

        trashContainer.addEventListener("mousedown", (event) => {
            // Your mouse down event handling here...
        });

        let trashInterval;
        trashInterval = setInterval(() => {
            this.moveTrash();
        }, 3000);

        this.$refs.startButton.addEventListener("click", this.startGame);
    },
};
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