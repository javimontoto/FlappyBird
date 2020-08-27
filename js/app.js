document.addEventListener('DOMContentLoaded', () => {

    // SELECTORS
    const gameContainer = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');
    const bird = document.querySelector('.bird');

    // LISTENERS
    document.addEventListener('keyup', controlKeySpace);
    gameContainer.addEventListener('click', jump);

    // GLOBAL VARIABLES
    let birdLeft = 220;       // => margin left of bird
    let birdBottom = 200;     // => margin bottom of bird
    let gravity = 3;          // => defines gravity fall
    let birdJump = 50;        // => defines the jump height
    let skyHeight = 580;      // => height of sky (assign in css)
    let gap = 200;            // => height of gap
    let isGameOver = false;   // => flag game over

    // FUNCTIONS
    function startGame() {
        birdBottom -= gravity;
        bird.style.left = birdLeft + 'px';
        bird.style.bottom = birdBottom + 'px';
    }
 
    /**
     * @description Control that key press is space
     */
    function controlKeySpace(e) {
        if (e.keyCode === 32) jump();
    }

    /**
     * @description Jumping action when click in game-container
     */
    function jump() {
        birdBottom += birdJump;
        bird.style.bottom = birdBottom + 'px';
    }

    /**
     * @description Create obstacle
     */
    function createObstacle() {
        if (isGameOver) return;

        let obstacleLeft = 500;   // => initial positicion from left of an obstacle
        let obstacleBottom = 150; // => initial positicion from bottom of an obstacle

        const obstacleUp = document.createElement('div');
        const obstacleDown = document.createElement('div');
        const obstacleHeight = Math.random() * 300;    // => Obstacle height is ramdom

        obstacleUp.classList.add('obstacle-up');
        obstacleDown.classList.add('obstacle-down');
        gameContainer.appendChild(obstacleUp);
        gameContainer.appendChild(obstacleDown);
        obstacleUp.style.left = obstacleDown.style.left = obstacleLeft + 'px';
        obstacleUp.style.height = obstacleHeight + 'px';
        obstacleDown.style.bottom = obstacleBottom + 'px';
        let obstacleDownHeight = skyHeight - obstacleHeight - gap;
        obstacleDown.style.height = obstacleDownHeight + 'px';

        function moveObstacle() {
            obstacleLeft -= 2;
            obstacleUp.style.left = obstacleDown.style.left = obstacleLeft + 'px';

            // Check if obstacle is left
            if (obstacleLeft === -60) {
                clearInterval(obstacleTimerId);
                gameContainer.removeChild(obstacleUp);
                gameContainer.removeChild(obstacleDown);
            }

            // Check if the bird collides with an obstacle or falls to the ground
            if ((obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                ((birdBottom < obstacleDownHeight) || ((birdBottom+45) >= (obstacleDownHeight + gap)))) ||
                birdBottom === 0) {
                gameOver();
                clearInterval(obstacleTimerId);
            }
        }

        // Make obstacle move from right to left
        let obstacleTimerId = setInterval(moveObstacle, 20);

        // Create another obstacle in 3 seconds
       setTimeout(createObstacle, 3000);
    }


    /**
     * @description Stop the game
     */
    function gameOver() {
        bird.style.backgroundColor = 'red';
        clearInterval(gameTimerId);
        isGameOver = true;
        document.removeEventListener('keyup', controlKeySpace);
        gameContainer.removeEventListener('click', jump);
    }

    // STAR GAME
    const gameTimerId = setInterval(startGame, 20);
    createObstacle();
});