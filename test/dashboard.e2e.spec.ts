import { test, expect } from '@playwright/test';

test('display day orders amount metric', async ({ page }) => {
  await page.goto('/dashboard', { waitUntil: 'networkidle' });

  await expect(page.getByText('28', { exact: true })).toBeVisible();
  await expect(page.getByText('-30% em relação a ontem')).toBeVisible();
});

test('display month orders amount metric', async ({ page }) => {
  await page.goto('/dashboard', { waitUntil: 'networkidle' });

  await expect(page.getByText('20', { exact: true })).toBeVisible();
  await expect(page.getByText('-5% em relação ao mes passado')).toBeVisible();
});

test('display month canceled amount metric', async ({ page }) => {
  await page.goto('/dashboard', { waitUntil: 'networkidle' });

  await expect(page.getByText('3', { exact: true })).toBeVisible();
  await expect(page.getByText('-10% em relação ao mes passado')).toBeVisible();
});

test('display month revenue metric', async ({ page }) => {
  await page.goto('/dashboard', { waitUntil: 'networkidle' });

  await expect(page.getByText('R$ 100,00', { exact: true })).toBeVisible();
  await expect(page.getByText('+10% em relação ao mes passado')).toBeVisible();
});



