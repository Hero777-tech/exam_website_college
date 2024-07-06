const questions = {
    html: [
        {q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Multi Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], a: 0},
        {q: "Which tag is used to create a hyperlink?", options: ["&lt;link&gt;", "&lt;a&gt;", "&lt;hlink&gt;", "&lt;url&gt;"], a: 1},
        {q: "Which HTML element is used to specify a header for a document or section?", options: ["&lt;head&gt;", "&lt;header&gt;", "&lt;top&gt;", "&lt;h1&gt;"], a: 1},
        {q: "What is the correct HTML element for inserting a line break?", options: ["&lt;lb&gt;", "&lt;break&gt;", "&lt;br&gt;", "&lt;newline&gt;"], a: 2},
        {q: "Which HTML attribute is used to define inline styles?", options: ["style", "css", "class", "font"], a: 0}
    ],
    css: [
        {q: "What does CSS stand for?", options: ["Colorful Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets"], a: 3},
        {q: "Which property is used to change the background color?", options: ["color", "bgcolor", "background-color", "background"], a: 2},
        {q: "How do you select an element with id 'demo'?", options: [".demo", "#demo", "*demo", "demo"], a: 1},
        {q: "Which CSS property controls the text size?", options: ["font-size", "text-size", "font-style", "text-style"], a: 0},
        {q: "What is the correct CSS syntax for making all the &lt;p&gt; elements bold?", options: ["p {font-weight:bold;}", "p {text-size:bold;}", "&lt;p style='font-size:bold;'&gt;", "p {text-style:bold;}"], a: 0}
    ],
    js: [
        {q: "Inside which HTML element do we put the JavaScript?", options: ["&lt;javascript&gt;", "&lt;js&gt;", "&lt;script&gt;", "&lt;scripting&gt;"], a: 2},
        {q: "What is the correct JavaScript syntax to change the content of the HTML element with id 'demo'?", options: ["document.getElementByName('demo').innerHTML = 'Hello';", "document.getElementById('demo').innerHTML = 'Hello';", "#demo.innerHTML = 'Hello';", "document.getElement('demo').innerHTML = 'Hello';"], a: 1},
        {q: "How do you create a function in JavaScript?", options: ["function myFunction()", "function:myFunction()", "function = myFunction()", "myFunction():function"], a: 0},
        {q: "How do you call a function named 'myFunction'?", options: ["call myFunction()", "myFunction()", "call function myFunction()", "Call.myFunction()"], a: 1},
        {q: "How to write an IF statement in JavaScript?", options: ["if i = 5 then", "if (i == 5)", "if i == 5 then", "if i = 5"], a: 1}
    ]
};

let examTaken = false;
let examScore = 0;

function showExam() {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('exam').style.display = 'block';
    generateQuestions();
}

function generateQuestions() {
    for (let category in questions) {
        let categoryQuestions = questions[category];
        let categoryHTML = '';
        categoryQuestions.forEach((q, index) => {
            categoryHTML += `
                <div class="question">
                    <p>${index + 1}. ${q.q}</p>
                    <div class="options">
                        ${q.options.map((option, i) => `
                            <label>
                                <input type="radio" name="${category}${index}" value="${i}">
                                ${option}
                            </label>
                        `).join('')}
                    </div>
                </div>
            `;
        });
        document.getElementById(`${category}Questions`).innerHTML = categoryHTML;
    }
}

function checkPerformance() {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('indexButton').style.display = 'block';
    if (examTaken) {
        document.getElementById('result').innerHTML = examScore;
    } else {
        document.getElementById('result').innerHTML = "You have not taken the exam yet.";
    }
    document.getElementById('result').style.display = 'block';
}

function submitExam() {
    let score = 0;
    let totalQuestions = 0;
    let correctAnswers = 0;

    for (let category in questions) {
        questions[category].forEach((q, index) => {
            totalQuestions++;
            let selectedAnswer = document.querySelector(`input[name="${category}${index}"]:checked`);
            if (selectedAnswer && parseInt(selectedAnswer.value) === q.a) {
                score++;
                correctAnswers++;
            }
        });
    }

    let percentage = (score / totalQuestions) * 100;
    examScore = `You scored ${score} out of ${totalQuestions} (${percentage.toFixed(2)}%).<br>
                 Correct answers: ${correctAnswers}<br>
                 Incorrect answers: ${totalQuestions - correctAnswers}`;
    
    document.getElementById('result').innerHTML = examScore;
    document.getElementById('exam').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('indexButton').style.display = 'block';
    
    examTaken = true;
}

function goToIndex() {
    document.getElementById('result').style.display = 'none';
    document.getElementById('indexButton').style.display = 'none';
    document.getElementById('landing').style.display = 'block';
}