# 🐞 BÁO CÁO LỖI VÀ QUAN SÁT KIỂM THỬ

Tài liệu báo cáo các Application Defects và UX Observations được phát hiện trong quá trình kiểm thử tự động bằng Playwright trên hệ thống **SauceDemo**.

---

## 📌 BUG REPORT 1: Hệ thống chấp nhận giá trị số âm cho Postal Code khi Checkout

* **Bug ID:** `BUG-SAUCE-001`
* **Test Case:** `TC-CHK-03`
* **Môi trường:** SauceDemo Checkout Step One (`/checkout-step-one.html`)
* **Severity đề xuất:** **Medium**
* **Cross-Browser:** ❌ Chromium | ❌ Firefox | ❌ WebKit
* **Evidence:**

  * Screenshot: `test-results/screenshots/TC-CHK-03-negative-zip-bug.png`
  * Execution Log: `test-results/logs/execution.log`

### 1. Expected Result

Hệ thống phải từ chối giá trị Postal Code âm, hiển thị thông báo validation phù hợp và không cho phép người dùng chuyển sang Checkout Overview.

### 2. Actual Result

Hệ thống chấp nhận giá trị `-12345` và cho phép người dùng chuyển sang:

`/checkout-step-two.html` mà không hiển thị thông báo validation tương ứng.

Lỗi được tái hiện trên cả Chromium, Firefox và WebKit.

### 3. Steps to Reproduce

1. Truy cập SauceDemo.
2. Đăng nhập bằng `standard_user` / `secret_sauce`.
3. Thêm sản phẩm vào Cart.
4. Chuyển đến Checkout Step One.
5. Nhập:

   * First Name: `John`
   * Last Name: `Doe`
   * Postal Code: `-12345`
6. Nhấn **Continue**.

### 4. Possible Cause

Có thể validation của trường Postal Code chưa kiểm tra đầy đủ các giá trị không hợp lệ, đặc biệt là giá trị âm.

Nguyên nhân cụ thể cần được xác minh thêm trong implementation của ứng dụng.

---

## 📌 BUG REPORT 2: Problem User hiển thị hình ảnh sản phẩm bị lỗi

* **Bug ID:** `BUG-SAUCE-002`
* **Test Case:** `TC-PROD-04`
* **Môi trường:** SauceDemo Inventory Page (`/inventory.html`)
* **Severity đề xuất:** **Medium**
* **Cross-Browser:** ❌ Chromium | ❌ Firefox | ❌ WebKit
* **Evidence:**

  * Screenshot: `test-results/screenshots/TC-PROD-04-problem-user-bug.png`
  * Execution Log: `test-results/logs/execution.log`

### 1. Expected Result

Hình ảnh của từng sản phẩm phải được hiển thị đúng và sử dụng asset hợp lệ tương ứng với sản phẩm.

### 2. Actual Result

Khi đăng nhập bằng `problem_user`, hình ảnh sản phẩm hiển thị không đúng.

Qua kiểm tra DOM, `src` của hình ảnh chứa asset:

`sl-404`

Lỗi được tái hiện trên cả Chromium, Firefox và WebKit.

### 3. Steps to Reproduce

1. Truy cập SauceDemo.
2. Đăng nhập bằng:

   * Username: `problem_user`
   * Password: `secret_sauce`
3. Quan sát hình ảnh các sản phẩm trên `/inventory.html`.

### 4. Possible Cause

Có thể có vấn đề trong việc mapping hoặc cung cấp asset hình ảnh cho `problem_user`.

Nguyên nhân cụ thể cần được xác minh thêm trong implementation của ứng dụng.

---

## 📌 UX OBSERVATION: Cart không có Thumbnail và Quantity Picker

* **Observation ID:** `OBS-SAUCE-001`
* **Test Case:** `TC-CART-03`
* **Môi trường:** SauceDemo Cart Page (`/cart.html`)
* **Classification:** **UX Observation / Improvement**
* **Evidence:** `test-results/screenshots/TC-CART-03-ux-validation.png`

### 1. Observation

Trang Cart hiện tại hiển thị thông tin sản phẩm như:

* Tên sản phẩm
* Mô tả
* Giá
* Nút Remove

Không quan sát thấy thumbnail hình ảnh sản phẩm và quantity picker.

### 2. Assessment

Đây được ghi nhận là **UX Observation**, không được phân loại là Application Defect vì test strategy hiện tại không có requirement bắt buộc Cart phải cung cấp thumbnail hoặc quantity picker.

### 3. Suggested Improvement

Có thể cân nhắc bổ sung thumbnail sản phẩm và quantity picker nếu sản phẩm thực tế yêu cầu các tính năng này nhằm cải thiện trải nghiệm mua sắm.
