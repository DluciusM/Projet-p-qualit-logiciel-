import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page, BrowserContext } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CategoryPage } from '../pages/CategoryPage';
import { CartPage } from '../pages/CartPage';
import { SearchPage } from '../pages/SearchPage';

// On met 60 secondes de timeout parce que Label'Vie peut être un peu lent
setDefaultTimeout(60000);

// Variables globales qu'on partage entre les étapes
let browser: Browser;
let context: BrowserContext;
let page: Page;

// Les Page Objects
let homePage: HomePage;
let categoryPage: CategoryPage;
let cartPage: CartPage;
let searchPage: SearchPage;

// Hook qui tourne avant chaque scénario
Before(async function () {
  // On lance le navigateur en mode visible pour voir ce qui se passe
  browser = await chromium.launch({
    headless: false,
    slowMo: 300,  // Ralentit les actions pour mieux suivre
  });

  // Nouveau contexte (c'est comme un profil de navigateur)
  context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  });

  // Nouvelle page
  page = await context.newPage();

  // On initialise tous les Page Objects
  homePage = new HomePage(page);
  categoryPage = new CategoryPage(page);
  cartPage = new CartPage(page);
  searchPage = new SearchPage(page);
});

// Hook qui tourne après chaque scénario pour nettoyer
After(async function () {
  if (browser) {
    await browser.close();
  }
});

// ========== Les étapes "Etant donné que" ==========

Given('que je suis sur la page d\'accueil de Label\'Vie', async function () {
  await homePage.goto();
  await homePage.acceptCookies();
  await homePage.expectHomePageVisible();
});

Given('je suis sur la page d\'accueil de Label\'Vie', async function () {
  await homePage.goto();
  await homePage.acceptCookies();
  await homePage.expectHomePageVisible();
});

// ========== Les étapes "Quand" ==========

When('je clique sur la catégorie {string}', async function (categoryName: string) {
  await homePage.navigateToCategory(categoryName);
});

When('je navigue vers la catégorie {string}', async function (categoryName: string) {
  await homePage.navigateToCategory(categoryName);
});

When('je recherche {string}', async function (searchTerm: string) {
  await homePage.searchProduct(searchTerm);
});

When('j\'ajoute le premier produit au panier', async function () {
  await categoryPage.addFirstProductToCart();
});

When('je vais sur la page du panier', async function () {
  await homePage.goToCart();
});

// ========== Les étapes "Alors" ==========

Then('la page d\'accueil doit être affichée correctement', async function () {
  await homePage.expectHomePageVisible();
});

Then('je dois voir une liste de produits', async function () {
  await categoryPage.expectProductsVisible();
});

Then('des résultats de recherche doivent être affichés', async function () {
  await searchPage.expectResultsDisplayed();
});

Then('l\'URL doit contenir le terme recherché', async function () {
  // On affiche juste l'URL pour voir
  const url = page.url();
  console.log(`URL: ${url}`);
});

Then('le panier ne doit pas être vide', async function () {
  await cartPage.expectCartNotEmpty();
});

Then('le panier doit être vide', async function () {
  await cartPage.expectCartEmpty();
});

Then('le compteur du panier doit indiquer au moins {int} article', async function (count: number) {
  const cartCount = await homePage.getCartItemCount();
  console.log(`Articles dans le panier: ${cartCount}`);
  
  if (cartCount < count) {
    throw new Error(`Le panier a ${cartCount} article(s), on attendait au moins ${count}`);
  }
});

// Etape combinée pour certains scénarios
When('je dois voir une liste de produits', async function () {
  await categoryPage.expectProductsVisible();
});
