// //import { test, expect } from '@playwright/test';

// test('scenario enregistré avec pause', async ({ page }) => {

//   await page.goto('https://demo.playwright.dev/todomvc');

 
//   await page.getByPlaceholder('What needs to be done?').click();
//   await page.getByPlaceholder('What needs to be done?').fill('Acheter du lait');
//   await page.keyboard.press('Enter');
//   await expect(page.getByText('Acheter du lait')).toBeVisible();
//   await page.pause();

//   await page.getByPlaceholder('What needs to be done?').fill('Faire les courses');
//   await page.keyboard.press('Enter');
//   await expect(page.getByText('Faire les courses')).toBeVisible();
//   await page.getByPlaceholder('What needs to be done?').fill('Faire les squatts avec rrr ');
//   await page.keyboard.press('Enter');
//   await expect(page.getByText('Faire les squatts avec rrr')).toBeVisible();
//   await page.pause();
// });  adriendongesiea

import { test } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test('ajouter 2 tâches puis supprimer la première (POM)', async ({ page }) => {
  const todo = new TodoPage(page);

  await todo.goto();
  await page.pause();
  
  await todo.addTask('Acheter du pain');
  await todo.addTask('Aller courir');
  await todo.addTask('Aller faire des squats rrr');
  await todo.addTask('Aller faire plein de betisses');

  await todo.deleteTask('Acheter du pain');
  await todo.deleteTask('Aller faire plein de betisses');

  await todo.expectVisible('Aller courir');
  await todo.expectNotVisible('Acheter du pain');
  await todo.expectNotVisible('Aller faire des squats rrr');
  
  await page.pause();
});
