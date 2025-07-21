/* Tests interactividad para Resan */

// Helper: genera opciones tipo Likert de 5 puntos
function likert() {
  return [
    { text: 'Totalmente en desacuerdo', score: 0 },
    { text: 'En desacuerdo', score: 1 },
    { text: 'Neutral', score: 2 },
    { text: 'De acuerdo', score: 3 },
    { text: 'Totalmente de acuerdo', score: 4 }
  ];
}

// Datos mock internos de los tests (3 preguntas de ejemplo cada uno)
const testsData = [
  {
    title: 'Test Psicológico General 🧠',
    questions: [
      { text: 'Me siento motivado la mayor parte del tiempo.', options: likert() },
      { text: 'Tengo dificultades para concentrarme en mis tareas diarias.', options: likert() },
      { text: 'Me considero una persona optimista.', options: likert() }
    ]
  },
  {
    title: 'Test de Autoestima ✨',
    questions: [
      { text: '¿Sueles comparar tus logros, apariencia o posesiones con los de otras personas y sentirte inferior?', options: likert() },
      { text: 'Cuando cometes un error, ¿te criticas duramente durante mucho tiempo?', options: likert() },
      { text: '¿Te cuesta aceptar cumplidos o elogios de los demás?', options: likert() },
      { text: '¿Sientes que necesitas la aprobación de otros para tomar decisiones importantes en tu vida?', options: likert() },
      { text: '¿Evitas probar cosas nuevas por miedo a fracasar o a no ser lo suficientemente bueno/a?', options: likert() },
      { text: '¿Reconoces y valoras tus propias fortalezas y cualidades positivas?', options: likert() },
      { text: '¿Sientes que tu opinión es menos válida que la de los demás en una conversación grupal?', options: likert() },
      { text: '¿Te sientes cómodo/a expresando tus desacuerdos con otras personas?', options: likert() },
      { text: '¿Crees que mereces ser feliz y tener éxito en la vida?', options: likert() },
      { text: '¿Te enfocas más en tus defectos que en tus virtudes?', options: likert() },
      { text: '¿Sientes que debes cambiar quién eres para agradar a los demás?', options: likert() },
      { text: '¿Puedes perdonarte a ti mismo/a por errores pasados?', options: likert() },
      { text: '¿Te sientes satisfecho/a con tu apariencia física en general?', options: likert() },
      { text: '¿Crees que eres una persona capaz de superar los desafíos que se te presentan?', options: likert() },
      { text: '¿Sientes un orgullo genuino por las cosas que has logrado, sin importar cuán pequeñas sean?', options: likert() }
    ]
  },
  {
    title: 'Test de Ansiedad 😟',
    questions: [
      { text: '¿Sientes una preocupación excesiva y difícil de controlar sobre diferentes temas (trabajo, salud, futuro)?', options: likert() },
      { text: '¿Experimentas síntomas físicos como palpitaciones, sudoración, temblores o falta de aire sin una causa médica?', options: likert() },
      { text: '¿Te sientes constantemente tenso/a, nervioso/a o "al límite"?', options: likert() },
      { text: '¿Tienes dificultad para conciliar o mantener el sueño debido a tus preocupaciones?', options: likert() },
      { text: '¿Evitas situaciones, lugares o personas por el miedo o malestar que te provocan?', options: likert() },
      { text: '¿Sientes un miedo repentino e intenso, como un ataque de pánico?', options: likert() },
      { text: '¿Te cuesta concentrarte porque tu mente está ocupada por pensamientos ansiosos?', options: likert() },
      { text: '¿Sufres de tensión muscular, dolores de cabeza o problemas estomacales frecuentes?', options: likert() },
      { text: '¿Sientes la necesidad de que todo esté perfecto para evitar que algo malo suceda?', options: likert() },
      { text: '¿Te irritas con facilidad o tienes cambios de humor bruscos?', options: likert() },
      { text: '¿Piensas a menudo en el peor escenario posible para una situación futura?', options: likert() },
      { text: '¿Te sientes inquieto/a o incapaz de relajarte y estar tranquilo/a?', options: likert() },
      { text: '¿El miedo a ser juzgado/a por los demás limita tus acciones o tu vida social?', options: likert() },
      { text: '¿Has notado que tus preocupaciones interfieren con tus responsabilidades diarias (trabajo, estudios, familia)?', options: likert() },
      { text: '¿Sientes una sensación de irrealidad o de estar desconectado/a de ti mismo/a?', options: likert() }
    ]
  },
  {
    title: 'Test de Apego 🤗',
    questions: [
      { text: '¿Te preocupa con frecuencia que tus parejas o amigos cercanos no te quieran tanto como tú a ellos?', options: likert() },
      { text: '¿Te sientes incómodo/a con la cercanía emocional y la intimidad en una relación?', options: likert() },
      { text: '¿Buscas constantemente la confirmación y seguridad de que tu pareja te ama y no te abandonará?', options: likert() },
      { text: '¿Prefieres no depender de los demás y que tampoco dependan de ti?', options: likert() },
      { text: 'Cuando enfrentas un problema, ¿buscas el apoyo y consuelo de tu pareja o prefieres resolverlo solo/a?', options: likert() },
      { text: '¿Te resulta difícil confiar plenamente en tus parejas sentimentales?', options: likert() },
      { text: '¿El miedo al rechazo o al abandono influye en cómo te comportas en tus relaciones?', options: likert() },
      { text: '¿Te sientes ansioso/a o celoso/a cuando tu pareja pasa tiempo con otras personas?', options: likert() },
      { text: '¿Tiendes a ocultar tus sentimientos o necesidades para evitar conflictos o parecer vulnerable?', options: likert() },
      { text: '¿Sientes que tus relaciones son una fuente principal de estrés y preocupación en tu vida?', options: likert() },
      { text: '¿Puedes expresar tus necesidades y deseos de forma clara y directa en una relación?', options: likert() },
      { text: '¿Te sientes abrumado/a o "asfixiado/a" cuando alguien se muestra muy interesado/a en ti?', options: likert() },
      { text: '¿Te consideras una persona emocionalmente independiente en tus relaciones?', options: likert() },
      { text: '¿Analizas en exceso las palabras y acciones de tu pareja, buscando significados ocultos?', options: likert() },
      { text: '¿Sientes que es fácil para ti conectar emocionalmente con los demás?', options: likert() }
    ]
  },
  {
    title: 'Test de Autismo (Rasgos) 🧩',
    questions: [
      { text: '¿Te resulta difícil entender las "reglas no escritas" de las interacciones sociales?', options: likert() },
      { text: '¿Prefieres seguir una rutina diaria y te sientes muy incómodo/a o ansioso/a si cambia inesperadamente?', options: likert() },
      { text: '¿Tienes intereses muy específicos e intensos, en los que te sumerges por completo?', options: likert() },
      { text: '¿Te cuesta entender el sarcasmo, la ironía o las expresiones que no se dicen de forma literal?', options: likert() },
      { text: '¿Te sientes hipersensible a ciertos sonidos, luces, olores o texturas que a otros no parecen molestarles?', options: likert() },
      { text: '¿Te resulta más fácil interactuar uno a uno que en un grupo grande?', options: likert() },
      { text: '¿Te cuesta iniciar o mantener una conversación trivial (charla casual)?', options: likert() },
      { text: '¿Te han dicho que tu tono de voz es monótono o inusual?', options: likert() },
      { text: '¿Evitas el contacto visual porque te resulta incómodo o demasiado intenso?', options: likert() },
      { text: '¿Te es más fácil comunicarte por escrito (mensajes, correos) que cara a cara?', options: likert() },
      { text: '¿Disfrutas coleccionando o clasificando objetos y/o información sobre tus temas de interés?', options: likert() },
      { text: '¿Te resulta complicado interpretar el lenguaje corporal, los gestos o las expresiones faciales de los demás?', options: likert() },
      { text: '¿Realizas movimientos repetitivos (balanceo, aleteo de manos) especialmente cuando estás estresado/a o emocionado/a?', options: likert() },
      { text: '¿Te sientes agotado/a después de socializar, incluso si fue una experiencia agradable?', options: likert() },
      { text: '¿Prefieres actividades predecibles y te sientes abrumado/a por la espontaneidad?', options: likert() }
    ]
  },
  {
    title: 'Test de Burnout 🔥',
    questions: [
      { text: '¿Sientes un agotamiento físico y emocional profundo al final de tu jornada laboral?', options: likert() },
      { text: '¿Te has vuelto más cínico/a, irritable o distante con tus compañeros de trabajo o clientes?', options: likert() },
      { text: '¿Sientes que tu trabajo ya no te aporta satisfacción o un sentido de logro?', options: likert() },
      { text: '¿Te cuesta encontrar la motivación para ir a trabajar por las mañanas?', options: likert() },
      { text: '¿Dudas de tu competencia y de tu capacidad para realizar tu trabajo eficazmente?', options: likert() },
      { text: '¿Sufres de dolores de cabeza, problemas para dormir o malestares estomacales que atribuyes al estrés laboral?', options: likert() },
      { text: '¿Sientes que no tienes energía para dedicar a tu vida personal (familia, amigos, hobbies) después del trabajo?', options: likert() },
      { text: '¿Te sientes emocionalmente indiferente o insensible hacia los aspectos de tu trabajo que antes te importaban?', options: likert() },
      { text: '¿Fantaseas con frecuencia con renunciar a tu trabajo o cambiar de profesión?', options: likert() },
      { text: '¿Ha disminuido tu productividad o eficiencia a pesar de trabajar la misma cantidad de horas o más?', options: likert() },
      { text: '¿Te sientes abrumado/a por la cantidad de tareas y responsabilidades que tienes?', options: likert() },
      { text: '¿Te cuesta desconectar del trabajo durante tu tiempo libre?', options: likert() },
      { text: '¿Sientes que tus esfuerzos no son reconocidos o valorados en tu entorno laboral?', options: likert() },
      { text: '¿Has comenzado a usar la comida, el alcohol u otras sustancias para sentirte mejor o para no sentir nada?', options: likert() },
      { text: '¿Sientes que te has convertido en una persona más negativa desde que comenzaste este trabajo?', options: likert() }
    ]
  },
  {
    title: 'Test de Dependencia Emocional 💔',
    questions: [
      { text: '¿Sientes un miedo intenso a la idea de que tu pareja te abandone o termine la relación?', options: likert() },
      { text: '¿Priorizas constantemente las necesidades y deseos de tu pareja por encima de los tuyos?', options: likert() },
      { text: '¿Necesitas la aprobación o el consejo de tu pareja para tomar la mayoría de tus decisiones personales?', options: likert() },
      { text: '¿Sientes que tu felicidad depende casi por completo del estado de tu relación sentimental?', options: likert() },
      { text: '¿Has dejado de lado tus hobbies, amistades o intereses para dedicarle más tiempo a tu pareja?', options: likert() },
      { text: '¿Idealizas a tu pareja, ignorando o minimizando sus defectos y comportamientos negativos?', options: likert() },
      { text: '¿Sientes un vacío o una falta de propósito cuando no estás en una relación?', options: likert() },
      { text: '¿Te resulta extremadamente difícil estar solo/a?', options: likert() },
      { text: '¿Aceptas comportamientos que te hacen daño con tal de no perder la relación?', options: likert() },
      { text: '¿Tu estado de ánimo fluctúa drásticamente según la atención o el afecto que recibes de tu pareja?', options: likert() },
      { text: '¿Te sientes responsable de la felicidad y el bienestar de tu pareja?', options: likert() },
      { text: '¿Te cuesta poner límites o decir "no" a tu pareja por miedo a su reacción?', options: likert() },
      { text: '¿Has encadenado una relación tras otra, sin darte un tiempo para estar contigo mismo/a?', options: likert() },
      { text: '¿Crees que no serías nada o que tu vida no tendría sentido sin tu pareja?', options: likert() },
      { text: '¿Buscas constantemente señales de afecto para sentirte seguro/a en la relación?', options: likert() }
    ]
  },
  {
    title: 'Test de Depresión 😔',
    questions: [
      { text: 'Durante las últimas semanas, ¿has sentido un ánimo persistentemente triste, deprimido o vacío la mayor parte del día?', options: likert() },
      { text: '¿Has perdido el interés o el placer en casi todas las actividades que antes disfrutabas?', options: likert() },
      { text: '¿Has experimentado un cambio significativo de peso (aumento o pérdida) sin estar a dieta?', options: likert() },
      { text: '¿Sufres de insomnio (dificultad para dormir) o hipersomnia (dormir demasiado) casi todos los días?', options: likert() },
      { text: '¿Te sientes constantemente cansado/a o con una profunda falta de energía?', options: likert() },
      { text: '¿Tienes sentimientos recurrentes de inutilidad, culpa excesiva o autocrítica?', options: likert() },
      { text: '¿Te resulta difícil concentrarte, pensar con claridad o tomar decisiones que antes eran sencillas?', options: likert() },
      { text: '¿Te has vuelto notablemente más lento/a en tus movimientos y pensamientos, o por el contrario, más inquieto/a e irritable?', options: likert() },
      { text: '¿Has tenido pensamientos recurrentes sobre la muerte, ideas suicidas o deseos de que tu vida termine?', options: likert() },
      { text: '¿Te has aislado socialmente, evitando el contacto con amigos y familiares?', options: likert() },
      { text: '¿Sientes que el futuro es sombrío y sin esperanza?', options: likert() },
      { text: '¿Lloras con más facilidad o con más frecuencia de lo habitual, a veces sin una razón clara?', options: likert() },
      { text: '¿Sufres de dolores o malestares físicos (dolor de cabeza, problemas digestivos) sin una causa médica clara?', options: likert() },
      { text: '¿Sientes que eres una carga para los demás?', options: likert() },
      { text: '¿Ha afectado tu estado de ánimo de forma negativa a tu rendimiento en el trabajo, los estudios o tus relaciones?', options: likert() }
    ]
  },
  {
    title: 'Test de Estrés 😥',
    questions: [
      { text: '¿Te sientes frecuentemente abrumado/a por la cantidad de responsabilidades que tienes?', options: likert() },
      { text: '¿Reaccionas con irritabilidad o impaciencia ante pequeños contratiempos?', options: likert() },
      { text: '¿Sufres de tensión en el cuello y los hombros, o dolores de cabeza tensionales?', options: likert() },
      { text: '¿Te resulta difícil relajarte, incluso durante tu tiempo libre?', options: likert() },
      { text: '¿Tus hábitos de alimentación o sueño han cambiado debido a la presión (comes más/menos, duermes más/menos)?', options: likert() },
      { text: '¿Sientes que tu corazón se acelera o te sudan las manos cuando piensas en tus problemas?', options: likert() },
      { text: '¿Te cuesta concentrarte o sientes que tu mente se queda en blanco bajo presión?', options: likert() },
      { text: '¿Sientes que los problemas se acumulan tanto que no puedes hacerles frente?', options: likert() },
      { text: '¿Procrastinas tareas importantes porque te sientes demasiado agobiado/a para empezar?', options: likert() },
      { text: '¿Sientes que no tienes suficiente tiempo para ti mismo/a?', options: likert() },
      { text: '¿Te preocupas constantemente por no poder cumplir con las expectativas de los demás?', options: likert() },
      { text: '¿Te sientes desconectado/a de tus amigos o familiares debido a tus preocupaciones?', options: likert() },
      { text: '¿Has notado un aumento en el consumo de cafeína, tabaco o alcohol para lidiar con la presión?', options: likert() },
      { text: '¿Te enfermas con más frecuencia de lo habitual (resfriados, infecciones)?', options: likert() },
      { text: '¿Sientes que estás constantemente "en modo alerta", sin poder bajar la guardia?', options: likert() }
    ]
  },
  {
    title: 'Test de Inteligencia Emocional 🤔❤️',
    questions: [
      { text: 'Cuando sientes una emoción fuerte (ira, tristeza), ¿eres capaz de identificar qué la causó?', options: likert() },
      { text: '¿Puedes mantener la calma y pensar con claridad en situaciones de alta presión?', options: likert() },
      { text: '¿Te resulta fácil darte cuenta de cómo se sienten los demás, incluso si no lo dicen con palabras?', options: likert() },
      { text: 'Antes de actuar o hablar, ¿consideras el impacto emocional que tus acciones tendrán en otras personas?', options: likert() },
      { text: '¿Eres capaz de motivarte a ti mismo/a para alcanzar metas a largo plazo, incluso cuando son difíciles?', options: likert() },
      { text: '¿Sabes cómo consolarte o animarte a ti mismo/a cuando te sientes mal?', options: likert() },
      { text: '¿Te consideras una persona empática, capaz de ponerte en el lugar del otro?', options: likert() },
      { text: '¿Eres bueno/a escuchando activamente a los demás sin interrumpir?', options: likert() },
      { text: '¿Puedes manejar críticas constructivas sin ponerte a la defensiva o sentirte atacado/a?', options: likert() },
      { text: '¿Eres capaz de expresar tus emociones de una manera asertiva y respetuosa?', options: likert() },
      { text: '¿Reconoces cómo tu estado de ánimo afecta tu juicio y tu comportamiento?', options: likert() },
      { text: '¿Eres bueno/a para resolver conflictos entre otras personas de manera diplomática?', options: likert() },
      { text: '¿Puedes adaptarte emocionalmente a los cambios inesperados sin desmoronarte?', options: likert() },
      { text: '¿Inspiras confianza y eres capaz de influir positivamente en los demás?', options: likert() },
      { text: '¿Reconoces y gestionas tus impulsos para evitar tomar decisiones de las que luego te arrepientas?', options: likert() }
    ]
  }
]; // fin de definición de testsData

// Todas las pruebas incluyen ahora 15 preguntas definidas manualmente; no se generan preguntas genéricas
// Se evita editar manualmente cada arreglo y mantiene la consistencia
// Las preguntas adicionales incluyen el título limpio como prefijo para dar contexto
 testsData.forEach(test => {
  const cleanTitle = test.title.replace(/[^\p{L}\p{N}\s]/gu, '').trim();
  let i = test.questions.length;
  while (i < 15) {
    test.questions.push({
      text: `${cleanTitle}: Pregunta ${i + 1}`,
      options: likert()
    });
    i++;
  }
});

const container = document.getElementById('tests-container');

// Estado transitorio
/**
 * @typedef {Object} State
 * @property {(typeof testsData[0]) | null} currentTest
 * @property {any[]} questions
 * @property {number} currentIndex
 * @property {number[]} responses
 */

const state = {
  currentTest: null,
  questions: [],
  currentIndex: 0,
  responses: []
};

function renderTestList() {
  container.innerHTML = '';

  // Encabezado dentro de la sección
  const heading = document.createElement('h2');
  heading.className = 'section-heading';
  heading.textContent = 'Selecciona un test para comenzar';
  container.appendChild(heading);

  const grid = document.createElement('div');
  grid.className = 'cards-grid';
  container.appendChild(grid);

  testsData.forEach((test, idx) => {
    const card = document.createElement('article');
    card.className = 'card';

    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = test.title;

    const startBtn = document.createElement('a');
    startBtn.href = '#';
    startBtn.className = 'btn';
    startBtn.textContent = 'Comenzar test';
    startBtn.style.alignSelf = 'flex-start';
    startBtn.addEventListener('click', (e) => {
      e.preventDefault();
      loadTest(idx);
    });

    card.appendChild(title);
    card.appendChild(startBtn);
    grid.appendChild(card);
  });
}

function loadTest(index) {
  const test = testsData[index];
  state.currentTest = test;
  state.currentIndex = 0;
  state.responses = [];

  state.questions = test.questions;
  renderQuestion();
}

function renderQuestion() {
  const q = state.questions[state.currentIndex];
  // Si no hay pregunta (por seguridad), mostramos resultado
  if (!q) {
    showResult();
    return;
  }

  const text = q.text ?? q.question ?? `Pregunta ${state.currentIndex + 1}`;
  const opts = q.options ?? likert();

  container.innerHTML = '';

  // Título del test (centrado)
  const testHeading = document.createElement('h2');
  testHeading.className = 'test-title';
  testHeading.textContent = state.currentTest.title;
  container.appendChild(testHeading);

  // Card de la pregunta
  const card = document.createElement('article');
  card.className = 'card';
  card.style.maxWidth = '650px';
  card.style.margin = '0 auto';

  const title = document.createElement('h3');
  title.className = 'question-heading';
  title.textContent = `${state.currentIndex + 1}/${state.questions.length} — ${text}`;
  card.appendChild(title);

  const optionsWrap = document.createElement('div');
  optionsWrap.className = 'options-group';

  opts.forEach((opt, idx) => {
    const label = document.createElement('label');
    label.className = 'option';
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'answer';
    radio.value = idx;
    label.appendChild(radio);
    label.appendChild(document.createTextNode(opt.text));
    optionsWrap.appendChild(label);
  });
  card.appendChild(optionsWrap);

  const nextBtn = document.createElement('button');
  nextBtn.className = 'btn';
  nextBtn.style.marginTop = '1rem';
  nextBtn.textContent = state.currentIndex === state.questions.length - 1 ? 'Finalizar' : 'Siguiente';
  nextBtn.addEventListener('click', () => {
    const selected = container.querySelector('input[name="answer"]:checked');
    if (!selected) {
      alert('Selecciona una opción');
      return;
    }
    const selIdx = Number(selected.value);
    const score = opts[selIdx].score ?? 0;
    state.responses.push(score);

    if (state.currentIndex < state.questions.length - 1) {
      state.currentIndex++;
      renderQuestion();
    } else {
      showResult();
    }
  });
  card.appendChild(nextBtn);

  container.appendChild(card);
}

function showResult() {
  const total = state.responses.reduce((a, b) => a + b, 0);
  const maxPossible = state.questions.reduce((sum, q) => {
    const highest = Math.max(...q.options.map((o) => o.score ?? 0));
    return sum + highest;
  }, 0);
  const percentage = ((total / maxPossible) * 100).toFixed(0);

  // Interpretación simple: 0-32 bajo, 33-66 medio, 67-100 alto
  let nivel = 'bajo';
  if (percentage >= 67) nivel = 'alto';
  else if (percentage >= 33) nivel = 'medio';

  let mensaje = '';
  if (nivel === 'alto') {
    mensaje = 'Parece que tus resultados indican un nivel elevado en este aspecto. Recuerda que no estás solo; considera buscar apoyo profesional y hablar con personas de confianza.';
  } else if (nivel === 'medio') {
    mensaje = 'Tus resultados se encuentran en un nivel intermedio. Podrías beneficiarte de pequeñas acciones de autocuidado y, si lo necesitas, consultar con un especialista.';
  } else {
    mensaje = '¡Buen trabajo! Tus resultados son bajos en este aspecto. Continúa practicando hábitos saludables para mantener tu bienestar.';
  }

  container.innerHTML = `<h2 class="section-heading">Resultado de ${state.currentTest.title}</h2>
    <p class="card-desc">Tu puntuación: <strong>${total}</strong> de ${maxPossible} (${percentage}%)</p>
    <p class="card-desc">${mensaje}</p>
    <a href="#" class="btn" id="back-btn">Volver al listado</a>`;

  document.getElementById('back-btn').addEventListener('click', (e) => {
    e.preventDefault();
    renderTestList();
  });
}

// Inicial
renderTestList();
