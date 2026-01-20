import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';

test.describe('Recherche de produits', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.acceptCookies();
  });

  test('Rechercher "pomme" marche bien', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchPage = new SearchPage(page);
    
    await homePage.searchProduct('pomme');
    await searchPage.expectResultsDisplayed();
    
    // On vérifie qu'il y a au moins un résultat
    const resultCount = await searchPage.getResultsCount();
    expect(resultCount).toBeGreaterThan(0);
  });

  test('Rechercher "bio" ramène des résultats', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchPage = new SearchPage(page);
    
    await homePage.searchProduct('bio');
    await searchPage.expectResultsDisplayed();
  });

  test('La recherche "banane" fonctionne', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchPage = new SearchPage(page);
    
    await homePage.searchProduct('banane');
    await searchPage.expectResultsDisplayed();
    
    // L'URL doit contenir "banane"
    await searchPage.expectSearchContainsTerm('banane');
  });

  test('On peut chercher des avocats', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchPage = new SearchPage(page);
    
    await homePage.searchProduct('avocat');
    await searchPage.expectResultsDisplayed();
  });
});
