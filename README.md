# Projet Final - Tests E2E Label'Vie

## Description du Projet

Pour ce projet, on a choisi de tester le site **Label'Vie** (https://www.labellevie.com), qui est un supermarché en ligne marocain assez complet.

On a décidé d'utiliser plusieurs technos pour avoir un projet solide :
- **Playwright** pour automatiser les tests (parce que c'est vraiment puissant pour du E2E)
- **Page Object Model** pour organiser le code proprement et pas se retrouver avec du spaghetti
- **BDD/Gherkin** avec Cucumber - comme ça même les non-devs peuvent lire les scénarios
- **TypeScript** parce qu'on préfère avoir des erreurs à la compilation plutôt qu'à l'exécution

---

## L'équipe

On est 4 sur ce projet :
- Luc Magonza
- Quentin Garreau
- Chesnel Ekogha
- Joachim Diles

---

## Le site qu'on teste

**Label'Vie** : https://www.labellevie.com

C'est un site de supermarché en ligne marocain. Ils ont pas mal de rayons :
- Primeur (fruits et légumes)
- Boulangerie
- Fromagerie et crèmerie  
- Boucherie et charcuterie
- Une section bio
- Plus de 8000 références au supermarché
- Et même du traiteur

Bref, y'a de quoi tester pas mal de fonctionnalités !

---

## Ce qu'on a testé

### Navigation
D'abord les étapes de base : accéder au site, naviguer dans les catégories (Primeur, Bio, etc.), et vérifier que les produits s'affichent bien.

### Recherche
On teste la barre de recherche avec différents mots-clés "pomme", "banane", "bio"... L'idée c'est de vérifier que les résultats sont cohérents avec ce qu'on cherche.

### Le Panier
Là on s'amuse à ajouter des produits au panier, vérifier le compteur qui s'incrémente, regarder si le panier vide affiche bien un message, etc.

### Parcours complets
On a aussi fait quelques scénarios de bout en bout, par exemple : rechercher un produit -> l'ajouter au panier -> consulter le panier. Ça simule vraiment ce que ferait un utilisateur.

---

## Structure du Projet

```
projet-final/
├── pages/                      # Page Objects (POM)
│   ├── HomePage.ts            # Page d'accueil
│   ├── CategoryPage.ts        # Page catégorie/liste produits
│   ├── CartPage.ts            # Page panier
│   └── SearchPage.ts          # Page résultats de recherche
├── features/                   # Scénarios Gherkin (BDD)
│   ├── navigation.feature     # Tests de navigation
│   ├── recherche.feature      # Tests de recherche
│   ├── panier.feature         # Tests du panier
│   └── parcours-complet.feature # Parcours E2E complets
├── steps/                      # Step Definitions (Cucumber)
│   └── labellevie.steps.ts    # Implémentation des étapes Gherkin
├── tests/                      # Tests Playwright classiques
│   ├── navigation.spec.ts     # Tests de navigation
│   ├── recherche.spec.ts      # Tests de recherche
│   └── panier.spec.ts         # Tests du panier
├── playwright.config.ts        # Configuration Playwright
├── tsconfig.json              # Configuration TypeScript
├── cucumber.json              # Configuration Cucumber
├── package.json               # Dépendances et scripts
└── README.md                  # Documentation
```

---

## Installation

**Ce qu'il faut avoir :**
- Node.js (version 18 minimum)
- Git

Ensuite:

1. Cloner le repo
```bash
git clone https://github.com/DluciusM/Projet-p-qualit-logiciel-.git
cd Projet-p-qualit-logiciel-/projet_fin_module/projet-final
```

2. Installer les dépendances
```bash
npm install
```

3. Installer les navigateurs pour Playwright (sinon ça marchera pas)
```bash
npx playwright install
```

---

## Lancer les tests

**Tests Playwright classiques :**

```bash
npm test                    # Lance tous les tests
npm run test:headed         # Pareil mais on voit le navigateur (pratique pour débugger)
npm run test:chromium       # Seulement sur Chrome
npm run test:firefox        # Seulement sur Firefox  
npm run test:debug          # Mode debug avec pause
npm run report              # Voir le rapport HTML
```

**Tests BDD (avec Cucumber) :**

```bash
npm run bdd                 # Tous les scénarios Gherkin
npm run bdd:chromium        # Juste sur Chromium
```

**Bonus - Codegen :**

```bash
npm run codegen             # Outil super pratique pour générer du code de test
```

---

## Technologies Utilisées

| Technologie | Version | Description |
|------------|---------|-------------|
| **Playwright** | ^1.56.1 | Framework de tests E2E multi-navigateurs |
| **Cucumber** | ^10.3.1 | Framework BDD pour Gherkin |
| **TypeScript** | ^5.3.3 | Langage typé pour un code robuste |
| **Node.js** | ≥18 | Environnement d'exécution JavaScript |

---

## Architecture (POM)

On a structuré le projet avec le **Page Object Model**, c'est un pattern assez classique en test E2E. L'idée c'est de :
- Séparer la logique de test de l'interaction avec la page
- Réutiliser le code (genre pas réécrire 50 fois le même sélecteur)
- Faciliter la maintenance - si un bouton change de classe CSS, on change juste dans le Page Object
- Rendre les tests plus lisibles

Un exemple simple :

```typescript
export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async searchProduct(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
    await this.searchInput.press('Enter');
  }
}
```

Comme ça dans les tests on fait juste `homePage.searchProduct('pomme')` au lieu de gérer les sélecteurs à chaque fois.

---

## BDD avec Gherkin

On a aussi écrit les tests en **Gherkin**, ça permet d'écrire les scénarios en langage naturel. L'avantage c'est que n'importe qui peut les lire et comprendre ce que le test fait, même sans être dev.

Voilà un exemple :

```gherkin
Scénario: Rechercher un produit existant
  Étant donné que je suis sur la page d'accueil de Label'Vie
  Quand je recherche "pomme"
  Alors des résultats de recherche doivent être affichés
```

C'est quand même plus sympa à lire qu'un fichier de code classique non ?

---

## Configuration

**Navigateurs :**
On teste sur Chromium (Chrome/Edge) et Firefox.

**Timeouts :**
On a mis des timeouts assez larges pour éviter les faux positifs :
- 60s pour un test complet
- 15s pour une action
- 30s pour la navigation
- 10s pour les assertions

**Debug :**
Quand un test plante, Playwright capture automatiquement des screenshots et des vidéos. Pratique pour comprendre ce qui s'est passé.

---

## Les galères qu'on a eu

### Le popup de cookies
Premier truc chiant : la popup de cookies qui apparaît au début et qui bloque tout. On a fait une méthode `acceptCookies()` qui essaye de cliquer dessus si elle existe, sinon tant pis on continue.

```typescript
async acceptCookies() {
  try {
    if (await this.cookieAcceptButton.isVisible({ timeout: 3000 })) {
      await this.cookieAcceptButton.click();
      await this.page.waitForTimeout(500);
    }
  } catch (error) {
    // Si le bouton n'existe pas, on continue
  }
}
```

### Les sélecteurs qui changent
Label'Vie a des classes CSS un peu dynamiques et une structure HTML pas toujours évidente. Du coup on a utilisé plusieurs stratégies :
- Privilégier les sélecteurs sémantiques quand c'est possible
- Mettre plusieurs alternatives et prendre le premier qui match
- Utiliser des wildcards pour être plus flexible

Exemple :
```typescript
private readonly searchInput = this.page.locator(
  'input[type="search"], input[name="search"], input[placeholder*="Recherch"]'
).first();
```
Comme ça si un sélecteur marche pas, on en a d'autres en backup.

### Le chargement asynchrone
Le site charge pas mal de trucs en asynchrone (produits, images...). Pour gérer ça on utilise `waitForLoadState('networkidle')` qui attend que le réseau se calme. Et puis on a mis des timeouts assez larges pour pas que ça timeout trop vite.

### Le bouton "Ajouter au panier" invisible
Un truc un peu relou : le bouton pour ajouter au panier n'apparaît que quand on survole le produit avec la souris. Du coup il faut :
1. Scroller jusqu'au produit
2. Faire un hover dessus
3. Attendre que le bouton apparaisse
4. Cliquer

Si on fait pas ça dans l'ordre, le bouton est pas cliquable.

### Partager le contexte entre les étapes BDD
Avec Cucumber, chaque étape (Given/When/Then) est une fonction séparée. Il faut donc partager le browser et les Page Objects entre elles. On a utilisé des variables globales et des hooks :
- `Before()` pour initialiser le browser avant chaque scénario
- `After()` pour fermer proprement
- Variables globales pour partager entre les étapes

Pas hyper élégant mais ça marche bien.

### Site en production = ça bouge
Label'Vie c'est un vrai site e-commerce en prod, donc ça change régulièrement (promos, nouveaux produits, maintenance...). Pour limiter la casse :
- On a fait du POM pour isoler les changements
- Sélecteurs assez génériques
- Tests pas dépendants d'un produit précis
- Gestion d'erreur avec timeouts et plans B

### Installation des navigateurs
Playwright installe pas les navigateurs automatiquement avec `npm install`, il faut faire :
```bash
npx playwright install
```
Sinon ça marchera pas (on l'a appris à nos dépens).

### Headless vs Headed
Par défaut les tests tournent en mode headless (sans afficher le navigateur). C'est rapide mais galère pour débugger. Du coup on peut passer en mode headed avec `npm run test:headed` pour voir ce qui se passe. Y'a même un `slowMo: 300` pour ralentir les actions.

---

## Où on en est

Le test de validation de base marche nickel :
```bash
  Page d'accueil accessible !
```

Par contre, vu que Label'Vie est un site en prod avec une structure HTML un peu complexe, **certains sélecteurs ont besoin d'être affinés**. Le projet est bien structuré, y'a juste à :

1. Utiliser `npx playwright codegen https://www.labellevie.com` pour récupérer les bons sélecteurs
2. Mettre à jour les Page Objects
3. Tester au fur et à mesure

Une fois ça fait, tous les tests devraient passer sans problème.

---

## Git

On a mis un `.gitignore` pour pas commit de la merde :
```
node_modules/          # Sinon le repo fait 200Mo
/test-results/         
/playwright-report/    
cucumber-report.*
.DS_Store              # Merci macOS...
*.log
```

Pour les commits, on essaye de faire des messages clairs :
```bash
git commit -m "feat: ajout HomePage avec navigation"
git commit -m "fix: correction sélecteur bouton panier"
git commit -m "docs: mise à jour README"
```

On utilise les préfixes classiques : feat, fix, docs, refactor, test, chore.

---

## Concepts Appliqués

| Concept | Description | Application |
|---------|-------------|-------------|
| **E2E Testing** | Tests du parcours utilisateur complet | Tous les scénarios testent des actions réelles |
| **POM** | Architecture Page Object Model | 4 classes de pages (Home, Category, Cart, Search) |
| **BDD** | Behavior Driven Development | 4 fichiers .feature avec 10+ scénarios |
| **Gherkin** | Langage naturel pour les tests | Syntaxe Given/When/Then en français |
| **Automation** | Tests automatisés reproductibles | Exécution en CI/CD possible |

---

## Ressources utiles

Si vous voulez creuser :
- [Doc Playwright](https://playwright.dev/)
- [Doc Cucumber](https://cucumber.io/docs/cucumber/)
- [Référence Gherkin](https://cucumber.io/docs/gherkin/reference/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## Ce qu'on pourrait améliorer

Si on avait plus de temps, on pourrait ajouter :
- Tests de connexion/inscription
- Tests du tunnel de paiement
- Tests responsive (mobile/tablette)
- Tests de performance
- Tests d'accessibilité

Mais bon, c'était quand-même sympa !

---

---

**Projet réalisé en janvier 2026**  
Dans le cadre du module Qualité Logicielle - 5A ESIEA  
Encadré par Youssef Touati

Repo : https://github.com/DluciusM/Projet-p-qualit-logiciel-
