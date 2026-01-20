import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CategoryPage } from '../pages/CategoryPage';

test.describe('Navigation sur le site', () => {
  // Avant chaque test, on va sur le site
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.acceptCookies();
  });

  test('La page d\'accueil s\'affiche bien', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.expectHomePageVisible();
  });

  test('On peut aller dans Primeur', async ({ page }) => {
    const homePage = new HomePage(page);
    const categoryPage = new CategoryPage(page);
    
    await homePage.navigateToCategory('Primeur');
    await categoryPage.expectProductsVisible();
    
    // Vérifie qu'il y a des produits
    const productCount = await categoryPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test('La Boutique bio fonctionne', async ({ page }) => {
    const homePage = new HomePage(page);
    const categoryPage = new CategoryPage(page);
    
    await homePage.navigateToCategory('Boutique bio');
    await categoryPage.expectProductsVisible();
  });

  test('Le Supermarché est accessible', async ({ page }) => {
    const homePage = new HomePage(page);
    const categoryPage = new CategoryPage(page);
    
    await homePage.navigateToCategory('Supermarché');
    await categoryPage.expectProductsVisible();
  });
});
