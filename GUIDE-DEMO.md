# Guide de Démonstration - Projet Label'Vie

## 🎯 Objectif de la Démo
Montrer que le projet fonctionne bien en local, que les tests sont automatisés, et qu'on a une bonne couverture des fonctionnalités du site Label'Vie.

---

## ⚙️ Préparation (À faire AVANT la démo)

### 1. Installation des dépendances
```bash
cd /Users/chesnelekoghamacos/Downloads/projet_qualité_logicielle_5A_ESIEA/Projet-p-qualit-logiciel-
git checkout projet-final
npm install
npx playwright install
```

**Pourquoi ?** Ça installe tous les packages Node.js et les navigateurs nécessaires pour Playwright.

### 2. Vérification rapide que tout marche
```bash
npm test tests/navigation.spec.ts -- --project=chromium
```

Si ça passe sans erreur, c'est bon ! Sinon, debug avant la démo.

---

## 🎬 Scénario de Démonstration

### **PARTIE 1 : Présentation du Projet (2-3 min)**

**Ce que tu dis :**
> "On a développé une suite de tests E2E pour le site Label'Vie, un supermarché en ligne marocain. On utilise Playwright pour l'automatisation, le Page Object Model pour structurer le code, et BDD/Gherkin pour avoir des tests lisibles par tous."

**Ce que tu montres :**
1. Ouvre VS Code avec le dossier du projet
2. Montre rapidement l'arborescence :
   - `pages/` → Page Objects
   - `tests/` → Tests Playwright
   - `features/` → Scénarios Gherkin
   - `steps/` → Implémentation des steps

3. Ouvre un fichier exemple (ex: `features/navigation.feature`) :
   ```gherkin
   Fonctionnalité: Naviguer sur Label'Vie
     Scénario: Accéder à la page Primeur
       Étant donné que je suis sur la page d'accueil
       Quand je clique sur "Primeur"
       Alors je vois des produits
   ```

**Commentaire :**
> "Avec Gherkin, même un non-développeur peut comprendre ce qu'on teste."

---

### **PARTIE 2 : Démonstration Tests Playwright (5-7 min)**

#### Test 1 : Navigation (avec interface visible)
```bash
npm run test:headed tests/navigation.spec.ts
```

**Ce qui va se passer :**
- Une fenêtre Chrome va s'ouvrir
- Le navigateur va aller sur https://www.labellevie.com
- Il va cliquer sur "Primeur" automatiquement
- Il va vérifier que des produits s'affichent
- Le test va passer (ou échouer si le site a un problème)

**Ce que tu dis pendant l'exécution :**
> "Là, vous voyez Playwright qui pilote automatiquement le navigateur. Il navigue, clique, et vérifie que les produits apparaissent bien. Si le site change ou plante, le test échoue immédiatement."

#### Test 2 : Recherche
```bash
npm run test:headed tests/recherche.spec.ts
```

**Ce qui va se passer :**
- Le navigateur ouvre Label'Vie
- Tape "pomme" dans la barre de recherche
- Appuie sur Entrée
- Vérifie que des résultats contenant "pomme" apparaissent

**Ce que tu dis :**
> "On teste la recherche avec différents mots-clés. Ici, on cherche 'pomme' et on vérifie que les résultats sont cohérents."

#### Test 3 : Panier (le plus impressionnant)
```bash
npm run test:headed tests/panier.spec.ts
```

**Ce qui va se passer :**
- Ouvre le site
- Navigue vers Primeur
- Ajoute un produit au panier
- Vérifie que le panier contient bien 1 article
- Peut même vider le panier

**Ce que tu dis :**
> "Ce test simule un parcours utilisateur complet : navigation, ajout au panier, et vérification. C'est le genre de test qui détecte vite si l'ajout au panier est cassé."

---

### **PARTIE 3 : Tests BDD/Gherkin (3-4 min)**

#### Lancer les tests Cucumber
```bash
npm run bdd
```

**Ce qui va se passer :**
- Les tests s'exécutent en mode headless (pas de fenêtre visible)
- Dans le terminal, tu vois :
  ```
  Feature: Naviguer sur Label'Vie
    ✓ Accéder à la page Primeur
    ✓ Accéder à la catégorie Bio
  
  Feature: Rechercher des produits
    ✓ Rechercher "pomme"
    ✓ Rechercher "banane"
  
  4 scenarios (4 passed)
  12 steps (12 passed)
  ```

**Ce que tu dis :**
> "Les tests BDD permettent d'avoir des scénarios métier. On peut montrer ça à un Product Owner qui ne code pas, il comprendra directement ce qu'on teste."

**Bonus : Montre un fichier feature**
Ouvre `features/parcours-complet.feature` et lis le scénario :
```gherkin
Scénario: Parcours complet d'achat
  Étant donné que je suis sur la page d'accueil
  Quand je cherche "banane"
  Et que j'ajoute un produit au panier
  Alors le panier contient 1 article
```

**Commentaire :**
> "C'est comme raconter une histoire. Ça devient de la documentation vivante du projet."

---

### **PARTIE 4 : Rapport de Tests (2-3 min)**

#### Générer et afficher le rapport HTML
```bash
npm run test
npm run report
```

**Ce qui va se passer :**
- Tous les tests s'exécutent (ça prend ~30-60 secondes)
- Un navigateur s'ouvre avec un rapport HTML magnifique
- Tu vois :
  - ✅ Tests passés en vert
  - ❌ Tests échoués en rouge (s'il y en a)
  - ⏱️ Durée d'exécution
  - 📸 Captures d'écran en cas d'échec
  - 🎥 Vidéos des tests
  - 📊 Timeline détaillée

**Ce que tu montres :**
1. Clique sur un test réussi → Voir les étapes détaillées
2. Clique sur les screenshots → Montrer les captures d'écran
3. Si un test a échoué (c'est rare), montre la vidéo de l'échec

**Ce que tu dis :**
> "Playwright génère automatiquement des rapports détaillés. Si un test échoue, on a les screenshots et même des vidéos pour comprendre pourquoi."

---

### **PARTIE 5 : Mode Debug (BONUS - si temps restant)**

#### Lancer un test en mode debug
```bash
npm run test:debug tests/panier.spec.ts
```

**Ce qui va se passer :**
- Une fenêtre de debug Playwright s'ouvre
- Tu peux exécuter le test pas à pas
- Voir l'état du DOM à chaque étape
- Inspecter les éléments

**Ce que tu dis :**
> "Quand on développe les tests, on peut les exécuter en mode debug pour comprendre ce qui se passe à chaque étape. C'est super pratique pour identifier les sélecteurs CSS."

---

## 🗣️ Questions Fréquentes & Réponses

### Q1 : "Pourquoi Playwright et pas Selenium ?"
**Réponse :**
> "Playwright est plus moderne, plus rapide, et gère mieux les applications web complexes. Il attend automatiquement que les éléments soient disponibles, ce qui évite beaucoup de bugs flaky."

### Q2 : "C'est quoi le Page Object Model ?"
**Réponse :**
> "C'est un pattern de conception. Au lieu d'écrire les sélecteurs CSS directement dans les tests, on les encapsule dans des classes. Ça rend le code plus maintenable. Si Label'Vie change son design, je modifie juste le Page Object, pas tous les tests."

**Montre :**
Ouvre `pages/HomePage.ts` :
```typescript
async goToPrimeur() {
  await this.page.getByRole('link', { name: /primeur/i }).click();
}
```

> "Tous mes tests utilisent cette méthode. Si le bouton 'Primeur' change, je modifie juste cette ligne."

### Q3 : "Combien de temps prennent les tests ?"
**Réponse :**
> "La suite complète prend environ 1-2 minutes. On peut les paralléliser pour gagner du temps. En CI/CD, ils tourneraient automatiquement à chaque commit."

### Q4 : "Ça teste sur quels navigateurs ?"
**Réponse :**
> "Chromium, Firefox et WebKit (Safari). Playwright supporte tous les principaux navigateurs. On peut lancer les tests sur tous en parallèle avec une seule commande."

**Montre :**
```bash
npm test -- --project=firefox  # Firefox
npm test -- --project=webkit   # Safari
```

### Q5 : "Les tests sont stables ?"
**Réponse :**
> "Oui, Playwright gère automatiquement les attentes (waiting). On a aussi ajouté des timeouts et des retry dans la config. Si le site est lent, les tests attendent. Mais si un élément n'apparaît jamais, le test échoue proprement."

---

## 📋 Checklist de Démo (à imprimer)

Avant la démo :
- [ ] `npm install` fait
- [ ] `npx playwright install` fait
- [ ] Un test de vérification rapide passé
- [ ] VS Code ouvert avec le projet
- [ ] Connexion internet stable
- [ ] Fermer les applications inutiles (pour la performance)

Pendant la démo :
- [ ] Présenter le contexte (2 min)
- [ ] Montrer la structure du projet (1 min)
- [ ] Lancer tests Playwright headed (5-7 min)
- [ ] Lancer tests BDD/Gherkin (3 min)
- [ ] Montrer le rapport HTML (2-3 min)
- [ ] Répondre aux questions (5 min)

---

## 🎯 Points à Souligner

1. **Tests automatisés** → Gain de temps, pas besoin de tester à la main
2. **Page Object Model** → Code maintenable et réutilisable
3. **BDD/Gherkin** → Tests lisibles par tous (métier + tech)
4. **Rapports détaillés** → Screenshots, vidéos, timeline
5. **Multi-navigateurs** → Chromium, Firefox, WebKit
6. **CI/CD ready** → Peut tourner automatiquement sur GitHub Actions

---

## 🚨 Problèmes Potentiels & Solutions

### Problème 1 : "Le site Label'Vie est lent/down"
**Solution :**
> "C'est justement l'intérêt des tests E2E : ils détectent si le site a un problème. En environnement réel, on aurait un environnement de test stable. Mais là, on voit que notre suite de tests peut identifier les problèmes du site."

### Problème 2 : "Un test échoue pendant la démo"
**Solution :**
> "Pas de panique ! C'est normal en E2E, les sites changent. Je vais montrer comment on debug."
Puis lance :
```bash
npm run test:debug tests/[test-qui-echoue].spec.ts
```

### Problème 3 : "Pas d'internet"
**Solution :**
Prépare des vidéos/screenshots des tests qui fonctionnent, ou montre juste le code et explique ce qui se passerait.

---

## 💡 Script de Présentation (Exemple)

> "Bonjour ! Aujourd'hui, je vais vous montrer notre projet de tests E2E sur Label'Vie. On a développé une suite de tests automatisés pour vérifier que les fonctionnalités principales du site fonctionnent bien.
>
> On va voir ensemble :
> 1. Comment les tests s'exécutent automatiquement
> 2. Comment on teste la navigation, la recherche et le panier
> 3. Les rapports détaillés qu'on obtient
>
> C'est parti !"

[Lancer la démo selon le scénario ci-dessus]

> "Voilà ! En résumé, on a une suite de tests complète, automatisée, et maintenable. En environnement de production, ces tests tourneraient automatiquement à chaque déploiement pour détecter les régressions. Merci pour votre attention, des questions ?"

---

## 📚 Ressources pour Approfondir

Si l'enseignant demande plus de détails :
- `GUIDE-RAPIDE.md` → Installation et premiers pas
- `CHECKLIST.md` → Vérifications de qualité
- `README.md` → Documentation complète du projet
- `playwright.config.ts` → Configuration des tests
- Dossier `pages/` → Implémentation des Page Objects
- Dossier `features/` → Scénarios Gherkin

---

**Durée totale estimée : 15-20 minutes**

Bonne démo ! 🚀
