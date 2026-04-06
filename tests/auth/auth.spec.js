import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('login and logout flow', async ({ page, context }) => {
  const login = new LoginPage(page);

  // Navigate
  await login.navigate();

  // ✅ Use your working Google login
  await login.loginWithGoogle(context);

  // Validate login success
  await expect(page).toHaveURL(/dashboard|timeline/);

  // Logout (you may already have locator, else adjust)
  const profileIcon = page.locator('.user-profile-image');
  await profileIcon.click();

  const logoutBtn = page.getByText('Logout');
  await logoutBtn.click();

  // Validate logout
  await expect(page).toHaveURL(/login/);
});