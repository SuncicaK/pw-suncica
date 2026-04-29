import type { Locator, Page } from '@playwright/test';

export class HomeSection {
  readonly page: Page;
  readonly carousel: Locator;
  readonly productsGrid: Locator;
  readonly productCards: Locator;
  readonly productCardTitles: Locator;
  readonly carouselPrevButton: Locator;
  readonly carouselNextButton: Locator;
  readonly nextButton: Locator;
  readonly prevButton: Locator;
  readonly phonesLink: Locator;
  readonly laptopsLink: Locator;
  readonly monitorsLink: Locator;
  readonly footer: Locator;
  readonly logoLink: Locator;
  readonly productName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.carousel = page.locator('#carouselExampleIndicators');
    this.productsGrid = page.locator('#tbodyid');
    this.productCards = page.locator('.card');
    this.productCardTitles = page.locator('#tbodyid .card-title');
    this.carouselPrevButton = page.locator('#carouselExampleIndicators').getByRole('button', { name: 'Previous' });
    this.carouselNextButton = page.locator('#carouselExampleIndicators').getByRole('button', { name: 'Next' });
    this.nextButton = page.locator('#next2');
    this.prevButton = page.locator('#prev2');
    this.phonesLink = page.getByRole('link', { name: 'Phones' });
    this.laptopsLink = page.getByRole('link', { name: 'Laptops' });
    this.monitorsLink = page.getByRole('link', { name: 'Monitors' });
    this.footer = page.locator('#footc');
    this.logoLink = page.getByRole('link', { name: 'PRODUCT STORE' });
    this.productName = page.locator('.name');
  }

  productHeading(name: string): Locator {
    return this.page.getByRole('heading', { name });
  }

  async clickRandomProduct() {
    const count = await this.productCardTitles.count();
    const random = this.productCardTitles.nth(Math.floor(Math.random() * count));
    await random.click();
  }
}