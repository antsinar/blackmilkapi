const startButton = document.getElementById('start-btn')
const nextbutton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

const anchor = document.createElement('a')
anchor.classList.add('hide')

let sortedQuestions, currentQuestionIndex

startButton.addEventListener('click',StartQuiz)
nextbutton.addEventListener('click',()=>{
    currentQuestionIndex++
    SetNextQuestion()
})

function StartQuiz(){
    resetState()
    startButton.classList.add('hide')
    sortedQuestions = questions.sort()
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    SetNextQuestion()
}

function SetNextQuestion(){
    resetState()

    ShowQuestion(sortedQuestions[currentQuestionIndex])
}

function ShowQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer=>{
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        button.addEventListener('click',selectAnswer)
        answerButtonsElement.appendChild(button)

    })

}


function resetState(){
    nextbutton.classList.add('hide')
    anchor.classList.add('hide')
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e){

    const selectedButton = e.target
    //edw mpainei to search

    let selectedAnswer = e.target.innerText
    let u = (new URL("https://blackmilkapi.herokuapp.com/coffees-search/"+selectedAnswer, document.location))
    anchor.setAttribute('href',u)
    anchor.innerText = "Αποτελέσματα αναζήτησης"

    anchor.classList.remove('hide')

    questionContainerElement.appendChild(anchor)

    if (sortedQuestions.length > currentQuestionIndex + 1){
        nextbutton.classList.remove('hide')
    }
    else{
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }

}

const questions = [
    {
    question: 'Πόσο παχύρευστος (σώμα) θέλεις να είναι ο καφές σου;',
    answers: [
        {text: 'μέτριο'},
        {text: 'μεσαίο'},
        {text: 'Φίνο'},
        {text: 'γεμάτο'},
        {text: 'πλούσιο'},
        {text: 'πλήρες'}
        ]
    },
    {
    question: 'Πόσο όξινος θέλεις να είναι ο καφές σου;',
    answers: [
        {text: 'ελαφριά'},
        {text: 'μέτρια'},
        {text: 'ισορροπημένη'},
        {text: 'Ευχάριστη'},
        {text: 'γλυκιά'},
        ]
    }
]