// Knowledge base
const questions = [
    {
        question: "What type of applications do you want to develop?",
        options: ["Web", "Mobile", "Desktop", "Games"],
        rule: { Web: "JavaScript", Mobile: "Java", Desktop: "C++", Games: "C#" }
    },
    {
        question: "Are you interested in data analysis or machine learning?",
        options: ["Yes", "No"],
        rule: { Yes: "Python", No: "Next" }
    },
    {
        question: "Do you want to work with databases?",
        options: ["Yes", "No"],
        rule: { Yes: "SQL", No: "Next" }
    },
    {
        question: "Do you prefer working on the front-end or back-end of web applications?",
        options: ["Front-end", "Back-end", "Full-stack"],
        rule: { "Front-end": "NextJs", "Back-end": "NodeJs", "Full-stack": "JavaScript" }
    },
    {
        question: "Are you interested in game development?",
        options: ["Yes", "No"],
        rule: { Yes: "C#", No: "Next" }
    },
    {
        question: "Do you want to work on operating systems?",
        options: ["Yes", "No"],
        rule: { Yes: "C", No: "Next" }
    }
];

let currentQuestion = 0;
let recommendation = [];
let userChoices = [];

function loadQuestion() {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = "";

    if (currentQuestion < questions.length) {
        const question = questions[currentQuestion];
        const questionElement = document.createElement("p");
        questionElement.textContent = question.question;
        questionContainer.appendChild(questionElement);

        question.options.forEach(option => {
            const optionButton = document.createElement("button");
            optionButton.textContent = option;
            optionButton.onclick = () => {
                handleAnswer(option);
                userChoices.push(option);
                displayUserChoices();
            };
            questionContainer.appendChild(optionButton);
        });
    } else {
        showResult();
    }
}

function handleAnswer(answer) {
    const rule = questions[currentQuestion].rule;
    if (rule[answer] !== "Next") {
        recommendation.push(rule[answer]);
    }
    currentQuestion++;
    loadQuestion();
}

function displayUserChoices() {
    const userChoicesDiv = document.getElementById("user-choices");
    userChoicesDiv.innerHTML = "";
    userChoices.forEach((choice, index) => {
        const choiceElement = document.createElement("p");
        choiceElement.textContent = `${questions[index].question}: ${choice}`;
        userChoicesDiv.appendChild(choiceElement);
    });
}

function showResult() {
    document.getElementById("questionnaire").classList.add("hidden");
    const resultDiv = document.getElementById("result");
    resultDiv.classList.remove("hidden");
    
    // New: Display user choices with questions
    const userChoicesDiv = document.getElementById("user-choices");
    userChoicesDiv.innerHTML = questions.map((q, index) => 
        `<p>${q.question} <strong>${userChoices[index] || 'No answer'}</strong></p>`
    ).join("");

    const recommendationText = recommendation.join(" > ");
    const userChoicesText = userChoices.join(" > ");
    document.getElementById("recommendation").textContent =
        `Based on your choices, we recommend: ${recommendationText || "No specific recommendation. Try exploring more!"}`;
}

function restart() {
    currentQuestion = 0;
    recommendation = [];
    userChoices = [];
    document.getElementById("result").classList.add("hidden");
    document.getElementById("questionnaire").classList.remove("hidden");
    loadQuestion();
    document.getElementById("user-choices").innerHTML = ""; // Clear user choices display
}

// Initialize the expert system
loadQuestion();
