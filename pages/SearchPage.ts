import { Page, expect } from '@playwright/test';

// Page Object pour les résultats de recherche
export class SearchPage {
  constructor(private page: Page) {}

  // Sélecteurs des résultats
  private readonly searchResults = this.page.locator('[class*="search-result"], [class*="product"]');
  private readonly noResultsMessage = this.page.locator('text=/aucun.*résultat/i, text=/no.*result/i');
  private readonly resultCount = this.page.locator('[class*="result-count"], [class*="nb-products"]');
  
  // Attend que les résultats s'affichent
  async waitForResults() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
  }

  // Vérifie qu'on a des résultats
  async expectResultsDisplayed() {
    await this.waitForResults();
    const hasResults = await this.searchResults.first().isVisible({ timeout: 5000 }).catch(() => false);
    expect(hasResults).toBeTruthy();
  }

  // Vérifie qu'y a rien trouvé
  async expectNoResults() {
    await this.waitForResults();
    const noResults = await this.noResultsMessage.isVisible({ timeout: 5000 }).catch(() => false);
    const resultCount = await this.searchResults.count();
    
    expect(noResults || resultCount === 0).toBeTruthy();
  }

  // Compte le nombre de résultats
  async getResultsCount(): Promise<number> {
    await this.waitForResults();
    return await this.searchResults.count();
  }

  // Vérifie que l'URL contient bien le terme recherché
  async expectSearchContainsTerm(searchTerm: string) {
    const url = this.page.url();
    expect(url.toLowerCase()).toContain(searchTerm.toLowerCase());
  }
}
