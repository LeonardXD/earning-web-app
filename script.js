document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const equationMode = document.getElementById('equationMode');
    const captchaMode = document.getElementById('captchaMode');
    const equationContainer = document.getElementById('equationModeContainer');
    const captchaContainer = document.getElementById('captchaModeContainer');
    const dailyRewardMode = document.getElementById('dailyRewardMode');
    const dailyRewardContainer = document.getElementById('dailyRewardModeContainer');
    const numberEncodingMode = document.getElementById('numberEncodingMode');
    const numberEncodingContainer = document.getElementById('numberEncodingModeContainer');
    const numberEncodingModal = document.getElementById('numberEncodingModal');
    const dailyRewardStatus = document.getElementById('dailyRewardStatus');
    const claimDailyRewardBtn = document.getElementById('claimDailyRewardBtn');
    const spinningRewardModal = document.getElementById('spinningRewardModal');
    const rewardSpinner = document.getElementById('rewardSpinner');
    const closeSpinningRewardModal = document.getElementById('closeSpinningRewardModal');
    const num1 = document.getElementById('num1');
    const num2 = document.getElementById('num2');
    const answerInput = document.getElementById('answer');
    const submitAnswerBtn = document.getElementById('submitAnswer');
    const captchaDisplay = document.getElementById('captchaDisplay');
    const captchaInput = document.getElementById('captchaInput');
    const submitCaptchaBtn = document.getElementById('submitCaptcha');
    const numberToEncode = document.getElementById('numberToEncode');
    const encodedNumberInput = document.getElementById('encodedNumberInput');
    const submitEncodedNumber = document.getElementById('submitEncodedNumber');
    const messageDisplay = document.querySelector('.message-display');
    const coinBalance = document.getElementById('coinBalance');
    const pesoBalance = document.getElementById('pesoBalance');
    const tasksCompleted = document.getElementById('tasksCompleted');
    const viewTasksBtn = document.getElementById('viewTasksBtn');
    const tasksModal = document.getElementById('tasksModal');
    const taskList = document.getElementById('taskList');
    const closeModal = document.querySelector('.close');
    const closeNumberEncodingModal = document.getElementById('closeNumberEncodingModal');
    const memoryMode = document.getElementById('memoryMode');
    const memoryGameModal = document.getElementById('memoryGameModal');
    const memoryGameGrid = document.getElementById('memoryGameGrid');
    const memoryGameTimer = document.getElementById('memoryGameTimer');
    const closeMemoryGameModal = document.getElementById('closeMemoryGameModal');
    const memoryGameContainer = document.getElementById('memoryGameContainer');
    const memoryPlayAgainBtn = document.getElementById('memoryPlayAgainBtn');

    // State
    let coins = 0;
    let eqSolved = 0;
    let capSolved = 0;
    let memoryGameCompleted = 0;
    let lastResetDate = localStorage.getItem('lastResetDate');
    let dailyRewardClaimedToday = localStorage.getItem('dailyRewardClaimedToday') === 'true';
    let equationTaskClaimedToday = localStorage.getItem('equationTaskClaimedToday') === 'true';
    let captchaTaskClaimedToday = localStorage.getItem('captchaTaskClaimedToday') === 'true';
    let memoryTaskClaimedToday = localStorage.getItem('memoryTaskClaimedToday') === 'true';

    // Function to get current date in PH time (YYYY-MM-DD)
    const getPHDate = () => {
        const now = new Date();
        return now.toLocaleDateString('en-CA', { timeZone: 'Asia/Manila' }); // YYYY-MM-DD format
    };

    // Load from localStorage
    if (localStorage.getItem('coinBalance')) {
        coins = parseInt(localStorage.getItem('coinBalance'));
        coinBalance.textContent = coins;
        const pesoValue = (coins / 1000).toFixed(2);
        pesoBalance.textContent = `(₱${pesoValue})`;
    }
    if (localStorage.getItem('eqSolved')) {
        eqSolved = parseInt(localStorage.getItem('eqSolved'));
    }
    if (localStorage.getItem('capSolved')) {
        capSolved = parseInt(localStorage.getItem('capSolved'));
    }
    if (localStorage.getItem('memoryGameCompleted')) {
        memoryGameCompleted = parseInt(localStorage.getItem('memoryGameCompleted'));
    }

    // Daily reset check
    const todayPH = getPHDate();
    if (lastResetDate !== todayPH) {
        eqSolved = 0;
        capSolved = 0;
        memoryGameCompleted = 0;
        dailyRewardClaimedToday = false;
        equationTaskClaimedToday = false;
        captchaTaskClaimedToday = false;
        memoryTaskClaimedToday = false;
        localStorage.setItem('lastResetDate', todayPH);
        localStorage.setItem('dailyRewardClaimedToday', 'false');
        localStorage.setItem('equationTaskClaimedToday', 'false');
        localStorage.setItem('captchaTaskClaimedToday', 'false');
        localStorage.setItem('memoryTaskClaimedToday', 'false');
    }

    // Functions
    const generateEquation = () => {
        const operators = ['+', '-', '*'];
        const operator = operators[Math.floor(Math.random() * operators.length)];
        let n1;
        let n2;

        if (operator == '*') {
            n1 = Math.floor(Math.random() * 127) + 1;
            n2 = Math.floor(Math.random() * 5) + 1;;
        } else {
            n1 = Math.floor(Math.random() * 127) + 1;
            n2 = Math.floor(Math.random() * 63) + 1;;
        }

        num1.textContent = n1;
        num2.textContent = n2;
        document.getElementById('operator').textContent = operator;
        answerInput.value = '';
    };

    const generateCaptcha = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        captchaDisplay.textContent = captcha;
        captchaInput.value = '';
    };

    const showMessage = (message, type) => {
        messageDisplay.textContent = message;
        messageDisplay.className = `message-display ${type}`;
        messageDisplay.style.display = 'block';
        messageDisplay.style.opacity = 1;
        setTimeout(() => {
            messageDisplay.style.opacity = 0;
            setTimeout(() => {
                messageDisplay.style.display = 'none';
            }, 500);
        }, 2000);
    };

    const updateCoins = (amount) => {
        coins += amount;
        coinBalance.textContent = coins;
        const pesoValue = (coins / 1000).toFixed(2);
        pesoBalance.textContent = `(₱${pesoValue})`;
        localStorage.setItem('coinBalance', coins);
    };

    const updateTasks = () => {
        let completed = 0;
        if (eqSolved >= 100) completed++;
        if (capSolved >= 100) completed++;
        if (memoryGameCompleted >= 25) completed++;
        tasksCompleted.textContent = completed;

        localStorage.setItem('eqSolved', eqSolved);
        localStorage.setItem('capSolved', capSolved);
        localStorage.setItem('memoryGameCompleted', memoryGameCompleted);

        taskList.innerHTML = `
            <div class="task-card">
                <p>Solve 100 equations</p>
                <p>Reward: 100 coins</p>
                <p>${eqSolved}/100</p>
                <button class="claim-reward-btn" data-task="equation" ${eqSolved < 100 || equationTaskClaimedToday ? 'disabled' : ''}>${equationTaskClaimedToday ? 'Claimed' : 'Claim'}</button>
            </div>
            <div class="task-card">
                <p>Solve 100 captchas</p>
                <p>Reward: 100 coins</p>
                <p>${capSolved}/100</p>
                <button class="claim-reward-btn" data-task="captcha" ${capSolved < 100 || captchaTaskClaimedToday ? 'disabled' : ''}>${captchaTaskClaimedToday ? 'Claimed' : 'Claim'}</button>
            </div>
            <div class="task-card">
                <p>Complete 25 Memory Challenges</p>
                <p>Reward: 100 coins</p>
                <p>${memoryGameCompleted}/25</p>
                <button class="claim-reward-btn" data-task="memory" ${memoryGameCompleted < 25 || memoryTaskClaimedToday ? 'disabled' : ''}>${memoryTaskClaimedToday ? 'Claimed' : 'Claim'}</button>
            </div>
        `;
    };

    // Event Listeners
    equationMode.addEventListener('change', () => {
        equationContainer.style.display = 'flex';
        captchaContainer.style.display = 'none';
        dailyRewardContainer.style.display = 'none';
        numberEncodingContainer.style.display = 'none';
        memoryGameContainer.style.display = 'none';
        generateEquation();
    });

    captchaMode.addEventListener('change', () => {
        equationContainer.style.display = 'none';
        captchaContainer.style.display = 'flex';
        captchaContainer.style.opacity = '1';
        captchaContainer.style.pointerEvents = 'auto';
        dailyRewardContainer.style.display = 'none';
        numberEncodingContainer.style.display = 'none';
        memoryGameContainer.style.display = 'none';
        generateCaptcha();
    });

    dailyRewardMode.addEventListener('change', () => {
        equationContainer.style.display = 'none';
        captchaContainer.style.display = 'none';
        dailyRewardContainer.style.display = 'flex';
        numberEncodingContainer.style.display = 'none';
        memoryGameContainer.style.display = 'none';
        updateDailyRewardUI();
        startCountdown();
    });

    numberEncodingMode.addEventListener('change', () => {
        equationContainer.style.display = 'none';
        captchaContainer.style.display = 'none';
        dailyRewardContainer.style.display = 'none';
        numberEncodingContainer.style.display = 'none';
        memoryGameContainer.style.display = 'none';
        numberEncodingModal.style.display = 'block';
    });

    closeNumberEncodingModal.addEventListener('click', () => {
        numberEncodingModal.style.display = 'none';
    });

    document.querySelectorAll('.digit-option-btn').forEach(button => {
        button.addEventListener('click', () => {
            const digits = parseInt(button.dataset.digits);
            const reward = parseInt(button.dataset.reward);
            numberEncodingModal.style.display = 'none';
            numberEncodingContainer.style.display = 'flex';
            generateNumberToEncode(digits, reward);
        });
    });

    const generateNumberToEncode = (digits, reward) => {
        let number = '';
        for (let i = 0; i < digits; i++) {
            number += Math.floor(Math.random() * 10);
        }
        numberToEncode.textContent = number;
        encodedNumberInput.value = '';
        submitEncodedNumber.dataset.reward = reward;
        submitEncodedNumber.dataset.original = number;
    };

    submitEncodedNumber.addEventListener('click', () => {
        const originalNumber = submitEncodedNumber.dataset.original;
        const encodedNumber = encodedNumberInput.value;
        const reward = parseInt(submitEncodedNumber.dataset.reward);

        if (encodedNumber === originalNumber) {
            showMessage(`Correct! You earned ${reward} coins`, 'success');
            updateCoins(reward);
        } else {
            showMessage('Incorrect. Try again.', 'error');
        }
        generateNumberToEncode(originalNumber.length, reward);
    });

    const updateDailyRewardUI = () => {""
        if (!dailyRewardClaimedToday) {
            dailyRewardStatus.textContent = '✅ Reward available!';
            claimDailyRewardBtn.disabled = false;
        } else {
            dailyRewardStatus.textContent = '⏳ Reward available in ';
            claimDailyRewardBtn.disabled = true;
        }
    };

    const startCountdown = () => {
        const updateCountdown = () => {
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(now.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0); // Midnight of tomorrow

            const timeRemaining = tomorrow.getTime() - now.getTime();

            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            if (dailyRewardClaimedToday) {
                dailyRewardStatus.textContent = `⏳ Reward available in ${hours}h ${minutes}m ${seconds}s`;
                claimDailyRewardBtn.style.backgroundColor = "var(--secondary-color)";
            }

            if (timeRemaining <= 0) {
                // Reset at midnight
                const todayPH = getPHDate();
                localStorage.setItem('lastResetDate', todayPH);
                localStorage.setItem('claimedToday', 'false');
                claimedToday = false;
                eqSolved = 0;
                capSolved = 0;
                memSolved = 0;
                localStorage.setItem('eqSolved', eqSolved);
                localStorage.setItem('capSolved', capSolved);
                updateDailyRewardUI();
                updateTasks();
            }
        };

        setInterval(updateCountdown, 1000);
        updateCountdown(); // Initial call to display immediately
    };

    submitAnswerBtn.addEventListener('click', () => {
        const n1 = parseInt(num1.textContent);
        const n2 = parseInt(num2.textContent);
        const operator = document.getElementById('operator').textContent;
        let correctAnswer;

        switch (operator) {
            case '+':
                correctAnswer = n1 + n2;
                break;
            case '-':
                correctAnswer = n1 - n2;
                break;
            case '*':
                correctAnswer = n1 * n2;
                break;
        }

        if (parseInt(answerInput.value) === correctAnswer) {
            showMessage('Correct! You earned 3 coins', 'success');
            updateCoins(3);
            eqSolved++;
            updateTasks();
        } else {
            showMessage('Incorrect. Try again.', 'error');
        }
        generateEquation();
    });

    answerInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            submitAnswerBtn.click();
        }
    });

    submitCaptchaBtn.addEventListener('click', () => {
        if (captchaInput.value === captchaDisplay.textContent) {
            showMessage('Correct! You earned 5 coins', 'success');
            updateCoins(5);
            capSolved++;
            updateTasks();
        } else {
            showMessage('Incorrect. Try again.', 'error');
        }
        generateCaptcha();
    });

    captchaInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            submitCaptchaBtn.click();
        }
    });

    encodedNumberInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            submitEncodedNumber.click();
        }
    })

    viewTasksBtn.addEventListener('click', () => {
        tasksModal.style.display = 'block';
        updateTasks();
    });

    closeModal.addEventListener('click', () => {
        tasksModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == tasksModal) {
            tasksModal.style.display = 'none';
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('claim-reward-btn')) {
            const taskType = e.target.dataset.task;
            let rewardAmount = 0;
            if (taskType === 'equation') {
                rewardAmount = 100;
            } else if (taskType === 'captcha') {
                rewardAmount = 100;
            } else if (taskType === 'memory') {
                rewardAmount = 100;
            }
            updateCoins(rewardAmount);
            showMessage(`${rewardAmount} coins claimed!`, 'success');
            e.target.disabled = true;
            e.target.textContent = 'Claimed';

            if (taskType === 'equation') {
                equationTaskClaimedToday = true;
                localStorage.setItem('equationTaskClaimedToday', 'true');
            } else if (taskType === 'captcha') {
                captchaTaskClaimedToday = true;
                localStorage.setItem('captchaTaskClaimedToday', 'true');
            } else if (taskType === 'memory') {
                memoryTaskClaimedToday = true;
                localStorage.setItem('memoryTaskClaimedToday', 'true');
            }
        }
    });

    claimDailyRewardBtn.addEventListener('click', () => {
        spinningRewardModal.style.display = 'block'; // Show the spinning modal

        const rand = Math.random();
        let rewardAmount;

        if (rand < 0.97) { // 97% chance
            rewardAmount = Math.floor(Math.random() * (870 - 100 + 1)) + 100;
        } else if (rand < 0.99) { // 2% chance (0.99 - 0.97)
            rewardAmount = Math.floor(Math.random() * (49999 - 871 + 1)) + 871;
        } else { // 1% chance
            rewardAmount = 50000;
        }

        // Spinning animation logic
        let spinInterval = setInterval(() => {
            rewardSpinner.textContent = Math.floor(Math.random() * (50000 - 100 + 1)) + 100;
        }, 50);

        setTimeout(() => {
            clearInterval(spinInterval);
            rewardSpinner.textContent = rewardAmount; // Display the actual reward
            updateCoins(rewardAmount); // Add to balance
            showMessage(`Claimed ${rewardAmount} coins!`, 'success');
            dailyRewardClaimedToday = true;
            localStorage.setItem('dailyRewardClaimedToday', 'true');
            updateDailyRewardUI();

            setTimeout(() => {
                spinningRewardModal.style.display = 'none'; // Hide modal after a short delay
            }, 1500); // Hide after 1.5 seconds

        }, 3000); // Spin for 3 seconds
    });

    closeSpinningRewardModal.addEventListener('click', () => {
        spinningRewardModal.style.display = 'none';
    });

    memoryPlayAgainBtn.addEventListener("click", function() {
        startMemoryGame();
    });

    // Initial setup
    generateEquation();
    generateCaptcha();
    updateTasks();

    // Memory Game Logic
    let memoryTimer;
    let timeLeft = 30;
    let flippedCards = [];
    let matchedPairs = 0;
    let gameActive = false;

    const createMemoryGame = () => {
        const numbers = Array.from({ length: 10 }, (_, i) => i + 1);
        const cardValues = [...numbers, ...numbers]; 
        cardValues.sort(() => Math.random() - 0.5); // Shuffle

        memoryGameGrid.innerHTML = '';
        matchedPairs = 0;
        gameActive = true;

        cardValues.forEach(value => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.value = value;

            card.innerHTML = `
                <div class="card-face card-front"></div>
                <div class="card-face card-rear">${value}</div>
            `;

            card.addEventListener('click', () => {
                if (gameActive && !card.classList.contains('flipped') && flippedCards.length < 2) {
                    card.classList.add('flipped');
                    flippedCards.push(card);

                    if (flippedCards.length === 2) {
                        setTimeout(checkForMatch, 500);
                    }
                }
            });

            memoryGameGrid.appendChild(card);
        });
    };

    const checkForMatch = () => {
        const [card1, card2] = flippedCards;
        if (card1.dataset.value === card2.dataset.value) {
            matchedPairs++;
            card1.style.pointerEvents = 'none';
            card2.style.pointerEvents = 'none';
            if (matchedPairs === 10) {
                endMemoryGame(true);
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }
        flippedCards = [];
    };

    const startMemoryGame = () => {
        memoryGameModal.style.display = 'block';
        createMemoryGame();
        timeLeft = 120;
        memoryGameTimer.textContent = `Time Left: ${timeLeft}s`;
        memoryTimer = setInterval(() => {
            timeLeft--;
            memoryGameTimer.textContent = `Time Left: ${timeLeft}s`;
            if (timeLeft <= 0) {
                endMemoryGame(false);
            }
        }, 1000);
    };

    const endMemoryGame = (success) => {
        clearInterval(memoryTimer);
        gameActive = false;
        showPlayAgainButton();

        if (success) {
            memoryGameCompleted++;
            updateTasks();
            showMessage('You won! You earned 50 coins.', 'success');
            updateCoins(50);
            showPlayAgainButton();
        }
        setTimeout(() => {
            memoryGameModal.style.display = 'none';
        }, 0);
    };

    const showPlayAgainButton = () => {
        memoryGameContainer.style.display = "block";
    }

    const hideContainers = () => {
        equationContainer.style.display = 'none';
        captchaContainer.style.display = 'none';
        dailyRewardContainer.style.display = 'none';
        numberEncodingContainer.style.display = 'none';
        memoryGameContainer.style.display = 'none';
    }

    memoryMode.addEventListener('change', () => {
        if (memoryMode.checked) {
            hideContainers();
            startMemoryGame();
        }
    });

    closeMemoryGameModal.addEventListener('click', () => {
        endMemoryGame(false);
    });
});