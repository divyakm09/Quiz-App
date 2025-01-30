let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

const quizArray = [
    {
        id: "0",
        question: "HTML stands for _________ ? ",
        options: [
            "Hyperlinks and Text Markup Language",
            "Home Tool Markup Language",
            "HyperText Markup Language",
            "HyperText and links Markup Language",
        ],
        correct: "HyperText Markup Language",
    },
    {
        id: "1",
        question: "Who is making the Web standards?",
        options: [
            "Microsoft",
            "Google",
            "The World Wide Web Consortium",
            "Mozilla",
        ],
        correct: "The World Wide Web Consortium",
    },
    {
        id: "2",
        question: "HTML document is saved using?",
        options: [
            ".html",
            ".htl",
            ".htnl",
            ".htyl",
        ],
        correct: ".html",
    },
    {
        id: "3",
        question: "What is the smallest header in HTML by default?",
        options: [
            "h1",
            "h6",
            "h3",
            "h5",
        ],
        correct: "h6",
    },
    {
        id: "4",
        question: "Which HTML tag is called the root element of an HTML document?",
        options: [
            "head",
            "title",
            "body",
            "html",
        ],
        correct: "html",
    },
    {
        id: "5",
        question: "Which of the following tag is used to insert a line-break in HTML?",
        options: [
            "br tag",
            "b tag",
            "head tag",
            "pre tag",
        ],
        correct: "br tag",
    },
    {
        id: "6",
        question: "Which of the following element is responsible for making the text bold in HTML?",
        options: [
            "pre tag",
            "a tag",
            "b tag",
            "br tag",
        ],
        correct: "b tag",
    },
    {
        id: "7",
        question: "Which is not an Internet Protocol?",
        options: [
            "IP",
            "FTP",
            "STP",
            "HTTP",
        ],
        correct: "STP",
    },
    {
        id: "8",
        question: "Google (www.google.com) is a: ?",
        options: [
            "Number in Math",
            "Search Engine",
            "Directory of images",
            "Chart service on the web",
        ],
        correct: "Search Engine",
    },
    {
        id: "9",
        question: "Which of the following attribute is used to provide a unique name to an element?",
        options: [
            "id",
            "type",
            "class",
            "all the above",
        ],
        correct: "id",
    },
];
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});
nextBtn.addEventListener(
    "click", 
    (displayNext = () => {
    questionCount += 1;
    if (questionCount == quizArray.length) {
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        userScore.innerHTML = "Your score is " + scoreCount + " out of " + questionCount;
    }
    else {
        countOfQuestion.innerHTML = questionCount + 1 + " of " + quizArray.length + " Question ";
        quizDisplay(questionCount);
        count = 11;
        clearInterval(countdown);
        timerDisplay();
    }
})
);
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    quizCards[questionCount].classList.remove("hide");
};
function quizCreater() {
    quizArray.sort(() => Math.random() - 0.5);
    for (let i of quizArray) {
        i.options.sort(() => Math.random() - 0.5);
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question ";
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        div.innerHTML += `
        <button class="option-div" onclick="checker(this)"> ${i.options[0]} </button>
        <button class="option-div" onclick="checker(this)"> ${i.options[1]} </button>
        <button class="option-div" onclick="checker(this)"> ${i.options[2]} </button>
        <button class="option-div" onclick="checker(this)"> ${i.options[3]} </button>
        `;
        quizContainer.appendChild(div);
    }
}
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    }
    else {
        userOption.classList.add("incorrect");
        options.forEach((element) => {
            if (element.innerHTML = quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }
    clearInterval(countdown);
    options.forEach((element) => {
        element.disabled = true;
    });
}
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreater();
    quizDisplay(questionCount);
}
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};
