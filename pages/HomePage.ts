import { Page, expect } from '@playwright/test';

// Page Object pour la page d'accueil
// On regroupe ici tous les sélecteurs et actions de la homepage
export class HomePage {
  constructor(private page: Page) {}

  // Les sélecteurs - on en met plusieurs pour être flexible
  private readonly cookieAcceptButton = this.page.locator('button:has-text("Accepter")');
  private readonly searchInput = this.page.locator('input[type="search"], input[name="search"], input[placeholder*="Recherch"], #search-input, [data-testid="search-input"]').first();
  private readonly cartIcon = this.page.locator('a[href*="panier"], [data-testid="cart"], [class*="cart"]').first();
  private readonly loginLink = this.page.locator('text=Connexion, a:has-text("Connexion")').first();
  
  // Récupère le lien d'une catégorie par son nom
  private getCategoryLink(categoryName: string) {
    return this.page.locator(`a:has-text("${categoryName}")`).first();
  }

  // Va sur la page d'accueil et attend que tout soit chargé
  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  // Gère le popup de cookies (s'il existe)
  async acceptCookies() {
    try {
      if (await this.cookieAcceptButton.isVisible({ timeout: 3000 })) {
        await this.cookieAcceptButton.click();
        await this.page.waitForTimeout(500);
      }
    } catch (error) {
      // Pas de popup ? Tant pis, on continue
    }
  }

  // Recherche un produit via la barre de recherche
  async searchProduct(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
    await this.searchInput.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  // Clique sur une catégorie (Primeur, Bio, etc.)
  async navigateToCategory(categoryName: string) {
    await this.getCategoryLink(categoryName).click();
    await this.page.waitForLoadState('networkidle');
  }

  // Va voir le panier
  async goToCart() {
    await this.cartIcon.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Clique sur le bouton de connexion
  async clickLogin() {
    await this.loginLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Vérifie qu'on est bien sur la page d'accueil
  async expectHomePageVisible() {
    await expect(this.page).toHaveURL(/labellevie\.com/);
    await this.page.waitForLoadState('domcontentloaded');
    const pageTitle = await this.page.title();
    expect(pageTitle).toBeTruthy();
  }

  // Regarde combien d'articles y'a dans le panier
  async getCartItemCount(): Promise<number> {
    const cartText = await this.cartIcon.textContent();
    const match = cartText?.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  }
}
