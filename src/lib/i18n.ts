// Supported languages
export type Language = 'en' | 'fr' | 'es' | 'pt' | 'zh' | 'it' | 'de';

export const LANGUAGES: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

// Translation keys
export interface Translations {
  // Header
  home: string;
  about: string;
  howItWorks: string;
  
  // Hero
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  heroConnect: string;
  
  // Dashboard
  yourWallet: string;
  nfts: string;
  tokens: string;
  bulkBurn: string;
  selectAll: string;
  selectScams: string;
  cancel: string;
  total: string;
  legit: string;
  dubious: string;
  scam: string;
  hidden: string;
  analyzing: string;
  
  // Actions
  keep: string;
  hide: string;
  show: string;
  burn: string;
  unhideAll: string;
  clear: string;
  selected: string;
  
  // Token Card
  balance: string;
  verifiedToken: string;
  unknownToken: string;
  scamToken: string;
  
  // NFT Card
  unnamed: string;
  unknownPackage: string;
  confidence: string;
  
  // Status
  verified: string;
  unknown: string;
  
  // Classification reasons
  verifiedTokenReason: string;
  knownScamToken: string;
  fakeToken: string;
  suspiciousName: string;
  dustAmount: string;
  unknownVerify: string;
  approvedPackage: string;
  blockedPackage: string;
  scamKeywords: string;
  mlDetectedScam: string;
  mlDetectedLegit: string;
  defaultDubious: string;
  
  // Errors
  errorLoading: string;
  retry: string;
  
  // Empty states
  noHiddenNfts: string;
  noHiddenTokens: string;
  noNftsFound: string;
  noTokensFound: string;
  hiddenItemsAppear: string;
  tryDifferentFilter: string;
  
  // Stats
  globalStats: string;
  walletsProtected: string;
  nftStats: string;
  tokenStats: string;
  scanned: string;
  scamsDetected: string;
  burned: string;
  
  // Confirmations
  confirmBurn: string;
  confirmBulkBurn: string;
  burnFailed: string;
  
  // Footer
  builtBy: string;
  
  // About page
  aboutTitle: string;
  ourStory: string;
  ourStoryText1: string;
  ourStoryText2: string;
  theProblem: string;
  theProblemText: string;
  theSolution: string;
  theSolutionText: string;
  curatedLists: string;
  curatedListsDesc: string;
  aiDetection: string;
  aiDetectionDesc: string;
  keywordAnalysis: string;
  keywordAnalysisDesc: string;
  ourMission: string;
  ourMissionText: string;
  
  // How it works page
  howItWorksTitle: string;
  step01: string;
  step01Title: string;
  step01Desc: string;
  step02: string;
  step02Title: string;
  step02Desc: string;
  step03: string;
  step03Title: string;
  step03Desc: string;
  step04: string;
  step04Title: string;
  step04Desc: string;
  aboutHide: string;
  aboutHideText: string;
  proTips: string;
  tip1: string;
  tip2: string;
  tip3: string;
}

// English translations
const en: Translations = {
  // Header
  home: 'Home',
  about: 'About',
  howItWorks: 'How It Works',
  
  // Hero
  heroTitle1: 'Keep Your Sui Wallet ',
  heroTitle2: 'Clean & Safe',
  heroSubtitle: 'Scan your wallet for spam NFTs, scam tokens, and suspicious airdrops. Take control of what stays in your wallet.',
  heroConnect: 'Tap "Connect Wallet" to get started',
  
  // Dashboard
  yourWallet: 'Your Wallet',
  nfts: 'NFTs',
  tokens: 'Tokens',
  bulkBurn: 'Bulk Burn',
  selectAll: 'Select All',
  selectScams: 'Select Scams',
  cancel: 'Cancel',
  total: 'Total',
  legit: 'Legit',
  dubious: 'Dubious',
  scam: 'Scam',
  hidden: 'Hidden',
  analyzing: 'Analyzing',
  
  // Actions
  keep: 'Keep',
  hide: 'Hide',
  show: 'Show',
  burn: 'Burn',
  unhideAll: 'Unhide All',
  clear: 'Clear',
  selected: 'selected',
  
  // Token Card
  balance: 'Balance',
  verifiedToken: 'Verified',
  unknownToken: 'Unknown',
  scamToken: 'Scam',
  
  // NFT Card
  unnamed: 'Unnamed',
  unknownPackage: 'Unknown Package',
  confidence: 'Confidence',
  
  // Status
  verified: 'Verified',
  unknown: 'Unknown',
  
  // Classification reasons
  verifiedTokenReason: 'Verified token',
  knownScamToken: 'Known scam token',
  fakeToken: 'Fake token',
  suspiciousName: 'Suspicious token name',
  dustAmount: 'Dust amount (possible scam airdrop)',
  unknownVerify: 'Unknown token - verify before interacting',
  approvedPackage: 'Approved package',
  blockedPackage: 'Known scam package',
  scamKeywords: 'Contains scam keywords',
  mlDetectedScam: 'ML detected as scam',
  mlDetectedLegit: 'ML detected as legitimate',
  defaultDubious: 'Unknown - verify before interacting',
  
  // Errors
  errorLoading: 'Error loading',
  retry: 'Retry',
  
  // Empty states
  noHiddenNfts: 'No hidden NFTs',
  noHiddenTokens: 'No hidden tokens',
  noNftsFound: 'No NFTs found',
  noTokensFound: 'No tokens found',
  hiddenItemsAppear: 'Items you hide will appear here',
  tryDifferentFilter: 'Try a different filter',
  
  // Stats
  globalStats: 'Global Stats',
  walletsProtected: 'Wallets Protected',
  nftStats: 'NFT Statistics',
  tokenStats: 'Token Statistics',
  scanned: 'Scanned',
  scamsDetected: 'Scams',
  burned: 'Burned',
  
  // Confirmations
  confirmBurn: 'Burn this item permanently? This cannot be undone.',
  confirmBulkBurn: 'Burn {count} item(s) permanently?',
  burnFailed: 'Failed to burn',
  
  // Footer
  builtBy: 'Built with 💙 by the Sui Community',
  
  // About page
  aboutTitle: 'About SUI Sweep',
  ourStory: '🌟 Our Story',
  ourStoryText1: 'SUI Sweep was born from a simple observation in the Sui community: wallets were becoming cluttered with unwanted NFTs, spam airdrops, and potential scams.',
  ourStoryText2: "We're Sui enthusiasts just like you, who believe that everyone deserves a clean, safe wallet experience. This tool is built by the community, for the community.",
  theProblem: '💡 The Problem',
  theProblemText: 'Every day, Sui users receive unsolicited NFT airdrops. While some are legitimate marketing, many are scams designed to phish users or trick them into malicious transactions.',
  theSolution: '🛡️ Our Solution',
  theSolutionText: 'SUI Sweep combines multiple layers of protection:',
  curatedLists: 'Curated Lists',
  curatedListsDesc: 'Known legitimate and malicious packages',
  aiDetection: 'AI Detection',
  aiDetectionDesc: 'Machine learning analyzes NFT images',
  keywordAnalysis: 'Keyword Analysis',
  keywordAnalysisDesc: 'Flags suspicious terms',
  ourMission: '🎯 Our Mission',
  ourMissionText: 'To make the Sui ecosystem safer, one wallet at a time. Security should be accessible to everyone, not just experts.',
  
  // How it works page
  howItWorksTitle: 'How It Works',
  step01: 'STEP 01',
  step01Title: 'Connect Wallet',
  step01Desc: 'Tap the Connect button. We support all major Sui wallets.',
  step02: 'STEP 02',
  step02Title: 'Auto Scan',
  step02Desc: 'We instantly scan all NFTs and tokens in your wallet.',
  step03: 'STEP 03',
  step03Title: 'Review',
  step03Desc: 'Each item is classified as Legit, Dubious, or Scam.',
  step04: 'STEP 04',
  step04Title: 'Take Action',
  step04Desc: "Keep, Hide, or Burn each item. You're in control.",
  aboutHide: '👁️ About Hide',
  aboutHideText: 'Hidden items stay in your wallet—we just hide them from view. Use "Unhide All" to restore them anytime.',
  proTips: '💡 Tips',
  tip1: 'Use Bulk Burn for multiple scams',
  tip2: 'Never visit links from suspicious NFTs',
  tip3: "If it's too good to be true, it's a scam",
};

// French translations
const fr: Translations = {
  // Header
  home: 'Accueil',
  about: 'À propos',
  howItWorks: 'Comment ça marche',
  
  // Hero
  heroTitle1: 'Gardez votre portefeuille Sui ',
  heroTitle2: 'Propre et Sécurisé',
  heroSubtitle: 'Analysez votre portefeuille pour détecter les NFTs spam, les tokens frauduleux et les airdrops suspects. Prenez le contrôle de ce qui reste dans votre portefeuille.',
  heroConnect: 'Appuyez sur "Connect Wallet" pour commencer',
  
  // Dashboard
  yourWallet: 'Votre Portefeuille',
  nfts: 'NFTs',
  tokens: 'Tokens',
  bulkBurn: 'Suppression en masse',
  selectAll: 'Tout sélectionner',
  selectScams: 'Sélectionner les scams',
  cancel: 'Annuler',
  total: 'Total',
  legit: 'Légitime',
  dubious: 'Douteux',
  scam: 'Scam',
  hidden: 'Caché',
  analyzing: 'Analyse en cours',
  
  // Actions
  keep: 'Garder',
  hide: 'Cacher',
  show: 'Afficher',
  burn: 'Supprimer',
  unhideAll: 'Tout afficher',
  clear: 'Effacer',
  selected: 'sélectionné(s)',
  
  // Token Card
  balance: 'Solde',
  verifiedToken: 'Vérifié',
  unknownToken: 'Inconnu',
  scamToken: 'Scam',
  
  // NFT Card
  unnamed: 'Sans nom',
  unknownPackage: 'Package inconnu',
  confidence: 'Confiance',
  
  // Status
  verified: 'Vérifié',
  unknown: 'Inconnu',
  
  // Classification reasons
  verifiedTokenReason: 'Token vérifié',
  knownScamToken: 'Token scam connu',
  fakeToken: 'Faux token',
  suspiciousName: 'Nom de token suspect',
  dustAmount: 'Montant poussière (possible scam airdrop)',
  unknownVerify: 'Token inconnu - vérifiez avant d\'interagir',
  approvedPackage: 'Package approuvé',
  blockedPackage: 'Package scam connu',
  scamKeywords: 'Contient des mots-clés de scam',
  mlDetectedScam: 'Détecté comme scam par IA',
  mlDetectedLegit: 'Détecté comme légitime par IA',
  defaultDubious: 'Inconnu - vérifiez avant d\'interagir',
  
  // Errors
  errorLoading: 'Erreur de chargement',
  retry: 'Réessayer',
  
  // Empty states
  noHiddenNfts: 'Aucun NFT caché',
  noHiddenTokens: 'Aucun token caché',
  noNftsFound: 'Aucun NFT trouvé',
  noTokensFound: 'Aucun token trouvé',
  hiddenItemsAppear: 'Les éléments cachés apparaîtront ici',
  tryDifferentFilter: 'Essayez un autre filtre',
  
  // Stats
  globalStats: 'Statistiques globales',
  walletsProtected: 'Portefeuilles protégés',
  nftStats: 'Statistiques NFT',
  tokenStats: 'Statistiques Token',
  scanned: 'Analysés',
  scamsDetected: 'Scams',
  burned: 'Supprimés',
  
  // Confirmations
  confirmBurn: 'Supprimer cet élément définitivement ? Cette action est irréversible.',
  confirmBulkBurn: 'Supprimer {count} élément(s) définitivement ?',
  burnFailed: 'Échec de la suppression',
  
  // Footer
  builtBy: 'Créé avec 💙 par la communauté Sui',
  
  // About page
  aboutTitle: 'À propos de SUI Sweep',
  ourStory: '🌟 Notre Histoire',
  ourStoryText1: 'SUI Sweep est né d\'une simple observation dans la communauté Sui : les portefeuilles étaient encombrés de NFTs indésirables, d\'airdrops spam et de scams potentiels.',
  ourStoryText2: 'Nous sommes des passionnés de Sui comme vous, qui croyons que tout le monde mérite une expérience de portefeuille propre et sécurisée. Cet outil est créé par la communauté, pour la communauté.',
  theProblem: '💡 Le Problème',
  theProblemText: 'Chaque jour, les utilisateurs de Sui reçoivent des airdrops NFT non sollicités. Si certains sont du marketing légitime, beaucoup sont des scams conçus pour piéger les utilisateurs.',
  theSolution: '🛡️ Notre Solution',
  theSolutionText: 'SUI Sweep combine plusieurs couches de protection :',
  curatedLists: 'Listes organisées',
  curatedListsDesc: 'Packages légitimes et malveillants connus',
  aiDetection: 'Détection IA',
  aiDetectionDesc: 'L\'apprentissage automatique analyse les images NFT',
  keywordAnalysis: 'Analyse de mots-clés',
  keywordAnalysisDesc: 'Signale les termes suspects',
  ourMission: '🎯 Notre Mission',
  ourMissionText: 'Rendre l\'écosystème Sui plus sûr, un portefeuille à la fois. La sécurité devrait être accessible à tous, pas seulement aux experts.',
  
  // How it works page
  howItWorksTitle: 'Comment ça marche',
  step01: 'ÉTAPE 01',
  step01Title: 'Connecter le portefeuille',
  step01Desc: 'Appuyez sur le bouton Connecter. Nous supportons tous les principaux portefeuilles Sui.',
  step02: 'ÉTAPE 02',
  step02Title: 'Analyse automatique',
  step02Desc: 'Nous analysons instantanément tous les NFTs et tokens de votre portefeuille.',
  step03: 'ÉTAPE 03',
  step03Title: 'Examiner',
  step03Desc: 'Chaque élément est classé comme Légitime, Douteux ou Scam.',
  step04: 'ÉTAPE 04',
  step04Title: 'Agir',
  step04Desc: 'Gardez, Cachez ou Supprimez chaque élément. Vous avez le contrôle.',
  aboutHide: '👁️ À propos de Cacher',
  aboutHideText: 'Les éléments cachés restent dans votre portefeuille—nous les masquons simplement. Utilisez "Tout afficher" pour les restaurer.',
  proTips: '💡 Conseils',
  tip1: 'Utilisez la suppression en masse pour plusieurs scams',
  tip2: 'Ne visitez jamais les liens des NFTs suspects',
  tip3: 'Si c\'est trop beau pour être vrai, c\'est un scam',
};

// Spanish translations
const es: Translations = {
  // Header
  home: 'Inicio',
  about: 'Acerca de',
  howItWorks: 'Cómo funciona',
  
  // Hero
  heroTitle1: 'Mantén tu billetera Sui ',
  heroTitle2: 'Limpia y Segura',
  heroSubtitle: 'Escanea tu billetera en busca de NFTs spam, tokens fraudulentos y airdrops sospechosos. Toma el control de lo que permanece en tu billetera.',
  heroConnect: 'Toca "Connect Wallet" para comenzar',
  
  // Dashboard
  yourWallet: 'Tu Billetera',
  nfts: 'NFTs',
  tokens: 'Tokens',
  bulkBurn: 'Eliminar en masa',
  selectAll: 'Seleccionar todo',
  selectScams: 'Seleccionar scams',
  cancel: 'Cancelar',
  total: 'Total',
  legit: 'Legítimo',
  dubious: 'Dudoso',
  scam: 'Scam',
  hidden: 'Oculto',
  analyzing: 'Analizando',
  
  // Actions
  keep: 'Mantener',
  hide: 'Ocultar',
  show: 'Mostrar',
  burn: 'Eliminar',
  unhideAll: 'Mostrar todo',
  clear: 'Limpiar',
  selected: 'seleccionado(s)',
  
  // Token Card
  balance: 'Saldo',
  verifiedToken: 'Verificado',
  unknownToken: 'Desconocido',
  scamToken: 'Scam',
  
  // NFT Card
  unnamed: 'Sin nombre',
  unknownPackage: 'Paquete desconocido',
  confidence: 'Confianza',
  
  // Status
  verified: 'Verificado',
  unknown: 'Desconocido',
  
  // Classification reasons
  verifiedTokenReason: 'Token verificado',
  knownScamToken: 'Token scam conocido',
  fakeToken: 'Token falso',
  suspiciousName: 'Nombre de token sospechoso',
  dustAmount: 'Cantidad mínima (posible scam airdrop)',
  unknownVerify: 'Token desconocido - verifica antes de interactuar',
  approvedPackage: 'Paquete aprobado',
  blockedPackage: 'Paquete scam conocido',
  scamKeywords: 'Contiene palabras clave de scam',
  mlDetectedScam: 'Detectado como scam por IA',
  mlDetectedLegit: 'Detectado como legítimo por IA',
  defaultDubious: 'Desconocido - verifica antes de interactuar',
  
  // Errors
  errorLoading: 'Error al cargar',
  retry: 'Reintentar',
  
  // Empty states
  noHiddenNfts: 'No hay NFTs ocultos',
  noHiddenTokens: 'No hay tokens ocultos',
  noNftsFound: 'No se encontraron NFTs',
  noTokensFound: 'No se encontraron tokens',
  hiddenItemsAppear: 'Los elementos ocultos aparecerán aquí',
  tryDifferentFilter: 'Prueba un filtro diferente',
  
  // Stats
  globalStats: 'Estadísticas globales',
  walletsProtected: 'Billeteras protegidas',
  nftStats: 'Estadísticas de NFT',
  tokenStats: 'Estadísticas de Token',
  scanned: 'Escaneados',
  scamsDetected: 'Scams',
  burned: 'Eliminados',
  
  // Confirmations
  confirmBurn: '¿Eliminar este elemento permanentemente? Esta acción no se puede deshacer.',
  confirmBulkBurn: '¿Eliminar {count} elemento(s) permanentemente?',
  burnFailed: 'Error al eliminar',
  
  // Footer
  builtBy: 'Creado con 💙 por la comunidad Sui',
  
  // About page
  aboutTitle: 'Acerca de SUI Sweep',
  ourStory: '🌟 Nuestra Historia',
  ourStoryText1: 'SUI Sweep nació de una simple observación en la comunidad Sui: las billeteras se estaban llenando de NFTs no deseados, airdrops spam y posibles scams.',
  ourStoryText2: 'Somos entusiastas de Sui como tú, que creemos que todos merecen una experiencia de billetera limpia y segura. Esta herramienta está creada por la comunidad, para la comunidad.',
  theProblem: '💡 El Problema',
  theProblemText: 'Cada día, los usuarios de Sui reciben airdrops de NFT no solicitados. Mientras algunos son marketing legítimo, muchos son scams diseñados para engañar a los usuarios.',
  theSolution: '🛡️ Nuestra Solución',
  theSolutionText: 'SUI Sweep combina múltiples capas de protección:',
  curatedLists: 'Listas curadas',
  curatedListsDesc: 'Paquetes legítimos y maliciosos conocidos',
  aiDetection: 'Detección IA',
  aiDetectionDesc: 'El aprendizaje automático analiza imágenes de NFT',
  keywordAnalysis: 'Análisis de palabras clave',
  keywordAnalysisDesc: 'Señala términos sospechosos',
  ourMission: '🎯 Nuestra Misión',
  ourMissionText: 'Hacer el ecosistema Sui más seguro, una billetera a la vez. La seguridad debe ser accesible para todos, no solo para expertos.',
  
  // How it works page
  howItWorksTitle: 'Cómo funciona',
  step01: 'PASO 01',
  step01Title: 'Conectar billetera',
  step01Desc: 'Toca el botón Conectar. Soportamos todas las principales billeteras Sui.',
  step02: 'PASO 02',
  step02Title: 'Escaneo automático',
  step02Desc: 'Escaneamos instantáneamente todos los NFTs y tokens de tu billetera.',
  step03: 'PASO 03',
  step03Title: 'Revisar',
  step03Desc: 'Cada elemento se clasifica como Legítimo, Dudoso o Scam.',
  step04: 'PASO 04',
  step04Title: 'Actuar',
  step04Desc: 'Mantén, Oculta o Elimina cada elemento. Tú tienes el control.',
  aboutHide: '👁️ Acerca de Ocultar',
  aboutHideText: 'Los elementos ocultos permanecen en tu billetera—solo los ocultamos de la vista. Usa "Mostrar todo" para restaurarlos.',
  proTips: '💡 Consejos',
  tip1: 'Usa eliminación en masa para múltiples scams',
  tip2: 'Nunca visites enlaces de NFTs sospechosos',
  tip3: 'Si es demasiado bueno para ser verdad, es un scam',
};

// Portuguese translations
const pt: Translations = {
  // Header
  home: 'Início',
  about: 'Sobre',
  howItWorks: 'Como funciona',
  
  // Hero
  heroTitle1: 'Mantenha sua carteira Sui ',
  heroTitle2: 'Limpa e Segura',
  heroSubtitle: 'Escaneie sua carteira em busca de NFTs spam, tokens fraudulentos e airdrops suspeitos. Assuma o controle do que permanece em sua carteira.',
  heroConnect: 'Toque em "Connect Wallet" para começar',
  
  // Dashboard
  yourWallet: 'Sua Carteira',
  nfts: 'NFTs',
  tokens: 'Tokens',
  bulkBurn: 'Exclusão em massa',
  selectAll: 'Selecionar tudo',
  selectScams: 'Selecionar scams',
  cancel: 'Cancelar',
  total: 'Total',
  legit: 'Legítimo',
  dubious: 'Duvidoso',
  scam: 'Scam',
  hidden: 'Oculto',
  analyzing: 'Analisando',
  
  // Actions
  keep: 'Manter',
  hide: 'Ocultar',
  show: 'Mostrar',
  burn: 'Excluir',
  unhideAll: 'Mostrar tudo',
  clear: 'Limpar',
  selected: 'selecionado(s)',
  
  // Token Card
  balance: 'Saldo',
  verifiedToken: 'Verificado',
  unknownToken: 'Desconhecido',
  scamToken: 'Scam',
  
  // NFT Card
  unnamed: 'Sem nome',
  unknownPackage: 'Pacote desconhecido',
  confidence: 'Confiança',
  
  // Status
  verified: 'Verificado',
  unknown: 'Desconhecido',
  
  // Classification reasons
  verifiedTokenReason: 'Token verificado',
  knownScamToken: 'Token scam conhecido',
  fakeToken: 'Token falso',
  suspiciousName: 'Nome de token suspeito',
  dustAmount: 'Quantidade mínima (possível scam airdrop)',
  unknownVerify: 'Token desconhecido - verifique antes de interagir',
  approvedPackage: 'Pacote aprovado',
  blockedPackage: 'Pacote scam conhecido',
  scamKeywords: 'Contém palavras-chave de scam',
  mlDetectedScam: 'Detectado como scam por IA',
  mlDetectedLegit: 'Detectado como legítimo por IA',
  defaultDubious: 'Desconhecido - verifique antes de interagir',
  
  // Errors
  errorLoading: 'Erro ao carregar',
  retry: 'Tentar novamente',
  
  // Empty states
  noHiddenNfts: 'Nenhum NFT oculto',
  noHiddenTokens: 'Nenhum token oculto',
  noNftsFound: 'Nenhum NFT encontrado',
  noTokensFound: 'Nenhum token encontrado',
  hiddenItemsAppear: 'Itens ocultos aparecerão aqui',
  tryDifferentFilter: 'Tente um filtro diferente',
  
  // Stats
  globalStats: 'Estatísticas globais',
  walletsProtected: 'Carteiras protegidas',
  nftStats: 'Estatísticas de NFT',
  tokenStats: 'Estatísticas de Token',
  scanned: 'Escaneados',
  scamsDetected: 'Scams',
  burned: 'Excluídos',
  
  // Confirmations
  confirmBurn: 'Excluir este item permanentemente? Esta ação não pode ser desfeita.',
  confirmBulkBurn: 'Excluir {count} item(ns) permanentemente?',
  burnFailed: 'Falha ao excluir',
  
  // Footer
  builtBy: 'Criado com 💙 pela comunidade Sui',
  
  // About page
  aboutTitle: 'Sobre o SUI Sweep',
  ourStory: '🌟 Nossa História',
  ourStoryText1: 'O SUI Sweep nasceu de uma simples observação na comunidade Sui: as carteiras estavam ficando cheias de NFTs indesejados, airdrops spam e possíveis scams.',
  ourStoryText2: 'Somos entusiastas do Sui como você, que acreditamos que todos merecem uma experiência de carteira limpa e segura. Esta ferramenta é criada pela comunidade, para a comunidade.',
  theProblem: '💡 O Problema',
  theProblemText: 'Todos os dias, usuários do Sui recebem airdrops de NFT não solicitados. Enquanto alguns são marketing legítimo, muitos são scams projetados para enganar usuários.',
  theSolution: '🛡️ Nossa Solução',
  theSolutionText: 'O SUI Sweep combina múltiplas camadas de proteção:',
  curatedLists: 'Listas curadas',
  curatedListsDesc: 'Pacotes legítimos e maliciosos conhecidos',
  aiDetection: 'Detecção IA',
  aiDetectionDesc: 'Aprendizado de máquina analisa imagens de NFT',
  keywordAnalysis: 'Análise de palavras-chave',
  keywordAnalysisDesc: 'Sinaliza termos suspeitos',
  ourMission: '🎯 Nossa Missão',
  ourMissionText: 'Tornar o ecossistema Sui mais seguro, uma carteira de cada vez. A segurança deve ser acessível a todos, não apenas a especialistas.',
  
  // How it works page
  howItWorksTitle: 'Como funciona',
  step01: 'PASSO 01',
  step01Title: 'Conectar carteira',
  step01Desc: 'Toque no botão Conectar. Suportamos todas as principais carteiras Sui.',
  step02: 'PASSO 02',
  step02Title: 'Escaneamento automático',
  step02Desc: 'Escaneamos instantaneamente todos os NFTs e tokens da sua carteira.',
  step03: 'PASSO 03',
  step03Title: 'Revisar',
  step03Desc: 'Cada item é classificado como Legítimo, Duvidoso ou Scam.',
  step04: 'PASSO 04',
  step04Title: 'Agir',
  step04Desc: 'Mantenha, Oculte ou Exclua cada item. Você está no controle.',
  aboutHide: '👁️ Sobre Ocultar',
  aboutHideText: 'Itens ocultos permanecem em sua carteira—apenas os ocultamos da visualização. Use "Mostrar tudo" para restaurá-los.',
  proTips: '💡 Dicas',
  tip1: 'Use exclusão em massa para múltiplos scams',
  tip2: 'Nunca visite links de NFTs suspeitos',
  tip3: 'Se é bom demais para ser verdade, é um scam',
};

// Chinese translations
const zh: Translations = {
  // Header
  home: '首页',
  about: '关于',
  howItWorks: '如何使用',
  
  // Hero
  heroTitle1: '保持您的Sui钱包',
  heroTitle2: '干净安全',
  heroSubtitle: '扫描您的钱包，检测垃圾NFT、欺诈代币和可疑空投。掌控您钱包中的内容。',
  heroConnect: '点击"Connect Wallet"开始',
  
  // Dashboard
  yourWallet: '您的钱包',
  nfts: 'NFTs',
  tokens: '代币',
  bulkBurn: '批量删除',
  selectAll: '全选',
  selectScams: '选择骗局',
  cancel: '取消',
  total: '总计',
  legit: '合法',
  dubious: '可疑',
  scam: '骗局',
  hidden: '已隐藏',
  analyzing: '分析中',
  
  // Actions
  keep: '保留',
  hide: '隐藏',
  show: '显示',
  burn: '删除',
  unhideAll: '显示全部',
  clear: '清除',
  selected: '已选择',
  
  // Token Card
  balance: '余额',
  verifiedToken: '已验证',
  unknownToken: '未知',
  scamToken: '骗局',
  
  // NFT Card
  unnamed: '未命名',
  unknownPackage: '未知包',
  confidence: '置信度',
  
  // Status
  verified: '已验证',
  unknown: '未知',
  
  // Classification reasons
  verifiedTokenReason: '已验证代币',
  knownScamToken: '已知骗局代币',
  fakeToken: '假代币',
  suspiciousName: '可疑代币名称',
  dustAmount: '微量（可能是骗局空投）',
  unknownVerify: '未知代币 - 交互前请验证',
  approvedPackage: '已批准的包',
  blockedPackage: '已知骗局包',
  scamKeywords: '包含骗局关键词',
  mlDetectedScam: 'AI检测为骗局',
  mlDetectedLegit: 'AI检测为合法',
  defaultDubious: '未知 - 交互前请验证',
  
  // Errors
  errorLoading: '加载错误',
  retry: '重试',
  
  // Empty states
  noHiddenNfts: '没有隐藏的NFT',
  noHiddenTokens: '没有隐藏的代币',
  noNftsFound: '未找到NFT',
  noTokensFound: '未找到代币',
  hiddenItemsAppear: '隐藏的项目将显示在这里',
  tryDifferentFilter: '尝试其他筛选器',
  
  // Stats
  globalStats: '全球统计',
  walletsProtected: '受保护钱包',
  nftStats: 'NFT统计',
  tokenStats: '代币统计',
  scanned: '已扫描',
  scamsDetected: '骗局',
  burned: '已删除',
  
  // Confirmations
  confirmBurn: '永久删除此项目？此操作无法撤销。',
  confirmBulkBurn: '永久删除{count}个项目？',
  burnFailed: '删除失败',
  
  // Footer
  builtBy: '由Sui社区用💙构建',
  
  // About page
  aboutTitle: '关于SUI Sweep',
  ourStory: '🌟 我们的故事',
  ourStoryText1: 'SUI Sweep源于Sui社区的一个简单观察：钱包正在被不需要的NFT、垃圾空投和潜在骗局所充斥。',
  ourStoryText2: '我们和您一样是Sui爱好者，相信每个人都应该拥有干净、安全的钱包体验。这个工具由社区创建，为社区服务。',
  theProblem: '💡 问题',
  theProblemText: '每天，Sui用户都会收到未经请求的NFT空投。虽然有些是合法营销，但许多是旨在欺骗用户的骗局。',
  theSolution: '🛡️ 我们的解决方案',
  theSolutionText: 'SUI Sweep结合多层保护：',
  curatedLists: '精选列表',
  curatedListsDesc: '已知的合法和恶意包',
  aiDetection: 'AI检测',
  aiDetectionDesc: '机器学习分析NFT图像',
  keywordAnalysis: '关键词分析',
  keywordAnalysisDesc: '标记可疑术语',
  ourMission: '🎯 我们的使命',
  ourMissionText: '让Sui生态系统更安全，一次一个钱包。安全应该对每个人都可及，而不仅仅是专家。',
  
  // How it works page
  howItWorksTitle: '如何使用',
  step01: '步骤01',
  step01Title: '连接钱包',
  step01Desc: '点击连接按钮。我们支持所有主要的Sui钱包。',
  step02: '步骤02',
  step02Title: '自动扫描',
  step02Desc: '我们即时扫描您钱包中的所有NFT和代币。',
  step03: '步骤03',
  step03Title: '查看',
  step03Desc: '每个项目被分类为合法、可疑或骗局。',
  step04: '步骤04',
  step04Title: '采取行动',
  step04Desc: '保留、隐藏或删除每个项目。您来掌控。',
  aboutHide: '👁️ 关于隐藏',
  aboutHideText: '隐藏的项目仍保留在您的钱包中——我们只是将它们从视图中隐藏。使用"显示全部"随时恢复它们。',
  proTips: '💡 提示',
  tip1: '使用批量删除处理多个骗局',
  tip2: '永远不要访问可疑NFT的链接',
  tip3: '如果好得令人难以置信，那就是骗局',
};

// Italian translations
const it: Translations = {
  // Header
  home: 'Home',
  about: 'Chi siamo',
  howItWorks: 'Come funziona',
  
  // Hero
  heroTitle1: 'Mantieni il tuo portafoglio Sui ',
  heroTitle2: 'Pulito e Sicuro',
  heroSubtitle: 'Scansiona il tuo portafoglio per NFT spam, token fraudolenti e airdrop sospetti. Prendi il controllo di ciò che rimane nel tuo portafoglio.',
  heroConnect: 'Tocca "Connect Wallet" per iniziare',
  
  // Dashboard
  yourWallet: 'Il tuo Portafoglio',
  nfts: 'NFT',
  tokens: 'Token',
  bulkBurn: 'Elimina in massa',
  selectAll: 'Seleziona tutto',
  selectScams: 'Seleziona scam',
  cancel: 'Annulla',
  total: 'Totale',
  legit: 'Legittimo',
  dubious: 'Dubbio',
  scam: 'Scam',
  hidden: 'Nascosto',
  analyzing: 'Analisi in corso',
  
  // Actions
  keep: 'Mantieni',
  hide: 'Nascondi',
  show: 'Mostra',
  burn: 'Elimina',
  unhideAll: 'Mostra tutto',
  clear: 'Cancella',
  selected: 'selezionato/i',
  
  // Token Card
  balance: 'Saldo',
  verifiedToken: 'Verificato',
  unknownToken: 'Sconosciuto',
  scamToken: 'Scam',
  
  // NFT Card
  unnamed: 'Senza nome',
  unknownPackage: 'Pacchetto sconosciuto',
  confidence: 'Affidabilità',
  
  // Status
  verified: 'Verificato',
  unknown: 'Sconosciuto',
  
  // Classification reasons
  verifiedTokenReason: 'Token verificato',
  knownScamToken: 'Token scam conosciuto',
  fakeToken: 'Token falso',
  suspiciousName: 'Nome token sospetto',
  dustAmount: 'Importo minimo (possibile scam airdrop)',
  unknownVerify: 'Token sconosciuto - verifica prima di interagire',
  approvedPackage: 'Pacchetto approvato',
  blockedPackage: 'Pacchetto scam conosciuto',
  scamKeywords: 'Contiene parole chiave scam',
  mlDetectedScam: 'Rilevato come scam dall\'IA',
  mlDetectedLegit: 'Rilevato come legittimo dall\'IA',
  defaultDubious: 'Sconosciuto - verifica prima di interagire',
  
  // Errors
  errorLoading: 'Errore nel caricamento',
  retry: 'Riprova',
  
  // Empty states
  noHiddenNfts: 'Nessun NFT nascosto',
  noHiddenTokens: 'Nessun token nascosto',
  noNftsFound: 'Nessun NFT trovato',
  noTokensFound: 'Nessun token trovato',
  hiddenItemsAppear: 'Gli elementi nascosti appariranno qui',
  tryDifferentFilter: 'Prova un filtro diverso',
  
  // Stats
  globalStats: 'Statistiche globali',
  walletsProtected: 'Portafogli protetti',
  nftStats: 'Statistiche NFT',
  tokenStats: 'Statistiche Token',
  scanned: 'Scansionati',
  scamsDetected: 'Scam',
  burned: 'Eliminati',
  
  // Confirmations
  confirmBurn: 'Eliminare questo elemento definitivamente? Questa azione non può essere annullata.',
  confirmBulkBurn: 'Eliminare {count} elemento/i definitivamente?',
  burnFailed: 'Eliminazione fallita',
  
  // Footer
  builtBy: 'Creato con 💙 dalla comunità Sui',
  
  // About page
  aboutTitle: 'Chi è SUI Sweep',
  ourStory: '🌟 La nostra Storia',
  ourStoryText1: 'SUI Sweep è nato da una semplice osservazione nella comunità Sui: i portafogli si stavano riempiendo di NFT indesiderati, airdrop spam e potenziali scam.',
  ourStoryText2: 'Siamo appassionati di Sui come te, che crediamo che tutti meritino un\'esperienza di portafoglio pulita e sicura. Questo strumento è creato dalla comunità, per la comunità.',
  theProblem: '💡 Il Problema',
  theProblemText: 'Ogni giorno, gli utenti Sui ricevono airdrop NFT non richiesti. Mentre alcuni sono marketing legittimo, molti sono scam progettati per ingannare gli utenti.',
  theSolution: '🛡️ La nostra Soluzione',
  theSolutionText: 'SUI Sweep combina più livelli di protezione:',
  curatedLists: 'Liste curate',
  curatedListsDesc: 'Pacchetti legittimi e malevoli conosciuti',
  aiDetection: 'Rilevamento IA',
  aiDetectionDesc: 'Il machine learning analizza le immagini NFT',
  keywordAnalysis: 'Analisi parole chiave',
  keywordAnalysisDesc: 'Segnala termini sospetti',
  ourMission: '🎯 La nostra Missione',
  ourMissionText: 'Rendere l\'ecosistema Sui più sicuro, un portafoglio alla volta. La sicurezza dovrebbe essere accessibile a tutti, non solo agli esperti.',
  
  // How it works page
  howItWorksTitle: 'Come funziona',
  step01: 'PASSO 01',
  step01Title: 'Connetti il portafoglio',
  step01Desc: 'Tocca il pulsante Connetti. Supportiamo tutti i principali portafogli Sui.',
  step02: 'PASSO 02',
  step02Title: 'Scansione automatica',
  step02Desc: 'Scansioniamo istantaneamente tutti gli NFT e token nel tuo portafoglio.',
  step03: 'PASSO 03',
  step03Title: 'Revisiona',
  step03Desc: 'Ogni elemento è classificato come Legittimo, Dubbio o Scam.',
  step04: 'PASSO 04',
  step04Title: 'Agisci',
  step04Desc: 'Mantieni, Nascondi o Elimina ogni elemento. Tu hai il controllo.',
  aboutHide: '👁️ Riguardo Nascondi',
  aboutHideText: 'Gli elementi nascosti rimangono nel tuo portafoglio—li nascondiamo solo dalla vista. Usa "Mostra tutto" per ripristinarli in qualsiasi momento.',
  proTips: '💡 Suggerimenti',
  tip1: 'Usa l\'eliminazione in massa per più scam',
  tip2: 'Non visitare mai i link di NFT sospetti',
  tip3: 'Se è troppo bello per essere vero, è uno scam',
};

// German translations
const de: Translations = {
  // Header
  home: 'Startseite',
  about: 'Über uns',
  howItWorks: 'So funktioniert\'s',
  
  // Hero
  heroTitle1: 'Halte deine Sui-Wallet ',
  heroTitle2: 'Sauber & Sicher',
  heroSubtitle: 'Scanne deine Wallet nach Spam-NFTs, betrügerischen Token und verdächtigen Airdrops. Übernimm die Kontrolle darüber, was in deiner Wallet bleibt.',
  heroConnect: 'Tippe auf "Connect Wallet" um zu starten',
  
  // Dashboard
  yourWallet: 'Deine Wallet',
  nfts: 'NFTs',
  tokens: 'Token',
  bulkBurn: 'Massenentfernung',
  selectAll: 'Alle auswählen',
  selectScams: 'Scams auswählen',
  cancel: 'Abbrechen',
  total: 'Gesamt',
  legit: 'Legitim',
  dubious: 'Zweifelhaft',
  scam: 'Scam',
  hidden: 'Versteckt',
  analyzing: 'Analysiere',
  
  // Actions
  keep: 'Behalten',
  hide: 'Verstecken',
  show: 'Anzeigen',
  burn: 'Entfernen',
  unhideAll: 'Alle anzeigen',
  clear: 'Löschen',
  selected: 'ausgewählt',
  
  // Token Card
  balance: 'Guthaben',
  verifiedToken: 'Verifiziert',
  unknownToken: 'Unbekannt',
  scamToken: 'Scam',
  
  // NFT Card
  unnamed: 'Unbenannt',
  unknownPackage: 'Unbekanntes Paket',
  confidence: 'Vertrauen',
  
  // Status
  verified: 'Verifiziert',
  unknown: 'Unbekannt',
  
  // Classification reasons
  verifiedTokenReason: 'Verifizierter Token',
  knownScamToken: 'Bekannter Scam-Token',
  fakeToken: 'Gefälschter Token',
  suspiciousName: 'Verdächtiger Token-Name',
  dustAmount: 'Minimalbetrag (möglicher Scam-Airdrop)',
  unknownVerify: 'Unbekannter Token - vor Interaktion überprüfen',
  approvedPackage: 'Genehmigtes Paket',
  blockedPackage: 'Bekanntes Scam-Paket',
  scamKeywords: 'Enthält Scam-Schlüsselwörter',
  mlDetectedScam: 'Von KI als Scam erkannt',
  mlDetectedLegit: 'Von KI als legitim erkannt',
  defaultDubious: 'Unbekannt - vor Interaktion überprüfen',
  
  // Errors
  errorLoading: 'Fehler beim Laden',
  retry: 'Erneut versuchen',
  
  // Empty states
  noHiddenNfts: 'Keine versteckten NFTs',
  noHiddenTokens: 'Keine versteckten Token',
  noNftsFound: 'Keine NFTs gefunden',
  noTokensFound: 'Keine Token gefunden',
  hiddenItemsAppear: 'Versteckte Elemente erscheinen hier',
  tryDifferentFilter: 'Versuche einen anderen Filter',
  
  // Stats
  globalStats: 'Globale Statistiken',
  walletsProtected: 'Geschützte Wallets',
  nftStats: 'NFT-Statistiken',
  tokenStats: 'Token-Statistiken',
  scanned: 'Gescannt',
  scamsDetected: 'Scams',
  burned: 'Entfernt',
  
  // Confirmations
  confirmBurn: 'Dieses Element dauerhaft entfernen? Dies kann nicht rückgängig gemacht werden.',
  confirmBulkBurn: '{count} Element(e) dauerhaft entfernen?',
  burnFailed: 'Entfernung fehlgeschlagen',
  
  // Footer
  builtBy: 'Mit 💙 von der Sui-Community erstellt',
  
  // About page
  aboutTitle: 'Über SUI Sweep',
  ourStory: '🌟 Unsere Geschichte',
  ourStoryText1: 'SUI Sweep entstand aus einer einfachen Beobachtung in der Sui-Community: Wallets wurden mit unerwünschten NFTs, Spam-Airdrops und potenziellen Scams überfüllt.',
  ourStoryText2: 'Wir sind Sui-Enthusiasten wie du, die glauben, dass jeder eine saubere, sichere Wallet-Erfahrung verdient. Dieses Tool wird von der Community für die Community erstellt.',
  theProblem: '💡 Das Problem',
  theProblemText: 'Jeden Tag erhalten Sui-Nutzer unaufgeforderte NFT-Airdrops. Während einige legitimes Marketing sind, sind viele Scams, die darauf abzielen, Nutzer zu täuschen.',
  theSolution: '🛡️ Unsere Lösung',
  theSolutionText: 'SUI Sweep kombiniert mehrere Schutzebenen:',
  curatedLists: 'Kuratierte Listen',
  curatedListsDesc: 'Bekannte legitime und bösartige Pakete',
  aiDetection: 'KI-Erkennung',
  aiDetectionDesc: 'Maschinelles Lernen analysiert NFT-Bilder',
  keywordAnalysis: 'Schlüsselwort-Analyse',
  keywordAnalysisDesc: 'Markiert verdächtige Begriffe',
  ourMission: '🎯 Unsere Mission',
  ourMissionText: 'Das Sui-Ökosystem sicherer zu machen, eine Wallet nach der anderen. Sicherheit sollte für alle zugänglich sein, nicht nur für Experten.',
  
  // How it works page
  howItWorksTitle: 'So funktioniert\'s',
  step01: 'SCHRITT 01',
  step01Title: 'Wallet verbinden',
  step01Desc: 'Tippe auf Verbinden. Wir unterstützen alle wichtigen Sui-Wallets.',
  step02: 'SCHRITT 02',
  step02Title: 'Automatischer Scan',
  step02Desc: 'Wir scannen sofort alle NFTs und Token in deiner Wallet.',
  step03: 'SCHRITT 03',
  step03Title: 'Überprüfen',
  step03Desc: 'Jedes Element wird als Legitim, Zweifelhaft oder Scam klassifiziert.',
  step04: 'SCHRITT 04',
  step04Title: 'Handeln',
  step04Desc: 'Behalte, Verstecke oder Entferne jedes Element. Du hast die Kontrolle.',
  aboutHide: '👁️ Über Verstecken',
  aboutHideText: 'Versteckte Elemente bleiben in deiner Wallet—wir verbergen sie nur aus der Ansicht. Verwende "Alle anzeigen" um sie jederzeit wiederherzustellen.',
  proTips: '💡 Tipps',
  tip1: 'Verwende Massenentfernung für mehrere Scams',
  tip2: 'Besuche niemals Links von verdächtigen NFTs',
  tip3: 'Wenn es zu gut klingt um wahr zu sein, ist es ein Scam',
};

// All translations
const translations: Record<Language, Translations> = {
  en,
  fr,
  es,
  pt,
  zh,
  it,
  de,
};

// Detect browser language
export function detectLanguage(): Language {
  const stored = localStorage.getItem('sui-sweep-language');
  if (stored && Object.keys(translations).includes(stored)) {
    return stored as Language;
  }

  const browserLang = navigator.language.split('-')[0].toLowerCase();
  
  if (browserLang === 'fr') return 'fr';
  if (browserLang === 'es') return 'es';
  if (browserLang === 'pt') return 'pt';
  if (browserLang === 'zh') return 'zh';
  if (browserLang === 'it') return 'it';
  if (browserLang === 'de') return 'de';
  
  return 'en';
}

// Save language preference
export function saveLanguage(lang: Language): void {
  localStorage.setItem('sui-sweep-language', lang);
}

// Get translations for a language
export function getTranslations(lang: Language): Translations {
  return translations[lang];
}

// Get current translations
export function t(lang: Language): Translations {
  return translations[lang];
}