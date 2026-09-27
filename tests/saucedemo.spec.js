import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Thư mục lưu bằng chứng hình ảnh & logs thực thi
const screenshotsDir = path.join(process.cwd(), 'test-results', 'screenshots');
const logsDir = path.join(process.cwd(), 'test-results', 'logs');

if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });

function logEvidence(testId, message) {
    const logMsg = `[${new Date().toISOString()}] [${testId}] ${message}\n`;
    fs.appendFileSync(path.join(logsDir, 'execution.log'), logMsg);
}

test.describe('SauceDemo AI QA Automation Suite (15 Test Cases)', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
    });

    // ==========================================
    // MODULE 1: LOGIN (5 TEST CASES)
    // ==========================================

    test('TC-LOG-01: Standard User Login Success', async ({ page }) => {
        logEvidence('TC-LOG-01', 'Executing login with standard_user');
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page.locator('.title')).toHaveText('Products');
        await page.screenshot({ path: path.join(screenshotsDir, 'TC-LOG-01-success.png') });
    });

    test('TC-LOG-02: Locked Out User Login Attempt', async ({ page }) => {
        logEvidence('TC-LOG-02', 'Executing login with locked_out_user');
        await page.fill('[data-test="username"]', 'locked_out_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        const errorMsg = page.locator('[data-test="error"]');
        await expect(errorMsg).toBeVisible();
        await expect(errorMsg).toContainText('Epic sadface: Sorry, this user has been locked out.');
        await page.screenshot({ path: path.join(screenshotsDir, 'TC-LOG-02-locked-out.png') });
    });

    test('TC-LOG-03: Invalid Password Attempt', async ({ page }) => {
        logEvidence('TC-LOG-03', 'Executing login with invalid password');
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'wrong_password');
        await page.click('[data-test="login-button"]');

        const errorMsg = page.locator('[data-test="error"]');
        await expect(errorMsg).toBeVisible();
        await expect(errorMsg).toContainText('Epic sadface: Username and password do not match any user in this service');
        await page.screenshot({ path: path.join(screenshotsDir, 'TC-LOG-03-invalid-password.png') });
    });

    test('TC-LOG-04: Login with Empty Credentials', async ({ page }) => {
        logEvidence('TC-LOG-04', 'Executing login with blank fields');
        await page.click('[data-test="login-button"]');

        const errorMsg = page.locator('[data-test="error"]');
        await expect(errorMsg).toBeVisible();
        await expect(errorMsg).toContainText('Epic sadface: Username is required');
        await page.screenshot({ path: path.join(screenshotsDir, 'TC-LOG-04-empty-credentials.png') });
    });

    test('TC-LOG-05: Performance Glitch User Delay Check', async ({ page }) => {
        logEvidence('TC-LOG-05', 'Executing login with performance_glitch_user');
        const startTime = Date.now();
        await page.fill('[data-test="username"]', 'performance_glitch_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        const duration = Date.now() - startTime;
        logEvidence('TC-LOG-05', `Login duration recorded: ${duration}ms`);
        console.log(`[TC-LOG-05] Performance glitch user login duration: ${duration}ms`);
        await page.screenshot({ path: path.join(screenshotsDir, 'TC-LOG-05-performance.png') });
    });

    // ==========================================
    // MODULE 2: PRODUCT (4 TEST CASES)
    // ==========================================

    test('TC-PROD-01: Product Catalog Integrity Check (6 Items, Title, Price, Image)', async ({ page }) => {
        logEvidence('TC-PROD-01', 'Verifying catalog 6 items structure');
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        const items = page.locator('.inventory_item');
        await expect(items).toHaveCount(6);

        const firstTitle = await page.locator('.inventory_item_name').first().textContent();
        const firstPrice = await page.locator('.inventory_item_price').first().textContent();
        expect(firstTitle).toBeTruthy();
        expect(firstPrice).toContain('$');

        await page.screenshot({ path: path.join(screenshotsDir, 'TC-PROD-01-catalog.png') });
    });

    test('TC-PROD-02: Test 4 Sorting Modes (A-Z, Z-A, Low-High, High-Low)', async ({ page }) => {
        logEvidence('TC-PROD-02', 'Testing catalog 4 sorting options');
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        // Name A to Z
        await page.selectOption('.product_sort_container', 'az');
        expect(await page.locator('.inventory_item_name').first().textContent()).toBe('Sauce Labs Backpack');

        // Name Z to A
        await page.selectOption('.product_sort_container', 'za');
        expect(await page.locator('.inventory_item_name').first().textContent()).toBe('Test.allTheThings() T-Shirt (Red)');

        // Price Low to High
        await page.selectOption('.product_sort_container', 'lohi');
        expect(await page.locator('.inventory_item_price').first().textContent()).toBe('$7.99');

        // Price High to Low
        await page.selectOption('.product_sort_container', 'hilo');
        expect(await page.locator('.inventory_item_price').first().textContent()).toBe('$49.99');

        await page.screenshot({ path: path.join(screenshotsDir, 'TC-PROD-02-sort.png') });
    });

    test('TC-PROD-03: Add to Cart State Toggle & Badge Increment', async ({ page }) => {
        logEvidence('TC-PROD-03', 'Testing Add to cart button state toggle to Remove');
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

        // Nút đổi sang Remove
        const removeBtn = page.locator('[data-test="remove-sauce-labs-backpack"]');
        await expect(removeBtn).toBeVisible();

        // Badge tăng +1
        const badge = page.locator('.shopping_cart_badge');
        await expect(badge).toHaveText('1');

        await page.screenshot({ path: path.join(screenshotsDir, 'TC-PROD-03-add-cart-toggle.png') });
    });

    test('TC-PROD-04: Problem User Image Asset Glitch Detection', async ({ page }) => {
        logEvidence('TC-PROD-04', 'Detecting problem_user broken images bug');
        await page.fill('[data-test="username"]', 'problem_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        const firstImgSrc = await page.locator('.inventory_item_img img').first().getAttribute('src');
        const isGlitched = firstImgSrc.includes('sl-404');

        logEvidence('TC-PROD-04', `Detected image src: ${firstImgSrc} (Glitched: ${isGlitched})`);
        await page.screenshot({ path: path.join(screenshotsDir, 'TC-PROD-04-problem-user-bug.png') });

        // Kỳ vọng: Ảnh hiển thị đúng, KHÔNG bị vỡ link sl-404 -> Test sẽ FAIL nếu bị lỗi ảnh
        expect(isGlitched, 'Product images should render valid assets instead of broken sl-404').toBe(false);
    });

    // ==========================================
    // MODULE 3: CART (3 TEST CASES)
    // ==========================================

    test('TC-CART-01: Cart Item Detail Display (Title, Desc, Price)', async ({ page }) => {
        logEvidence('TC-CART-01', 'Verifying cart item details');

        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('.shopping_cart_link');

        // Chỉ kiểm tra thông tin của sản phẩm bên trong Cart
        await expect(page.locator('.cart_item .inventory_item_name'))
            .toHaveText('Sauce Labs Backpack');

        await expect(page.locator('.cart_item .inventory_item_desc'))
            .toBeVisible();

        await expect(page.locator('.cart_item .inventory_item_price'))
            .toHaveText('$29.99');

        await page.screenshot({
            path: path.join(screenshotsDir, 'TC-CART-01-cart-details.png')
        });
    });
    test('TC-CART-02: Remove Item from Cart Page', async ({ page }) => {
        logEvidence('TC-CART-02', 'Testing item removal from cart page');
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('.shopping_cart_link');

        await page.click('[data-test="remove-sauce-labs-backpack"]');
        const badge = page.locator('.shopping_cart_badge');
        await expect(badge).toHaveCount(0);

        await page.screenshot({ path: path.join(screenshotsDir, 'TC-CART-02-remove-from-cart.png') });
    });

    test('TC-CART-03: Cart UX Validation - Detect Missing Thumbnail Images & Quantity Controls', async ({ page }) => {
        logEvidence('TC-CART-03', 'Evaluating Cart UX limitations');
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('.shopping_cart_link');

        // Inspection: Cart item does not render thumbnail image tag
        const cartImgCount = await page.locator('.cart_item img').count();
        expect(cartImgCount).toBe(0); // Confirms UX observation: No product images inside cart list

        await page.screenshot({ path: path.join(screenshotsDir, 'TC-CART-03-ux-validation.png') });
    });

    // ==========================================
    // MODULE 4: CHECKOUT (3 TEST CASES)
    // ==========================================

    test('TC-CHK-01: End-to-End Checkout Flow with Order Verification', async ({ page }) => {
        logEvidence('TC-CHK-01', 'Executing E2E checkout for Sauce Labs Fleece Jacket');
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        await page.click('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
        await page.click('.shopping_cart_link');
        await page.click('[data-test="checkout"]');

        await page.fill('[data-test="firstName"]', 'John');
        await page.fill('[data-test="lastName"]', 'Doe');
        await page.fill('[data-test="postalCode"]', '700000');
        await page.click('[data-test="continue"]');

        // Verify Overview Details
        await expect(page.locator('.summary_value_label').first()).toHaveText('SauceCard #31337');
        await expect(page.locator('.summary_value_label').nth(1)).toHaveText('Free Pony Express Delivery!');
        await expect(page.locator('.summary_subtotal_label')).toContainText('49.99');

        await page.click('[data-test="finish"]');
        await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');

        await page.screenshot({ path: path.join(screenshotsDir, 'TC-CHK-01-complete.png') });
    });

    test('TC-CHK-02: Checkout Blank Required Fields Validation', async ({ page }) => {
        logEvidence('TC-CHK-02', 'Testing blank field validation on checkout');
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('.shopping_cart_link');
        await page.click('[data-test="checkout"]');

        await page.click('[data-test="continue"]');

        const errorMsg = page.locator('[data-test="error"]');
        await expect(errorMsg).toBeVisible();
        await expect(errorMsg).toContainText('Error: First Name is required');

        await page.screenshot({ path: path.join(screenshotsDir, 'TC-CHK-02-required-fields.png') });
    });

    test('TC-CHK-03: Negative Zip Code Input Boundary Bug Detection', async ({ page }) => {
        logEvidence('TC-CHK-03', 'Testing negative number (-12345) in Zip/Postal Code field');
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('.shopping_cart_link');
        await page.click('[data-test="checkout"]');

        await page.fill('[data-test="firstName"]', 'John');
        await page.fill('[data-test="lastName"]', 'Doe');
        await page.fill('[data-test="postalCode"]', '-12345'); // Negative number input
        await page.click('[data-test="continue"]');

        await page.screenshot({ path: path.join(screenshotsDir, 'TC-CHK-03-negative-zip-bug.png') });

        // Kỳ vọng: Hệ thống từ chối số âm và KHÔNG chuyển sang trang Overview -> Test sẽ FAIL vì hệ thống bị lỗi
        expect(page.url(), 'System should reject negative postal code and stay on checkout step one').not.toContain('checkout-step-two.html');
    });

});
