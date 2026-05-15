const stage = document.getElementById('stage');
const motionLayer = document.getElementById('motionLayer');
const floaterLayer = document.getElementById('floaterLayer');
const drawLayer = document.getElementById('drawLayer');
const cameraFeed = document.getElementById('cameraFeed');

const languageMeta = {
  en: { label: 'English', title: 'VitreoSketch — Floater Visualizer' },
  ru: { label: 'Русский', title: 'VitreoSketch — Визуализатор помутнений' },
  es: { label: 'Español', title: 'VitreoSketch — Visualizador de miodesopsias' },
  pt: { label: 'Português', title: 'VitreoSketch — Visualizador de moscas volantes' },
  zh: { label: '中文', title: 'VitreoSketch — 飞蚊症可视化工具' },
  ar: { label: 'العربية', title: 'VitreoSketch — أداة تصور عوائم العين' }
};

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
    presetCloud: 'Cloud',
    addHint: 'Based on commonly described forms: spots, rings/Weiss rings, thread-like strands, cobwebs, cloudy smudges, and diffuse cloud-like floaters.',
    drawTitle: '2. Draw your own',
    brushSize: 'Brush size',
    brushAlpha: 'Stroke alpha',
    enableDrawing: 'Enable drawing',
    drawingEnabled: 'Drawing enabled',
    clearDrawings: 'Clear drawings',
    selectionTitle: '3. Selected floater',
    selectionNone: 'Nothing selected',
    selectionActive: 'Selected',
    selectionHint: 'Click a floater or drawing to edit it. Drag to reposition. Ctrl/Cmd+C copies floaters, Delete removes the selected object.',
    contrast: 'Contrast',
    blur: 'Blur',
    structure: 'Structure',
    scale: 'Scale',
    rotation: 'Rotation',
    duplicateSelected: 'Duplicate',
    deleteSelected: 'Delete selected',
    motionTitle: '4. Motion',
    randomDrift: 'Random drift',
    eyeTracking: 'Eye tracking',
    motionIntensity: 'Motion intensity',
    startMotion: 'Start movement',
    stopMotion: 'Stop movement',
    enableCamera: 'Enable camera',
    cameraOff: 'Camera off',
    cameraNeedsHttps: 'Camera needs HTTPS or localhost',
    cameraActive: 'Camera active',
    cameraPermissionFailed: 'Camera permission failed',
    sceneTitle: '5. Scene',
    sceneSunny: 'Sunny sky',
    sceneBeach: 'White sand beach',
    sceneSnowy: 'Snowy day',
    sceneCloudy: 'Cloudy sky',
    scenePlain: 'No background',
    resetScene: 'Reset scene',
    loadStarterSet: 'Load starter set',
    preview: 'Preview',
    focusMode: 'Focus mode',
    exitFocusMode: 'Exit focus mode',
    fullscreen: 'Fullscreen',
    stageHint: 'Tip: click a floater or drawing to edit it, drag it around, or use eye tracking on HTTPS / GitHub Pages.'
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
    presetCloud: 'Облако',
    addHint: 'Основано на частых описаниях: точки, кольца/кольцо Вейса, нитевидные полосы, паутинка, мутные пятна и облачные помутнения.',
    drawTitle: '2. Нарисуйте своё',
    brushSize: 'Размер кисти',
    brushAlpha: 'Прозрачность штриха',
    enableDrawing: 'Включить рисование',
    drawingEnabled: 'Рисование включено',
    clearDrawings: 'Очистить рисунок',
    selectionTitle: '3. Выбранный объект',
    selectionNone: 'Ничего не выбрано',
    selectionActive: 'Выбрано',
    selectionHint: 'Кликни по помутнению или рисунку, чтобы редактировать его. Перетаскивай мышкой. Ctrl/Cmd+C копирует помутнения, Delete удаляет выбранный объект.',
    contrast: 'Контрастность',
    blur: 'Размытие',
    structure: 'Структура',
    scale: 'Масштаб',
    rotation: 'Поворот',
    duplicateSelected: 'Дублировать',
    deleteSelected: 'Удалить выбранное',
    motionTitle: '4. Движение',
    randomDrift: 'Случайный дрейф',
    eyeTracking: 'Отслеживание взгляда',
    motionIntensity: 'Интенсивность движения',
    startMotion: 'Запустить движение',
    stopMotion: 'Остановить движение',
    enableCamera: 'Включить камеру',
    cameraOff: 'Камера выключена',
    cameraNeedsHttps: 'Для камеры нужен HTTPS или localhost',
    cameraActive: 'Камера включена',
    cameraPermissionFailed: 'Не удалось получить доступ к камере',
    sceneTitle: '5. Сцена',
    sceneSunny: 'Солнечное небо',
    sceneBeach: 'Пляж с белым песком',
    sceneSnowy: 'Снежный день',
    sceneCloudy: 'Облачное небо',
    scenePlain: 'Без фона',
    resetScene: 'Сбросить сцену',
    loadStarterSet: 'Загрузить набор',
    preview: 'Предпросмотр',
    focusMode: 'Режим просмотра',
    exitFocusMode: 'Выйти из режима',
    fullscreen: 'На весь экран',
    stageHint: 'Совет: кликни по помутнению или рисунку, чтобы редактировать его, перетаскивай его мышкой или включай слежение за глазами на HTTPS / GitHub Pages.'
  },
  es: {
    title: 'Visualizador y editor de miodesopsias',
    lead: 'Compón una simulación MVP de formas comunes de miodesopsias vítreas y anímalas con una deriva suave o con seguimiento ocular mediante cámara.',
    addTitle: '1. Añadir miodesopsias',
    presetDot: 'Grupo de puntos',
    presetRing: 'Anillo',
    presetThread: 'Hilo',
    presetCobweb: 'Telaraña',
    presetSmudge: 'Mancha',
    presetCloud: 'Nube',
    addHint: 'Basado en descripciones frecuentes: puntos, anillos/anillo de Weiss, hebras filamentosas, telarañas, manchas turbias y nubes difusas.',
    drawTitle: '2. Dibuja la tuya',
    brushSize: 'Tamaño del pincel',
    brushAlpha: 'Opacidad del trazo',
    enableDrawing: 'Activar dibujo',
    drawingEnabled: 'Dibujo activado',
    clearDrawings: 'Borrar dibujos',
    selectionTitle: '3. Miodesopsia seleccionada',
    selectionNone: 'Nada seleccionado',
    selectionActive: 'Seleccionado',
    selectionHint: 'Haz clic en una miodesopsia o dibujo para editarlo. Arrastra para recolocarlo. Ctrl/Cmd+C copia las miodesopsias y Delete elimina el objeto seleccionado.',
    contrast: 'Contraste',
    blur: 'Desenfoque',
    structure: 'Estructura',
    scale: 'Escala',
    rotation: 'Rotación',
    duplicateSelected: 'Duplicar',
    deleteSelected: 'Eliminar seleccionado',
    motionTitle: '4. Movimiento',
    randomDrift: 'Deriva aleatoria',
    eyeTracking: 'Seguimiento ocular',
    motionIntensity: 'Intensidad del movimiento',
    startMotion: 'Iniciar movimiento',
    stopMotion: 'Detener movimiento',
    enableCamera: 'Activar cámara',
    cameraOff: 'Cámara desactivada',
    cameraNeedsHttps: 'La cámara necesita HTTPS o localhost',
    cameraActive: 'Cámara activa',
    cameraPermissionFailed: 'No se pudo obtener permiso para la cámara',
    sceneTitle: '5. Escena',
    sceneSunny: 'Cielo soleado',
    sceneBeach: 'Playa de arena blanca',
    sceneSnowy: 'Día nevado',
    sceneCloudy: 'Cielo nublado',
    scenePlain: 'Sin fondo',
    resetScene: 'Restablecer escena',
    loadStarterSet: 'Cargar conjunto inicial',
    preview: 'Vista previa',
    focusMode: 'Modo enfoque',
    exitFocusMode: 'Salir del modo enfoque',
    fullscreen: 'Pantalla completa',
    stageHint: 'Consejo: haz clic en una miodesopsia o dibujo para editarlo, arrástralo o usa seguimiento ocular en HTTPS / GitHub Pages.'
  },
  pt: {
    title: 'Visualizador e editor de moscas volantes',
    lead: 'Monte uma simulação MVP de formas comuns de moscas volantes vítreas e depois anime tudo com deriva suave ou rastreamento ocular pela câmera.',
    addTitle: '1. Adicionar moscas volantes',
    presetDot: 'Grupo de pontos',
    presetRing: 'Anel',
    presetThread: 'Filamento',
    presetCobweb: 'Teia',
    presetSmudge: 'Mancha',
    presetCloud: 'Nuvem',
    addHint: 'Baseado em descrições comuns: pontos, anéis/anel de Weiss, filamentos, teias, manchas turvas e nuvens difusas.',
    drawTitle: '2. Desenhe a sua',
    brushSize: 'Tamanho do pincel',
    brushAlpha: 'Opacidade do traço',
    enableDrawing: 'Ativar desenho',
    drawingEnabled: 'Desenho ativado',
    clearDrawings: 'Limpar desenhos',
    selectionTitle: '3. Mosca volante selecionada',
    selectionNone: 'Nada selecionado',
    selectionActive: 'Selecionado',
    selectionHint: 'Clique em uma mosca volante ou desenho para editar. Arraste para reposicionar. Ctrl/Cmd+C copia as moscas volantes e Delete remove o objeto selecionado.',
    contrast: 'Contraste',
    blur: 'Desfoque',
    structure: 'Estrutura',
    scale: 'Escala',
    rotation: 'Rotação',
    duplicateSelected: 'Duplicar',
    deleteSelected: 'Excluir selecionado',
    motionTitle: '4. Movimento',
    randomDrift: 'Deriva aleatória',
    eyeTracking: 'Rastreamento ocular',
    motionIntensity: 'Intensidade do movimento',
    startMotion: 'Iniciar movimento',
    stopMotion: 'Parar movimento',
    enableCamera: 'Ativar câmera',
    cameraOff: 'Câmera desligada',
    cameraNeedsHttps: 'A câmera precisa de HTTPS ou localhost',
    cameraActive: 'Câmera ativa',
    cameraPermissionFailed: 'Falha ao obter permissão da câmera',
    sceneTitle: '5. Cena',
    sceneSunny: 'Céu ensolarado',
    sceneBeach: 'Praia de areia branca',
    sceneSnowy: 'Dia nevado',
    sceneCloudy: 'Céu nublado',
    scenePlain: 'Sem fundo',
    resetScene: 'Redefinir cena',
    loadStarterSet: 'Carregar conjunto inicial',
    preview: 'Pré-visualização',
    focusMode: 'Modo foco',
    exitFocusMode: 'Sair do modo foco',
    fullscreen: 'Tela cheia',
    stageHint: 'Dica: clique em uma mosca volante ou desenho para editar, arraste pela cena ou use rastreamento ocular em HTTPS / GitHub Pages.'
  },
  zh: {
    title: '飞蚊症可视化与编辑器',
    lead: '创建一个常见玻璃体飞蚊形态的 MVP 模拟，并通过轻微漂移或基于摄像头的眼动追踪让它动起来。',
    addTitle: '1. 添加飞蚊',
    presetDot: '点状簇',
    presetRing: '环状',
    presetThread: '丝状',
    presetCobweb: '网状',
    presetSmudge: '污斑',
    presetCloud: '云雾',
    addHint: '基于常见描述：点状、环状/魏斯环、丝状条纹、蛛网状、模糊污斑和弥散云雾。',
    drawTitle: '2. 自己绘制',
    brushSize: '画笔大小',
    brushAlpha: '笔迹透明度',
    enableDrawing: '启用绘制',
    drawingEnabled: '绘制已启用',
    clearDrawings: '清除绘图',
    selectionTitle: '3. 已选飞蚊',
    selectionNone: '未选择任何对象',
    selectionActive: '已选择',
    selectionHint: '点击飞蚊或绘图即可编辑，拖动可重新定位。Ctrl/Cmd+C 复制飞蚊，Delete 删除当前选中的对象。',
    contrast: '对比度',
    blur: '模糊',
    structure: '结构',
    scale: '缩放',
    rotation: '旋转',
    duplicateSelected: '复制',
    deleteSelected: '删除所选',
    motionTitle: '4. 运动',
    randomDrift: '随机漂移',
    eyeTracking: '眼动追踪',
    motionIntensity: '运动强度',
    startMotion: '开始运动',
    stopMotion: '停止运动',
    enableCamera: '启用摄像头',
    cameraOff: '摄像头已关闭',
    cameraNeedsHttps: '摄像头需要 HTTPS 或 localhost',
    cameraActive: '摄像头已开启',
    cameraPermissionFailed: '无法获取摄像头权限',
    sceneTitle: '5. 场景',
    sceneSunny: '晴朗天空',
    sceneBeach: '白沙海滩',
    sceneSnowy: '雪天',
    sceneCloudy: '多云天空',
    scenePlain: '无背景',
    resetScene: '重置场景',
    loadStarterSet: '加载初始组合',
    preview: '预览',
    focusMode: '专注模式',
    exitFocusMode: '退出专注模式',
    fullscreen: '全屏',
    stageHint: '提示：点击飞蚊或绘图进行编辑，可拖动位置，或在 HTTPS / GitHub Pages 上启用眼动追踪。'
  },
  ar: {
    title: 'أداة تصور وتحرير عوائم العين',
    lead: 'أنشئ محاكاة أولية لأشكال عوائم الجسم الزجاجي الشائعة، ثم حرّكها بانجراف لطيف أو بتتبع حركة العين عبر الكاميرا.',
    addTitle: '1. أضف العوائم',
    presetDot: 'مجموعة نقاط',
    presetRing: 'حلقة',
    presetThread: 'خيط',
    presetCobweb: 'شبكة',
    presetSmudge: 'لطخة',
    presetCloud: 'سحابة',
    addHint: 'مبني على أوصاف شائعة: نقاط، حلقات/حلقة فايس، خيوط رفيعة، شبكات، لطخات ضبابية، وعوائم سحابية منتشرة.',
    drawTitle: '2. ارسم الشكل بنفسك',
    brushSize: 'حجم الفرشاة',
    brushAlpha: 'شفافية الخط',
    enableDrawing: 'تفعيل الرسم',
    drawingEnabled: 'تم تفعيل الرسم',
    clearDrawings: 'مسح الرسومات',
    selectionTitle: '3. العائمة المحددة',
    selectionNone: 'لا يوجد تحديد',
    selectionActive: 'محدد',
    selectionHint: 'انقر على عائمة أو رسم لتعديله. اسحب لإعادة التموضع. Ctrl/Cmd+C ينسخ العوائم وDelete يحذف العنصر المحدد.',
    contrast: 'التباين',
    blur: 'التمويه',
    structure: 'البنية',
    scale: 'المقياس',
    rotation: 'الدوران',
    duplicateSelected: 'نسخ',
    deleteSelected: 'حذف المحدد',
    motionTitle: '4. الحركة',
    randomDrift: 'انجراف عشوائي',
    eyeTracking: 'تتبع العين',
    motionIntensity: 'شدة الحركة',
    startMotion: 'بدء الحركة',
    stopMotion: 'إيقاف الحركة',
    enableCamera: 'تفعيل الكاميرا',
    cameraOff: 'الكاميرا متوقفة',
    cameraNeedsHttps: 'تحتاج الكاميرا إلى HTTPS أو localhost',
    cameraActive: 'الكاميرا مفعلة',
    cameraPermissionFailed: 'فشل الحصول على إذن الكاميرا',
    sceneTitle: '5. المشهد',
    sceneSunny: 'سماء مشمسة',
    sceneBeach: 'شاطئ برمال بيضاء',
    sceneSnowy: 'يوم ثلجي',
    sceneCloudy: 'سماء غائمة',
    scenePlain: 'بدون خلفية',
    resetScene: 'إعادة ضبط المشهد',
    loadStarterSet: 'تحميل مجموعة البداية',
    preview: 'المعاينة',
    focusMode: 'وضع التركيز',
    exitFocusMode: 'الخروج من وضع التركيز',
    fullscreen: 'ملء الشاشة',
    stageHint: 'نصيحة: انقر على العائمة أو الرسم لتعديله، واسحبه داخل المشهد، أو استخدم تتبع العين على HTTPS / GitHub Pages.'
  }
};

const state = {
  items: [],
  drawings: [],
  selection: { type: null, id: null },
  clipboard: null,
  drawingEnabled: false,
  drawingPath: null,
  lastPointer: null,
  motionMode: 'random',
  motionIntensity: 0.8,
  motionRunning: true,
  brushSize: 4,
  brushAlpha: 0.25,
  scene: 'sunny',
  randomTarget: { x: 0, y: 0 },
  motionOffset: { x: 0, y: 0 },
  motionTarget: { x: 0, y: 0 },
  eye: {
    active: false,
    baseEyeLidDistance: null,
    faceMesh: null,
    camera: null,
    targetX: 0,
    targetY: 0
  },
  language: 'en',
  previewOnly: false,
  dragging: {
    type: null,
    id: null,
    pointerId: null,
    dx: 0,
    dy: 0
  }
};

const presetButtons = document.querySelectorAll('[data-preset]');
const sceneButtons = document.querySelectorAll('[data-scene]');
const motionInputs = document.querySelectorAll('input[name="motionMode"]');
const controls = {
  itemContrast: document.getElementById('itemContrast'),
  itemBlur: document.getElementById('itemBlur'),
  itemStructure: document.getElementById('itemStructure'),
  itemScale: document.getElementById('itemScale'),
  itemRotation: document.getElementById('itemRotation'),
  motionIntensity: document.getElementById('motionIntensity'),
  brushSize: document.getElementById('brushSize'),
  brushAlpha: document.getElementById('brushAlpha'),
  drawToggle: document.getElementById('drawToggle'),
  clearDrawings: document.getElementById('clearDrawings'),
  resetScene: document.getElementById('resetScene'),
  demoScene: document.getElementById('demoScene'),
  startMotion: document.getElementById('startMotion'),
  stopMotion: document.getElementById('stopMotion'),
  startCamera: document.getElementById('startCamera'),
  cameraStatus: document.getElementById('cameraStatus'),
  languageSelect: document.getElementById('languageSelect'),
  previewMode: document.getElementById('previewMode'),
  fullscreenMode: document.getElementById('fullscreenMode'),
  selectionStatus: document.getElementById('selectionStatus') ,
  duplicateSelected: document.getElementById('duplicateSelected'),
  deleteSelected: document.getElementById('deleteSelected')
};

function rand(min, max) { return Math.random() * (max - min) + min; }
function uid() { return `${Date.now()}-${Math.random().toString(16).slice(2)}`; }
function stageRect() { return stage.getBoundingClientRect(); }
function t(key) { return translations[state.language][key] || translations.en[key] || key; }
function selectedItem() { return state.selection.type === 'item' ? state.items.find((item) => item.id === state.selection.id) || null : null; }
function selectedDrawing() { return state.selection.type === 'drawing' ? state.drawings.find((drawing) => drawing.id === state.selection.id) || null : null; }
function isRtlLanguage(lang) { return lang === 'ar'; }

function makeItem(type, x = rand(20, 80), y = rand(20, 80), overrides = {}) {
  return {
    id: uid(),
    type,
    x,
    y,
    rotation: overrides.rotation ?? rand(-20, 20),
    scale: overrides.scale ?? rand(0.85, 1.2),
    density: overrides.density ?? rand(0.7, 1.2),
    contrast: overrides.contrast ?? 0.55,
    blur: overrides.blur ?? 9,
    structure: overrides.structure ?? 0.45,
    driftSeed: rand(0, Math.PI * 2),
    element: null
  };
}

function setViewBox() {
  const rect = drawLayer.getBoundingClientRect();
  drawLayer.setAttribute('viewBox', `0 0 ${Math.max(1, rect.width)} ${Math.max(1, rect.height)}`);
}

function populateLanguageSelect() {
  controls.languageSelect.innerHTML = Object.entries(languageMeta)
    .map(([code, meta]) => `<option value="${code}">${meta.label}</option>`)
    .join('');
  controls.languageSelect.value = state.language;
}

function applyTranslations() {
  document.documentElement.lang = state.language;
  document.documentElement.dir = isRtlLanguage(state.language) ? 'rtl' : 'ltr';
  document.body.classList.toggle('rtl', isRtlLanguage(state.language));
  document.title = languageMeta[state.language]?.title || languageMeta.en.title;
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  controls.drawToggle.textContent = state.drawingEnabled ? t('drawingEnabled') : t('enableDrawing');
  controls.previewMode.textContent = state.previewOnly ? t('exitFocusMode') : t('focusMode');
  controls.cameraStatus.textContent = state.eye.active ? t('cameraActive') : t('cameraOff');
  controls.languageSelect.value = state.language;
  updateSelectionUi();
}

function applyScene() {
  stage.classList.remove('scene-sunny', 'scene-beach', 'scene-snowy', 'scene-cloudy', 'scene-plain');
  stage.classList.add(`scene-${state.scene}`);
  sceneButtons.forEach((button) => button.classList.toggle('active', button.dataset.scene === state.scene));
}

function svgForItem(item) {
  const opacity = (item.contrast * 0.6 + 0.12).toFixed(2);
  const strokeOpacity = Math.max(0.08, item.contrast * 0.45).toFixed(2);
  const strokeWidth = (1.2 + item.structure * 3.4).toFixed(2);
  const blur = item.blur;
  const defs = `<defs><filter id="b-${item.id}"><feGaussianBlur stdDeviation="${blur}" /></filter></defs>`;
  const fill = `rgba(35, 35, 35, ${opacity})`;
  const stroke = `rgba(20, 20, 20, ${strokeOpacity})`;

  if (item.type === 'dot') {
    const circles = Array.from({ length: 6 }, () => `<circle cx="${rand(40, 190)}" cy="${rand(40, 190)}" r="${rand(8, 28) * item.density}" fill="${fill}" />`).join('');
    return `<svg class="floater-svg" width="220" height="220" viewBox="0 0 220 220">${defs}<g filter="url(#b-${item.id})">${circles}</g></svg>`;
  }
  if (item.type === 'ring') {
    return `<svg class="floater-svg" width="240" height="240" viewBox="0 0 240 240">${defs}<g filter="url(#b-${item.id})"><circle cx="120" cy="120" r="56" fill="none" stroke="${stroke}" stroke-width="${8 + item.structure * 10}" /><circle cx="120" cy="120" r="22" fill="rgba(20,20,20,${Math.max(0.03, item.contrast * 0.14).toFixed(2)})" /></g></svg>`;
  }
  if (item.type === 'thread') {
    const sway = 35 + item.structure * 90;
    return `<svg class="floater-svg" width="280" height="180" viewBox="0 0 280 180">${defs}<g filter="url(#b-${item.id})"><path d="M18 90 C 70 ${90 - sway}, 130 ${90 + sway}, 190 92 S 245 ${95 - sway * 0.45}, 262 88" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round"/></g></svg>`;
  }
  if (item.type === 'cobweb') {
    return `<svg class="floater-svg" width="300" height="230" viewBox="0 0 300 230">${defs}<g filter="url(#b-${item.id})"><path d="M24 122 C 58 35, 110 52, 144 114 S 232 186, 279 103" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}"/><path d="M72 154 C 99 115, 122 88, 165 102 S 210 139, 240 164" fill="none" stroke="${stroke}" stroke-width="${(strokeWidth * 0.8).toFixed(2)}"/><path d="M55 72 C 102 112, 132 120, 193 96" fill="none" stroke="${stroke}" stroke-width="${(strokeWidth * 0.65).toFixed(2)}"/></g></svg>`;
  }
  if (item.type === 'cloud') {
    return `<svg class="floater-svg" width="280" height="190" viewBox="0 0 280 190">${defs}<g filter="url(#b-${item.id})"><ellipse cx="88" cy="100" rx="48" ry="28" fill="rgba(35,35,35,${Math.max(0.07, item.contrast * 0.18).toFixed(2)})" /><ellipse cx="136" cy="88" rx="62" ry="34" fill="rgba(35,35,35,${Math.max(0.08, item.contrast * 0.22).toFixed(2)})" /><ellipse cx="188" cy="104" rx="58" ry="31" fill="rgba(35,35,35,${Math.max(0.06, item.contrast * 0.18).toFixed(2)})" /><ellipse cx="144" cy="112" rx="92" ry="38" fill="rgba(35,35,35,${Math.max(0.04, item.contrast * 0.11).toFixed(2)})" /></g></svg>`;
  }
  return `<svg class="floater-svg" width="260" height="180" viewBox="0 0 260 180">${defs}<g filter="url(#b-${item.id})"><ellipse cx="130" cy="90" rx="76" ry="40" fill="rgba(35,35,35,${Math.max(0.08, item.contrast * 0.25).toFixed(2)})" /><ellipse cx="160" cy="92" rx="42" ry="22" fill="rgba(35,35,35,${Math.max(0.05, item.contrast * 0.14).toFixed(2)})" /></g></svg>`;
}

function buildDrawingPath(points) {
  if (!points.length) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i += 1) {
    const prev = points[i - 1];
    const point = points[i];
    const midX = (prev.x + point.x) / 2;
    const midY = (prev.y + point.y) / 2;
    d += ` Q ${prev.x} ${prev.y} ${midX} ${midY}`;
  }
  const last = points[points.length - 1];
  d += ` L ${last.x} ${last.y}`;
  return d;
}

function createDrawingFromPoint(point) {
  return {
    id: uid(),
    type: 'drawing',
    x: point.x,
    y: point.y,
    contrast: 0.55,
    blur: Math.max(2, state.brushSize * 0.6),
    structure: 0.45,
    scale: 1,
    rotation: 0,
    size: state.brushSize,
    alpha: state.brushAlpha,
    points: [{ x: 0, y: 0 }],
    bounds: { minX: 0, minY: 0, width: 1, height: 1 }
  };
}

function addPointToDrawing(drawing, point) {
  drawing.points.push({ x: point.x - drawing.x, y: point.y - drawing.y });
  normalizeDrawing(drawing);
}

function normalizeDrawing(drawing) {
  const xs = drawing.points.map((point) => point.x);
  const ys = drawing.points.map((point) => point.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;

  drawing.points = drawing.points.map((point) => ({
    x: point.x - centerX,
    y: point.y - centerY
  }));
  drawing.x += centerX;
  drawing.y += centerY;
  drawing.bounds = {
    minX: minX - centerX,
    minY: minY - centerY,
    width: Math.max(1, maxX - minX),
    height: Math.max(1, maxY - minY)
  };
}

function drawingLabel() {
  const labels = {
    en: 'Drawing',
    ru: 'Рисунок',
    es: 'Dibujo',
    pt: 'Desenho',
    zh: '绘图',
    ar: 'رسم'
  };
  return labels[state.language] || labels.en;
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
    el.classList.toggle('selected', state.selection.type === 'item' && item.id === state.selection.id);
    el.addEventListener('pointerdown', startDragItem);
    item.element = el;
    floaterLayer.appendChild(el);
  });
  applyItemTransforms(performance.now());
}

function renderDrawings() {
  drawLayer.innerHTML = '';
  state.drawings.forEach((drawing) => {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('class', `drawing-group${state.selection.type === 'drawing' && state.selection.id === drawing.id ? ' selected' : ''}`);
    group.dataset.id = drawing.id;
    group.setAttribute('transform', `translate(${drawing.x} ${drawing.y}) rotate(${drawing.rotation}) scale(${drawing.scale})`);

    const hit = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    hit.setAttribute('d', buildDrawingPath(drawing.points));
    hit.setAttribute('fill', 'none');
    hit.setAttribute('stroke', 'transparent');
    hit.setAttribute('stroke-width', `${Math.max(18, drawing.size * 4)}`);
    hit.setAttribute('stroke-linecap', 'round');
    hit.setAttribute('stroke-linejoin', 'round');
    hit.setAttribute('class', 'drawing-hit');
    hit.dataset.id = drawing.id;
    hit.addEventListener('pointerdown', startDragDrawing);

    const visible = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    visible.setAttribute('d', buildDrawingPath(drawing.points));
    visible.setAttribute('fill', 'none');
    visible.setAttribute('stroke-linecap', 'round');
    visible.setAttribute('stroke-linejoin', 'round');
    visible.setAttribute('stroke-width', `${drawing.size * (0.75 + drawing.structure * 0.9)}`);
    visible.setAttribute('stroke', `rgba(35,35,35,${Math.max(0.08, drawing.alpha * (0.45 + drawing.contrast * 0.85))})`);
    visible.style.filter = `blur(${drawing.blur}px)`;
    visible.style.pointerEvents = 'none';

    if (state.selection.type === 'drawing' && state.selection.id === drawing.id) {
      const outline = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      const padding = Math.max(12, drawing.size * 2.5);
      outline.setAttribute('x', `${drawing.bounds.minX - padding}`);
      outline.setAttribute('y', `${drawing.bounds.minY - padding}`);
      outline.setAttribute('width', `${drawing.bounds.width + padding * 2}`);
      outline.setAttribute('height', `${drawing.bounds.height + padding * 2}`);
      outline.setAttribute('rx', '18');
      outline.setAttribute('fill', 'none');
      outline.setAttribute('stroke', 'rgba(17, 24, 39, 0.45)');
      outline.setAttribute('stroke-width', '2');
      outline.setAttribute('stroke-dasharray', '6 6');
      outline.style.pointerEvents = 'none';
      group.appendChild(outline);
    }

    group.appendChild(hit);
    group.appendChild(visible);
    drawLayer.appendChild(group);
  });
}

function updateSelectionUi() {
  const item = selectedItem();
  const drawing = selectedDrawing();
  const selected = item || drawing;
  const disabled = !selected;
  [controls.itemContrast, controls.itemBlur, controls.itemStructure, controls.itemScale, controls.itemRotation, controls.duplicateSelected, controls.deleteSelected]
    .forEach((control) => { control.disabled = disabled; });

  if (!selected) {
    controls.selectionStatus.textContent = t('selectionNone');
    return;
  }

  if (item) {
    controls.selectionStatus.textContent = `${t('selectionActive')}: ${t(`preset${item.type.charAt(0).toUpperCase()}${item.type.slice(1)}`)}`;
  } else {
    controls.selectionStatus.textContent = `${t('selectionActive')}: ${drawingLabel()}`;
  }

  controls.itemContrast.value = selected.contrast;
  controls.itemBlur.value = selected.blur;
  controls.itemStructure.value = selected.structure;
  controls.itemScale.value = selected.scale;
  controls.itemRotation.value = selected.rotation;
}

function refreshSelectionStyles() {
  state.items.forEach((item) => item.element?.classList.toggle('selected', state.selection.type === 'item' && item.id === state.selection.id));
  renderDrawings();
}

function selectObject(type, id) {
  state.selection = { type, id };
  refreshSelectionStyles();
  updateSelectionUi();
}

function addPreset(type) {
  const item = makeItem(type);
  state.items.push(item);
  renderItems();
  selectObject('item', item.id);
}

function copySelected() {
  const item = selectedItem();
  if (item) {
    const { type, rotation, scale, density, contrast, blur, structure } = item;
    state.clipboard = { objectType: 'item', type, rotation, scale, density, contrast, blur, structure };
    return;
  }

  const drawing = selectedDrawing();
  if (!drawing) return;
  state.clipboard = {
    objectType: 'drawing',
    rotation: drawing.rotation,
    scale: drawing.scale,
    contrast: drawing.contrast,
    blur: drawing.blur,
    structure: drawing.structure,
    size: drawing.size,
    alpha: drawing.alpha,
    points: drawing.points.map((point) => ({ ...point }))
  };
}

function pasteSelected() {
  if (!state.clipboard) return;
  if (state.clipboard.objectType === 'drawing') {
    const rect = stageRect();
    const drawing = {
      id: uid(),
      type: 'drawing',
      x: rect.width * 0.54 + rand(-24, 24),
      y: rect.height * 0.54 + rand(-24, 24),
      rotation: state.clipboard.rotation,
      scale: state.clipboard.scale,
      contrast: state.clipboard.contrast,
      blur: state.clipboard.blur,
      structure: state.clipboard.structure,
      size: state.clipboard.size,
      alpha: state.clipboard.alpha,
      points: state.clipboard.points.map((point) => ({ ...point })),
      bounds: { minX: 0, minY: 0, width: 1, height: 1 }
    };
    normalizeDrawing(drawing);
    state.drawings.push(drawing);
    renderDrawings();
    selectObject('drawing', drawing.id);
    return;
  }

  const item = makeItem(state.clipboard.type, 54, 54, { ...state.clipboard });
  item.x += rand(-6, 6);
  item.y += rand(-6, 6);
  state.items.push(item);
  renderItems();
  selectObject('item', item.id);
}

function deleteSelected() {
  if (state.selection.type === 'item') {
    state.items = state.items.filter((item) => item.id !== state.selection.id);
    renderItems();
  } else if (state.selection.type === 'drawing') {
    state.drawings = state.drawings.filter((drawing) => drawing.id !== state.selection.id);
    renderDrawings();
  } else {
    return;
  }
  state.selection = { type: null, id: null };
  updateSelectionUi();
}

function startDragItem(event) {
  if (state.drawingEnabled) return;
  const item = state.items.find((entry) => entry.id === event.currentTarget.dataset.id);
  if (!item) return;
  selectObject('item', item.id);
  const rect = stageRect();
  const currentX = rect.width * (item.x / 100);
  const currentY = rect.height * (item.y / 100);
  state.dragging = {
    type: 'item',
    id: item.id,
    pointerId: event.pointerId,
    dx: event.clientX - rect.left - currentX,
    dy: event.clientY - rect.top - currentY
  };
  event.currentTarget.classList.add('dragging');
  event.currentTarget.setPointerCapture?.(event.pointerId);
  event.stopPropagation();
}

function startDragDrawing(event) {
  if (state.drawingEnabled) return;
  const drawing = state.drawings.find((entry) => entry.id === event.currentTarget.dataset.id);
  if (!drawing) return;
  selectObject('drawing', drawing.id);
  const point = pointerToStage(event);
  state.dragging = {
    type: 'drawing',
    id: drawing.id,
    pointerId: event.pointerId,
    dx: point.x - drawing.x,
    dy: point.y - drawing.y
  };
  event.stopPropagation();
}

function moveDragItem(event) {
  if (!state.dragging.id) return;
  if (state.dragging.type === 'item') {
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
    return;
  }

  const drawing = state.drawings.find((entry) => entry.id === state.dragging.id);
  if (!drawing) return;
  const point = pointerToStage(event);
  const rect = stageRect();
  drawing.x = Math.max(0, Math.min(rect.width, point.x - state.dragging.dx));
  drawing.y = Math.max(0, Math.min(rect.height, point.y - state.dragging.dy));
  renderDrawings();
}

function stopDragItem() {
  if (!state.dragging.id) return;
  if (state.dragging.type === 'item') {
    const item = state.items.find((entry) => entry.id === state.dragging.id);
    item?.element?.classList.remove('dragging');
  }
  state.dragging = { type: null, id: null, pointerId: null, dx: 0, dy: 0 };
}

function resetScene() {
  state.items = [];
  state.drawings = [];
  state.selection = { type: null, id: null };
  state.motionOffset = { x: 0, y: 0 };
  state.motionTarget = { x: 0, y: 0 };
  state.eye.targetX = 0;
  state.eye.targetY = 0;
  motionLayer.style.transform = 'translate(0px, 0px)';
  renderItems();
  renderDrawings();
  updateSelectionUi();
}

function loadDemoScene() {
  state.items = [
    makeItem('ring', 34, 42),
    makeItem('thread', 58, 56),
    makeItem('dot', 44, 62),
    makeItem('cobweb', 68, 40),
    makeItem('cloud', 28, 62),
    makeItem('smudge', 54, 33)
  ];
  renderItems();
  selectObject('item', state.items[0]?.id || null);
}

function pickRandomTarget() {
  const rect = stageRect();
  const maxOffset = Math.min(220, Math.min(rect.width, rect.height) * 0.16) * state.motionIntensity;
  state.randomTarget.x = rand(-maxOffset, maxOffset);
  state.randomTarget.y = rand(-maxOffset, maxOffset);
}

function applyItemTransforms(now) {
  state.items.forEach((item, index) => {
    if (!item.element) return;
    const wobble = Math.sin(now / 1200 + item.driftSeed + index) * 7 * (state.motionRunning ? state.motionIntensity : 0);
    const lift = Math.cos(now / 1400 + item.driftSeed * 1.6) * 6 * (state.motionRunning ? state.motionIntensity : 0);
    item.element.style.transform = `translate(-50%, -50%) rotate(${item.rotation + wobble * 0.3}deg) scale(${item.scale}) translate(${wobble}px, ${lift}px)`;
    item.element.style.opacity = `${Math.max(0.18, Math.min(0.95, 0.35 + item.contrast * 0.9))}`;
  });
}

function animate(now) {
  if (state.motionRunning) {
    if (state.motionMode === 'random') {
      state.motionTarget.x += (state.randomTarget.x - state.motionTarget.x) * 0.05;
      state.motionTarget.y += (state.randomTarget.y - state.motionTarget.y) * 0.05;
    } else {
      state.motionTarget.x += (state.eye.targetX - state.motionTarget.x) * 0.14;
      state.motionTarget.y += (state.eye.targetY - state.motionTarget.y) * 0.14;
    }
  } else {
    state.motionTarget.x += (0 - state.motionTarget.x) * 0.15;
    state.motionTarget.y += (0 - state.motionTarget.y) * 0.15;
  }

  state.motionOffset.x += (state.motionTarget.x - state.motionOffset.x) * 0.18;
  state.motionOffset.y += (state.motionTarget.y - state.motionOffset.y) * 0.18;
  motionLayer.style.transform = `translate(${state.motionOffset.x}px, ${state.motionOffset.y}px)`;
  applyItemTransforms(now);
  requestAnimationFrame(animate);
}

setInterval(() => {
  if (state.motionMode === 'random' && state.motionRunning) pickRandomTarget();
}, 2800);

function pointerToStage(event) {
  const point = drawLayer.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  const ctm = drawLayer.getScreenCTM();
  if (!ctm) {
    const rect = stageRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }
  const local = point.matrixTransform(ctm.inverse());
  return { x: local.x, y: local.y };
}

function startDrawing(event) {
  const clickedInteractive = event.target.closest('.floater-item, .drawing-hit');
  if (!state.drawingEnabled) {
    if (!clickedInteractive) selectObject(null, null);
    return;
  }
  if (clickedInteractive) return;

  const point = pointerToStage(event);
  state.lastPointer = point;
  const drawing = createDrawingFromPoint(point);
  state.drawings.push(drawing);
  state.drawingPath = drawing;
  renderDrawings();
  selectObject('drawing', drawing.id);
}

function moveDrawing(event) {
  if (!state.drawingEnabled || !state.drawingPath) return;
  const point = pointerToStage(event);
  const last = state.lastPointer;
  if (!last) return;
  const distance = Math.hypot(point.x - last.x, point.y - last.y);
  if (distance < 1.5) return;
  addPointToDrawing(state.drawingPath, point);
  state.lastPointer = point;
  renderDrawings();
}

function stopDrawing() {
  if (state.drawingPath?.points.length === 1) {
    state.drawingPath.points.push({ x: 0.5, y: 0.5 });
    normalizeDrawing(state.drawingPath);
    renderDrawings();
  }
  state.drawingPath = null;
  state.lastPointer = null;
}

async function enableCamera() {
  if (!window.location.protocol.startsWith('https') && !window.location.hostname.includes('localhost')) {
    controls.cameraStatus.textContent = t('cameraNeedsHttps');
    return;
  }
  if (state.eye.active) {
    controls.cameraStatus.textContent = t('cameraActive');
    return;
  }

  const faceMesh = new FaceMesh({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}` });
  faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.45,
    minTrackingConfidence: 0.45
  });
  faceMesh.onResults(onFaceResults);

  const camera = new Camera(cameraFeed, {
    onFrame: async () => { await faceMesh.send({ image: cameraFeed }); },
    width: 480,
    height: 360
  });

  try {
    await camera.start();
    state.eye.faceMesh = faceMesh;
    state.eye.camera = camera;
    state.eye.active = true;
    controls.cameraStatus.textContent = t('cameraActive');
  } catch (error) {
    console.error(error);
    controls.cameraStatus.textContent = t('cameraPermissionFailed');
  }
}

function onFaceResults(results) {
  if (state.motionMode !== 'eye' || !state.motionRunning) return;
  const rect = stageRect();
  if (!results.multiFaceLandmarks?.length) return;

  const landmarks = results.multiFaceLandmarks[0];
  const leftUpperEyelid = landmarks[159];
  const leftLowerEyelid = landmarks[145];
  const rightUpperEyelid = landmarks[386];
  const rightLowerEyelid = landmarks[374];
  const leftIris = landmarks[468];
  const rightIris = landmarks[473];

  const leftEyeLidDistance = leftLowerEyelid.y - leftUpperEyelid.y;
  const rightEyeLidDistance = rightLowerEyelid.y - rightUpperEyelid.y;
  const currentEyeLidDistance = (leftEyeLidDistance + rightEyeLidDistance) / 2;

  if (state.eye.baseEyeLidDistance === null) state.eye.baseEyeLidDistance = currentEyeLidDistance;

  const eyeLidDelta = currentEyeLidDistance - state.eye.baseEyeLidDistance;
  const leftEyeWidth = Math.max(0.0001, landmarks[133].x - landmarks[33].x);
  const rightEyeWidth = Math.max(0.0001, landmarks[263].x - landmarks[362].x);
  const leftIrisOffsetX = (leftIris.x - landmarks[33].x) / leftEyeWidth - 0.5;
  const rightIrisOffsetX = (rightIris.x - landmarks[362].x) / rightEyeWidth - 0.5;
  const irisOffsetX = -(leftIrisOffsetX + rightIrisOffsetX) / 2;

  const maxX = rect.width * 0.18 * state.motionIntensity;
  const maxY = rect.height * 0.16 * state.motionIntensity;
  state.eye.targetX = Math.max(-maxX, Math.min(maxX, irisOffsetX * rect.width * 1.2 * state.motionIntensity));
  state.eye.targetY = Math.max(-maxY, Math.min(maxY, eyeLidDelta * rect.height * 120 * state.motionIntensity));
}

function rerenderSelectedItem() {
  const item = selectedItem();
  if (!item?.element) return;
  item.element.innerHTML = svgForItem(item);
  applyItemTransforms(performance.now());
}

function updateSelectedObject(prop, value) {
  const item = selectedItem();
  if (item) {
    item[prop] = value;
    rerenderSelectedItem();
    updateSelectionUi();
    return;
  }
  const drawing = selectedDrawing();
  if (!drawing) return;
  drawing[prop] = value;
  renderDrawings();
  updateSelectionUi();
}

presetButtons.forEach((button) => button.addEventListener('click', () => addPreset(button.dataset.preset)));
sceneButtons.forEach((button) => button.addEventListener('click', () => { state.scene = button.dataset.scene; applyScene(); }));
motionInputs.forEach((input) => input.addEventListener('change', async () => {
  state.motionMode = input.value;
  if (state.motionMode === 'eye') await enableCamera();
}));
controls.motionIntensity.addEventListener('input', (e) => { state.motionIntensity = Number(e.target.value); pickRandomTarget(); });
controls.itemContrast.addEventListener('input', (e) => updateSelectedObject('contrast', Number(e.target.value)));
controls.itemBlur.addEventListener('input', (e) => updateSelectedObject('blur', Number(e.target.value)));
controls.itemStructure.addEventListener('input', (e) => updateSelectedObject('structure', Number(e.target.value)));
controls.itemScale.addEventListener('input', (e) => updateSelectedObject('scale', Number(e.target.value)));
controls.itemRotation.addEventListener('input', (e) => updateSelectedObject('rotation', Number(e.target.value)));
controls.brushSize.addEventListener('input', (e) => { state.brushSize = Number(e.target.value); });
controls.brushAlpha.addEventListener('input', (e) => { state.brushAlpha = Number(e.target.value); });
controls.drawToggle.addEventListener('click', () => {
  state.drawingEnabled = !state.drawingEnabled;
  controls.drawToggle.classList.toggle('active', state.drawingEnabled);
  controls.drawToggle.textContent = state.drawingEnabled ? t('drawingEnabled') : t('enableDrawing');
  stage.style.cursor = state.drawingEnabled ? 'crosshair' : 'default';
});
controls.clearDrawings.addEventListener('click', () => {
  state.drawings = [];
  if (state.selection.type === 'drawing') state.selection = { type: null, id: null };
  renderDrawings();
  updateSelectionUi();
});
controls.resetScene.addEventListener('click', resetScene);
controls.demoScene.addEventListener('click', loadDemoScene);
controls.startMotion.addEventListener('click', () => {
  state.motionRunning = true;
  if (state.motionMode === 'eye') enableCamera();
  pickRandomTarget();
});
controls.stopMotion.addEventListener('click', () => {
  state.motionRunning = false;
});
controls.startCamera.addEventListener('click', enableCamera);
controls.duplicateSelected.addEventListener('click', () => { copySelected(); pasteSelected(); });
controls.deleteSelected.addEventListener('click', deleteSelected);
controls.languageSelect.addEventListener('change', (event) => {
  state.language = event.target.value;
  applyTranslations();
});
controls.previewMode.addEventListener('click', () => {
  state.previewOnly = !state.previewOnly;
  document.body.classList.toggle('preview-only', state.previewOnly);
  controls.previewMode.textContent = state.previewOnly ? t('exitFocusMode') : t('focusMode');
});
controls.fullscreenMode.addEventListener('click', async () => {
  try {
    if (!document.fullscreenElement) await stage.requestFullscreen();
    else await document.exitFullscreen();
  } catch (error) {
    console.error(error);
  }
});

document.addEventListener('fullscreenchange', () => setTimeout(setViewBox, 50));
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
window.addEventListener('keydown', (event) => {
  const isMac = navigator.platform.toUpperCase().includes('MAC');
  const mod = isMac ? event.metaKey : event.ctrlKey;
  if (mod && event.key.toLowerCase() === 'c') copySelected();
  if (mod && event.key.toLowerCase() === 'v') {
    pasteSelected();
    event.preventDefault();
  }
  if ((event.key === 'Delete' || event.key === 'Backspace') && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
    deleteSelected();
  }
});

populateLanguageSelect();
setViewBox();
pickRandomTarget();
renderItems();
renderDrawings();
applyScene();
applyTranslations();
requestAnimationFrame(animate);
