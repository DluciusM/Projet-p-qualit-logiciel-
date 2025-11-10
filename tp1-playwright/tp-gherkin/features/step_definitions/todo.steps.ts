
import { Before, After, Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from 'playwright';
import { expect } from '@playwright/test';


setDefaultTimeout(60_000);


let browser: Browser | undefined;
let context: BrowserContext | undefined;
let page: Page | undefined;



Before(async () => {
  browser = await chromium.launch({
    headless: false,  
    slowMo: 300
         
  });
  context = await browser.newContext();
  page = await context.newPage();
});

After(async () => {
  try {
    await page?.close();
    await context?.close();
    await browser?.close();
  } catch {
   
  } finally {
    page = undefined;
    context = undefined;
    browser = undefined;
  }
});


Given(/je suis sur la page TodoMVC/, async () => {
  await page!.goto('https://demo.playwright.dev/todomvc');
});


When(/j[’']ajoute la tâche "(.*)"/, async (task: string) => {
  const input = page!.getByRole('textbox', { name: 'What needs to be done?' });
  await input.fill(task);
  await page!.keyboard.press('Enter');
});


When(/je supprime la tâche "(.*)"/, async (task: string) => {
  const item = page!.locator('li', { hasText: task });
  await item.hover();
  await item.locator('.destroy').click();
});


When(/je coche la tâche "(.*)"/, async (task: string) => {
  const item = page!.locator('li', { hasText: task });
  await item.locator('.toggle').check();
});


Then(/la tâche "(.*)" est visible dans la liste/, async (task: string) => {
  await expect(page!.getByText(task)).toBeVisible();
});


Then(/la tâche "(.*)" n[’']est plus visible dans la liste/, async (task: string) => {
  await expect(page!.getByText(task)).toHaveCount(0);
});


Then(/la tâche "(.*)" apparaît comme terminée/, async (task: string) => {
  const li = page!.locator('li', { hasText: task });
  await expect(li).toHaveClass(/completed/);
});

When(/je mets en pause/, async () => {
  await page!.pause();
});
