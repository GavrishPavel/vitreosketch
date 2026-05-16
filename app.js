const stage = document.getElementById('stage');
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
    eyeTitle: '1. Eye setup',
    activeEye: 'Editing eye',
    leftEye: 'Left eye',
    rightEye: 'Right eye',
    previewEyes: 'Preview eyes',
    previewActiveOnly: 'Active eye only',
    previewBothEyes: 'Both eyes',
    addTitle: '2. Add floaters',
    presetDot: 'Dot cluster',
    presetRing: 'Ring',
    presetThread: 'Thread',
    presetCobweb: 'Cobweb',
    presetSmudge: 'Smudge',
    presetCloud: 'Cloud',
    addHint: 'Based on commonly described forms: spots, rings/Weiss rings, thread-like strands, cobwebs, cloudy smudges, and diffuse cloud-like floaters.',
    drawTitle: '3. Draw your own',
    brushSize: 'Brush size',
    brushAlpha: 'Stroke alpha',
    enableDrawing: 'Enable drawing',
    drawingEnabled: 'Drawing enabled',
    clearDrawings: 'Clear drawings',
    selectionTitle: '4. Selected floater',
    selectionNone: 'Nothing selected',
    selectionActive: 'Selected',
    selectionHint: 'Click a floater or drawing to edit it. Drag to reposition. Ctrl/Cmd+C copies the active-eye object, Delete removes the selected object.',
    contrast: 'Contrast',
    blur: 'Blur',
    structure: 'Structure',
    scale: 'Scale',
    rotation: 'Rotation',
    duplicateSelected: 'Duplicate',
    deleteSelected: 'Delete selected',
    motionTitle: '5. Motion',
    randomDrift: 'Random drift',
    eyeTracking: 'Eye tracking',
    eyeTrackingInfo: 'Eye tracking uses your front camera locally in the browser. It estimates iris movement and eyelid motion to shift floaters in the opposite direction. No video leaves your device.',
    motionIntensity: 'Motion intensity',
    startMotion: 'Start movement',
    stopMotion: 'Stop movement',
    cameraOff: 'Camera off',
    cameraNeedsHttps: 'Camera needs HTTPS or localhost',
    cameraActive: 'Camera active',
    cameraPermissionFailed: 'Camera permission failed',
    sceneTitle: '6. Scene',
    sceneBeach: 'Beach',
    sceneSnow: 'Snow',
    scenePlain: 'No background',
    refractionStrength: 'Background refraction',
    refractionHint: 'Samples the actual scene under key floater shapes, then locally distorts and blurs it.',
    resetScene: 'Reset scene',
    loadStarterSet: 'Load starter set',
    preview: 'Preview',
    focusMode: 'Focus mode',
    exitFocusMode: 'Exit focus mode',
    fullscreen: 'Fullscreen',
    stageHint: 'Tip: pick an eye to edit, then preview the active eye or both eyes moving independently. Eye tracking works on HTTPS / GitHub Pages.'
  },
  ru: {
    title: 'Визуализатор и редактор помутнений',
    lead: 'Соберите свою сцену с типичными помутнениями стекловидного тела и запустите движение: случайный дрейф или слежение по взгляду через камеру.',
    eyeTitle: '1. Настройка глаза',
    activeEye: 'Редактируемый глаз',
    leftEye: 'Левый глаз',
    rightEye: 'Правый глаз',
    previewEyes: 'Предпросмотр глаз',
    previewActiveOnly: 'Только активный глаз',
    previewBothEyes: 'Оба глаза',
    addTitle: '2. Добавьте помутнения',
    presetDot: 'Точки',
    presetRing: 'Кольцо',
    presetThread: 'Нить',
    presetCobweb: 'Паутина',
    presetSmudge: 'Пятно',
    presetCloud: 'Облако',
    addHint: 'Основано на частых описаниях: точки, кольца/кольцо Вейса, нитевидные полосы, паутинка, мутные пятна и облачные помутнения.',
    drawTitle: '3. Нарисуйте своё',
    brushSize: 'Размер кисти',
    brushAlpha: 'Прозрачность штриха',
    enableDrawing: 'Включить рисование',
    drawingEnabled: 'Рисование включено',
    clearDrawings: 'Очистить рисунок',
    selectionTitle: '4. Выбранный объект',
    selectionNone: 'Ничего не выбрано',
    selectionActive: 'Выбрано',
    selectionHint: 'Кликни по помутнению или рисунку, чтобы редактировать его. Перетаскивай мышкой. Ctrl/Cmd+C копирует объект активного глаза, Delete удаляет выбранный объект.',
    contrast: 'Контрастность',
    blur: 'Размытие',
    structure: 'Структура',
    scale: 'Масштаб',
    rotation: 'Поворот',
    duplicateSelected: 'Дублировать',
    deleteSelected: 'Удалить выбранное',
    motionTitle: '5. Движение',
    randomDrift: 'Случайный дрейф',
    eyeTracking: 'Отслеживание взгляда',
    eyeTrackingInfo: 'Отслеживание взгляда использует фронтальную камеру локально в браузере. Приложение оценивает движение радужки и век, чтобы сдвигать помутнения в противоположную сторону. Видео никуда не отправляется.',
    motionIntensity: 'Интенсивность движения',
    startMotion: 'Запустить движение',
    stopMotion: 'Остановить движение',
    cameraOff: 'Камера выключена',
    cameraNeedsHttps: 'Для камеры нужен HTTPS или localhost',
    cameraActive: 'Камера включена',
    cameraPermissionFailed: 'Не удалось получить доступ к камере',
    sceneTitle: '6. Сцена',
    sceneBeach: 'Пляж',
    sceneSnow: 'Снег',
    scenePlain: 'Без фона',
    refractionStrength: 'Рефракция фона',
    refractionHint: 'Берёт реальный фон под важными формами помутнений и локально искажает/размывает его.',
    resetScene: 'Сбросить сцену',
    loadStarterSet: 'Загрузить набор',
    preview: 'Предпросмотр',
    focusMode: 'Режим просмотра',
    exitFocusMode: 'Выйти из режима',
    fullscreen: 'На весь экран',
    stageHint: 'Совет: выбери глаз для редактирования, а затем смотри только его или оба глаза с независимым движением. Слежение за глазами работает на HTTPS / GitHub Pages.'
  },
  es: {
    title: 'Visualizador y editor de miodesopsias',
    lead: 'Compón una simulación MVP de formas comunes de miodesopsias vítreas y anímalas con una deriva suave o con seguimiento ocular mediante cámara.',
    eyeTitle: '1. Configuración del ojo',
    activeEye: 'Ojo en edición',
    leftEye: 'Ojo izquierdo',
    rightEye: 'Ojo derecho',
    previewEyes: 'Vista de ojos',
    previewActiveOnly: 'Solo ojo activo',
    previewBothEyes: 'Ambos ojos',
    addTitle: '2. Añadir miodesopsias',
    presetDot: 'Grupo de puntos',
    presetRing: 'Anillo',
    presetThread: 'Hilo',
    presetCobweb: 'Telaraña',
    presetSmudge: 'Mancha',
    presetCloud: 'Nube',
    addHint: 'Basado en descripciones frecuentes: puntos, anillos/anillo de Weiss, hebras filamentosas, telarañas, manchas turbias y nubes difusas.',
    drawTitle: '3. Dibuja la tuya',
    brushSize: 'Tamaño del pincel',
    brushAlpha: 'Opacidad del trazo',
    enableDrawing: 'Activar dibujo',
    drawingEnabled: 'Dibujo activado',
    clearDrawings: 'Borrar dibujos',
    selectionTitle: '4. Miodesopsia seleccionada',
    selectionNone: 'Nada seleccionado',
    selectionActive: 'Seleccionado',
    selectionHint: 'Haz clic en una miodesopsia o dibujo para editarlo. Arrastra para recolocarlo. Ctrl/Cmd+C copia el objeto del ojo activo y Delete elimina el objeto seleccionado.',
    contrast: 'Contraste',
    blur: 'Desenfoque',
    structure: 'Estructura',
    scale: 'Escala',
    rotation: 'Rotación',
    duplicateSelected: 'Duplicar',
    deleteSelected: 'Eliminar seleccionado',
    motionTitle: '5. Movimiento',
    randomDrift: 'Deriva aleatoria',
    eyeTracking: 'Seguimiento ocular',
    eyeTrackingInfo: 'El seguimiento ocular usa tu cámara frontal localmente en el navegador. Estima el movimiento del iris y de los párpados para desplazar las miodesopsias en dirección opuesta. Ningún video sale de tu dispositivo.',
    motionIntensity: 'Intensidad del movimiento',
    startMotion: 'Iniciar movimiento',
    stopMotion: 'Detener movimiento',
    cameraOff: 'Cámara desactivada',
    cameraNeedsHttps: 'La cámara necesita HTTPS o localhost',
    cameraActive: 'Cámara activa',
    cameraPermissionFailed: 'No se pudo obtener permiso para la cámara',
    sceneTitle: '6. Escena',
    sceneBeach: 'Playa',
    sceneSnow: 'Nieve',
    scenePlain: 'Sin fondo',
    refractionStrength: 'Refracción del fondo',
    refractionHint: 'Muestrea la escena real bajo las formas principales y la distorsiona/desenfoca localmente.',
    resetScene: 'Restablecer escena',
    loadStarterSet: 'Cargar conjunto inicial',
    preview: 'Vista previa',
    focusMode: 'Modo enfoque',
    exitFocusMode: 'Salir del modo enfoque',
    fullscreen: 'Pantalla completa',
    stageHint: 'Consejo: elige qué ojo editar y luego visualiza solo ese ojo o ambos moviéndose de forma independiente. El seguimiento ocular funciona en HTTPS / GitHub Pages.'
  },
  pt: {
    title: 'Visualizador e editor de moscas volantes',
    lead: 'Monte uma simulação MVP de formas comuns de moscas volantes vítreas e depois anime tudo com deriva suave ou rastreamento ocular pela câmera.',
    eyeTitle: '1. Configuração do olho',
    activeEye: 'Olho em edição',
    leftEye: 'Olho esquerdo',
    rightEye: 'Olho direito',
    previewEyes: 'Visualização dos olhos',
    previewActiveOnly: 'Só olho ativo',
    previewBothEyes: 'Ambos os olhos',
    addTitle: '2. Adicionar moscas volantes',
    presetDot: 'Grupo de pontos',
    presetRing: 'Anel',
    presetThread: 'Filamento',
    presetCobweb: 'Teia',
    presetSmudge: 'Mancha',
    presetCloud: 'Nuvem',
    addHint: 'Baseado em descrições comuns: pontos, anéis/anel de Weiss, filamentos, teias, manchas turvas e nuvens difusas.',
    drawTitle: '3. Desenhe a sua',
    brushSize: 'Tamanho do pincel',
    brushAlpha: 'Opacidade do traço',
    enableDrawing: 'Ativar desenho',
    drawingEnabled: 'Desenho ativado',
    clearDrawings: 'Limpar desenhos',
    selectionTitle: '4. Mosca volante selecionada',
    selectionNone: 'Nada selecionado',
    selectionActive: 'Selecionado',
    selectionHint: 'Clique em uma mosca volante ou desenho para editar. Arraste para reposicionar. Ctrl/Cmd+C copia o objeto do olho ativo e Delete remove o objeto selecionado.',
    contrast: 'Contraste',
    blur: 'Desfoque',
    structure: 'Estrutura',
    scale: 'Escala',
    rotation: 'Rotação',
    duplicateSelected: 'Duplicar',
    deleteSelected: 'Excluir selecionado',
    motionTitle: '5. Movimento',
    randomDrift: 'Deriva aleatória',
    eyeTracking: 'Rastreamento ocular',
    eyeTrackingInfo: 'O rastreamento ocular usa a câmera frontal localmente no navegador. Ele estima o movimento da íris e das pálpebras para deslocar as moscas volantes na direção oposta. Nenhum vídeo sai do seu dispositivo.',
    motionIntensity: 'Intensidade do movimento',
    startMotion: 'Iniciar movimento',
    stopMotion: 'Parar movimento',
    cameraOff: 'Câmera desligada',
    cameraNeedsHttps: 'A câmera precisa de HTTPS ou localhost',
    cameraActive: 'Câmera ativa',
    cameraPermissionFailed: 'Falha ao obter permissão da câmera',
    sceneTitle: '6. Cena',
    sceneBeach: 'Praia',
    sceneSnow: 'Neve',
    scenePlain: 'Sem fundo',
    refractionStrength: 'Refração do fundo',
    refractionHint: 'Amostra a cena real sob as formas principais e a distorce/desfoca localmente.',
    resetScene: 'Redefinir cena',
    loadStarterSet: 'Carregar conjunto inicial',
    preview: 'Pré-visualização',
    focusMode: 'Modo foco',
    exitFocusMode: 'Sair do modo foco',
    fullscreen: 'Tela cheia',
    stageHint: 'Dica: escolha qual olho editar e depois visualize só ele ou ambos se movendo de forma independente. O rastreamento ocular funciona em HTTPS / GitHub Pages.'
  },
  zh: {
    title: '飞蚊症可视化与编辑器',
    lead: '创建一个常见玻璃体飞蚊形态的 MVP 模拟，并通过轻微漂移或基于摄像头的眼动追踪让它动起来。',
    eyeTitle: '1. 眼别设置',
    activeEye: '当前编辑眼睛',
    leftEye: '左眼',
    rightEye: '右眼',
    previewEyes: '预览眼睛',
    previewActiveOnly: '仅当前眼睛',
    previewBothEyes: '双眼',
    addTitle: '2. 添加飞蚊',
    presetDot: '点状簇',
    presetRing: '环状',
    presetThread: '丝状',
    presetCobweb: '网状',
    presetSmudge: '污斑',
    presetCloud: '云雾',
    addHint: '基于常见描述：点状、环状/魏斯环、丝状条纹、蛛网状、模糊污斑和弥散云雾。',
    drawTitle: '3. 自己绘制',
    brushSize: '画笔大小',
    brushAlpha: '笔迹透明度',
    enableDrawing: '启用绘制',
    drawingEnabled: '绘制已启用',
    clearDrawings: '清除绘图',
    selectionTitle: '4. 已选飞蚊',
    selectionNone: '未选择任何对象',
    selectionActive: '已选择',
    selectionHint: '点击飞蚊或绘图即可编辑，拖动可重新定位。Ctrl/Cmd+C 复制当前眼睛对象，Delete 删除当前选中的对象。',
    contrast: '对比度',
    blur: '模糊',
    structure: '结构',
    scale: '缩放',
    rotation: '旋转',
    duplicateSelected: '复制',
    deleteSelected: '删除所选',
    motionTitle: '5. 运动',
    randomDrift: '随机漂移',
    eyeTracking: '眼动追踪',
    eyeTrackingInfo: '眼动追踪会在浏览器中本地使用前置摄像头。它会估算虹膜与眼睑运动，并让飞蚊向相反方向偏移。视频不会离开你的设备。',
    motionIntensity: '运动强度',
    startMotion: '开始运动',
    stopMotion: '停止运动',
    cameraOff: '摄像头已关闭',
    cameraNeedsHttps: '摄像头需要 HTTPS 或 localhost',
    cameraActive: '摄像头已开启',
    cameraPermissionFailed: '无法获取摄像头权限',
    sceneTitle: '6. 场景',
    sceneBeach: '海滩',
    sceneSnow: '雪景',
    scenePlain: '无背景',
    refractionStrength: '背景折射',
    refractionHint: '对主要飞蚊形状下方的真实背景进行局部采样、扭曲和模糊。',
    resetScene: '重置场景',
    loadStarterSet: '加载初始组合',
    preview: '预览',
    focusMode: '专注模式',
    exitFocusMode: '退出专注模式',
    fullscreen: '全屏',
    stageHint: '提示：先选择要编辑的眼睛，再预览单眼或双眼独立运动。眼动追踪可在 HTTPS / GitHub Pages 上启用。'
  },
  ar: {
    title: 'أداة تصور وتحرير عوائم العين',
    lead: 'أنشئ محاكاة أولية لأشكال عوائم الجسم الزجاجي الشائعة، ثم حرّكها بانجراف لطيف أو بتتبع حركة العين عبر الكاميرا.',
    eyeTitle: '1. إعداد العين',
    activeEye: 'العين قيد التحرير',
    leftEye: 'العين اليسرى',
    rightEye: 'العين اليمنى',
    previewEyes: 'معاينة العينين',
    previewActiveOnly: 'العين النشطة فقط',
    previewBothEyes: 'كلتا العينين',
    addTitle: '2. أضف العوائم',
    presetDot: 'مجموعة نقاط',
    presetRing: 'حلقة',
    presetThread: 'خيط',
    presetCobweb: 'شبكة',
    presetSmudge: 'لطخة',
    presetCloud: 'سحابة',
    addHint: 'مبني على أوصاف شائعة: نقاط، حلقات/حلقة فايس، خيوط رفيعة، شبكات، لطخات ضبابية، وعوائم سحابية منتشرة.',
    drawTitle: '3. ارسم الشكل بنفسك',
    brushSize: 'حجم الفرشاة',
    brushAlpha: 'شفافية الخط',
    enableDrawing: 'تفعيل الرسم',
    drawingEnabled: 'تم تفعيل الرسم',
    clearDrawings: 'مسح الرسومات',
    selectionTitle: '4. العائمة المحددة',
    selectionNone: 'لا يوجد تحديد',
    selectionActive: 'محدد',
    selectionHint: 'انقر على عائمة أو رسم لتعديله. اسحب لإعادة التموضع. Ctrl/Cmd+C ينسخ عنصر العين النشطة وDelete يحذف العنصر المحدد.',
    contrast: 'التباين',
    blur: 'التمويه',
    structure: 'البنية',
    scale: 'المقياس',
    rotation: 'الدوران',
    duplicateSelected: 'نسخ',
    deleteSelected: 'حذف المحدد',
    motionTitle: '5. الحركة',
    randomDrift: 'انجراف عشوائي',
    eyeTracking: 'تتبع العين',
    eyeTrackingInfo: 'يستخدم تتبع العين الكاميرا الأمامية محليًا داخل المتصفح. ويقدّر حركة القزحية والجفون لتحريك العوائم بالاتجاه المعاكس. لا يغادر أي فيديو جهازك.',
    motionIntensity: 'شدة الحركة',
    startMotion: 'بدء الحركة',
    stopMotion: 'إيقاف الحركة',
    cameraOff: 'الكاميرا متوقفة',
    cameraNeedsHttps: 'تحتاج الكاميرا إلى HTTPS أو localhost',
    cameraActive: 'الكاميرا مفعلة',
    cameraPermissionFailed: 'فشل الحصول على إذن الكاميرا',
    sceneTitle: '6. المشهد',
    sceneBeach: 'الشاطئ',
    sceneSnow: 'الثلج',
    scenePlain: 'بدون خلفية',
    refractionStrength: 'انكسار الخلفية',
    refractionHint: 'يأخذ الخلفية الحقيقية تحت الأشكال الأساسية ثم يحرّفها ويُموّهها محليًا.',
    resetScene: 'إعادة ضبط المشهد',
    loadStarterSet: 'تحميل مجموعة البداية',
    preview: 'المعاينة',
    focusMode: 'وضع التركيز',
    exitFocusMode: 'الخروج من وضع التركيز',
    fullscreen: 'ملء الشاشة',
    stageHint: 'نصيحة: اختر العين التي تريد تحريرها، ثم عاين عينًا واحدة أو كلتا العينين مع حركة مستقلة. تتبع العين يعمل على HTTPS أو GitHub Pages.'
  }
};

const EYES = ['left', 'right'];
function createEyeState() { return { items: [], drawings: [], selection: { type: null, id: null }, randomTarget: { x: 0, y: 0 }, motionOffset: { x: 0, y: 0 }, motionTarget: { x: 0, y: 0 }, eyeTarget: { x: 0, y: 0 }, elements: { motionLayer: null, refractionLayer: null, floaterLayer: null, drawLayer: null }, refractionFrame: null }; }
const state = { eyes: { left: createEyeState(), right: createEyeState() }, activeEye: 'left', previewMode: 'both', clipboard: null, drawingEnabled: false, drawingPath: null, lastPointer: null, motionMode: 'random', motionIntensity: 0.8, motionRunning: true, brushSize: 4, brushAlpha: 0.25, scene: 'plain', refractionStrength: 0.52, eye: { active: false, baseEyeLidDistance: null, faceMesh: null, camera: null, stream: null }, language: 'en', focusPreview: false, dragging: { eye: null, type: null, id: null, pointerId: null, dx: 0, dy: 0 }, sceneAssets: { beach: null, snow: null }, sceneReady: false };

const presetButtons = document.querySelectorAll('[data-preset]');
const sceneButtons = document.querySelectorAll('[data-scene]');
const motionInputs = document.querySelectorAll('input[name="motionMode"]');
const controls = {
  itemContrast: document.getElementById('itemContrast'), itemBlur: document.getElementById('itemBlur'), itemStructure: document.getElementById('itemStructure'), itemScale: document.getElementById('itemScale'), itemRotation: document.getElementById('itemRotation'), motionIntensity: document.getElementById('motionIntensity'), brushSize: document.getElementById('brushSize'), brushAlpha: document.getElementById('brushAlpha'), drawToggle: document.getElementById('drawToggle'), clearDrawings: document.getElementById('clearDrawings'), resetScene: document.getElementById('resetScene'), demoScene: document.getElementById('demoScene'), toggleMotion: document.getElementById('toggleMotion'), cameraStatus: document.getElementById('cameraStatus'), languageSelect: document.getElementById('languageSelect'), previewMode: document.getElementById('previewMode'), fullscreenMode: document.getElementById('fullscreenMode'), selectionStatus: document.getElementById('selectionStatus'), duplicateSelected: document.getElementById('duplicateSelected'), deleteSelected: document.getElementById('deleteSelected'), activeEyeButtons: document.querySelectorAll('[data-eye-target]'), previewEyeButtons: document.querySelectorAll('[data-preview-eyes]'), eyeTrackingInfoButton: document.getElementById('eyeTrackingInfoButton'), eyeTrackingInfoPopover: document.getElementById('eyeTrackingInfoPopover'), refractionStrength: document.getElementById('refractionStrength')
};

function rand(min, max) { return Math.random() * (max - min) + min; }
function uid() { return `${Date.now()}-${Math.random().toString(16).slice(2)}`; }
function stageRect() { return stage.getBoundingClientRect(); }
function t(key) { return translations[state.language][key] || translations.en[key] || key; }
function isRtlLanguage(lang) { return lang === 'ar'; }
function eyeState(eye = state.activeEye) { return state.eyes[eye]; }
function activeSelection() { return eyeState().selection; }
function selectedItem(eye = state.activeEye) { const currentEye = eyeState(eye); return currentEye.selection.type === 'item' ? currentEye.items.find((item) => item.id === currentEye.selection.id) || null : null; }
function selectedDrawing(eye = state.activeEye) { const currentEye = eyeState(eye); return currentEye.selection.type === 'drawing' ? currentEye.drawings.find((drawing) => drawing.id === currentEye.selection.id) || null : null; }
function eyeKeyLabel(eye) { return eye === 'left' ? 'leftEye' : 'rightEye'; }
function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }

function ensureStageLayers() { EYES.forEach((eye) => { const motionLayer = document.getElementById(`${eye}MotionLayer`); state.eyes[eye].elements.motionLayer = motionLayer; state.eyes[eye].elements.refractionLayer = motionLayer.querySelector('.refraction-layer'); state.eyes[eye].elements.floaterLayer = motionLayer.querySelector('.floater-layer'); state.eyes[eye].elements.drawLayer = motionLayer.querySelector('.draw-layer'); }); }
function makeItem(type, x = rand(20, 80), y = rand(20, 80), overrides = {}) { return { id: uid(), type, x, y, rotation: overrides.rotation ?? rand(-20, 20), scale: overrides.scale ?? rand(0.35, 2.6), density: overrides.density ?? rand(0.7, 1.2), contrast: overrides.contrast ?? 0.55, blur: overrides.blur ?? 9, structure: overrides.structure ?? 0.45, driftSeed: rand(0, Math.PI * 2), element: null, eye: overrides.eye ?? state.activeEye }; }
function setViewBox() { EYES.forEach((eye) => { const currentEye = state.eyes[eye]; const drawLayer = currentEye.elements.drawLayer; if (!drawLayer) return; const rect = drawLayer.getBoundingClientRect(); drawLayer.setAttribute('viewBox', `0 0 ${Math.max(1, rect.width)} ${Math.max(1, rect.height)}`); const canvas = currentEye.elements.refractionLayer; if (canvas) resizeRefractionCanvas(canvas, rect.width, rect.height); currentEye.refractionFrame = null; }); state.sceneReady = false; }
function populateLanguageSelect() { controls.languageSelect.innerHTML = Object.entries(languageMeta).map(([code, meta]) => `<option value="${code}">${meta.label}</option>`).join(''); controls.languageSelect.value = state.language; }

function updateMotionButton() { controls.toggleMotion.textContent = state.motionRunning ? t('stopMotion') : t('startMotion'); controls.toggleMotion.classList.toggle('ghost', !state.motionRunning); }
function updateCameraStatus() {
  if (state.motionMode === 'eye' && !state.eye.active && controls.cameraStatus.dataset.errorKey) {
    controls.cameraStatus.textContent = t(controls.cameraStatus.dataset.errorKey);
    return;
  }
  controls.cameraStatus.textContent = state.eye.active ? t('cameraActive') : t('cameraOff');
}
function updateRefractionUi() {
  if (!controls.refractionStrength) return;
  controls.refractionStrength.value = state.refractionStrength;
  stage.style.setProperty('--refraction-strength', String(state.refractionStrength));
}

function applyTranslations() {
  document.documentElement.lang = state.language;
  document.documentElement.dir = isRtlLanguage(state.language) ? 'rtl' : 'ltr';
  document.body.classList.toggle('rtl', isRtlLanguage(state.language));
  document.title = languageMeta[state.language]?.title || languageMeta.en.title;
  document.querySelectorAll('[data-i18n]').forEach((node) => { node.textContent = t(node.dataset.i18n); });
  controls.drawToggle.textContent = state.drawingEnabled ? t('drawingEnabled') : t('enableDrawing');
  controls.previewMode.textContent = state.focusPreview ? t('exitFocusMode') : t('focusMode');
  controls.languageSelect.value = state.language;
  updateMotionButton();
  updateCameraStatus();
  updateEyeUi();
  updateSelectionUi();
}

function applyScene() {
  stage.classList.remove('scene-beach', 'scene-snow', 'scene-plain');
  stage.classList.add(`scene-${state.scene}`);
  sceneButtons.forEach((button) => button.classList.toggle('active', button.dataset.scene === state.scene));
  state.sceneReady = false;
  EYES.forEach((eye) => { state.eyes[eye].refractionFrame = null; });
}

function resizeRefractionCanvas(canvas, width, height) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const safeWidth = Math.max(1, Math.round(width));
  const safeHeight = Math.max(1, Math.round(height));
  canvas.width = Math.max(1, Math.round(safeWidth * dpr));
  canvas.height = Math.max(1, Math.round(safeHeight * dpr));
  canvas.dataset.width = String(safeWidth);
  canvas.dataset.height = String(safeHeight);
  canvas.dataset.dpr = String(dpr);
}

function canvasMetrics(canvas) {
  return {
    width: Number(canvas.dataset.width || canvas.clientWidth || 1),
    height: Number(canvas.dataset.height || canvas.clientHeight || 1),
    dpr: Number(canvas.dataset.dpr || Math.min(window.devicePixelRatio || 1, 2))
  };
}

function loadSceneAsset(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function ensureSceneAssets() {
  if (state.sceneAssets.beach && state.sceneAssets.snow) return;
  const [beach, snow] = await Promise.all([loadSceneAsset('./assets/beach-scene.jpg'), loadSceneAsset('./assets/snow-scene.jpg')]);
  state.sceneAssets.beach = beach;
  state.sceneAssets.snow = snow;
  state.sceneReady = false;
}

function createSceneBuffer(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  if (state.scene === 'beach') {
    gradient.addColorStop(0, '#9ddcff');
    gradient.addColorStop(0.4, '#dff3ff');
    gradient.addColorStop(0.68, '#fbf6e1');
    gradient.addColorStop(1, '#f3dfb0');
  } else if (state.scene === 'snow') {
    gradient.addColorStop(0, '#d5e6f6');
    gradient.addColorStop(0.45, '#edf6fb');
    gradient.addColorStop(1, '#ffffff');
  } else {
    gradient.addColorStop(0, '#f7f8fa');
    gradient.addColorStop(1, '#f7f8fa');
  }
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  const image = state.sceneAssets[state.scene];
  if (image) {
    const scale = Math.max(width / image.width, height / image.height);
    const drawWidth = image.width * scale;
    const drawHeight = image.height * scale;
    const dx = (width - drawWidth) / 2;
    const dy = (height - drawHeight) / 2;
    ctx.globalAlpha = state.scene === 'plain' ? 0 : 0.96;
    ctx.drawImage(image, dx, dy, drawWidth, drawHeight);
    ctx.globalAlpha = state.scene === 'beach' ? 0.1 : 0.08;
    const overlay = ctx.createLinearGradient(0, 0, 0, height);
    overlay.addColorStop(0, 'rgba(255,255,255,1)');
    overlay.addColorStop(1, 'rgba(255,255,255,0.65)');
    ctx.fillStyle = overlay;
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = 1;
  }
  return canvas;
}

function getSceneBufferForEye(eye, width, height) {
  const currentEye = eyeState(eye);
  const cached = currentEye.refractionFrame;
  if (cached && cached.scene === state.scene && cached.width === width && cached.height === height && state.sceneReady) return cached.buffer;
  const buffer = createSceneBuffer(width, height);
  currentEye.refractionFrame = { scene: state.scene, width, height, buffer };
  state.sceneReady = true;
  return buffer;
}

function itemGeometry(item) {
  return svgForItem(item);
}

function itemMotionSnapshot(item, index, now) {
  const activeMotion = state.motionRunning ? state.motionIntensity : 0;
  const wobble = Math.sin(now / 1200 + item.driftSeed + index) * 7 * activeMotion;
  const lift = Math.cos(now / 1400 + item.driftSeed * 1.6) * 6 * activeMotion;
  return { wobble, lift, rotation: item.rotation + wobble * 0.3, scale: item.scale, opacity: Math.max(0.18, Math.min(0.95, 0.35 + item.contrast * 0.9)) };
}

function supportedRefractionType(type) {
  return ['ring', 'smudge', 'cloud'].includes(type);
}

function itemMarkup(item) {
  const svg = svgForItem(item);
  return svg.art;
}

function buildItemPath(ctx, item, geometry) {
  const type = item.type;
  if (type === 'ring') {
    ctx.beginPath();
    ctx.arc(150, 150, 78, 0, Math.PI * 2);
    ctx.arc(150, 150, 48, 0, Math.PI * 2, true);
    ctx.arc(150, 150, 24, 0, Math.PI * 2);
    return;
  }
  if (type === 'thread') {
    const sway = 35 + item.structure * 90;
    ctx.beginPath();
    ctx.moveTo(18, 90);
    ctx.bezierCurveTo(70, 90 - sway, 130, 90 + sway, 190, 92);
    ctx.bezierCurveTo(225, 98, 245, 95 - sway * 0.45, 262, 88);
    ctx.lineWidth = 14 + item.structure * 18;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    return;
  }
  if (type === 'cobweb') {
    ctx.beginPath();
    ctx.moveTo(24, 122);
    ctx.bezierCurveTo(58, 35, 110, 52, 144, 114);
    ctx.bezierCurveTo(184, 168, 232, 186, 279, 103);
    ctx.moveTo(72, 154);
    ctx.bezierCurveTo(99, 115, 122, 88, 165, 102);
    ctx.bezierCurveTo(196, 112, 210, 139, 240, 164);
    ctx.moveTo(55, 72);
    ctx.bezierCurveTo(102, 112, 132, 120, 193, 96);
    ctx.lineWidth = 12 + item.structure * 10;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    return;
  }
  if (type === 'cloud') {
    ctx.beginPath();
    [[88, 100, 50, 31], [136, 88, 64, 38], [188, 104, 60, 34], [144, 112, 94, 41]].forEach(([x, y, rx, ry]) => {
      ctx.moveTo(x + rx, y);
      ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    });
    return;
  }
  ctx.beginPath();
  ctx.ellipse(130, 90, 78, 42, 0, 0, Math.PI * 2);
  ctx.ellipse(160, 92, 44, 24, 0, 0, Math.PI * 2);
}

function strokeOnlyType(type) {
  return type === 'thread' || type === 'cobweb';
}

function drawRefractionPatch(ctx, sceneBuffer, item, geometry, snapshot, currentEye) {
  if (!supportedRefractionType(item.type) || state.refractionStrength <= 0.01) return;
  const baseX = currentEye.motionOffset.x + (item.x / 100) * sceneBuffer.width;
  const baseY = currentEye.motionOffset.y + (item.y / 100) * sceneBuffer.height;
  const x = baseX + snapshot.wobble;
  const y = baseY + snapshot.lift;
  const patchW = geometry.width * snapshot.scale;
  const patchH = geometry.height * snapshot.scale;
  const samplePad = Math.max(18, 14 + item.blur * 2 + state.refractionStrength * 32);
  const destX = x - patchW / 2 - samplePad;
  const destY = y - patchH / 2 - samplePad;
  const destW = patchW + samplePad * 2;
  const destH = patchH + samplePad * 2;
  const srcX = clamp(destX, 0, sceneBuffer.width);
  const srcY = clamp(destY, 0, sceneBuffer.height);
  const srcW = clamp(destW, 1, sceneBuffer.width - srcX);
  const srcH = clamp(destH, 1, sceneBuffer.height - srcY);
  if (srcW <= 1 || srcH <= 1) return;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(snapshot.rotation * Math.PI / 180);
  ctx.scale(snapshot.scale, snapshot.scale);
  ctx.translate(-geometry.width / 2, -geometry.height / 2);
  buildItemPath(ctx, item, geometry);
  ctx.clip('evenodd');

  const blurPx = (1.5 + item.blur * 0.28 + state.refractionStrength * 8 + item.structure * 2.5).toFixed(2);
  ctx.filter = `blur(${blurPx}px)`;
  ctx.globalAlpha = Math.min(0.92, 0.14 + state.refractionStrength * 0.72 + item.contrast * 0.08);
  const distortX = state.refractionStrength * (8 + item.structure * 10) + item.contrast * 3;
  const distortY = state.refractionStrength * (5 + item.structure * 6) + item.blur * 0.18;
  ctx.drawImage(sceneBuffer, srcX, srcY, srcW, srcH, -samplePad + distortX, -samplePad - distortY * 0.35, geometry.width + samplePad * 2, geometry.height + samplePad * 2);
  ctx.globalAlpha *= 0.55;
  ctx.drawImage(sceneBuffer, srcX, srcY, srcW, srcH, -samplePad - distortX * 0.45, -samplePad + distortY * 0.55, geometry.width + samplePad * 2, geometry.height + samplePad * 2);
  ctx.filter = 'none';

  const highlightAlpha = 0.04 + state.refractionStrength * 0.12 + item.structure * 0.03;
  ctx.globalCompositeOperation = 'screen';
  ctx.fillStyle = `rgba(255,255,255,${highlightAlpha.toFixed(3)})`;
  ctx.beginPath();
  ctx.ellipse(geometry.width * 0.38, geometry.height * 0.32, geometry.width * 0.24, geometry.height * 0.16, -0.35, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = 'multiply';
  ctx.fillStyle = `rgba(0,0,0,${(0.03 + state.refractionStrength * 0.09 + item.contrast * 0.03).toFixed(3)})`;
  ctx.beginPath();
  ctx.ellipse(geometry.width * 0.68, geometry.height * 0.68, geometry.width * 0.26, geometry.height * 0.18, 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function renderRefractionLayer(eye, now) {
  const currentEye = eyeState(eye);
  const canvas = currentEye.elements.refractionLayer;
  if (!canvas) return;
  const metrics = canvasMetrics(canvas);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(metrics.dpr, 0, 0, metrics.dpr, 0, 0);
  ctx.clearRect(0, 0, metrics.width, metrics.height);
  if (state.refractionStrength <= 0.01 || !currentEye.items.length) return;
  const sceneBuffer = getSceneBufferForEye(eye, metrics.width, metrics.height);
  currentEye.items.forEach((item, index) => drawRefractionPatch(ctx, sceneBuffer, item, itemGeometry(item), itemMotionSnapshot(item, index, now), currentEye));
}

function maskForItem(item) {
  if (item.type === 'dot') return Array.from({ length: 6 }, () => `<circle cx="${rand(40, 190)}" cy="${rand(40, 190)}" r="${rand(10, 30) * item.density}" fill="white" />`).join('');
  if (item.type === 'ring') return `<circle cx="150" cy="150" r="66" fill="none" stroke="white" stroke-width="24" stroke-linecap="round" /><circle cx="150" cy="150" r="20" fill="rgba(255,255,255,0.75)" />`;
  if (item.type === 'thread') { const sway = 35 + item.structure * 90; return `<path d="M18 90 C 70 ${90 - sway}, 130 ${90 + sway}, 190 92 S 245 ${95 - sway * 0.45}, 262 88" fill="none" stroke="white" stroke-width="${10 + item.structure * 11}" stroke-linecap="round"/>`; }
  if (item.type === 'cobweb') return `<path d="M24 122 C 58 35, 110 52, 144 114 S 232 186, 279 103" fill="none" stroke="white" stroke-width="${10 + item.structure * 8}" stroke-linecap="round"/><path d="M72 154 C 99 115, 122 88, 165 102 S 210 139, 240 164" fill="none" stroke="white" stroke-width="${7 + item.structure * 6}" stroke-linecap="round"/><path d="M55 72 C 102 112, 132 120, 193 96" fill="none" stroke="white" stroke-width="${6 + item.structure * 5}" stroke-linecap="round"/>`;
  if (item.type === 'cloud') return `<ellipse cx="88" cy="100" rx="50" ry="31" fill="white" /><ellipse cx="136" cy="88" rx="64" ry="38" fill="white" /><ellipse cx="188" cy="104" rx="60" ry="34" fill="white" /><ellipse cx="144" cy="112" rx="94" ry="41" fill="white" />`;
  return `<ellipse cx="130" cy="90" rx="78" ry="42" fill="white" /><ellipse cx="160" cy="92" rx="44" ry="24" fill="white" />`;
}
function svgForItem(item) {
  const opacity = (item.contrast * 0.6 + 0.12).toFixed(2); const strokeOpacity = Math.max(0.08, item.contrast * 0.45).toFixed(2); const strokeWidth = (1.2 + item.structure * 3.4).toFixed(2); const blur = item.blur; const defs = `<defs><filter id="b-${item.id}" x="-45%" y="-45%" width="190%" height="190%" filterUnits="objectBoundingBox"><feGaussianBlur stdDeviation="${blur}" /></filter></defs>`; const fill = `rgba(35, 35, 35, ${opacity})`; const stroke = `rgba(20, 20, 20, ${strokeOpacity})`;
  if (item.type === 'dot') return { width: 220, height: 220, viewBox: '0 0 220 220', art: `<svg class="floater-svg" width="220" height="220" viewBox="0 0 220 220">${defs}<g filter="url(#b-${item.id})">${Array.from({ length: 6 }, () => `<circle cx="${rand(40, 190)}" cy="${rand(40, 190)}" r="${rand(8, 28) * item.density}" fill="${fill}" />`).join('')}</g></svg>` };
  if (item.type === 'ring') return { width: 300, height: 300, viewBox: '0 0 300 300', art: `<svg class="floater-svg" width="300" height="300" viewBox="0 0 300 300">${defs}<g filter="url(#b-${item.id})"><circle cx="150" cy="150" r="64" fill="none" stroke="${stroke}" stroke-width="${8 + item.structure * 10}" /><circle cx="150" cy="150" r="24" fill="rgba(20,20,20,${Math.max(0.03, item.contrast * 0.14).toFixed(2)})" /></g></svg>` };
  if (item.type === 'thread') { const sway = 35 + item.structure * 90; return { width: 280, height: 180, viewBox: '0 0 280 180', art: `<svg class="floater-svg" width="280" height="180" viewBox="0 0 280 180">${defs}<g filter="url(#b-${item.id})"><path d="M18 90 C 70 ${90 - sway}, 130 ${90 + sway}, 190 92 S 245 ${95 - sway * 0.45}, 262 88" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round"/></g></svg>` }; }
  if (item.type === 'cobweb') return { width: 300, height: 230, viewBox: '0 0 300 230', art: `<svg class="floater-svg" width="300" height="230" viewBox="0 0 300 230">${defs}<g filter="url(#b-${item.id})"><path d="M24 122 C 58 35, 110 52, 144 114 S 232 186, 279 103" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}"/><path d="M72 154 C 99 115, 122 88, 165 102 S 210 139, 240 164" fill="none" stroke="${stroke}" stroke-width="${(strokeWidth * 0.8).toFixed(2)}"/><path d="M55 72 C 102 112, 132 120, 193 96" fill="none" stroke="${stroke}" stroke-width="${(strokeWidth * 0.65).toFixed(2)}"/></g></svg>` };
  if (item.type === 'cloud') return { width: 280, height: 190, viewBox: '0 0 280 190', art: `<svg class="floater-svg" width="280" height="190" viewBox="0 0 280 190">${defs}<g filter="url(#b-${item.id})"><ellipse cx="88" cy="100" rx="48" ry="28" fill="rgba(35,35,35,${Math.max(0.07, item.contrast * 0.18).toFixed(2)})" /><ellipse cx="136" cy="88" rx="62" ry="34" fill="rgba(35,35,35,${Math.max(0.08, item.contrast * 0.22).toFixed(2)})" /><ellipse cx="188" cy="104" rx="58" ry="31" fill="rgba(35,35,35,${Math.max(0.06, item.contrast * 0.18).toFixed(2)})" /><ellipse cx="144" cy="112" rx="92" ry="38" fill="rgba(35,35,35,${Math.max(0.04, item.contrast * 0.11).toFixed(2)})" /></g></svg>` };
  return { width: 260, height: 180, viewBox: '0 0 260 180', art: `<svg class="floater-svg" width="260" height="180" viewBox="0 0 260 180">${defs}<g filter="url(#b-${item.id})"><ellipse cx="130" cy="90" rx="76" ry="40" fill="rgba(35,35,35,${Math.max(0.08, item.contrast * 0.25).toFixed(2)})" /><ellipse cx="160" cy="92" rx="42" ry="22" fill="rgba(35,35,35,${Math.max(0.05, item.contrast * 0.14).toFixed(2)})" /></g></svg>` };
}

function buildDrawingPath(points) { if (!points.length) return ''; if (points.length === 1) return `M ${points[0].x} ${points[0].y}`; let d = `M ${points[0].x} ${points[0].y}`; for (let i = 1; i < points.length; i += 1) { const prev = points[i - 1]; const point = points[i]; d += ` Q ${prev.x} ${prev.y} ${(prev.x + point.x) / 2} ${(prev.y + point.y) / 2}`; } const last = points[points.length - 1]; return `${d} L ${last.x} ${last.y}`; }
function createDrawingFromPoint(point) { return { id: uid(), type: 'drawing', x: point.x, y: point.y, contrast: 0.55, blur: Math.max(2, state.brushSize * 0.6), structure: 0.45, scale: 1, rotation: 0, size: state.brushSize, alpha: state.brushAlpha, points: [{ x: 0, y: 0 }], bounds: { minX: 0, minY: 0, width: 1, height: 1 }, eye: state.activeEye }; }
function addPointToDrawing(drawing, point) { drawing.points.push({ x: point.x - drawing.x, y: point.y - drawing.y }); normalizeDrawing(drawing); }
function normalizeDrawing(drawing) { const xs = drawing.points.map((point) => point.x); const ys = drawing.points.map((point) => point.y); const minX = Math.min(...xs); const maxX = Math.max(...xs); const minY = Math.min(...ys); const maxY = Math.max(...ys); const centerX = (minX + maxX) / 2; const centerY = (minY + maxY) / 2; drawing.points = drawing.points.map((point) => ({ x: point.x - centerX, y: point.y - centerY })); drawing.x += centerX; drawing.y += centerY; drawing.bounds = { minX: minX - centerX, minY: minY - centerY, width: Math.max(1, maxX - minX), height: Math.max(1, maxY - minY) }; }
function drawingLabel() { return ({ en: 'Drawing', ru: 'Рисунок', es: 'Dibujo', pt: 'Desenho', zh: '绘图', ar: 'رسم' })[state.language] || 'Drawing'; }

function renderItems(eye = state.activeEye) { const currentEye = eyeState(eye); const floaterLayer = currentEye.elements.floaterLayer; floaterLayer.innerHTML = ''; currentEye.items.forEach((item) => { const el = document.createElement('div'); el.className = 'floater-item'; el.dataset.id = item.id; el.dataset.eye = eye; el.style.left = `${item.x}%`; el.style.top = `${item.y}%`; el.innerHTML = itemMarkup(item); el.classList.toggle('selected', currentEye.selection.type === 'item' && item.id === currentEye.selection.id); el.addEventListener('pointerdown', startDragItem); item.element = el; floaterLayer.appendChild(el); }); applyItemTransforms(eye, performance.now()); }
function renderDrawings(eye = state.activeEye) { const currentEye = eyeState(eye); const drawLayer = currentEye.elements.drawLayer; drawLayer.innerHTML = ''; currentEye.drawings.forEach((drawing) => { const group = document.createElementNS('http://www.w3.org/2000/svg', 'g'); group.setAttribute('class', `drawing-group${currentEye.selection.type === 'drawing' && currentEye.selection.id === drawing.id ? ' selected' : ''}`); group.dataset.id = drawing.id; group.dataset.eye = eye; group.setAttribute('transform', `translate(${drawing.x} ${drawing.y}) rotate(${drawing.rotation}) scale(${drawing.scale})`); const hit = document.createElementNS('http://www.w3.org/2000/svg', 'path'); hit.setAttribute('d', buildDrawingPath(drawing.points)); hit.setAttribute('fill', 'none'); hit.setAttribute('stroke', 'transparent'); hit.setAttribute('stroke-width', `${Math.max(18, drawing.size * 4)}`); hit.setAttribute('stroke-linecap', 'round'); hit.setAttribute('stroke-linejoin', 'round'); hit.setAttribute('class', 'drawing-hit'); hit.dataset.id = drawing.id; hit.dataset.eye = eye; hit.addEventListener('pointerdown', startDragDrawing); const visible = document.createElementNS('http://www.w3.org/2000/svg', 'path'); visible.setAttribute('d', buildDrawingPath(drawing.points)); visible.setAttribute('fill', 'none'); visible.setAttribute('stroke-linecap', 'round'); visible.setAttribute('stroke-linejoin', 'round'); visible.setAttribute('stroke-width', `${drawing.size * (0.75 + drawing.structure * 0.9)}`); visible.setAttribute('stroke', `rgba(35,35,35,${Math.max(0.08, drawing.alpha * (0.45 + drawing.contrast * 0.85))})`); visible.style.filter = `blur(${drawing.blur}px)`; visible.style.pointerEvents = 'none'; if (currentEye.selection.type === 'drawing' && currentEye.selection.id === drawing.id) { const outline = document.createElementNS('http://www.w3.org/2000/svg', 'rect'); const padding = Math.max(12, drawing.size * 2.5); outline.setAttribute('x', `${drawing.bounds.minX - padding}`); outline.setAttribute('y', `${drawing.bounds.minY - padding}`); outline.setAttribute('width', `${drawing.bounds.width + padding * 2}`); outline.setAttribute('height', `${drawing.bounds.height + padding * 2}`); outline.setAttribute('rx', '18'); outline.setAttribute('fill', 'none'); outline.setAttribute('stroke', 'rgba(17, 24, 39, 0.45)'); outline.setAttribute('stroke-width', '2'); outline.setAttribute('stroke-dasharray', '6 6'); outline.style.pointerEvents = 'none'; group.appendChild(outline); } group.appendChild(hit); group.appendChild(visible); drawLayer.appendChild(group); }); }

function updateEyeUi() { controls.activeEyeButtons.forEach((button) => button.classList.toggle('active', button.dataset.eyeTarget === state.activeEye)); controls.previewEyeButtons.forEach((button) => button.classList.toggle('active', button.dataset.previewEyes === state.previewMode)); EYES.forEach((eye) => { const isVisible = state.previewMode === 'both' || state.activeEye === eye; state.eyes[eye].elements.motionLayer?.classList.toggle('hidden-eye', !isVisible); state.eyes[eye].elements.motionLayer?.classList.toggle('active-eye-layer', state.activeEye === eye); }); }
function updateSelectionUi() { const item = selectedItem(); const drawing = selectedDrawing(); const selected = item || drawing; const disabled = !selected; [controls.itemContrast, controls.itemBlur, controls.itemStructure, controls.itemScale, controls.itemRotation, controls.duplicateSelected, controls.deleteSelected].forEach((control) => { control.disabled = disabled; }); if (!selected) { controls.selectionStatus.textContent = t('selectionNone'); return; } const eyeLabel = t(eyeKeyLabel(state.activeEye)); controls.selectionStatus.textContent = `${t('selectionActive')}: ${eyeLabel} · ${item ? t(`preset${item.type.charAt(0).toUpperCase()}${item.type.slice(1)}`) : drawingLabel()}`; controls.itemContrast.value = selected.contrast; controls.itemBlur.value = selected.blur; controls.itemStructure.value = selected.structure; controls.itemScale.value = selected.scale; controls.itemRotation.value = selected.rotation; }
function refreshSelectionStyles() { EYES.forEach((eye) => { eyeState(eye).items.forEach((item) => item.element?.classList.toggle('selected', eyeState(eye).selection.type === 'item' && item.id === eyeState(eye).selection.id)); renderDrawings(eye); }); }
function selectObject(type, id, eye = state.activeEye) { state.activeEye = eye; eyeState(eye).selection = { type, id }; updateEyeUi(); refreshSelectionStyles(); updateSelectionUi(); }
function clearSelection(eye = state.activeEye) { eyeState(eye).selection = { type: null, id: null }; refreshSelectionStyles(); updateSelectionUi(); }
function switchActiveEye(eye) { state.activeEye = eye; updateEyeUi(); updateSelectionUi(); refreshSelectionStyles(); }
function addPreset(type) { const currentEye = eyeState(); const item = makeItem(type); currentEye.items.push(item); renderItems(state.activeEye); selectObject('item', item.id, state.activeEye); }
function copySelected() { const item = selectedItem(); if (item) { const { type, rotation, scale, density, contrast, blur, structure } = item; state.clipboard = { objectType: 'item', type, rotation, scale, density, contrast, blur, structure }; return; } const drawing = selectedDrawing(); if (!drawing) return; state.clipboard = { objectType: 'drawing', rotation: drawing.rotation, scale: drawing.scale, contrast: drawing.contrast, blur: drawing.blur, structure: drawing.structure, size: drawing.size, alpha: drawing.alpha, points: drawing.points.map((point) => ({ ...point })) }; }
function pasteSelected() { const currentEye = eyeState(); if (!state.clipboard) return; if (state.clipboard.objectType === 'drawing') { const rect = stageRect(); const drawing = { id: uid(), type: 'drawing', x: rect.width * 0.54 + rand(-24, 24), y: rect.height * 0.54 + rand(-24, 24), rotation: state.clipboard.rotation, scale: state.clipboard.scale, contrast: state.clipboard.contrast, blur: state.clipboard.blur, structure: state.clipboard.structure, size: state.clipboard.size, alpha: state.clipboard.alpha, points: state.clipboard.points.map((point) => ({ ...point })), bounds: { minX: 0, minY: 0, width: 1, height: 1 }, eye: state.activeEye }; normalizeDrawing(drawing); currentEye.drawings.push(drawing); renderDrawings(state.activeEye); selectObject('drawing', drawing.id, state.activeEye); return; } const item = makeItem(state.clipboard.type, 54, 54, { ...state.clipboard, eye: state.activeEye }); item.x += rand(-6, 6); item.y += rand(-6, 6); currentEye.items.push(item); renderItems(state.activeEye); selectObject('item', item.id, state.activeEye); }
function deleteSelected() { const currentEye = eyeState(); if (currentEye.selection.type === 'item') { currentEye.items = currentEye.items.filter((item) => item.id !== currentEye.selection.id); renderItems(state.activeEye); } else if (currentEye.selection.type === 'drawing') { currentEye.drawings = currentEye.drawings.filter((drawing) => drawing.id !== currentEye.selection.id); renderDrawings(state.activeEye); } else return; currentEye.selection = { type: null, id: null }; updateSelectionUi(); }

function startDragItem(event) { if (state.drawingEnabled) return; const eye = event.currentTarget.dataset.eye; const currentEye = eyeState(eye); const item = currentEye.items.find((entry) => entry.id === event.currentTarget.dataset.id); if (!item) return; selectObject('item', item.id, eye); const rect = stageRect(); const currentX = rect.width * (item.x / 100); const currentY = rect.height * (item.y / 100); state.dragging = { eye, type: 'item', id: item.id, pointerId: event.pointerId, dx: event.clientX - rect.left - currentX, dy: event.clientY - rect.top - currentY }; event.currentTarget.classList.add('dragging'); event.currentTarget.setPointerCapture?.(event.pointerId); event.stopPropagation(); }
function startDragDrawing(event) { if (state.drawingEnabled) return; const eye = event.currentTarget.dataset.eye; const currentEye = eyeState(eye); const drawing = currentEye.drawings.find((entry) => entry.id === event.currentTarget.dataset.id); if (!drawing) return; selectObject('drawing', drawing.id, eye); const point = pointerToStage(event, eye); state.dragging = { eye, type: 'drawing', id: drawing.id, pointerId: event.pointerId, dx: point.x - drawing.x, dy: point.y - drawing.y }; event.stopPropagation(); }
function moveDragItem(event) { if (!state.dragging.id) return; const currentEye = eyeState(state.dragging.eye); if (state.dragging.type === 'item') { const item = currentEye.items.find((entry) => entry.id === state.dragging.id); if (!item) return; const rect = stageRect(); const xPx = Math.max(0, Math.min(rect.width, event.clientX - rect.left - state.dragging.dx)); const yPx = Math.max(0, Math.min(rect.height, event.clientY - rect.top - state.dragging.dy)); item.x = (xPx / rect.width) * 100; item.y = (yPx / rect.height) * 100; if (item.element) { item.element.style.left = `${item.x}%`; item.element.style.top = `${item.y}%`; } return; } const drawing = currentEye.drawings.find((entry) => entry.id === state.dragging.id); if (!drawing) return; const point = pointerToStage(event, state.dragging.eye); const rect = stageRect(); drawing.x = Math.max(0, Math.min(rect.width, point.x - state.dragging.dx)); drawing.y = Math.max(0, Math.min(rect.height, point.y - state.dragging.dy)); renderDrawings(state.dragging.eye); }
function stopDragItem() { if (!state.dragging.id) return; if (state.dragging.type === 'item') eyeState(state.dragging.eye).items.find((entry) => entry.id === state.dragging.id)?.element?.classList.remove('dragging'); state.dragging = { eye: null, type: null, id: null, pointerId: null, dx: 0, dy: 0 }; }

function resetScene() { EYES.forEach((eye) => { state.eyes[eye].items = []; state.eyes[eye].drawings = []; state.eyes[eye].selection = { type: null, id: null }; state.eyes[eye].randomTarget = { x: 0, y: 0 }; state.eyes[eye].motionOffset = { x: 0, y: 0 }; state.eyes[eye].motionTarget = { x: 0, y: 0 }; state.eyes[eye].eyeTarget = { x: 0, y: 0 }; state.eyes[eye].elements.motionLayer.style.transform = 'translate(0px, 0px)'; renderItems(eye); renderDrawings(eye); }); updateSelectionUi(); }
function loadDemoScene() { state.eyes.left.items = [makeItem('ring', 32, 40, { eye: 'left' }), makeItem('thread', 54, 56, { eye: 'left' }), makeItem('dot', 43, 65, { eye: 'left' })]; state.eyes.right.items = [makeItem('cobweb', 64, 39, { eye: 'right' }), makeItem('cloud', 33, 61, { eye: 'right' }), makeItem('smudge', 57, 35, { eye: 'right' })]; state.eyes.left.drawings = []; state.eyes.right.drawings = []; EYES.forEach((eye) => renderItems(eye)); selectObject('item', state.eyes.left.items[0]?.id || null, 'left'); }
function pickRandomTarget() { const rect = stageRect(); const maxOffset = Math.min(220, Math.min(rect.width, rect.height) * 0.16) * state.motionIntensity; const sharedTarget = { x: rand(-maxOffset, maxOffset), y: rand(-maxOffset, maxOffset) }; EYES.forEach((eye, index) => { const currentEye = eyeState(eye); const offsetScale = 0.12 + index * 0.02; currentEye.randomTarget.x = Math.max(-maxOffset, Math.min(maxOffset, sharedTarget.x + rand(-maxOffset * offsetScale, maxOffset * offsetScale))); currentEye.randomTarget.y = Math.max(-maxOffset, Math.min(maxOffset, sharedTarget.y + rand(-maxOffset * offsetScale, maxOffset * offsetScale))); }); }
function applyItemTransforms(eye, now) {
  eyeState(eye).items.forEach((item, index) => {
    if (!item.element) return;
    const snapshot = itemMotionSnapshot(item, index, now);
    item.element.style.transform = `translate(-50%, -50%) rotate(${snapshot.rotation}deg) scale(${snapshot.scale}) translate(${snapshot.wobble}px, ${snapshot.lift}px)`;
    item.element.style.opacity = `${snapshot.opacity}`;
  });
}
function animate(now) {
  EYES.forEach((eye) => {
    const currentEye = eyeState(eye);
    if (state.motionRunning) {
      if (state.motionMode === 'random') {
        currentEye.motionTarget.x += (currentEye.randomTarget.x - currentEye.motionTarget.x) * 0.05;
        currentEye.motionTarget.y += (currentEye.randomTarget.y - currentEye.motionTarget.y) * 0.05;
      } else {
        currentEye.motionTarget.x += (currentEye.eyeTarget.x - currentEye.motionTarget.x) * 0.14;
        currentEye.motionTarget.y += (currentEye.eyeTarget.y - currentEye.motionTarget.y) * 0.14;
      }
    } else {
      currentEye.motionTarget.x += (0 - currentEye.motionTarget.x) * 0.15;
      currentEye.motionTarget.y += (0 - currentEye.motionTarget.y) * 0.15;
    }
    currentEye.motionOffset.x += (currentEye.motionTarget.x - currentEye.motionOffset.x) * 0.18;
    currentEye.motionOffset.y += (currentEye.motionTarget.y - currentEye.motionOffset.y) * 0.18;
    currentEye.elements.motionLayer.style.transform = `translate(${currentEye.motionOffset.x}px, ${currentEye.motionOffset.y}px)`;
    applyItemTransforms(eye, now);
    renderRefractionLayer(eye, now);
  });
  requestAnimationFrame(animate);
}
setInterval(() => { if (state.motionMode === 'random' && state.motionRunning) pickRandomTarget(); }, 2800);

function pointerToStage(event, eye = state.activeEye) { const drawLayer = eyeState(eye).elements.drawLayer; const point = drawLayer.createSVGPoint(); point.x = event.clientX; point.y = event.clientY; const ctm = drawLayer.getScreenCTM(); if (!ctm) { const rect = stageRect(); return { x: event.clientX - rect.left, y: event.clientY - rect.top }; } const local = point.matrixTransform(ctm.inverse()); return { x: local.x, y: local.y }; }
function stageEyeFromEvent(event) { return event.target.closest('[data-eye]')?.dataset.eye || state.activeEye; }
function startDrawing(event) { const clickedInteractive = event.target.closest('.floater-item, .drawing-hit'); const eye = stageEyeFromEvent(event); if (!state.drawingEnabled) { if (!clickedInteractive) { switchActiveEye(eye); clearSelection(eye); } return; } if (clickedInteractive) return; switchActiveEye(eye); const point = pointerToStage(event, eye); state.lastPointer = point; const drawing = createDrawingFromPoint(point); eyeState(eye).drawings.push(drawing); state.drawingPath = drawing; renderDrawings(eye); selectObject('drawing', drawing.id, eye); }
function moveDrawing(event) { if (!state.drawingEnabled || !state.drawingPath) return; const point = pointerToStage(event, state.drawingPath.eye); const last = state.lastPointer; if (!last) return; if (Math.hypot(point.x - last.x, point.y - last.y) < 1.5) return; addPointToDrawing(state.drawingPath, point); state.lastPointer = point; renderDrawings(state.drawingPath.eye); }
function stopDrawing() { if (state.drawingPath?.points.length === 1) { state.drawingPath.points.push({ x: 0.5, y: 0.5 }); normalizeDrawing(state.drawingPath); renderDrawings(state.drawingPath.eye); } state.drawingPath = null; state.lastPointer = null; }

async function disableCamera() {
  if (state.eye.camera?.stop) {
    try { state.eye.camera.stop(); } catch (error) { console.error(error); }
  }
  if (state.eye.stream) {
    state.eye.stream.getTracks().forEach((track) => track.stop());
  }
  cameraFeed.srcObject = null;
  delete controls.cameraStatus.dataset.errorKey;
  state.eye.active = false;
  state.eye.baseEyeLidDistance = null;
  state.eye.faceMesh = null;
  state.eye.camera = null;
  state.eye.stream = null;
  EYES.forEach((eye) => { state.eyes[eye].eyeTarget = { x: 0, y: 0 }; });
  updateCameraStatus();
}

async function enableCamera() {
  if (!window.location.protocol.startsWith('https') && !window.location.hostname.includes('localhost')) { controls.cameraStatus.dataset.errorKey = 'cameraNeedsHttps'; updateCameraStatus(); return false; }
  if (state.eye.active) { delete controls.cameraStatus.dataset.errorKey; updateCameraStatus(); return true; }
  const faceMesh = new FaceMesh({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}` });
  faceMesh.setOptions({ maxNumFaces: 1, refineLandmarks: true, minDetectionConfidence: 0.45, minTrackingConfidence: 0.45 });
  faceMesh.onResults(onFaceResults);
  const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: 480, height: 360 }, audio: false }).catch((error) => { console.error(error); return null; });
  if (!stream) { controls.cameraStatus.dataset.errorKey = 'cameraPermissionFailed'; updateCameraStatus(); return false; }
  cameraFeed.srcObject = stream; await cameraFeed.play().catch(() => {});
  const camera = new Camera(cameraFeed, { onFrame: async () => { await faceMesh.send({ image: cameraFeed }); }, width: 480, height: 360 });
  try { await camera.start(); state.eye.faceMesh = faceMesh; state.eye.camera = camera; state.eye.stream = stream; state.eye.active = true; state.eye.baseEyeLidDistance = null; delete controls.cameraStatus.dataset.errorKey; updateCameraStatus(); return true; } catch (error) { console.error(error); stream.getTracks().forEach((track) => track.stop()); cameraFeed.srcObject = null; controls.cameraStatus.dataset.errorKey = 'cameraPermissionFailed'; updateCameraStatus(); return false; }
}

async function syncMotionModeSideEffects() {
  if (state.motionMode === 'eye') {
    const enabled = await enableCamera();
    if (!enabled) {
      state.motionRunning = false;
    }
  } else {
    await disableCamera();
  }
  updateMotionButton();
  updateCameraStatus();
}

function onFaceResults(results) {
  if (state.motionMode !== 'eye' || !state.motionRunning) return;
  const rect = stageRect(); if (!results.multiFaceLandmarks?.length) return; const landmarks = results.multiFaceLandmarks[0]; const leftUpperEyelid = landmarks[159]; const leftLowerEyelid = landmarks[145]; const rightUpperEyelid = landmarks[386]; const rightLowerEyelid = landmarks[374]; const leftIris = landmarks[468]; const rightIris = landmarks[473]; const leftEyeLidDistance = leftLowerEyelid.y - leftUpperEyelid.y; const rightEyeLidDistance = rightLowerEyelid.y - rightUpperEyelid.y; const currentEyeLidDistance = (leftEyeLidDistance + rightEyeLidDistance) / 2; if (state.eye.baseEyeLidDistance === null) state.eye.baseEyeLidDistance = currentEyeLidDistance; const eyeLidDelta = currentEyeLidDistance - state.eye.baseEyeLidDistance; const leftEyeWidth = Math.max(0.0001, landmarks[133].x - landmarks[33].x); const rightEyeWidth = Math.max(0.0001, landmarks[263].x - landmarks[362].x); const leftIrisOffsetX = (leftIris.x - landmarks[33].x) / leftEyeWidth - 0.5; const rightIrisOffsetX = (rightIris.x - landmarks[362].x) / rightEyeWidth - 0.5; const sharedIrisOffsetX = (leftIrisOffsetX + rightIrisOffsetX) / 2; const leftEyeDifference = leftIrisOffsetX - sharedIrisOffsetX; const rightEyeDifference = rightIrisOffsetX - sharedIrisOffsetX; const maxX = rect.width * 0.18 * state.motionIntensity; const maxY = rect.height * 0.16 * state.motionIntensity; const sharedTargetX = -sharedIrisOffsetX * rect.width * 1.15 * state.motionIntensity; const leftNaturalOffsetX = -leftEyeDifference * rect.width * 0.2 * state.motionIntensity; const rightNaturalOffsetX = -rightEyeDifference * rect.width * 0.2 * state.motionIntensity; const sharedTargetY = eyeLidDelta * rect.height * 120 * state.motionIntensity; state.eyes.left.eyeTarget.x = Math.max(-maxX, Math.min(maxX, sharedTargetX + leftNaturalOffsetX)); state.eyes.right.eyeTarget.x = Math.max(-maxX, Math.min(maxX, sharedTargetX + rightNaturalOffsetX)); state.eyes.left.eyeTarget.y = Math.max(-maxY, Math.min(maxY, sharedTargetY)); state.eyes.right.eyeTarget.y = Math.max(-maxY, Math.min(maxY, sharedTargetY)); }

function rerenderSelectedItem() { const item = selectedItem(); if (!item?.element) return; item.element.innerHTML = itemMarkup(item); applyItemTransforms(state.activeEye, performance.now()); }
function rerenderAllItems() { EYES.forEach((eye) => renderItems(eye)); refreshSelectionStyles(); }
function updateSelectedObject(prop, value) { const item = selectedItem(); if (item) { item[prop] = value; rerenderSelectedItem(); updateSelectionUi(); return; } const drawing = selectedDrawing(); if (!drawing) return; drawing[prop] = value; renderDrawings(state.activeEye); updateSelectionUi(); }
function closeInfoPopover() { controls.eyeTrackingInfoPopover.hidden = true; controls.eyeTrackingInfoButton.setAttribute('aria-expanded', 'false'); }
function toggleInfoPopover() { const willOpen = controls.eyeTrackingInfoPopover.hidden; controls.eyeTrackingInfoPopover.hidden = !willOpen; controls.eyeTrackingInfoButton.setAttribute('aria-expanded', String(willOpen)); }

presetButtons.forEach((button) => button.addEventListener('click', () => addPreset(button.dataset.preset)));
sceneButtons.forEach((button) => button.addEventListener('click', () => { state.scene = button.dataset.scene; applyScene(); }));
motionInputs.forEach((input) => input.addEventListener('change', async () => {
  if (!input.checked) return;
  state.motionMode = input.value;
  if (state.motionMode === 'eye') state.motionRunning = true;
  await syncMotionModeSideEffects();
}));

controls.motionIntensity.addEventListener('input', (e) => { state.motionIntensity = Number(e.target.value); pickRandomTarget(); });
controls.itemContrast.addEventListener('input', (e) => updateSelectedObject('contrast', Number(e.target.value)));
controls.itemBlur.addEventListener('input', (e) => updateSelectedObject('blur', Number(e.target.value)));
controls.itemStructure.addEventListener('input', (e) => updateSelectedObject('structure', Number(e.target.value)));
controls.itemScale.addEventListener('input', (e) => updateSelectedObject('scale', Number(e.target.value)));
controls.itemRotation.addEventListener('input', (e) => updateSelectedObject('rotation', Number(e.target.value)));
controls.brushSize.addEventListener('input', (e) => { state.brushSize = Number(e.target.value); });
controls.brushAlpha.addEventListener('input', (e) => { state.brushAlpha = Number(e.target.value); });
controls.refractionStrength?.addEventListener('input', (e) => { state.refractionStrength = Number(e.target.value); updateRefractionUi(); rerenderAllItems(); });
controls.drawToggle.addEventListener('click', () => { state.drawingEnabled = !state.drawingEnabled; controls.drawToggle.classList.toggle('active', state.drawingEnabled); controls.drawToggle.textContent = state.drawingEnabled ? t('drawingEnabled') : t('enableDrawing'); stage.style.cursor = state.drawingEnabled ? 'crosshair' : 'default'; });
controls.clearDrawings.addEventListener('click', () => { eyeState().drawings = []; if (activeSelection().type === 'drawing') eyeState().selection = { type: null, id: null }; renderDrawings(state.activeEye); updateSelectionUi(); });
controls.resetScene.addEventListener('click', resetScene);
controls.demoScene.addEventListener('click', loadDemoScene);
controls.toggleMotion.addEventListener('click', async () => {
  state.motionRunning = !state.motionRunning;
  if (state.motionRunning) {
    if (state.motionMode === 'eye') {
      const enabled = await enableCamera();
      if (!enabled) state.motionRunning = false;
    } else {
      await disableCamera();
      pickRandomTarget();
    }
  } else if (state.motionMode === 'eye') {
    await disableCamera();
  }
  updateMotionButton();
  updateCameraStatus();
});
controls.duplicateSelected.addEventListener('click', () => { copySelected(); pasteSelected(); });
controls.deleteSelected.addEventListener('click', deleteSelected);
controls.languageSelect.addEventListener('change', (event) => { state.language = event.target.value; applyTranslations(); });
controls.previewMode.addEventListener('click', () => { state.focusPreview = !state.focusPreview; document.body.classList.toggle('preview-only', state.focusPreview); controls.previewMode.textContent = state.focusPreview ? t('exitFocusMode') : t('focusMode'); });
controls.fullscreenMode.addEventListener('click', async () => { try { if (!document.fullscreenElement) await stage.requestFullscreen(); else await document.exitFullscreen(); } catch (error) { console.error(error); } });
controls.activeEyeButtons.forEach((button) => button.addEventListener('click', () => switchActiveEye(button.dataset.eyeTarget)));
controls.previewEyeButtons.forEach((button) => button.addEventListener('click', () => { state.previewMode = button.dataset.previewEyes; updateEyeUi(); }));
controls.eyeTrackingInfoButton.addEventListener('click', (event) => { event.stopPropagation(); toggleInfoPopover(); });
controls.eyeTrackingInfoButton.addEventListener('mouseenter', () => { controls.eyeTrackingInfoPopover.hidden = false; controls.eyeTrackingInfoButton.setAttribute('aria-expanded', 'true'); });
controls.eyeTrackingInfoButton.addEventListener('mouseleave', () => { if (!controls.eyeTrackingInfoPopover.matches(':hover')) closeInfoPopover(); });
controls.eyeTrackingInfoPopover.addEventListener('mouseleave', closeInfoPopover);
document.addEventListener('click', (event) => { if (!event.target.closest('.eye-tracking-label') && !event.target.closest('.info-popover')) closeInfoPopover(); });

document.addEventListener('fullscreenchange', () => setTimeout(setViewBox, 50));
stage.addEventListener('pointerdown', startDrawing);
stage.addEventListener('pointermove', (event) => { moveDragItem(event); moveDrawing(event); });
window.addEventListener('pointerup', () => { stopDrawing(); stopDragItem(); });
window.addEventListener('resize', setViewBox);
window.addEventListener('keydown', (event) => { const isMac = navigator.platform.toUpperCase().includes('MAC'); const mod = isMac ? event.metaKey : event.ctrlKey; if (mod && event.key.toLowerCase() === 'c') copySelected(); if (mod && event.key.toLowerCase() === 'v') { pasteSelected(); event.preventDefault(); } if ((event.key === 'Delete' || event.key === 'Backspace') && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) deleteSelected(); if (event.key === 'Escape') closeInfoPopover(); });

ensureStageLayers(); populateLanguageSelect(); setViewBox(); pickRandomTarget(); updateRefractionUi(); EYES.forEach((eye) => { renderItems(eye); renderDrawings(eye); }); applyScene(); applyTranslations(); updateEyeUi(); updateMotionButton(); ensureSceneAssets().then(() => { state.sceneReady = false; }); requestAnimationFrame(animate);
