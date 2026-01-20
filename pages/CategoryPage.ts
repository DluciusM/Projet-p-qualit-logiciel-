import { Page, expect } from '@playwright/test';

// Page Object pour les pages de catégories (Primeur, Bio, etc.)
export class CategoryPage {
  constructor(private page: Page) {}

  // Sélecteurs pour les produits
  private readonly productCards = this.page.locator('[class*="product"], [data-testid*="product"]');
  private readonly firstProduct = this.productCards.first();
  private readonly sortDropdown = this.page.locator('select[name*="sort"], [class*="sort"]');
  
  // Récupère un produit par son index (0 = premier produit)
  private getProductByIndex(index: number) {
    return this.productCards.nth(index);
  }

  // Trouve un produit par son nom
  private getProductByName(productName: string) {
    return this.page.locator(`[class*="product"]:has-text("${productName}")`).first();
  }

  // Trouve le bouton "Ajouter au panier" d'un produit
  private getAddToCartButton(productLocator: any) {
    return productLocator.locator('button:has-text("Ajouter"), button[class*="add"]').first();
  }

  // Attend que les produits soient chargés
  async waitForProductsToLoad() {
    await this.page.waitForLoadState('networkidle');
    await expect(this.productCards.first()).toBeVisible({ timeout: 10000 });
  }

  // Ajoute le premier produit visible au panier
  async addFirstProductToCart() {
    await this.waitForProductsToLoad();
    const firstProduct = this.getProductByIndex(0);
    await firstProduct.scrollIntoViewIfNeeded();
    
    // Il faut hover pour que le bouton apparaisse
    await firstProduct.hover();
    await this.page.waitForTimeout(500);
    
    const addButton = this.getAddToCartButton(firstProduct);
    await addButton.click();
    await this.page.waitForTimeout(1000); // Laisse le temps à l'ajout
  }

  // Ajoute un produit spécifique au panier
  async addProductToCart(productName: string) {
    await this.waitForProductsToLoad();
    const product = this.getProductByName(productName);
    await product.scrollIntoViewIfNeeded();
    await product.hover();
    await this.page.waitForTimeout(500);
    
    const addButton = this.getAddToCartButton(product);
    await addButton.click();
    await this.page.waitForTimeout(1000);
  }

  // Clique sur un produit pour voir sa fiche
  async clickProductDetails(index: number = 0) {
    const product = this.getProductByIndex(index);
    await product.scrollIntoViewIfNeeded();
    await product.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Trie les produits (si y'a une option de tri)
  async sortProducts(sortOption: string) {
    if (await this.sortDropdown.isVisible({ timeout: 3000 })) {
      await this.sortDropdown.selectOption({ label: sortOption });
      await this.page.waitForLoadState('networkidle');
    }
  }

  /**
   * Obtenir le nombre de produits affichés
   */
  async getProductCount(): Promise<number> {
    await this.waitForProductsToLoad();
    return await this.productCards.count();
  }

  /**
   * Obtenir le nom du premier produit
   */
  async getFirstProductName(): Promise<string> {
    await this.waitForProductsToLoad();
    const nameElement = this.firstProduct.locator('[class*="name"], [class*="title"], h3, h4').first();
    return await nameElement.textContent() || '';
  }

  /**
   * Vérifier qu'au moins un produit est affiché
   */
  async expectProductsVisible() {
    await expect(this.firstProduct).toBeVisible({ timeout: 10000 });
    const count = await this.getProductCount();
    expect(count).toBeGreaterThan(0);
  }
}
