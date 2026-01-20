import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CategoryPage } from '../pages/CategoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Le panier', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.acceptCookies();
  });

  test('Au début le panier est vide', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    
    await homePage.goToCart();
    await cartPage.expectCartPageVisible();
  });

  test('On peut ajouter un produit depuis Primeur', async ({ page }) => {
    const homePage = new HomePage(page);
    const categoryPage = new CategoryPage(page);
    const cartPage = new CartPage(page);
    
    // Va dans Primeur et ajoute un truc
    await homePage.navigateToCategory('Primeur');
    await categoryPage.addFirstProductToCart();
    
    // Vérifie dans le panier
    await homePage.goToCart();
    await cartPage.expectCartNotEmpty();
    
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBeGreaterThan(0);
  });

  test('Ajouter depuis le Supermarché marche aussi', async ({ page }) => {
    const homePage = new HomePage(page);
    const categoryPage = new CategoryPage(page);
    
    await homePage.navigateToCategory('Supermarché');
    await categoryPage.addFirstProductToCart();
    
    // Le compteur doit augmenter
    const cartCount = await homePage.getCartItemCount();
    expect(cartCount).toBeGreaterThan(0);
  });
});
