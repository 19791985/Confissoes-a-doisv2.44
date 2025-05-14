const questions = [
  {
    question: "O que mais valorizas num momento íntimo?",
    answers: [
      { text: "Conexão emocional", value: "emoção" },
      { text: "Exploração do corpo", value: "físico" }
    ]
  },
  {
    question: "Gostarias de experimentar algo novo com o teu parceiro?",
    answers: [
      { text: "Sim, com confiança", value: "abertura" },
      { text: "Prefiro manter o que já conhecemos", value: "segurança" }
    ]
  }
];

let currentQuestion = 0;
let results = [];

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const startBtn = document.getElementById("start-btn");
const startPhaseBtn = document.getElementById("start-phase-btn");
const resultEl = document.getElementById("result");

startBtn.addEventListener("click", () => {
  document.getElementById("intro-screen").classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");
  showQuestion();
});

startPhaseBtn.addEventListener("click", () => {
  document.getElementById("phase-summary").classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");
  showQuestion();
});

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";
  q.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer.text;
    btn.onclick = () => {
      results.push(answer.value);
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        showResult();
      }
    };
    answersEl.appendChild(btn);
  });
}

function showResult() {
  document.getElementById("quiz-container").classList.add("hidden");

  const emotion = results.filter(r => r === "emoção").length;
  const fisico = results.filter(r => r === "físico").length;
  const abertura = results.filter(r => r === "abertura").length;
  const seguranca = results.filter(r => r === "segurança").length;

  let resumo = "Resumo psicológico:\n";

  if (emotion > fisico) {
    resumo += "- Valoriza ligação emocional.\n";
  } else {
    resumo += "- Dá importância à dimensão física.\n";
  }

  if (abertura > seguranca) {
    resumo += "- Está aberta a novas experiências.";
  } else {
    resumo += "- Prefere segurança e familiaridade.";
  }

  resultEl.textContent = resumo;
  resultEl.classList.remove("hidden");
}
