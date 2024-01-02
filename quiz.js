const data = [ //an array with three elements
    { //data[0]
        id: 1, //data[0].id
        question:"Who is Harry Potter's godfather?", //data[0].question
        answers: [
            {answer: "Severus Snape", isCorrect: false},
            {answer: "Remus Lupin", isCorrect: false},
            {answer: "Sirius Black", isCorrect: true},
            {answer: "Albus Dumbledore", isCorrect: false},
        ],
    },

    {
        id: 2,
        question:"What is Ron most afriad of?",
        answers: [
            {answer: "Spiders", isCorrect: true},
            {answer: "Girls", isCorrect: false},
            {answer: "Books", isCorrect: false},
            {answer: "Severus Snape", isCorrect: false},
        ],
    },

    {
        id: 3,
        question:"Who is the wizard that pretend to be Alastor Moody to coach in Hogwartz?",
        answers: [
            {answer: "Barty Crouch", isCorrect: false},
            {answer: "Barty Crouch Jr.", isCorrect: true},
            {answer: "Lord Voldemort", isCorrect: false},
            {answer: "Peter Pettigrew", isCorrect: false},
        ],
    },

];

const gameScreen = document.querySelector(".game")
const resultScreen = document.querySelector(".result")
const question = document.querySelector(".question")
const answersContainer = document.querySelector(".answers")
const submit = document.querySelector(".submit")
const play = document.querySelector(".play")

let qIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let total = 0;
let selectedAnswer;

//setting up functions

const selectAnswer = () =>{
    answersContainer.querySelectorAll("input").forEach(element=>{
        element.addEventListener("click",(e)=>{
            selectedAnswer = e.target.value;
        });
    });
}

const showResult = () => {
    resultScreen.style.display = "block";
    gameScreen.style.display = "none"; //transform screen

    resultScreen.querySelector(".correct").textContent = 
    `Correct Answers: ${correctCount}`

    resultScreen.querySelector(".wrong").textContent = 
    `Wrong Answers: ${wrongCount}`

    resultScreen.querySelector(".score").textContent = 
    `Score: ${(correctCount-wrongCount) * 10}`
}

const showQuestion = (qNumber) => { //function to let questions appear on screen
    if(qIndex == data.length) return showResult(); //if no question left
    selectedAnswer = null;//set selectedAnswer to null everytime when showQuestion() is called; set prohibition and warning aftwewards
    question.textContent = data[qNumber].question;
    answersContainer.innerHTML = data[qNumber].answers.map((item,index) => /*write any inner HTML code here! more efficient
                                                                          NOT A FUNCTION!!!*/
        `
        <div class="answer">
            <input name="answer" type="radio" id=${index} value=${item.isCorrect}> </input>
            <label for="1">${item.answer}</label>
        </div>
        ` 
        //radio buttons(单选按钮) name: so that only one answer can be selected
    ).join(""); //to prevent excessive commas

    selectAnswer();
}

const submitAnswer = () => {
    submit.addEventListener("click", ()=>{
        if(selectedAnswer != null){
            selectedAnswer == "true" ? correctCount++ : wrongCount++;
            qIndex++;
            showQuestion(qIndex) // because of this, selectedAnswer = null must be assigned in the showQuestion function
        }else alert("Select an answer!");
    })
}

//call functions
showQuestion(qIndex);
submitAnswer();

const playAgain = () => {
    qIndex = 0;
    wrongCount = 0;
    total = 0;
    correctCount = 0;
    showQuestion(qIndex);
};

play.addEventListener("click",()=>{
    resultScreen.style.display = "none";
    gameScreen.style.display = "block"; //transform screens
    playAgain();
})