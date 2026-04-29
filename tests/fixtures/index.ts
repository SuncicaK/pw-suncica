import { test as base } from '@playwright/test';
import { NavbarSection } from '../../pages/navbar.section.js';
import { AboutModalSection } from '../../pages/about-modal.section.js';
import { HomeSection } from '../../pages/homepage.section.js';
import { LoginModalSection } from '../../pages/login-modal.section.js';
import { SignUpModalSection } from '../../pages/sign-up.section.js';
import { SingleProductSection } from '../../pages/single-product.section.js';

type PWFixtures = {
  forEachTest: void;
  navbar: NavbarSection;
  aboutModal: AboutModalSection;
  home: HomeSection;
  loginModal: LoginModalSection;
  signUpModal: SignUpModalSection;
  singleProduct: SingleProductSection;
};

export const test = base.extend<PWFixtures>({
  forEachTest: [async ({ page }, use) => {
    await page.goto('/');
    await use();
  }, { auto: true }],

  navbar: async ({ page }, use) => {
    await use(new NavbarSection(page));
  },
  aboutModal: async ({ page }, use) => {
    await use(new AboutModalSection(page));
  },
  home: async ({ page }, use) => {
    await use(new HomeSection(page));
  },
  loginModal: async ({ page }, use) => {
    await use(new LoginModalSection(page));
  },
  signUpModal: async ({ page }, use) => {
    await use(new SignUpModalSection(page));
  },
  singleProduct: async ({ page }, use) => {
    await use(new SingleProductSection(page));
  },
});

export { expect } from '@playwright/test';