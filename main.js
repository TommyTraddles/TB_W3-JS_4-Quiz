// --------------------------- Objeto con preguntas

let questions = [
	{
		number: 1,
		question: "Titular de pregunta 1",
		answer: "Opción 1 es correcta",
		list: [
			"Opción 1 es correcta",
			"Opción 2",
			"Opción 3",
			"Opción 4"
		]
	},
	{
		number: 2,
		question: "Titular de pregunta 2",
		answer: "Opción 2 es correcta",
		list: [
			"Opción 1",
			"Opción 2 es correcta",
			"Opción 3",
			"Opción 4"
		]
	},
	{
		number: 3,
		question: "Titular de pregunta 3",
		answer: "Opción 3 es correcta",
		list: [
			"Opción 1",
			"Opción 2",
			"Opción 3 es correcta",
			"Opción 4"
		]
	},
	{
		number: 4,
		question: "Titular de pregunta 4",
		answer: "Opción 4 es correcta",
		list: [
			"Opción 1",
			"Opción 2",
			"Opción 3",
			"Opción 4 es correcta"
		]
	},
	{
		number: 5,
		question: "Titular de pregunta 5",
		answer: "Opción 1 es correcta",
		list: [
			"Opción 1 es correcta",
			"Opción 2",
			"Opción 3",
			"Opción 4"
		]
	},
];

// --------------------------- Selectores
// páginas
const home_page = document.querySelector(".home"); // block, hidden
const question_page = document.querySelector(".question"); // hidden, block
const results_page = document.querySelector(".results");

// home-botones
const home_button_start = document.querySelector(".home__button-start");
const home_button_wait = document.querySelector(".home__button-wait");

const home_image = document.querySelector(".container");
const home_image_lottie = document.querySelector(".svg");

// preguntas
const question_number = document.querySelector(".question__number"); // shell
const question_title = document.querySelector(".question__title"); // shell
const question_list = document.querySelector(".question__list"); // shell

// preguntas-estados
// const question_option_pressed = document.querySelector(".pressed");
// const question_option_correct = document.querySelector(".correct");
// const question_option_wrong = document.querySelector(".wrong");

// preguntas-botones
const question_button_default = document.querySelector(".question__button--default"); // main button
// const question_button_correct = document.querySelector(".question__button--correct"); // estado
// const question_button_wrong = document.querySelector(".question__button--wrong"); // estado

// results
const results_score = document.querySelector(".results__score");
// results-botones 
const results_button_try = document.querySelector(".results__button-try");
const results_button_give = document.querySelector(".results__button-give");


// --------------------------- Variables globales
let question_counter = 0;
let user_score = 0;




// --------------------------- Function


// 01) INICIAR EL QUIZ 
let startQuiz = () => {
	home_page.style.display = 'none';
	question_page.style.display = 'block';
	results_button_give.innerHTML = 'Give up';
	showQuestions(0);
};

// 66)) 
function easterEgg1() {
	console.log('> EasterEgg1: hola')
	home_button_wait.innerHTML = "Ok… we’ll wait ⏳";
	home_button_wait.classList.add("wait")
};


// 02) MOSTRAR PREGUNTAS 
function showQuestions(index) {
	// definir shell de preguntas
	let questionCounter_tag = '<p>Question <span>' + questions[index].number + '</span> of <span>' + questions.length + '</span></p>';
	let question_tag = '<p>' + questions[index].question + '</p>';
	let option_tag = '<div class="question__option"><span>' + questions[index].list[0] + '</span></div>'
		+ '<div class="question__option"><span>' + questions[index].list[1] + '</span></div>'
		+ '<div class="question__option"><span>' + questions[index].list[2] + '</span></div>'
		+ '<div class="question__option"><span>' + questions[index].list[3] + '</span></div>';

	// imprimir en pantalla
	question_number.innerHTML = questionCounter_tag;
	question_title.innerHTML = question_tag;
	question_list.innerHTML = option_tag;

	// validar una respuesta correcta
	const question_option = question_list.querySelectorAll(".question__option"); // validar respueta
	for (let i = 0; i < question_option.length; i++) {
		question_option[i].setAttribute("onclick", "optionSelected(this)");
	}
};

// 03) VALIDAR RESPUESTA CORRECTA
function optionSelected(answer) {
	let user_answer = answer.textContent; // console.log(user_answer); // imprimir en pantalla el texto de cada DIV
	let correct_answer = questions[question_counter].answer; // console.log(correct_answer); // imprimir en pantalla la respueta correcta
	let allOptions = question_list.children.length;


	if (user_answer === correct_answer) {
		answer.classList.add('correct')
		question_button_default.classList.add('btn--correct')
		question_button_default.innerHTML = "You got it! 👏 Keep going";
		console.log('> Answer: Answer is correct');
		user_score += 1;
		console.log('> User score: ' + user_score)

	} else {
		answer.classList.add('wrong')
		question_button_default.classList.add('btn--wrong')
		question_button_default.innerHTML = "You’re dead 😵 Keep going";
		console.log('> Answer: Nah');

		// highlight the correct answer
		for (let i = 0; i < allOptions; i++) {
			if (question_list.children[i].textContent === correct_answer) {
				question_list.children[i].setAttribute("class", "question__option correct")
			}
		}
	}
	for (let i = 0; i < allOptions; i++) {
		question_list.children[i].classList.add("disabled");
	}

	// hidden button until you click
	question_button_default.style.display = "block";
};

// 04) NAVEGAR ENTRE PREGUNTAS
function nextQuestion() {
	if (question_counter < questions.length - 1) {
		question_counter++;
		question_button_default.style.display = "none";
		question_button_default.classList.remove('btn--wrong')
		question_button_default.classList.remove('btn--correct')
		showQuestions(question_counter)
	} else {
		console.log('> No more questions: Staph');
		showResultBox();
	}
};

// 05) MOSTRAR RESULTADOS
function showResultBox() {
	question_page.style.display = 'none';
	results_page.style.display = 'block';
	if (user_score > 3) {
		let result_tag = '<p>' + user_score + ' 🤘 of ' + questions.length + '</p>';
		results_score.innerHTML = result_tag;
	} else if (user_score > 1) {
		let result_tag = '<p>' + user_score + ' 👍 of ' + questions.length + '</p>';
		results_score.innerHTML = result_tag;
	} else {
		let result_tag = '<p>' + user_score + ' 🥲 of ' + questions.length + '</p>';
		results_score.innerHTML = result_tag;

	}
};

// 06) RECARGAR LA PÁGINA
function reload() {
	window.location.reload();
};

// 66) 
function easterEgg2() {
	console.log('> EasterEgg2: ciao')
	results_button_give.innerHTML = "About time ☠️";
	results_button_give.classList.add("death")
};


// --------------------------- Eventos 

// Navegación
home_button_start.addEventListener('click', startQuiz);
question_button_default.addEventListener('click', nextQuestion);
results_button_try.addEventListener('click', reload);
// Easter Egg
home_button_wait.addEventListener('click', easterEgg1);
results_button_give.addEventListener('click', easterEgg2);


// ---------------------------- Lottie

// home_button_wait
// home_image_lottie

// const animation_lotie = bodymovin.loadAnimation({
// 	wrapper: home_image_lottie,
// 	animType: 'svg',
// 	loop: false,
// 	autoplay: false, 
// 	path: 'https://assets3.lottiefiles.com/packages/lf20_cH6EFa.json'
// });

// home_button_wait.addEventListener('click', () =>{
// 	animation_lotie.goToPlay(0, true)
// });
