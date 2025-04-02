const questions = [
    {
        question: "What is Blockchain?",
        options: ["A type of cryptocurrency", "A digital ledger that records transactions", "A social media platform", "A video game"],
        answer: 1,
        hint: "It's a technology that underpins cryptocurrencies."
    },
    {
        question: "What is a Cryptocurrency?",
        options: ["A physical coin", "A digital or virtual currency that uses cryptography", "A type of bank account", "A government-issued currency"],
        answer: 1,
        hint: "Think of it as digital money."
    },
    {
        question: "Which of the following is the first cryptocurrency?",
        options: ["Ethereum", "Bitcoin", "Litecoin", "Ripple"],
        answer: 1,
        hint: "It was created in 2009."
    },
    {
        question: "What does 'decentralized' mean in the context of Web3?",
        options: ["Controlled by a single entity", "Distributed across multiple locations", "Only available on mobile devices", "Managed by the government"],
        answer: 1,
        hint: "No single point of control."
    },
    {
        question: "What is a Smart Contract?",
        options: ["A legal document", "A self-executing contract with the terms directly written into code", "A type of cryptocurrency", "A contract that requires a lawyer"],
        answer: 1,
        hint: "It runs on the blockchain."
    },
    {
        question: "What is Ethereum?",
        options: ["A type of cryptocurrency", "A blockchain platform that enables smart contracts", "A social media app", "A video game"],
        answer: 1,
        hint: "It's known for its smart contract functionality."
    },
    {
        question: "What is a Wallet in the context of cryptocurrencies?",
        options: ["A physical wallet for cash", "A software application that stores your cryptocurrencies", "A bank account", "A type of credit card"],
        answer: 1,
        hint: "It holds your digital assets."
    },
    {
        question: "What is the purpose of mining in blockchain?",
        options: ["To create new cryptocurrencies and validate transactions", "To store cryptocurrencies", "To trade cryptocurrencies", "To create physical coins"],
        answer: 0,
        hint: "It's essential for transaction verification."
    },
    {
        question: "What does NFT stand for?",
        options: ["Non-Fungible Token", "New Financial Technology", "National Fund Transfer", "Non-Financial Transaction"],
        answer: 0,
        hint: "It's a unique digital asset."
    },
    {
        question: "Which of the following is a benefit of using blockchain technology?",
        options: ["Increased transparency", "Centralized control", "High transaction fees", "Slow transaction speeds"],
        answer: 0,
        hint: "It allows for trustless transactions."
    },
    {
        question: "What is a DAO?",
        options: ["Decentralized Autonomous Organization", "Digital Asset Organization", "Data Analysis Operation", "None of the above"],
        answer: 0,
        hint: "It's run by smart contracts."
    },
    {
        question: "What is a Token?",
        options: ["A physical coin", "A digital asset created on a blockchain", "A type of wallet", "A smart contract"],
        answer: 1,
        hint: "It represents value on a blockchain."
    },
    {
        question: "What is Gas in Ethereum?",
        options: ["A type of fuel", "A fee required to execute transactions", "A cryptocurrency", "A smart contract"],
        answer: 1,
        hint: "It's the cost of doing transactions."
    },
    {
        question: "What is a dApp?",
        options: ["Decentralized Application", "Digital Application", "Data Application", "None of the above"],
        answer: 0,
        hint: "It's an app that runs on a blockchain."
    },
    {
        question: "What is a Fork in blockchain?",
        options: ["A type of cryptocurrency", "A change in the protocol of a blockchain", "A wallet", "A smart contract"],
        answer: 1,
        hint: "It can create a new version of the blockchain."
    }
];

let currentQuestionIndex = 0;
let missedQuestions = [];

function loadQuestion() {
    const quizCard = document.querySelector(".quiz-card");
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const nextButton = document.getElementById("next");
    const hintButton = document.getElementById("hint");

    // Fade-out transition
    quizCard.style.opacity = 0;

    setTimeout(() => {
        // Load new content after transition
        questionElement.textContent = questions[currentQuestionIndex].question;
        optionsElement.innerHTML = "";

        // Create option buttons
        questions[currentQuestionIndex].options.forEach((option, index) => {
            const button = document.createElement("button");
            button.className = "btn btn-light btn-block mt-2";
            button.textContent = option;
            button.onclick = () => selectAnswer(index);
            optionsElement.appendChild(button);
        });

        // Reset UI elements
        hintButton.style.display = "inline-block";
        nextButton.style.display = "none";

        // Fade-in transition
        quizCard.style.opacity = 1;
    }, 300);
}

function selectAnswer(selectedIndex) {
    // Store the selected answer and move to the next question
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex !== currentQuestion.answer) {
        missedQuestions.push({        question: currentQuestion.question,
            correctAnswer: currentQuestion.options[currentQuestion.answer]
        });
        }
    
        // Move to the next question
        currentQuestionIndex++;
        const nextButton = document.getElementById("next");
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }
    
    document.getElementById("hint").onclick = function() {
        const currentQuestion = questions[currentQuestionIndex];
        alert("Hint: " + currentQuestion.hint);
    };
    
    document.getElementById("next").onclick = function() {
        // This button is now handled in selectAnswer
    };
    
    function showResult() {
        const quizContainer = document.querySelector(".quiz-container");
        const resultContainer = document.getElementById("result");
        const missedQuestionsList = document.getElementById("missed-questions");
    
        // Hide quiz container and show result container
        quizContainer.style.display = "none";
        resultContainer.style.display = "block";
    
        // Display missed questions and correct answers
        missedQuestions.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `Question: ${item.question} - Correct Answer: ${item.correctAnswer}`;
            missedQuestionsList.appendChild(li);
        });
    
        // Add a link for users to learn more about Web3
        const learnMore = document.createElement("p");
        learnMore.innerHTML = 'To learn more about Web3, visit <a href="https://web3.foundation/" target="_blank">Web3 Foundation</a>.';
        resultContainer.appendChild(learnMore);
    }
    
    document.getElementById("restart").onclick = function() {
        currentQuestionIndex = 0;
        missedQuestions = [];
        document.getElementById("missed-questions").innerHTML = ""; // Clear the missed questions list
        document.getElementById("result").style.display = "none";
        document.querySelector(".quiz-container").style.display = "flex";
        loadQuestion();
    };
    
    // Load the first question when the page loads
    loadQuestion();