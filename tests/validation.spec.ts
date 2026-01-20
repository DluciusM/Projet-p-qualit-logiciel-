import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

// Test rapide pour valider que le site fonctionne
test('Le site Label\'Vie est accessible', async ({ page }) => {
  const homePage = new HomePage(page);
  
  // On va sur le site
  await homePage.goto();
  await homePage.acceptCookies();
  await homePage.expectHomePageVisible();
  
  // Double check que la page a bien un titre
  expect(await page.title()).toBeTruthy();
  console.log('✅ Page d\'accueil accessible !');
});
