import { Page, expect } from '@playwright/test';

// Page Object pour le panier
export class CartPage {
  constructor(private page: Page) {}

  // Sélecteurs du panier
  private readonly cartItems = this.page.locator('[class*="cart-item"], [data-testid*="cart-item"]');
  private readonly emptyCartMessage = this.page.locator('text=/panier.*vide/i');
  private readonly checkoutButton = this.page.locator('button:has-text("Commander"), button:has-text("Passer")');
  private readonly totalPrice = this.page.locator('[class*="total"], [class*="price-total"]');
  
  // Récupère un article du panier
  private getCartItemByIndex(index: number) {
    return this.cartItems.nth(index);
  }

  // Trouve le bouton supprimer d'un article
  private getRemoveButton(itemLocator: any) {
    return itemLocator.locator('button:has-text("Supprimer"), button[class*="remove"], button[class*="delete"]').first();
  }

  // Trouve le champ de quantité
  private getQuantityInput(itemLocator: any) {
    return itemLocator.locator('input[type="number"], input[class*="quantity"]').first();
  }

  // Attend que le panier charge
  async waitForCartToLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
  }

  // Vérifie qu'il y a au moins un article
  async expectCartNotEmpty() {
    await this.waitForCartToLoad();
    const count = await this.cartItems.count();
    expect(count).toBeGreaterThan(0);
  }

  // Vérifie que le panier est vide
  async expectCartEmpty() {
    await this.waitForCartToLoad();
    const isEmpty = await this.emptyCartMessage.isVisible({ timeout: 5000 }).catch(() => false);
    const itemCount = await this.cartItems.count();
    
    expect(isEmpty || itemCount === 0).toBeTruthy();
  }

  // Compte les articles dans le panier
  async getCartItemCount(): Promise<number> {
    await this.waitForCartToLoad();
    return await this.cartItems.count();
  }

  // Supprime le premier article
  async removeFirstItem() {
    await this.waitForCartToLoad();
    const firstItem = this.getCartItemByIndex(0);
    const removeButton = this.getRemoveButton(firstItem);
    
    await removeButton.click();
    await this.page.waitForTimeout(1000);
  }

  // Change la quantité du premier article
  async updateFirstItemQuantity(quantity: number) {
    await this.waitForCartToLoad();
    const firstItem = this.getCartItemByIndex(0);
    const quantityInput = this.getQuantityInput(firstItem);
    
    await quantityInput.fill(quantity.toString());
    await quantityInput.press('Enter');
    await this.page.waitForTimeout(1000);
  }

  /**
   * Cliquer sur le bouton commander/checkout
   */
  async proceedToCheckout() {
    await this.checkoutButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Obtenir le prix total
   */
  async getTotalPrice(): Promise<string> {
    const priceText = await this.totalPrice.textContent();
    return priceText?.trim() || '0';
  }

  /**
   * Vérifier que la page du panier est affichée
   */
  async expectCartPageVisible() {
    await expect(this.page).toHaveURL(/panier/);
  }
}
