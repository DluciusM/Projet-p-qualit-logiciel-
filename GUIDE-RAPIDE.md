# Guide Rapide - Projet Final Label'Vie

## 🚀 Démarrage Rapide

```bash
# 1. Se placer dans le dossier du projet
cd projet-final

# 2. Installer les dépendances
npm install

# 3. Installer les navigateurs
npx playwright install

# 4. Lancer un test de validation
npm test tests/validation.spec.ts
```

## 📋 Commandes Essentielles

```bash
# Tests Playwright
npm test                    # Tous les tests
npm run test:headed         # Mode visible
npm run test:chromium       # Chromium uniquement
npm run test:debug          # Mode debug

# Tests BDD (Cucumber)
npm run bdd                 # Tous les scénarios BDD

# Rapports
npm run report              # Rapport HTML Playwright

# Codegen
npm run codegen             # Enregistrer de nouveaux tests
```

## 📁 Fichiers Principaux

- `pages/` - Classes Page Object (HomePage, CategoryPage, CartPage, SearchPage)
- `features/` - Scénarios Gherkin (.feature)
- `steps/` - Step definitions (labellevie.steps.ts)
- `tests/` - Tests Playwright classiques (.spec.ts)
- `playwright.config.ts` - Configuration Playwright
- `cucumber.json` - Configuration Cucumber
- `README.md` - Documentation complète

## ✅ Scénarios Testés

### Navigation
- Page d'accueil
- Catégories (Primeur, Bio, Supermarché)

### Recherche
- Recherche de produits
- Affichage des résultats

### Panier
- Ajout de produits
- Vérification du panier
- Compteur d'articles

### Parcours Complet
- Navigation → Recherche → Panier

## 🎯 Critères de Réussite

✅ Projet fonctionnel et exécutable  
✅ Scénarios Gherkin lisibles  
✅ Architecture POM respectée  
✅ Code clair et maintenable  
✅ Documentation complète  
✅ Tests couvrant plusieurs parcours utilisateurs  

## 📊 Structure des Tests

```
Tests Playwright (tests/*.spec.ts)
├── validation.spec.ts      → Test de base
├── navigation.spec.ts      → Tests de navigation
├── recherche.spec.ts       → Tests de recherche
└── panier.spec.ts          → Tests du panier

Tests BDD (features/*.feature)
├── navigation.feature      → Scénarios de navigation
├── recherche.feature       → Scénarios de recherche
├── panier.feature          → Scénarios du panier
└── parcours-complet.feature → Parcours E2E
```

## 🐛 Dépannage

### Erreur "Browser not found"
```bash
npx playwright install
```

### Erreur "Cannot find module"
```bash
npm install
```

### Les tests sont trop lents
```bash
# Désactiver slowMo dans labellevie.steps.ts
slowMo: 0  # au lieu de 300
```

### Problème avec les cookies
Le site utilise une popup de cookies. La méthode `acceptCookies()` la gère automatiquement.

## 📧 Support

En cas de problème, consultez :
- Le fichier README.md complet
- La documentation Playwright : https://playwright.dev/
- La documentation Cucumber : https://cucumber.io/

---

**Équipe** : Luc Magonza, Quentin Garreau, Chesnel Ekogha, Joachim Diles  
**Date** : Janvier 2026  
**Cadre** : Projet Qualité Logicielle 5A ESIEA
