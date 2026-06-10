/* =============================================
   AGROCLOSE – script.js
   JavaScript puro, sem dependências externas
   ============================================= */

/* ===================================================
   1. NAVBAR – scroll e menu mobile
   =================================================== */
(function () {
  const header     = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks   = document.getElementById('navLinks');
  const links      = navLinks.querySelectorAll('.nav-link');

  /* Efeito de fundo ao rolar */
  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* Abre/fecha menu mobile */
  menuToggle.addEventListener('click', function () {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  /* Fecha menu ao clicar em link */
  links.forEach(function (link) {
    link.addEventListener('click', function () {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
})();


/* ===================================================
   2. HERO – partículas flutuantes
   =================================================== */
(function () {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  var TOTAL = 28;

  for (var i = 0; i < TOTAL; i++) {
    var p = document.createElement('div');
    p.className = 'particle';

    /* posição e tamanho aleatórios */
    var size = Math.random() * 8 + 3;
    p.style.cssText = [
      'left:'    + Math.random() * 100 + '%',
      'top:'     + Math.random() * 100 + '%',
      'width:'   + size + 'px',
      'height:'  + size + 'px',
      'opacity:' + (Math.random() * .4 + .1),
      'animation-duration:'  + (Math.random() * 12 + 8) + 's',
      'animation-delay:'     + (Math.random() * 6)      + 's'
    ].join(';');

    container.appendChild(p);
  }
})();


/* ===================================================
   3. SCROLL REVEAL – revela elementos ao entrar na tela
   =================================================== */
(function () {
  /* Seleciona classes que devem ser animadas */
  var targets = document.querySelectorAll('.reveal, .reveal-stat');

  if (!targets.length) return;

  /* Atraso escalonado por grupo */
  var groups = {};
  targets.forEach(function (el) {
    var parent = el.parentElement;
    if (!groups[parent]) groups[parent] = [];
    groups[parent].push(el);
  });

  Object.values(groups).forEach(function (group) {
    group.forEach(function (el, idx) {
      el.style.transitionDelay = (idx * 0.09) + 's';
    });
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(function (el) { observer.observe(el); });
})();


/* ===================================================
   4. CONTAGEM ANIMADA – seção de impactos
   =================================================== */
(function () {
  var statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  var alreadyAnimated = false;

  function animateCount (el) {
    var target  = parseInt(el.getAttribute('data-target'), 10);
    var start   = 0;
    var duration = 1600; /* ms */
    var startTime = null;

    function step (timestamp) {
      if (!startTime) startTime = timestamp;
      var elapsed  = timestamp - startTime;
      var progress = Math.min(elapsed / duration, 1);
      /* easing easeOutCubic */
      var ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(ease * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }

    requestAnimationFrame(step);
  }

  var statsSection = document.getElementById('impactos');
  if (!statsSection) return;

  var sectionObserver = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting && !alreadyAnimated) {
      alreadyAnimated = true;
      statNumbers.forEach(function (el, idx) {
        setTimeout(function () { animateCount(el); }, idx * 150);
      });
    }
  }, { threshold: 0.25 });

  sectionObserver.observe(statsSection);
})();


/* ===================================================
   5. QUIZ EDUCATIVO
   =================================================== */
(function () {

  /* ---- Banco de perguntas ---- */
  var questions = [
    {
      text: 'Qual prática ajuda a preservar a fertilidade do solo?',
      options: [
        'Queimar plantações',
        'Rotação de culturas',
        'Desmatamento',
        'Uso excessivo de produtos químicos'
      ],
      correct: 1
    },
    {
      text: 'O que ajuda a economizar água na agricultura?',
      options: [
        'Irrigação inteligente',
        'Vazamentos constantes',
        'Desperdício de água',
        'Irrigar sem controle'
      ],
      correct: 0
    },
    {
      text: 'Qual fonte de energia é sustentável no campo?',
      options: [
        'Carvão',
        'Energia solar',
        'Queima de lixo',
        'Combustíveis altamente poluentes'
      ],
      correct: 1
    },
    {
      text: 'O que significa compostagem?',
      options: [
        'Jogar resíduos fora',
        'Transformar resíduos orgânicos em adubo',
        'Queimar restos vegetais',
        'Enterrar plástico'
      ],
      correct: 1
    },
    {
      text: 'Qual atitude ajuda a preservar o solo?',
      options: [
        'Desmatamento',
        'Plantio sem planejamento',
        'Cobertura vegetal',
        'Excesso de queimadas'
      ],
      correct: 2
    },
    {
      text: 'Qual é um benefício da agricultura sustentável?',
      options: [
        'Maior desperdício',
        'Preservação ambiental',
        'Poluição excessiva',
        'Esgotamento do solo'
      ],
      correct: 1
    },
    {
      text: 'O reaproveitamento da água ajuda a:',
      options: [
        'Economizar recursos naturais',
        'Poluir rios',
        'Desperdiçar mais água',
        'Aumentar vazamentos'
      ],
      correct: 0
    },
    {
      text: 'O controle biológico de pragas utiliza:',
      options: [
        'Métodos naturais',
        'Apenas substâncias tóxicas',
        'Queimadas',
        'Desmatamento'
      ],
      correct: 0
    },
    {
      text: 'Por que preservar a biodiversidade é importante?',
      options: [
        'Reduz equilíbrio ecológico',
        'Protege ecossistemas',
        'Destrói espécies',
        'Aumenta impactos ambientais'
      ],
      correct: 1
    },
    {
      text: 'Qual atitude representa agricultura responsável?',
      options: [
        'Uso excessivo de água',
        'Produção equilibrada e consciente',
        'Poluição constante',
        'Desmatamento sem controle'
      ],
      correct: 1
    }
  ];

  /* ---- Referências DOM ---- */
  var quizCard      = document.getElementById('quizCard');
  var quizResult    = document.getElementById('quizResult');
  var progressFill  = document.getElementById('progressFill');
  var progressText  = document.getElementById('progressText');
  var questionNumber = document.getElementById('questionNumber');
  var questionText  = document.getElementById('questionText');
  var optionsGrid   = document.getElementById('optionsGrid');
  var feedbackBox   = document.getElementById('feedbackBox');
  var btnNext       = document.getElementById('btnNext');
  var btnRestart    = document.getElementById('btnRestart');
  var resultEmoji   = document.getElementById('resultEmoji');
  var resultTitle   = document.getElementById('resultTitle');
  var resultText    = document.getElementById('resultText');
  var resultScore   = document.getElementById('resultScore');

  if (!quizCard) return; /* Sai se o quiz não estiver na página */

  /* ---- Estado ---- */
  var currentIndex = 0;
  var score        = 0;
  var answered     = false;

  /* ---- Funções ---- */

  /* Carrega a pergunta atual */
  function loadQuestion () {
    var q      = questions[currentIndex];
    answered   = false;

    /* Número e texto */
    questionNumber.textContent = 'Pergunta ' + (currentIndex + 1);
    questionText.textContent   = q.text;

    /* Limpa opções e feedback */
    optionsGrid.innerHTML = '';
    feedbackBox.className = 'feedback-box';
    feedbackBox.textContent = '';
    btnNext.style.display = 'none';

    /* Cria botões de opção */
    q.options.forEach(function (opt, idx) {
      var btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', function () { selectAnswer(idx); });
      optionsGrid.appendChild(btn);
    });

    /* Atualiza barra de progresso */
    var pct = ((currentIndex + 1) / questions.length) * 100;
    progressFill.style.width = pct + '%';
    progressText.textContent = 'Pergunta ' + (currentIndex + 1) + ' de ' + questions.length;
  }

  /* Processa a resposta selecionada */
  function selectAnswer (idx) {
    if (answered) return;
    answered = true;

    var q       = questions[currentIndex];
    var buttons = optionsGrid.querySelectorAll('.option-btn');

    /* Desabilita todos os botões */
    buttons.forEach(function (btn) { btn.disabled = true; });

    /* Destaca correto e errado */
    buttons[q.correct].classList.add('correct');

    if (idx === q.correct) {
      score++;
      feedbackBox.textContent = '✅ Resposta correta! Muito bem!';
      feedbackBox.className   = 'feedback-box correct';
    } else {
      buttons[idx].classList.add('wrong');
      feedbackBox.textContent = '❌ Resposta incorreta. A correta era: ' + q.options[q.correct];
      feedbackBox.className   = 'feedback-box wrong';
    }

    /* Exibe botão próxima/finalizar */
    btnNext.textContent   = (currentIndex < questions.length - 1) ? 'Próxima →' : 'Ver Resultado';
    btnNext.style.display = 'inline-block';
  }

  /* Avança para a próxima pergunta ou exibe resultado */
  function nextQuestion () {
    if (!answered) return;

    currentIndex++;
    if (currentIndex < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }

  /* Exibe tela de resultado */
  function showResult () {
    quizCard.style.display   = 'none';
    quizResult.style.display = 'block';

    var pct = (score / questions.length) * 100;

    /* Define emoji e mensagem conforme pontuação */
    var emoji, title, msg;
    if (pct === 100) {
      emoji = '🏆'; title = 'Perfeito!';
      msg   = 'Você acertou todas as perguntas. É um verdadeiro especialista em agricultura sustentável!';
    } else if (pct >= 70) {
      emoji = '🌟'; title = 'Muito bem!';
      msg   = 'Ótimo resultado! Você demonstra um bom conhecimento sobre práticas agrícolas sustentáveis.';
    } else if (pct >= 40) {
      emoji = '🌱'; title = 'Bom começo!';
      msg   = 'Você tem noções sobre o tema. Continue aprendendo e revisando o conteúdo!';
    } else {
      emoji = '📚'; title = 'Continue estudando!';
      msg   = 'Não desanime! Revise os tópicos do site e tente novamente. Você consegue!';
    }

    resultEmoji.textContent = emoji;
    resultTitle.textContent = title;
    resultText.textContent  = msg;
    resultScore.textContent = score + ' / ' + questions.length + ' acertos';

    /* Atualiza barra de progresso para 100% */
    progressFill.style.width = '100%';
    progressText.textContent = 'Quiz concluído!';
  }

  /* Reinicia o quiz */
  function restartQuiz () {
    currentIndex = 0;
    score        = 0;

    quizCard.style.display   = 'block';
    quizResult.style.display = 'none';

    progressFill.style.width = '10%';
    progressText.textContent = 'Pergunta 1 de 10';

    loadQuestion();
  }

  /* ---- Eventos ---- */
  btnNext.addEventListener('click', nextQuestion);
  btnRestart.addEventListener('click', restartQuiz);

  /* ---- Inicia o quiz ---- */
  loadQuestion();

})();
