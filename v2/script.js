const questionBank = [
  { category: 'PERSONAJES', question: '¿Cómo se llama la protagonista de la serie?', options: ['Luna Valente', 'Ámbar Smith', 'Nina Simonetti'], answer: 0 },
  { category: 'PERSONAJES', question: '¿Quién interpreta a Luna Valente?', options: ['Valentina Zenere', 'Karol Sevilla', 'Carolina Kopelioff'], answer: 1 },
  { category: 'PERSONAJES', question: '¿Cuál es el nombre del mejor amigo de Luna?', options: ['Matteo Balsano', 'Gastón Perida', 'Simón Álvarez'], answer: 2 },
  { category: 'PERSONAJES', question: '¿Quién es la novia de Matteo al comienzo de la historia?', options: ['Ámbar Smith', 'Yam Sánchez', 'Delfina Alzamendi'], answer: 0 },
  { category: 'LUGARES', question: '¿Cómo se llama el club de patinaje?', options: ['Red Sharks', 'Jam & Roller', 'Open Music'], answer: 1 },
  { category: 'LUGARES', question: '¿En qué ciudad vivía Luna antes de mudarse?', options: ['Buenos Aires', 'Madrid', 'Cancún'], answer: 2 },
  { category: 'LUGARES', question: '¿A qué ciudad se muda Luna con sus padres?', options: ['Buenos Aires', 'Río de Janeiro', 'Roma'], answer: 0 },
  { category: 'MÚSICA', question: '¿Cómo se llama la canción principal interpretada por Karol Sevilla?', options: ['Alas', 'Valiente', 'Siempre juntos'], answer: 0 },
  { category: 'MÚSICA', question: '¿Cuál de estos títulos pertenece a un álbum de la serie?', options: ['Vuelta al sol', 'Música en ti', 'Un nuevo día'], answer: 1 },
  { category: 'PATINAJE', question: '¿Qué actividad es una de las grandes pasiones de Luna?', options: ['El surf', 'El patinaje', 'La equitación'], answer: 1 },
  { category: 'PERSONAJES', question: '¿Cómo se llama la amiga de Luna que disfruta escribir?', options: ['Nina Simonetti', 'Yam Sánchez', 'Jimena Medina'], answer: 0 },
  { category: 'PERSONAJES', question: '¿Quién interpreta a Matteo Balsano?', options: ['Michael Ronda', 'Ruggero Pasquarelli', 'Lionel Ferro'], answer: 1 },
  { category: 'PERSONAJES', question: '¿Quién interpreta a Simón?', options: ['Agustín Bernasconi', 'Jorge López', 'Michael Ronda'], answer: 2 },
  { category: 'PERSONAJES', question: '¿Quién interpreta a Ámbar Smith?', options: ['Valentina Zenere', 'Ana Jara', 'Chiara Parravicini'], answer: 0 },
  { category: 'SERIE', question: '¿En qué año se estrenó originalmente Soy Luna?', options: ['2014', '2016', '2018'], answer: 1 },
  { category: 'SERIE', question: '¿En qué idioma original se grabó la serie?', options: ['Español', 'Italiano', 'Portugués'], answer: 0 },
  { category: 'SERIE', question: '¿Qué tipo de producción es Soy Luna?', options: ['Serie musical juvenil', 'Documental deportivo', 'Concurso de talentos'], answer: 0 },
  { category: 'PATINAJE', question: '¿Qué objeto se vuelve parte central de la vida de Luna?', options: ['Una guitarra', 'Unos patines', 'Una cámara'], answer: 1 },
  { category: 'SERIE', question: '¿Quién creó Soy Luna?', options: ['Jorge Edelstein', 'Jorge Nisco', 'Ruggero Pasquarelli'], answer: 0 },
  { category: 'MÚSICA', question: '¿Cuál de estos es un álbum de la banda sonora?', options: ['Modo Amar', 'Pista libre', 'Rodar sin parar'], answer: 0 },
  { category: 'PERSONAJES', question: '¿Cómo se llama la madre de Luna?', options: ['Mónica', 'Mora', 'Ana'], answer: 1 },
  { category: 'PERSONAJES', question: '¿Qué instrumento toca Simón?', options: ['Guitarra', 'Batería', 'Violín'], answer: 0 },
  { category: 'LUGARES', question: '¿Dónde trabaja Sharon?', options: ['Mansión Benson', 'Jam & Roller', 'Escuela Blake'], answer: 0 },
  { category: 'PATINAJE', question: '¿Qué se usa para deslizarse en la pista?', options: ['Patines', 'Botas de fútbol', 'Bicicleta'], answer: 0 },
  { category: 'MÚSICA', question: '¿Qué actividad artística acompaña al patinaje en la serie?', options: ['Canto', 'Pintura', 'Escultura'], answer: 0 },
  { category: 'SERIE', question: '¿En qué canal se emitieron originalmente las primeras temporadas?', options: ['Disney Channel', 'Cartoon Network', 'Nickelodeon'], answer: 0 },
  { category: 'PERSONAJES', question: '¿Qué personaje es conocido por su talento y sus videos?', options: ['Delfina', 'Pedro', 'Gastón'], answer: 0 },
  { category: 'LUGARES', question: '¿En qué país se filmó principalmente la serie?', options: ['Argentina', 'México', 'España'], answer: 0 },
  { category: 'SERIE', question: '¿Cuántos episodios tuvo la tercera temporada?', options: ['40', '60', '80'], answer: 1 },
  { category: 'PERSONAJES', question: '¿Qué vínculo une a Luna y Simón?', options: ['Son mejores amigos', 'Son hermanos', 'Son rivales de pista'], answer: 0 }
];

questionBank.forEach((question, index) => { question.difficulty = index % 3 === 0 ? 'easy' : index % 3 === 1 ? 'hard' : 'medium'; });

const state = { questions: [], current: 0, correct: 0, incorrect: 0, elapsed: 0, remaining: 0, interval: null, locked: false, config: {}, audio: null };
const $ = (id) => document.getElementById(id);
const formatTime = (totalSeconds) => `${String(Math.floor(totalSeconds / 60)).padStart(2, '0')}:${String(totalSeconds % 60).padStart(2, '0')}`;
const shuffle = (items) => [...items].sort(() => Math.random() - 0.5);

function playTone(correct) {
  if (!$('sound-enabled').checked) return;
  const context = state.audio || new AudioContext(); state.audio = context;
  const oscillator = context.createOscillator(); const gain = context.createGain();
  oscillator.frequency.value = correct ? 660 : 190; oscillator.type = 'sine'; gain.gain.value = 0.04;
  oscillator.connect(gain); gain.connect(context.destination); oscillator.start(); oscillator.stop(context.currentTime + 0.14);
}

function renderRanking() {
  const scores = JSON.parse(localStorage.getItem('soyLunaRanking') || '[]');
  $('ranking-list').innerHTML = scores.length ? scores.slice(0, 5).map((score) => `<li><strong>${score.name}</strong> · ${score.correct}/${score.total} correctas · ${formatTime(score.time)}</li>`).join('') : '<li>Todavía no hay partidas registradas.</li>';
}

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach((screen) => { screen.hidden = screen.id !== screenId; });
  $(screenId).classList.add('is-active');
}

function updateMistakes() {
  $('mistake-dots').innerHTML = Array.from({ length: 3 }, (_, index) => `<span class="mistake-dot ${index < state.incorrect ? 'filled' : ''}"></span>`).join('');
  $('mistake-dots').setAttribute('aria-label', `${state.incorrect} de 3 errores`);
}

function renderQuestion() {
  const question = state.questions[state.current];
  state.locked = false;
  $('question-number').textContent = state.current + 1;
  $('question-total').textContent = state.questions.length;
  $('progress-bar').style.width = `${((state.current + 1) / state.questions.length) * 100}%`;
  $('category-label').textContent = question.category;
  $('question-title').textContent = question.question;
  $('feedback').textContent = '';
  $('feedback').className = 'feedback';
  $('answers').innerHTML = question.options.map((option, index) => `<button class="answer-button" type="button" data-index="${index}"><span class="answer-letter">${String.fromCharCode(65 + index)}</span><span>${option}</span></button>`).join('');
  document.querySelectorAll('.answer-button').forEach((button) => button.addEventListener('click', () => answerQuestion(Number(button.dataset.index))));
}

function answerQuestion(selectedIndex) {
  if (state.locked) return;
  state.locked = true;
  const question = state.questions[state.current];
  const buttons = [...document.querySelectorAll('.answer-button')];
  const isCorrect = selectedIndex === question.answer;
  buttons.forEach((button) => { button.disabled = true; if (Number(button.dataset.index) === question.answer) button.classList.add('correct'); });
  if (isCorrect) { state.correct += 1; $('feedback').textContent = '¡Correcta! Seguís rodando.'; $('feedback').className = 'feedback correct'; }
  else { state.incorrect += 1; buttons[selectedIndex].classList.add('incorrect'); $('feedback').textContent = `Incorrecta. La respuesta era: ${question.options[question.answer]}`; $('feedback').className = 'feedback incorrect'; updateMistakes(); }
  playTone(isCorrect);
  setTimeout(() => { if (state.incorrect >= 3 || state.current >= state.questions.length - 1) finishGame(); else { state.current += 1; renderQuestion(); } }, 850);
}

function tick() {
  state.elapsed += 1;
  state.remaining -= 1;
  $('timer').querySelector('strong').textContent = formatTime(state.remaining);
  $('timer').classList.toggle('warning', state.remaining <= 30);
  if (state.remaining <= 0) finishGame('time');
}

function finishGame(reason) {
  if (!state.interval) return;
  clearInterval(state.interval); state.interval = null;
  const totalAnswered = state.correct + state.incorrect;
  const rate = totalAnswered ? Math.round((state.correct / totalAnswered) * 100) : 0;
  const scores = JSON.parse(localStorage.getItem('soyLunaRanking') || '[]');
  scores.push({ name: state.config.name, correct: state.correct, total: state.questions.length, time: state.elapsed });
  scores.sort((first, second) => second.correct - first.correct || first.time - second.time);
  localStorage.setItem('soyLunaRanking', JSON.stringify(scores.slice(0, 10)));
  $('result-name').textContent = state.config.name;
  $('stat-time').textContent = formatTime(state.elapsed);
  $('stat-correct').textContent = state.correct;
  $('stat-incorrect').textContent = state.incorrect;
  $('stat-rate').textContent = `${rate}%`;
  renderRanking();
  $('result-message').textContent = reason === 'time' ? 'Se terminó el tiempo. ¡La próxima vuelta puede ser todavía mejor!' : state.incorrect >= 3 ? 'Llegaste al límite de 3 respuestas incorrectas. ¡Gracias por jugar!' : 'Completaste todas las preguntas dentro del tiempo. ¡Excelente partida!';
  showScreen('results');
}

function startGame(event) {
  event.preventDefault();
  const minutes = Math.max(0, Math.min(59, Number($('minutes').value) || 0));
  const seconds = Math.max(0, Math.min(59, Number($('seconds').value) || 0));
  if (minutes * 60 + seconds < 10) { $('seconds').setCustomValidity('Elegí al menos 10 segundos.'); $('seconds').reportValidity(); return; }
  $('seconds').setCustomValidity('');
  state.config = { name: $('player-name').value.trim(), count: Number($('question-count').value), totalTime: minutes * 60 + seconds };
  const difficulty = $('difficulty').value;
  const availableQuestions = difficulty === 'mixed' ? questionBank : questionBank.filter((question) => question.difficulty === difficulty);
  state.questions = shuffle(availableQuestions.length >= state.config.count ? availableQuestions : questionBank).slice(0, state.config.count);
  state.current = 0; state.correct = 0; state.incorrect = 0; state.elapsed = 0; state.remaining = state.config.totalTime;
  $('player-label').textContent = state.config.name.toUpperCase(); $('timer').querySelector('strong').textContent = formatTime(state.remaining); $('timer').classList.remove('warning'); updateMistakes(); renderQuestion(); showScreen('game');
  state.interval = setInterval(tick, 1000);
}

$('setup-form').addEventListener('submit', startGame);
$('play-again').addEventListener('click', () => { showScreen('inicio'); $('player-name').focus(); });
$('back-to-setup').addEventListener('click', () => { showScreen('inicio'); $('player-name').focus(); });
