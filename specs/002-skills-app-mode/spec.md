# Feature Specification : la section Skills

**Feature Branch** : `002-skills-app-mode`

**Created** : 11 octobre 2026

**Status** : Draft

**Input** : « jaimerais ajouter une section skill aussi afin de importer tout mes skill quon a creer que jai de remotion hyperframe pour le motion disign le montage video ect tout ce qu'on detien et aussi si il fautr les creer on le faira »

## Le problème, en une phrase

**L'agent que reçoit un utilisateur qui installe Indagis Studio ne connaît pas la
méthode du produit.**

Les sept skills du projet — `voyage-du-heros`, `diagnostic-timeline`, `roasting`,
`hyperframes`, `remotion`, et depuis l'audit `ingestion-et-droits` et
`direction-mouvement` — vivent dans `.agents/skills/`. La documentation du framework dit que ce dossier n'alimente que le
mode développement ; en mode application, l'agent ne voit que les *resource skills*.
L'auteur du projet ne s'en aperçoit pas : sur sa machine, il travaille en mode
développement, où tout est chargé.

C'est un trou qui touche le Principe I : la carte narrative est le centre du produit, et
l'agent livré ne sait pas la lire comme la méthode l'exige.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Voir ce que l'agent sait faire (Priority: P1)

Une monteuse installe Studio, connecte un modèle, et ouvre la bibliothèque. Une section
**Skills** lui montre les savoir-faire disponibles : lesquels sont actifs pour son
agent, lesquels sont livrés mais pas encore installés, et ce que chacun déclenche.

**Why this priority** : sans cet écran, l'utilisateur ignore que les skills existent, et
ignore surtout qu'elles ne sont pas actives. Montrer l'écart est la condition d'honnêteté
du Principe IV — et c'est la seule histoire qui garde de la valeur même si aucune autre
n'est livrée.

**Independent Test** : ouvrir la section Skills sans rien installer. L'écran liste les
skills livrées, chacune marquée « non installée », et dit en une phrase ce que cela
implique. Testable sans aucune écriture.

**Acceptance Scenarios** :

1. **Given** une installation neuve, **When** l'utilisateur ouvre la section Skills,
   **Then** les skills livrées apparaissent avec leur rôle, leur déclencheur et l'état
   **non installée**.
2. **Given** une skill déjà installée, **When** l'utilisateur ouvre la section,
   **Then** elle apparaît comme **active**, distincte des livrées non installées.
3. **Given** une skill écrite par l'utilisateur, **When** il ouvre la section,
   **Then** elle apparaît comme **sienne**, distincte des skills livrées avec le produit.

---

### User Story 2 — Installer une skill livrée (Priority: P1)

D'un geste, l'utilisateur installe `voyage-du-heros` ; son agent peut dès lors appliquer
la méthode sans qu'il ait à la lui réexpliquer à chaque conversation.

**Why this priority** : c'est l'étape qui répare le trou. Elle est P1 au même titre que la
première parce qu'un écran qui montre sans permettre d'agir ne ferait que nommer le
problème.

**Independent Test** : installer une skill, ouvrir une conversation, vérifier que l'agent
la cite ou l'applique. Vérifiable aussi par relecture : la skill est listée comme active
après rechargement.

**Acceptance Scenarios** :

1. **Given** une skill livrée non installée, **When** l'utilisateur l'installe,
   **Then** elle devient active pour **lui seul**, et l'écran le reflète sans
   rechargement.
2. **Given** une skill déjà installée, **When** l'utilisateur la réinstalle,
   **Then** le système refuse d'écraser silencieusement et demande confirmation, parce
   qu'une version modifiée par l'utilisateur serait perdue.
3. **Given** une skill installée, **When** l'utilisateur la retire,
   **Then** elle redevient livrée-non-installée, et l'original reste intact.

---

### User Story 3 — Apporter sa propre skill (Priority: P2)

Un monteur a écrit sa propre fiche de savoir-faire — ses conventions d'étalonnage, son
rythme de coupe. Il la colle dans Studio et son agent l'applique.

**Why this priority** : c'est la demande littérale de l'utilisateur, mais elle n'a de sens
qu'une fois les deux premières livrées : sans le magasin de ressources, une skill
importée ne serait active nulle part.

**Independent Test** : coller un contenu de skill valide, puis le retrouver listé comme
sien et actif.

**Acceptance Scenarios** :

1. **Given** un contenu de skill valide, **When** l'utilisateur l'importe,
   **Then** elle est enregistrée et apparaît comme sienne et active.
2. **Given** un contenu sans nom ni description, **When** l'utilisateur l'importe,
   **Then** le système **refuse** et dit précisément ce qui manque.
3. **Given** un nom déjà porté par une skill livrée, **When** l'utilisateur importe,
   **Then** le système refuse plutôt que de masquer silencieusement la skill livrée.

---

### User Story 4 — Les savoir-faire de motion design (Priority: P3)

L'utilisateur installe les quelques skills de motion design livrées avec le produit, et
son agent sait composer un plan animé depuis la carte narrative.

**Why this priority** : c'est la demande d'origine, mais elle dépend entièrement du
mécanisme des trois premières histoires. Livrée seule, elle n'aurait aucun effet.

**Independent Test** : installer une skill de motion design, demander à l'agent une
composition depuis un acte, vérifier qu'il s'y réfère.

**Acceptance Scenarios** :

1. **Given** les skills de motion design livrées, **When** l'utilisateur consulte leur
   fiche, **Then** l'auteur, la licence et la source d'origine sont visibles.
2. **Given** une skill de tiers, **When** elle est installée, **Then** son attribution
   voyage avec elle et reste lisible.

---

### Edge Cases

- **Une skill livrée disparaît d'une version à l'autre** : que devient la copie installée
  par l'utilisateur ? Elle lui appartient : elle reste, et le système cesse simplement de
  la présenter comme livrée.
- **L'utilisateur modifie une skill installée puis demande à la réinstaller** : le système
  ne doit pas écraser sans dire ce qui sera perdu.
- **Le contenu importé est énorme** (un utilisateur colle un livre) : il faut une limite
  annoncée, et un refus clair plutôt qu'un enregistrement qui ralentit chaque
  conversation.
- **Le contenu importé contient un secret** (clé d'API dans un exemple) : le système doit
  refuser ou avertir, conformément à l'interdiction de stocker un secret.
- **Deux skills portent le même déclencheur** : l'utilisateur doit pouvoir le constater
  depuis l'écran, sinon il ne comprendra pas pourquoi l'agent choisit l'une plutôt que
  l'autre.
- **Aucune skill installée** : l'écran doit le dire comme une information, pas comme une
  erreur — exactement comme une étape narrative vide.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001** : Le système DOIT présenter, dans la bibliothèque, la liste des savoir-faire
  disponibles, chacun avec son nom, son rôle en une phrase et ce qui le déclenche.
- **FR-002** : Le système DOIT distinguer visiblement trois états : **livrée non
  installée**, **active**, **écrite par l'utilisateur**.
- **FR-003** : Le système DOIT indiquer explicitement qu'une skill livrée mais non
  installée **n'est pas disponible pour l'agent**, plutôt que de laisser croire le
  contraire.
- **FR-004** : L'utilisateur DOIT pouvoir installer une skill livrée en un geste, et
  l'installation DOIT être limitée à son propre compte.
- **FR-005** : Le système DOIT refuser d'écraser une skill installée sans confirmation
  explicite, en annonçant ce qui serait perdu.
- **FR-006** : L'utilisateur DOIT pouvoir retirer une skill installée, sans que cela
  altère la version livrée.
- **FR-007** : L'utilisateur DOIT pouvoir importer un contenu de skill qu'il a rédigé.
- **FR-008** : Le système DOIT refuser un import incomplet ou invalide en nommant la
  raison, et ne DOIT jamais enregistrer à moitié.
- **FR-009** : Le système DOIT refuser un import dont le nom entre en collision avec une
  skill livrée.
- **FR-010** : Le système DOIT refuser un contenu qui dépasse une taille annoncée.
- **FR-011** : Le système NE DOIT PAS enregistrer un contenu qui porte un secret
  apparent, et DOIT le dire.
- **FR-012** : Toute skill de tiers livrée avec le produit DOIT porter son auteur, sa
  licence et sa source, visibles dans l'interface **et** conservés à l'installation.
- **FR-013** : Les skills livrées avec le produit NE DOIVENT PAS être modifiables :
  en faire une copie est le seul chemin, comme pour les prompts et les modèles.
- **FR-014** : Le système DOIT survivre à l'absence totale de skills installées en
  présentant cet état comme une information neutre.
- **FR-015** : L'agent DOIT pouvoir lister et installer les skills par les mêmes chemins
  que l'interface, sans route parallèle.

### Key Entities

- **Savoir-faire livré** : une fiche fournie avec le produit — nom, rôle, déclencheur,
  contenu, et pour un tiers : auteur, licence, source. Figé, non modifiable.
- **Savoir-faire installé** : la copie que possède un utilisateur. Porte un propriétaire,
  et l'attribution d'origine quand elle vient d'un tiers.
- **État d'un savoir-faire** : livré-non-installé, actif, ou écrit par l'utilisateur. Un
  même nom ne peut pas être à la fois livré et écrit par l'utilisateur.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001** : Un utilisateur qui vient d'installer le produit découvre en moins de deux
  minutes, sans lire la documentation, que les savoir-faire existent et qu'ils ne sont
  pas encore actifs.
- **SC-002** : Rendre la méthode du voyage du héros disponible à son agent prend **un
  seul geste**.
- **SC-003** : Après installation, l'agent applique la méthode sans que l'utilisateur ait
  à la lui décrire dans la conversation — vérifiable en comparant une même demande avant
  et après.
- **SC-004** : Aucun écran ne présente comme disponible un savoir-faire qui ne l'est pas.
  Mesure : zéro écart entre ce que l'écran affiche et ce dont l'agent dispose réellement.
- **SC-005** : Tout refus d'import indique la raison précise ; aucun import n'échoue en
  silence ni ne s'enregistre à moitié.
- **SC-006** : L'attribution d'une skill de tiers reste lisible après installation, à
  100 % des cas.
- **SC-007** : Le poids ajouté au dépôt reste sous 1 Mo, pour que le clone ne double pas.

## Assumptions

- **L'écart Code Mode / App Mode est bien celui décrit.** Il vient du tableau de la
  documentation du framework. La première tâche d'implémentation devra le **prouver à
  l'exécution** avant de construire quoi que ce soit dessus : si l'agent livré voyait déjà
  `.agents/skills/`, toute cette spécification perdrait son objet.
- **Le magasin de ressources peut être activé.** Il existe dans le framework et n'est pas
  branché sur cette application ; un appel de lecture échoue aujourd'hui. On suppose qu'il
  s'active sans migration destructrice.
- **Les skills restent du texte.** Aucun exécutable, aucun binaire — ce qui reste cohérent
  avec l'interdiction de stocker un binaire en base.
- **Portée personnelle.** Une installation vaut pour un compte, pas pour une organisation.
  Le partage entre comptes est hors périmètre.
- **Neuvième section, pas quatrième route.** Le Principe V limite l'interface à trois
  routes ; la bibliothèque est l'exception déjà justifiée, et les savoir-faire y ont leur
  place au même titre que les prompts et les modèles.
- **Sous-ensemble choisi pour le motion design.** Les vingt et une skills disponibles
  pèsent plus que le dépôt entier ; seules celles qui servent le montage narratif sont
  livrées. Lesquelles exactement est une décision d'implémentation, pas de spécification.
- **Les corps ne sont pas traduits**, comme pour le catalogue de prompts et la grammaire
  de mouvement : seuls les rôles et les déclencheurs le sont.

## Hors périmètre

- Partager une skill entre plusieurs comptes ou au niveau d'une organisation.
- Modifier une skill livrée sur place.
- Un éditeur de skills avec aperçu, validation de syntaxe ou coloration.
- Synchroniser automatiquement les skills de tiers avec leur dépôt d'origine.
- Rendre disponibles les skills globales de la machine : elles appartiennent à
  l'environnement de développement, pas au produit livré.
