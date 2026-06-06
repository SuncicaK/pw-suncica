import { test, expect } from '@playwright/test';
import 'dotenv/config';

const BASE_URL = 'https://api.demoblaze.com';


test.describe('Demoblaze API Tests', () => {

  //GET REQUESTS

  test('GET - get all products', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/entries`);

    expect(response.status()).toBe(200);

    expect(response.ok()).toBeTruthy();

    const json = await response.json();
    // console.log(json);

    expect(json).toHaveProperty('Items');

    json.Items.forEach((item: { id: number; title: string }) => {
       console.log(`id: ${item.id}, title: ${item.title}`);
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('title');
    });
  });

  test('GET - get products by category phones', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/bycat`, {
      data: {
        cat: 'phone',
      },
    });

    expect(response.status()).toBe(200);

    const json = await response.json();
    // console.log(json);
    expect(json).toHaveProperty('Items');

    json.Items.forEach((item: any) => {
    console.log(`id: ${item.id}, title: ${item.title}, category: ${item.cat}`);

    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('title');
    expect(item.cat).toBe('phone');
  });

  });

  test('GET - get single product', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/view`, {
      data: {
        id: 1,
      },
    });

    expect(response.status()).toBe(200);

    const json = await response.json();
    console.log(json);
    expect(json).toHaveProperty('id');
    expect(json).toHaveProperty('title');
    expect(json).toHaveProperty('price');
  });

  //POST REQUESTS

  test('POST - sign up new user', async ({ request }) => {
    const username = `testuser_${Date.now()}`;

    const response = await request.post(`${BASE_URL}/signup`, {
        data: {
        username,
        password: 'testpassword123',
        },
    });

    console.log('Status:', response.status());
    console.log('OK:', response.ok());
    console.log('Username used:', username);

    const text = await response.text();
    console.log('Response body:', JSON.stringify(text));

    expect(response.status()).toBe(200);
  });
 
  test('POST - login valid user', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/login`, {
        data: {
        username: process.env.USERNAME!,
        password: process.env.PASSWORD!,
        },
    });

    const text = await response.text();
    console.log('Login response:', text);

    expect(response.ok()).toBeTruthy();
  });

  test('POST - login with invalid credentials', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/login`, {
      data: {
        username: 'wronguser',
        password: 'wrongpassword',
      },
    });

    expect(response.status()).toBe(200);

    const text = await response.text();
    console.log(text);
    expect(text).toContain('Wrong password');
    });

  test('POST - add product to cart and verify', async ({ request }) => {
    const cookie = 'user=test';
    const prodId = 1;

    const addResponse = await request.post(`${BASE_URL}/addtocart`, {
        data: {
        id: `cart_${Date.now()}`,
        cookie,
        prod_id: prodId,
        flag: false,
        },
    });

    expect(addResponse.ok()).toBeTruthy();

    const cartResponse = await request.post(`${BASE_URL}/viewcart`, {
        data: { cookie },
    });

    expect(cartResponse.ok()).toBeTruthy();


    const cartJson = await cartResponse.json();

    console.log(cartJson.Items.map((item: any) => item.id));

    expect(cartJson.Items.length).toBeGreaterThan(0);
    expect(
        cartJson.Items.some((item: any) => item.prod_id === prodId)
    ).toBeTruthy();
  });

  test('GET - get cart items', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/viewcart`, {
      data: {
        cookie: 'user=test',
        flag: false,
      },
    });

    expect(response.status()).toBe(200);

    const json = await response.json();
    console.log(json);
    console.log('Cart items length:', json.Items.length);
    expect(json).toHaveProperty('Items');
  });
}); 