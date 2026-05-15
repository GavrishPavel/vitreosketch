const stage = document.getElementById('stage');
const floaterLayer = document.getElementById('floaterLayer');
const drawLayer = document.getElementById('drawLayer');
const cameraFeed = document.getElementById('cameraFeed');

const translations = {
  en: {
    title: 'Floater visualizer & editor',
    lead: 'Compose an MVP simulation of common vitreous floater shapes, then animate them with gentle drift or camera-based eye tracking.',
    addTitle: '1. Add floaters',
    presetDot: 'Dot cluster',
    presetRing: 'Ring',
    presetThread: 'Thread',
    presetCobweb: 'Cobweb',
    presetSmudge: 'Smudge',
    addHint: 'Based on commonly described forms: spots, rings/Weiss rings, thread-like strands, cobwebs, and cloudy smudges.',
    drawTitle: '2. Draw your own',
    brushSize: 'Brush size',
    brushAlpha: 'Stroke alpha',
    enableDrawing: 'Enable drawing',
    drawingEnabled: 'Drawing enabled',
    clearDrawings: 'Clear drawings',
    appearanceTitle: '3. Appearance',
    contrast: 'Contrast',
    blur: 'Blur',
    structure: 'Structure',
    scale: 'Scale',
    motionTitle: '4. Motion',
    randomDrift: 'Random drift',
    eyeTracking: 'Eye tracking',
    motionIntensity: 'Motion intensity',
    enableCamera: 'Enable camera',
    cameraOff: 'Camera off',
    cameraNeedsHttps: 'Camera needs HTTPS or localhost',
    cameraActive: 'Camera active',
    cameraPermissionFailed: 'Camera permission failed',
    sceneTitle: 'Scene',
    resetScene: 'Reset scene',
    loadStarterSet: 'Load starter set',
    preview: 'Preview',
    focusMode: 'Focus mode',
    exitFocusMode: 'Exit focus mode',
    fullscreen: 'Fullscreen',
    stageHint: 'Tip: draw on the stage, then switch to eye tracking on HTTPS / GitHub Pages.'
  },
  ru: {
    title: 'Визуализатор и редактор помутнений',
    lead: 'Соберите свою сцену с типичными помутнениями стекловидного тела и запустите движение: случайный дрейф или слежение по взгляду через камеру.',
    addTitle: '1. Добавьте помутнения',
    presetDot: 'Точки',
    presetRing: 'Кольцо',
    presetThread: 'Нить',
    presetCobweb: 'Паутина',
    presetSmudge: 'Пятно',
    addHint: 'Основано на частых описаниях: точки, кольца/кольцо Вейса, нитевидные полосы, паутинка и мутные пятна.',
    drawTitle: '2. Нарисуйте своё',
    brushSize: 'Размер кисти',
    brushAlpha: 'Прозрачность штриха',
    enableDrawing: 'Включить рисование',
    drawingEnabled: 'Рисование включено',
    clearDrawings: 'Очистить рисунок',
    appearanceTitle: '3. Внешний вид',
    contrast: 'Контрастность',
    blur: 'Размытие',
    structure: 'Структура',
    scale: 'Масштаб',
    motionTitle: '4. Движение',
    randomDrift: 'Случайный дрейф',
    eyeTracking: 'Отслеживание взгляда',
    motionIntensity: 'Интенсивность движения',
    enableCamera: 'Включить камеру',
    cameraOff: 'Камера выключена',
    cameraNeedsHttps: 'Для камеры нужен HTTPS или localhost',
    cameraActive: 'Камера включена',
    cameraPermissionFailed: 'Не удалось получить доступ к камере',
    sceneTitle: 'Сцена',
    resetScene: 'Сбросить сцену',
    loadStarterSet: 'Загрузить набор',
    preview: 'Предпросмотр',
    focusMode: 'Режим просмотра',
    exitFocusMode: 'Выйти из режима',
    fullscreen: 'На весь экран',
    stageHint: 'Совет: рисуйте прямо на сцене, а потом включайте слежение за глазами на HTTPS / GitHub Pages.'
  }
};

const state = {
  items: [],
  drawingEnabled: false,
  drawingPath: null,
  lastPointer: null,
  motionMode: 'random',
  motionIntensity: 0.8,
  contrast: 0.55,
  blur: 9,
  structure: 0.45,
  scale: 1,
  brushSize: 4,
  brushAlpha: 0.25,
  randomTarget: { x: 0, y: 0 },
  randomPos: { x: 0, y: 0 },
  eye: {
    active: false,
    baseEyeLidDistance: null,
    lastX: window.innerWidth / 2,
    lastY: window.innerHeight / 2,
    smoothFactor: 0.025,
    faceMesh: null,
    camera: null
  },
  language: 'en',
  previewOnly: false,
  dragging: {
    id: null,
    pointerId: null,
    dx: 0,
    dy: 0
  }
};

const presetButtons = document.querySelectorAll('[data-preset]');
const motionInputs = document.querySelectorAll('input[name="motionMode"]');
const controls = {
  contrast: document.getElementById('contrast'),
  blur: document.getElementById('blur'),
  structure: document.getElementById('structure'),
  scale: document.getElementById('scale'),
  motionIntensity: document.getElementById('motionIntensity'),
  brushSize: document.getElementById('brushSize'),
  brushAlpha: document.getElementById('brushAlpha'),
  drawToggle: document.getElementById('drawToggle'),
  clearDrawings: document.getElementById('clearDrawings'),
  resetScene: document.getElementById('resetScene'),
  demoScene: document.getElementById('demoScene'),
  startCamera: document.getElementById('startCamera'),
  cameraStatus: document.getElementById('cameraStatus'),
  langRu: document.getElementById('langRu'),
  langEn: document.getElementById('langEn'),
  previewMode: document.getElementById('previewMode'),
  fullscreenMode: document.getElementById('fullscreenMode')
};

function rand(min, max) { return Math.random() * (max - min) + min; }
function uid() { return `${Date.now()}-${Math.random().toString(16).slice(2)}`; }
function stageRect() { return stage.getBoundingClientRect(); }
function t(key) { return translations[state.language][key] || translations.en[key] || key; }

function applyTranslations() {
  document.documentElement.lang = state.language;
  document.title = state.language === 'ru' ? 'VitreoSketch — Визуализатор помутнений' : 'VitreoSketch — Floater Visualizer';
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n;
    node.textContent = t(key);
  });
  controls.drawToggle.textContent = state.drawingEnabled ? t('drawingEnabled') : t('enableDrawing');
  controls.startCamera.textContent = t('enableCamera');
  controls.previewMode.textContent = state.previewOnly ? t('exitFocusMode') : t('focusMode');
  controls.cameraStatus.textContent = state.eye.active ? t('cameraActive') : t('cameraOff');
  controls.langRu.classList.toggle('active', state.language === 'ru');
  controls.langEn.classList.toggle('active', state.language === 'en');
}

function setViewBox() {
  const rect = stageRect();
  drawLayer.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
}

function makeItem(type, x = rand(20, 80), y = rand(20, 80)) {
  return {
    id: uid(),
    type,
    x,
    y,
    rotation: rand(-20, 20),
    scale: rand(0.8, 1.25),
    density: rand(0.7, 1.2),
    driftSeed: rand(0, Math.PI * 2),
    element: null
  };
}

function svgForItem(item) {
  const opacity = (state.contrast * 0.6 + 0.12).toFixed(2);
  const strokeOpacity = Math.max(0.08, state.contrast * 0.45).toFixed(2);
  const strokeWidth = (1.2 + state.structure * 3.4).toFixed(2);
  const blur = state.blur;

  const defs = `<defs><filter id="b-${item.id}"><feGaussianBlur stdDeviation="${blur}" /></filter></defs>`;
  const fill = `rgba(35, 35, 35, ${opacity})`;
  const stroke = `rgba(20, 20, 20, ${strokeOpacity})`;

  if (item.type === 'dot') {
    const circles = Array.from({ length: 6 }, () => `
      <circle cx="${rand(40, 190)}" cy="${rand(40, 190)}" r="${rand(8, 28) * item.density}" fill="${fill}" />`
    ).join('');
    return `<svg class="floater-svg" width="220" height="220" viewBox="0 0 220 220">${defs}<g filter="url(#b-${item.id})">${circles}</g></svg>`;
  }

  if (item.type === 'ring') {
    return `<svg class="floater-svg" width="240" height="240" viewBox="0 0 240 240">${defs}<g filter="url(#b-${item.id})"><circle cx="120" cy="120" r="56" fill="none" stroke="${stroke}" stroke-width="${8 + state.structure * 10}" /><circle cx="120" cy="120" r="22" fill="rgba(20,20,20,${Math.max(0.03, state.contrast * 0.14).toFixed(2)})" /></g></svg>`;
  }

  if (item.type === 'thread') {
    const sway = 35 + state.structure * 90;
    return `<svg class="floater-svg" width="280" height="180" viewBox="0 0 280 180">${defs}<g filter="url(#b-${item.id})"><path d="M18 90 C 70 ${90 - sway}, 130 ${90 + sway}, 190 92 S 245 ${95 - sway * 0.45}, 262 88" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round"/></g></svg>`;
  }

  if (item.type === 'cobweb') {
    return `<svg class="floater-svg" width="300" height="230" viewBox="0 0 300 230">${defs}<g filter="url(#b-${item.id})"><path d="M24 122 C 58 35, 110 52, 144 114 S 232 186, 279 103" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}"/><path d="M72 154 C 99 115, 122 88, 165 102 S 210 139, 240 164" fill="none" stroke="${stroke}" stroke-width="${(strokeWidth * 0.8).toFixed(2)}"/><path d="M55 72 C 102 112, 132 120, 193 96" fill="none" stroke="${stroke}" stroke-width="${(strokeWidth * 0.65).toFixed(2)}"/></g></svg>`;
  }

  return `<svg class="floater-svg" width="260" height="180" viewBox="0 0 260 180">${defs}<g filter="url(#b-${item.id})"><ellipse cx="130" cy="90" rx="76" ry="40" fill="rgba(35,35,35,${Math.max(0.08, state.contrast * 0.25).toFixed(2)})" /><ellipse cx="160" cy="92" rx="42" ry="22" fill="rgba(35,35,35,${Math.max(0.05, state.contrast * 0.14).toFixed(2)})" /></g></svg>`;
}

function renderItems() {
  floaterLayer.innerHTML = '';
  state.items.forEach((item) => {
    const el = document.createElement('div');
    el.className = 'floater-item';
    el.dataset.id = item.id;
    el.style.left = `${item.x}%`;
    el.style.top = `${item.y}%`;
    el.innerHTML = svgForItem(item);
    el.addEventListener('pointerdown', startDragItem);
    item.element = el;
    floaterLayer.appendChild(el);
  });
  applyItemTransforms(0);
}

function applyItemTransforms(t) {
  state.items.forEach((item, index) => {
    if (!item.element) return;
    const wobble = Math.sin(t / 1200 + item.driftSeed + index) * 7 * state.motionIntensity;
    const lift = Math.cos(t / 1400 + item.driftSeed * 1.6) * 6 * state.motionIntensity;
    item.element.style.transform = `translate(-50%, -50%) rotate(${item.rotation + wobble * 0.3}deg) scale(${item.scale * state.scale}) translate(${wobble}px, ${lift}px)`;
    item.element.style.opacity = `${Math.max(0.18, Math.min(0.95, 0.35 + state.contrast * 0.9))}`;
  });
}

function updateVisuals() {
  renderItems();
  drawLayer.querySelectorAll('path').forEach((path) => {
    path.setAttribute('stroke-width', `${state.brushSize}`);
    path.setAttribute('stroke', `rgba(35,35,35,${state.brushAlpha})`);
    path.style.filter = `blur(${state.blur}px)`;
  });
}

function addPreset(type) {
  state.items.push(makeItem(type));
  renderItems();
}

function startDragItem(event) {
  if (state.drawingEnabled) return;
  const item = state.items.find((entry) => entry.id === event.currentTarget.dataset.id);
  if (!item) return;
  const rect = stageRect();
  const currentX = rect.width * (item.x / 100);
  const currentY = rect.height * (item.y / 100);
  state.dragging = {
    id: item.id,
    pointerId: event.pointerId,
    dx: event.clientX - rect.left - currentX,
    dy: event.clientY - rect.top - currentY
  };
  event.currentTarget.classList.add('dragging');
  event.currentTarget.setPointerCapture?.(event.pointerId);
  event.stopPropagation();
}

function moveDragItem(event) {
  if (!state.dragging.id) return;
  const item = state.items.find((entry) => entry.id === state.dragging.id);
  if (!item) return;
  const rect = stageRect();
  const xPx = Math.max(0, Math.min(rect.width, event.clientX - rect.left - state.dragging.dx));
  const yPx = Math.max(0, Math.min(rect.height, event.clientY - rect.top - state.dragging.dy));
  item.x = (xPx / rect.width) * 100;
  item.y = (yPx / rect.height) * 100;
  if (item.element) {
    item.element.style.left = `${item.x}%`;
    item.element.style.top = `${item.y}%`;
  }
}

function stopDragItem() {
  if (!state.dragging.id) return;
  const item = state.items.find((entry) => entry.id === state.dragging.id);
  item?.element?.classList.remove('dragging');
  state.dragging = { id: null, pointerId: null, dx: 0, dy: 0 };
}

function resetScene() {
  state.items = [];
  floaterLayer.innerHTML = '';
  drawLayer.innerHTML = '';
}

function loadDemoScene() {
  state.items = [
    makeItem('ring', 34, 42),
    makeItem('thread', 58, 56),
    makeItem('dot', 44, 62),
    makeItem('cobweb', 68, 40),
    makeItem('smudge', 54, 33)
  ];
  renderItems();
}

function pickRandomTarget() {
  const rect = stageRect();
  const maxOffset = Math.min(220, Math.min(rect.width, rect.height) * 0.16) * state.motionIntensity;
  state.randomTarget.x = rand(-maxOffset, maxOffset);
  state.randomTarget.y = rand(-maxOffset, maxOffset);
}

function animate(now) {
  if (state.motionMode === 'random') {
    state.randomPos.x += (state.randomTarget.x - state.randomPos.x) * 0.008;
    state.randomPos.y += (state.randomTarget.y - state.randomPos.y) * 0.008;
    floaterLayer.style.transform = `translate(${state.randomPos.x}px, ${state.randomPos.y}px)`;
  }
  applyItemTransforms(now);
  requestAnimationFrame(animate);
}

setInterval(() => {
  if (state.motionMode === 'random') pickRandomTarget();
}, 2800);

function pointerToStage(event) {
  const rect = stageRect();
  return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

function startDrawing(event) {
  if (!state.drawingEnabled) return;
  const point = pointerToStage(event);
  state.lastPointer = point;
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', `M ${point.x} ${point.y}`);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  path.setAttribute('stroke-width', `${state.brushSize}`);
  path.setAttribute('stroke', `rgba(35,35,35,${state.brushAlpha})`);
  path.style.filter = `blur(${state.blur}px)`;
  drawLayer.appendChild(path);
  state.drawingPath = path;
}

function moveDrawing(event) {
  if (!state.drawingEnabled || !state.drawingPath) return;
  const point = pointerToStage(event);
  const midX = (state.lastPointer.x + point.x) / 2;
  const midY = (state.lastPointer.y + point.y) / 2;
  const current = state.drawingPath.getAttribute('d');
  state.drawingPath.setAttribute('d', `${current} Q ${state.lastPointer.x} ${state.lastPointer.y} ${midX} ${midY}`);
  state.lastPointer = point;
}

function stopDrawing() {
  state.drawingPath = null;
  state.lastPointer = null;
}

async function enableCamera() {
  if (!window.location.protocol.startsWith('https') && !window.location.hostname.includes('localhost')) {
    controls.cameraStatus.textContent = t('cameraNeedsHttps');
    return;
  }
  if (state.eye.active) {
    state.motionMode = 'eye';
    document.querySelector('input[value="eye"]').checked = true;
    controls.cameraStatus.textContent = t('cameraActive');
    return;
  }

  const faceMesh = new FaceMesh({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
  });
  faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.2,
    minTrackingConfidence: 0.2
  });
  faceMesh.onResults(onFaceResults);

  const camera = new Camera(cameraFeed, {
    onFrame: async () => { await faceMesh.send({ image: cameraFeed }); },
    width: 640,
    height: 480
  });

  try {
    await camera.start();
    state.eye.faceMesh = faceMesh;
    state.eye.camera = camera;
    state.eye.active = true;
    state.motionMode = 'eye';
    document.querySelector('input[value="eye"]').checked = true;
    controls.cameraStatus.textContent = t('cameraActive');
  } catch (error) {
    console.error(error);
    controls.cameraStatus.textContent = t('cameraPermissionFailed');
  }
}

function onFaceResults(results) {
  if (state.motionMode !== 'eye') return;
  const rect = stageRect();

  if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
    const landmarks = results.multiFaceLandmarks[0];
    const leftUpperEyelid = landmarks[159];
    const leftLowerEyelid = landmarks[145];
    const rightUpperEyelid = landmarks[386];
    const rightLowerEyelid = landmarks[374];
    const leftIris = landmarks[468];
    const rightIris = landmarks[473];

    const leftEyeLidDistance = leftUpperEyelid.y - leftLowerEyelid.y;
    const rightEyeLidDistance = rightUpperEyelid.y - rightLowerEyelid.y;
    const currentEyeLidDistance = (leftEyeLidDistance + rightEyeLidDistance) / 2;

    if (state.eye.baseEyeLidDistance === null) {
      state.eye.baseEyeLidDistance = currentEyeLidDistance;
    }

    const eyeLidDelta = currentEyeLidDistance - state.eye.baseEyeLidDistance;
    const leftEyeWidth = landmarks[133].x - landmarks[33].x;
    const rightEyeWidth = landmarks[263].x - landmarks[362].x;
    const leftIrisOffsetX = (leftIris.x - landmarks[33].x) / leftEyeWidth - 0.5;
    const rightIrisOffsetX = (rightIris.x - landmarks[362].x) / rightEyeWidth - 0.5;
    const irisOffsetX = -(leftIrisOffsetX + rightIrisOffsetX) / 2;

    const targetX = rect.width / 2 + irisOffsetX * rect.width * 0.9 * 25 * state.motionIntensity;
    const targetY = rect.height / 2 + eyeLidDelta * rect.height * 500 * state.motionIntensity;

    state.eye.lastX += (targetX - state.eye.lastX) * state.eye.smoothFactor;
    state.eye.lastY += (targetY - state.eye.lastY) * state.eye.smoothFactor;

    const limitedX = Math.max(-rect.width * 0.18, Math.min(state.eye.lastX - rect.width / 2, rect.width * 0.18));
    const limitedY = Math.max(-rect.height * 0.18, Math.min(state.eye.lastY - rect.height / 2, rect.height * 0.18));

    floaterLayer.style.transform = `translate(${limitedX}px, ${limitedY}px)`;
  }
}

presetButtons.forEach((button) => button.addEventListener('click', () => addPreset(button.dataset.preset)));
motionInputs.forEach((input) => input.addEventListener('change', () => { state.motionMode = input.value; }));
controls.motionIntensity.addEventListener('input', (e) => { state.motionIntensity = Number(e.target.value); });
controls.contrast.addEventListener('input', (e) => { state.contrast = Number(e.target.value); updateVisuals(); });
controls.blur.addEventListener('input', (e) => { state.blur = Number(e.target.value); updateVisuals(); });
controls.structure.addEventListener('input', (e) => { state.structure = Number(e.target.value); updateVisuals(); });
controls.scale.addEventListener('input', (e) => { state.scale = Number(e.target.value); renderItems(); });
controls.brushSize.addEventListener('input', (e) => { state.brushSize = Number(e.target.value); updateVisuals(); });
controls.brushAlpha.addEventListener('input', (e) => { state.brushAlpha = Number(e.target.value); updateVisuals(); });
controls.drawToggle.addEventListener('click', () => {
  state.drawingEnabled = !state.drawingEnabled;
  controls.drawToggle.classList.toggle('active', state.drawingEnabled);
  controls.drawToggle.textContent = state.drawingEnabled ? t('drawingEnabled') : t('enableDrawing');
  stage.style.cursor = state.drawingEnabled ? 'crosshair' : 'default';
});
controls.clearDrawings.addEventListener('click', () => { drawLayer.innerHTML = ''; });
controls.resetScene.addEventListener('click', resetScene);
controls.demoScene.addEventListener('click', loadDemoScene);
controls.startCamera.addEventListener('click', enableCamera);
controls.langRu.addEventListener('click', () => { state.language = 'ru'; applyTranslations(); });
controls.langEn.addEventListener('click', () => { state.language = 'en'; applyTranslations(); });
controls.previewMode.addEventListener('click', () => {
  state.previewOnly = !state.previewOnly;
  document.body.classList.toggle('preview-only', state.previewOnly);
  controls.previewMode.textContent = state.previewOnly ? t('exitFocusMode') : t('focusMode');
});
controls.fullscreenMode.addEventListener('click', async () => {
  try {
    if (!document.fullscreenElement) {
      await stage.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (error) {
    console.error(error);
  }
});

document.addEventListener('fullscreenchange', () => {
  setTimeout(setViewBox, 50);
});

stage.addEventListener('pointerdown', startDrawing);
stage.addEventListener('pointermove', (event) => {
  moveDragItem(event);
  moveDrawing(event);
});
window.addEventListener('pointerup', () => {
  stopDrawing();
  stopDragItem();
});
window.addEventListener('resize', setViewBox);

setViewBox();
pickRandomTarget();
loadDemoScene();
applyTranslations();
requestAnimationFrame(animate);
