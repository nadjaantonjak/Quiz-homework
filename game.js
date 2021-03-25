
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');





let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What should appear at the very end of your JavaScript?',
        choice1: '<script>',
        choice2: 'End statement',
        choice3: '</script>',
        choice4: 'None of the above',
        answer: 3,
    },
    {
        question:
            "Which of the following are capabilities of functions in JavaScript?",
        choice1: "Return a value",
        choice2: "Accept Parameters and Return a value",
        choice3: "Accept Parameters",
        choice4: "None of the above",
        answer: 3,
    },
    {
        question: "_____ tag is a extention to HTML that can enclose any number of JavaScript  statements",
        choice1: "<script>",
        choice2: "<body>",
        choice3: "<head>",
        choice4: "<title>",
        answer: 1,
    },
    {
        question: " In JavaScript, what is a block of statement?",
        choice1: "Conditional block",
        choice2: "block that contains a single statement",
        choice3: "both conditional block and a single statement",
        choice4: "block that combines a number of statements into a single compound statement",
        answer: 4,
    },
    {
        question: "Why so JavaScript and Java have similar name?",
        choice1: "JavaScript's syntax is loosely based on Java's",
        choice2: "JavaScript is a stripped-down version of Java",
        choice3: "They both originated on the island of Java",
        choice4: "None of the above",
        answer: 1,
    },
    {
        question: "__________ JavaScript is also called server-side JavaScript ",
        choice1: "Microsoft",
        choice2: "Navigator",
        choice3: "livewire",
        choice4: "native",
        answer: 4,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 6

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}






startGame()




