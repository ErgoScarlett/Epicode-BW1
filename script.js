const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      `In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?`,
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: [
      "Ice Cream Sandwich",
      "Jelly Bean",
      "Marshmallow",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

let counterExam = 0;
let timer;
const LIMIT_TIMER = 60;
const user = {
  exam: [],
  correct_answer: 0,
  incorrect_answer: 0,
  empty_answer: 0
}


// Creazione Elementi DOM per le domande
function createQuestion(question) {

  //Creo il Timer
  let divTimer = document.createElement('div');
  divTimer.id='timer';
  let nav = document.getElementById('top-bar');
  nav.appendChild(divTimer);

  let buttonNext = document.getElementById('start-quiz');
  buttonNext.innerText = 'NEXT';
  //Creao il titolo della domanda
  let titleQuestion = document.createElement('div');
  titleQuestion.id = 'titleQuestion';
  titleQuestion.innerText = question.question;

  //Container Div per le risposte
  let containerAnswer = document.createElement('div');
  containerAnswer.id = 'container-quiz';

  //Lista contenente le risposte
  let answerGroup = document.createElement('ul');
  answerGroup.id = 'answerGroup';
  answerGroup.style.listStyle = 'none';

  //Controllo se la domanda è di tipo multipla o booleana
  let numAnswers = question.type === 'multiple' ? 4 : 2;


  createAnswers(numAnswers, question, answerGroup);


  containerAnswer.appendChild(answerGroup);
  questionCounter(containerAnswer);


  document.body.append(titleQuestion, containerAnswer);

}

// Funzione per il conteggio del numero della domanda corrente
function questionCounter(containerAnswer) {
  let questionCount = document.getElementById('nQuestion');
   (questionCount);
  if (!questionCount) {

    let questionCount = document.createElement('div');
    questionCount.id = 'nQuestion';
    let textQuestCount = document.createElement('div');
    textQuestCount.innerHTML = `Question ${counterExam + 1} <span>/ ${questions.length}</span>`;
    questionCount.appendChild(textQuestCount);
    containerAnswer.appendChild(questionCount);
  } else {
    let textQuestCount = questionCount.children;
    textQuestCount[0].innerHTML = `Question ${counterExam + 1} <span>/ ${questions.length}</span>`;
  }


}

//Funzione per la posizione random della risposta corretta
function randomIndexAnswer(num) {
  return Math.floor(Math.random() * (num));
}

// Funzione per controllare se esiste già la formattazione per il quiz
function checkView() {
  let container = document.getElementById('container-quiz');
  return container ? container : false;
}




// Funzione per aggiornare la domande e le risposte nel DOM
function updateView(question) {
  timer = timerQuestion(LIMIT_TIMER);


  let titleQuestion = document.getElementById('titleQuestion');
  titleQuestion.innerText = question.question;
  let containerAnswer = document.getElementById('container-quiz');
  let answerGroup = document.getElementById('answerGroup');


  removeChildUl(answerGroup);

  //Controllo se la domanda è di tipo multipla o booleana
  let numAnswers = question.type === 'multiple' ? 4 : 2;

  createAnswers(numAnswers, question, answerGroup);



  containerAnswer.appendChild(answerGroup);
  questionCounter(containerAnswer);

  document.body.append(titleQuestion, containerAnswer);
}


function removeChildUl(ul) {
  while (ul.hasChildNodes()) {
    ul.removeChild(ul.lastChild);
  }
}


// Funzione che aggiorna lo user inserendo le risposte che dà ad ogni domanda
function updateUser(numQuiz) {
  let questionTitle = document.getElementById('titleQuestion').innerText;
  let answerGr = document.querySelectorAll('input');
  let labels = document.querySelectorAll('label');
  let answer = '';
  for (const an of answerGr) {
    if (an.checked) {
      // console.log(an);
      for (const label of labels) {
        if (label.htmlFor === an.id) {
          console.log(typeof questions[numQuiz].correct_answer);
          answer = label.innerText;
          console.log(typeof answer);
          
        }
      }
      
    }
  }
  user.exam.push({ question: questionTitle, userAnswer: answer });
  console.log(answer === questions[numQuiz].correct_answer);
  switch (answer) {

    case questions[numQuiz].correct_answer:
      user.correct_answer++;
      break;

    case '':
      user.empty_answer++;
      break;
  
    default:
      user.incorrect_answer++;
      break;
  }
  console.log(user);
  
}


// Funzione per creare dinamicamente le risposte
function createAnswers(numAnswers, question, answerGroup) {
  if (numAnswers === 4) {
    //Assegno un valore random per la posizione della risposta corretta
    let randomPosition = randomIndexAnswer(numAnswers);

    //Contatore per le risposte sbagliate
    let j = 0;

    for (let i = 0; i < numAnswers; i++) {
      let itemList = document.createElement('li');
      let answerItem = document.createElement('input');
      let labelAnswer = document.createElement('label');
      answerItem.type = 'radio';
      answerItem.name = 'answers';
      answerItem.id = 'input' + i;
      labelAnswer.htmlFor = answerItem.id;


      //Assegno alla posisizone random la risposta corretta
      if (i == randomPosition) {
        answerItem.value = i;
        labelAnswer.innerText = question.correct_answer;
      } else {
        labelAnswer.innerText = question.incorrect_answers[j];
        answerItem.value = i;
        j++;
      }




      itemList.append(answerItem, labelAnswer);
      answerGroup.appendChild(itemList);
    }





  } else { // Nel caso in cui le risposte fossero true o false...

    let itemList1 = document.createElement('li');
    let itemList2 = document.createElement('li');
    let answerTrue = document.createElement('input');
    let labelAnswerTrue = document.createElement('label');
    answerTrue.type = 'radio';
    answerTrue.id = 'answerTrue';
    answerTrue.name = 'answers';
    answerTrue.value = 'True';
    labelAnswerTrue.innerText = 'True';
    labelAnswerTrue .htmlFor = answerTrue.id;
    let answerFalse = document.createElement('input');
    let labelAnswerFalse = document.createElement('label');
    answerFalse.type = 'radio';
    answerFalse.id = 'answerFalse';
    answerFalse.name = 'answers';
    answerFalse.value = 'False';
    labelAnswerFalse.innerText = 'False';
    labelAnswerFalse .htmlFor = answerFalse.id;
    itemList1.append(answerTrue, labelAnswerTrue);
    itemList2.append(answerFalse, labelAnswerFalse);
    answerGroup.append(itemList1, itemList2);

  }
}

// Funzione che crea la Final Page
function createFinalPage() {

  // Elimino elementi dal DOM
  let nextButton = document.getElementById('start-quiz');
  let quiz = document.getElementById('container-quiz');
  let titleQuiz = document.getElementById('titleQuestion');
  let divTimer = document.getElementById('timer');
  nextButton.style.visibility = 'hidden';
  document.body.removeChild(quiz);
  document.body.removeChild(titleQuiz);
  divTimer.style.visibility = 'hidden';

  // Codice per creare gli elementi per la Final Page
  let container = document.createElement('div');
  container.classList = 'results';
  let titoloResult = document.createElement('h2');
  titoloResult.innerText = 'Quiz results';
  let containerDetails = document.createElement('div');
  containerDetails.classList = 'results-detail';
  let list = document.createElement('ul');
  let total = (100 /questions.length ) * user.correct_answer;
  let arguments = [
    `Correct: ${user.correct_answer} <span id="correctAnswers">/ ${questions.length} </span>`,
    `Wrong: ${user.incorrect_answer} <span id="incorrectAnswers">/ ${questions.length} </span>`,
    `Empty: ${user.empty_answer} <span id="emptyAnswers">/ ${questions.length} </span>`,
    `Total: ${total}% <span id="totalAnswers"> </span>`,
  ]

  for (const item of arguments) {
    let li = document.createElement('li');
    li.classList = 'border';
    li.innerHTML = item;
    list.appendChild(li);
  }
  containerDetails.appendChild(list);
  container.append(titoloResult,containerDetails);
  document.body.appendChild(container);


}


function timerQuestion(limit) {
  
  let divTimer = document.getElementById('timer');
  // let second = limit;
  divTimer.innerText = limit;  
  return window.setInterval(() => {
    limit --;
    divTimer.innerText = limit;  
    //  (limit);
    if (limit <= 0) {
      
      window.clearInterval(timer);
      updateUser(counterExam - 1);
      if (counterExam < questions.length) {
        
        
        updateView(questions[counterExam]);
      }else{
        createFinalPage();
      }
      counterExam++;
    }

  }, 1000);
  

  
}


// INIZIO LOGICA A DOM COMPLETATO
document.addEventListener('DOMContentLoaded', () => {

  

  const nextButton = document.getElementById('start-quiz');
  nextButton.addEventListener('click', () => {
    window.clearInterval(timer);
    let welcomePage = document.querySelector('main');
    let acceptance = document.getElementById('acceptance');
    if (acceptance && acceptance.checked) {
       ('acceptance ' + counterExam);
      document.body.removeChild(welcomePage);
      createQuestion(questions[counterExam]);
      timer = timerQuestion(LIMIT_TIMER);
      // counterExam++;
    } else if (counterExam < questions.length) {


      updateUser(counterExam - 1);
       (user);
      updateView(questions[counterExam]);
      
      
      if (counterExam == questions.length - 1) {
        nextButton.innerText = 'FINE';
      }

    } else {
      updateUser(counterExam - 1);
      createFinalPage();
    }
    counterExam++;
  });


});