const toggle = document.getElementById('toggle');
const arm = document.getElementById('arm');
const boxContainer = document.getElementById('box-container');
const scoreDisplay = document.getElementById('score');
const scoreBoard = document.getElementById('score-board');

let score = 0;
let clickCount = 0;
let isAnimating = false;

toggle.addEventListener('change', (e) => {
    // Block interaction during active animation
    if (isAnimating) {
        e.preventDefault();
        toggle.checked = false;
        return;
    }

    if (toggle.checked) {
        isAnimating = true;

        // Active background theme & score tracking updates
        document.body.style.backgroundColor = "#fff9c4";
        scoreBoard.style.color = "#2c3e50";
        score++;
        scoreDisplay.textContent = score;
        clickCount++;

        // Step 1: Arm extends and lengthens out from the right
        setTimeout(() => {
            arm.classList.add('extend');

            // Step 2: Arm hits switch and resets state
            setTimeout(() => {
                toggle.checked = false;
                document.body.style.backgroundColor = "#2c3e50";
                scoreBoard.style.color = "#ffffff";

                // Step 3: Retract arm back out of sight
                setTimeout(() => {
                    arm.classList.remove('extend');

                    // Release animation lock after retraction finishes
                    setTimeout(() => {
                        isAnimating = false;
                    }, 500);

                }, 200);

            }, 500);

        }, 100);

        // Angry box mechanic: Teleport position after 5 consecutive clicks
        if (clickCount >= 5) {
            const randomX = Math.floor(Math.random() * 300) - 150;
            const randomY = Math.floor(Math.random() * 300) - 150;
            
            boxContainer.style.transform = `translate(${randomX}px, ${randomY}px)`;
            clickCount = 0;
        }
    }
});