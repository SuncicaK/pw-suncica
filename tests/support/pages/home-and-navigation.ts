import type { Locator, Page } from "@playwright/test";
import NavbarSection from "../sections/navbar.section.js";
import HomeSection from "../sections/homepage.section.js";

export default class HomeAndNavigation {
  readonly page: Page;
  private navbar: NavbarSection;
  private home: HomeSection;
  readonly homeLink: Locator;
  readonly contactLink: Locator;
  readonly aboutLink: Locator;
  readonly cartLink: Locator;
  readonly loginLink: Locator;
  readonly signUpLink: Locator;
  readonly carousel: Locator;
  readonly productsGrid: Locator;
  readonly productCards: Locator;
  readonly productCardTitles: Locator;
  readonly phonesLink: Locator;
  readonly laptopsLink: Locator;
  readonly monitorsLink: Locator;
  readonly footer: Locator;
  readonly productName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new NavbarSection(page);
    this.home = new HomeSection(page);
    this.homeLink = this.navbar.homeLink;
    this.contactLink = this.navbar.contactLink;
    this.aboutLink = this.navbar.aboutLink;
    this.cartLink = this.navbar.cartLink;
    this.loginLink = this.navbar.loginLink;
    this.signUpLink = this.navbar.signUpLink;
    this.carousel = this.home.carousel;
    this.productsGrid = this.home.productsGrid;
    this.productCards = this.home.productCards;
    this.productCardTitles = this.home.productCardTitles;
    this.phonesLink = this.home.phonesLink;
    this.laptopsLink = this.home.laptopsLink;
    this.monitorsLink = this.home.monitorsLink;
    this.footer = this.home.footer;
    this.productName = this.home.productName;
  }

  public async goto() {
    await this.page.goto('/');
  }

  productHeading(name: string): Locator {
    return this.home.productHeading(name);
  }

  async clickPreviousCarousel() {
    await this.home.clickPreviousCarousel();
  }

  async clickNextCarousel() {
    await this.home.clickNextCarousel();
  }

  async reload() {
    await this.home.reload();
  }

  async filterByPhones() {
    await this.home.filterByPhones();
  }

  async filterByLaptops() {
    await this.home.filterByLaptops();
  }

  async filterByMonitors() {
    await this.home.filterByMonitors();
  }

  async clickNextPage() {
    await this.home.clickNextPage();
  }

  async clickPrevPage() {
    await this.home.clickPrevPage();
  }

  async clickRandomProduct() {
    await this.home.clickRandomProduct();
  }

  async clickLogoLink() {
    await this.home.clickLogoLink();
  }
}