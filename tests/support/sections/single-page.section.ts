import type { Locator, Page } from "@playwright/test";


export default class SingleProductSection {
  readonly page: Page;
  readonly image: Locator;
  readonly name: Locator;
  readonly heading: Locator;
  readonly price: Locator;
  readonly description: Locator;
  readonly addToCartButton: Locator;
  readonly firstProductLink: Locator; 

  constructor(page: Page) {
    this.page = page;
    this.image = page.locator('#imgp img');
    this.name = page.locator('.name');
    this.heading = page.locator('h2');
    this.price = page.locator('.price-container');
    this.description = page.locator('#more-information');
    this.addToCartButton = page.locator('text=Add to cart');
    this.firstProductLink = page.locator('.card-block a').first();
  }
}