import { test, expect } from '@playwright/test';

test('update profile successfully', async ({ page }) => {
  await page.goto('/dashboard', { waitUntil: 'networkidle' });

  await page.getByRole('button', { name: 'Pizza Shop' }).click();
  await page.getByRole('menuitem', { name: 'Perfil da loja' }).click();

  await page.getByRole('textbox', { name: 'Nome' }).fill('Rockeat Pizza');
  await page.getByRole('textbox', { name: 'Descricao' }).fill('Another description');

  await page.getByRole('button', { name: 'Salvar' }).click();

  await page.waitForLoadState('networkidle');

  const toast = page.getByText('Perfil atualizado com sucesso!');
  
  await expect(toast).toBeVisible();

  await page.getByRole('button', { name: 'Close', exact: true }).click();

  await expect(page.getByRole('button', { name: 'Rockeat Pizza' })).toBeInViewport();
});