import { test as base } from '@playwright/test';
import AboutModal from '../support/pages/about-modal.js';
import HomeAndNavigation from '../support/pages/home-and-navigation.js';
import LoginModal from '../support/pages/login-modal.js';
import SignUpModal from '../support/pages/sign-up-modal.js';
import SingleProduct from '../support/pages/single-product.js';

type PWFixtures = {
  forEachTest: void;
  loginModal: LoginModal;
  signUpModal: SignUpModal;
  aboutModal: AboutModal;
  homeAndNavigation: HomeAndNavigation;
  singleProduct: SingleProduct;
};

export const test = base.extend<PWFixtures>({
  forEachTest: [async ({ page }, use) => {
    await page.goto('/');
    await use();
  }, { auto: true }],

  loginModal: async ({ page }, use) => {
    await use(new LoginModal(page));
  },
  signUpModal: async ({ page }, use) => {
    await use(new SignUpModal(page));
  },
  aboutModal: async ({ page }, use) => {
    await use(new AboutModal(page));
  },
  homeAndNavigation: async ({ page }, use) => {
    await use(new HomeAndNavigation(page));
  },
  singleProduct: async ({ page }, use) => {
    await use(new SingleProduct(page));
  },
});

export { expect } from '@playwright/test';