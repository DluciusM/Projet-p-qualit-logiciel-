import { Page, expect } from '@playwright/test';

export class TodoPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://demo.playwright.dev/todomvc');
  }

  async addTask(task: string) {
    // Sélecteur sémantique et robuste
    await this.page.getByRole('textbox', { name: 'What needs to be done?' }).fill(task);
    await this.page.keyboard.press('Enter');
  }

  async deleteTask(task: string) {
    const item = this.page.locator('li', { hasText: task });
    await item.hover();
    await item.locator('.destroy').click();
  }

  async completeTask(task: string) {
    const item = this.page.locator('li', { hasText: task });
    await item.locator('.toggle').check();
  }

  async expectVisible(task: string) {
    await expect(this.page.getByText(task)).toBeVisible();
  }

  async expectNotVisible(task: string) {
    await expect(this.page.getByText(task)).toHaveCount(0);
  }

  async expectCompleted(task: string) {
    const item = this.page.locator('li', { hasText: task });
    await expect(item).toHaveClass(/completed/);
  }
}
