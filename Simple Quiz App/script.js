const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Paris", "Madrid", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correctAnswer: "Blue Whale"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const gifElement = document.getElementById("gif");
const progressBar = document.getElementById("progress");

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    optionsContainer.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.className = "option";
        optionElement.textContent = option;
        optionElement.addEventListener("click", () => checkAnswer(index));
        optionsContainer.appendChild(optionElement);
    });

    updateProgressBar();
}

function checkAnswer(optionIndex) {
    const currentQuestion = quizData[currentQuestionIndex];

    if (optionIndex === -1 || currentQuestion.options[optionIndex] === currentQuestion.correctAnswer) {
        score++;
        resultElement.textContent = "Correct!";
        resultElement.style.color = "#4CAF50";
    } else {
        resultElement.textContent = `Incorrect! The correct answer is ${currentQuestion.correctAnswer}.`;
        resultElement.style.color = "#F44336";
    }

    // Disable further clicks on options
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.removeEventListener('click', checkAnswer));

    // Smooth transition for result display
    setTimeout(() => {
        currentQuestionIndex++;

        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

function showResult() {
    questionElement.textContent = "";
    optionsContainer.innerHTML = "";
    resultElement.textContent = "";
    scoreElement.textContent = `Your Score: ${score}/${quizData.length}`;

    // Fetch GIF from Giphy based on the score
    const gifURL = score >= 2
        ? "icegif-128.gif" // Winner GIF
        : "lose.gif"; // Loser GIF

    gifElement.src = gifURL;
    gifElement.style.display = "block";

    // Smooth transition for displaying GIF
    setTimeout(() => {
        gifElement.style.opacity = 1;
        gifElement.style.animation = "fadeIn 0.5s";
    }, 500);
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBar.querySelector("#progress").style.width = `${progress}%`;
}

// Initial load
loadQuestion();