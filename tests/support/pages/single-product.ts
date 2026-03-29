import type { Locator, Page } from "@playwright/test";
import SingleProductSection from "../sections/single-page.section.js";

export default class SingleProduct {
  readonly page: Page;
  readonly product: SingleProductSection;
  readonly image: Locator;
  readonly name: Locator;
  readonly heading: Locator;
  readonly price: Locator;
  readonly description: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.product = new SingleProductSection(page);
    this.image = this.product.image;
    this.name = this.product.name;
    this.heading = this.product.heading;
    this.price = this.product.price;
    this.description = this.product.description;
    this.addToCartButton = this.product.addToCartButton;
  }

  async goto() {
    await this.page.goto('/');
  }
  
  async goToFirstProduct() {
    await this.product.firstProductLink.click();
  }
}