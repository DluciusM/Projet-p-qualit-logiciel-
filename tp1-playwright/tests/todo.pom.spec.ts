import { test } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test('ajouter et compléter une tâche (POM)', async ({ page }) => {
  const todo = new TodoPage(page);

  await todo.goto();
  await todo.addTask('Acheter du café');
  await todo.expectVisible('Acheter du café');

  await todo.completeTask('Acheter du café');
  await todo.expectCompleted('Acheter du café');
  await page.pause();
});
