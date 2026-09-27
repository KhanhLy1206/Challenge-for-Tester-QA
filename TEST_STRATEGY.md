# 🎯 TEST_STRATEGY.md - Strategy & Test Case Matrix

Tài liệu Chiến lược Kiểm thử cho dự án **AI QA Assistant** trên ứng dụng thương mại điện tử **SauceDemo** ([https://www.saucedemo.com](https://www.saucedemo.com)).

---

## 1. MỤC TIÊU KIỂM THỬ (TEST OBJECTIVES)
- Xây dựng chiến lược kiểm thử tự động hóa kết hợp giữa tư duy QA truyền thống và năng lực AI.
- Bao quát toàn bộ luồng sử dụng chính của ứng dụng E-Commerce theo quy trình:  
  $$\text{User Story / Requirement} \longrightarrow \text{Test Cases} \longrightarrow \text{Execute Tests} \longrightarrow \text{Analyze Failures} \longrightarrow \text{Bug Report}$$
- Đảm bảo kiểm tra đầy đủ 4 loại kịch bản: **Positive (Thành công)**, **Negative (Luồng lỗi)**, **Boundary (Ranh giới)** và **Validation / UX Observation (Kiểm chứng dữ liệu & giao diện)**.

---

## 2. PHẠM VI KIỂM THỬ (TEST SCOPE)

### 2.1 Trong phạm vi (In-Scope)
* **Phân hệ Login (Đăng nhập)**:
  - Đăng nhập hợp lệ với `standard_user`.
  - Kiểm tra tài khoản bị khóa `locked_out_user`.
  - Đăng nhập với mật khẩu không chính xác.
  - Kiểm tra validation khi để trống thông tin credentials.
  - Quan sát thời gian phản hồi của `performance_glitch_user`, không áp dụng ngưỡng PASS/FAIL khi chưa có SLA hiệu năng cụ thể.

* **Phân hệ Product (Danh mục sản phẩm)**:
  - Kiểm tra hiển thị đúng 6 sản phẩm với đầy đủ Tên, Giá tiền ($), Hình ảnh thumbnail và Nút Add to cart.
  - Kiểm tra 4 chế độ lọc/sắp xếp: Name (A to Z), Name (Z to A), Price (low to high), Price (high to low).
  - Trạng thái nút Add to cart đổi thành **Remove** và số lượng trên icon Cart tăng +1 khi chọn sản phẩm.
  - Kiểm tra phát hiện lỗi vỡ hình ảnh của tài khoản `problem_user`.

* **Phân hệ Cart (Giỏ hàng)**:
  - Kiểm tra hiển thị chi tiết sản phẩm trong giỏ hàng (Tên, Mô tả, Giá).
  - Kiểm tra nút Remove xóa sản phẩm trực tiếp từ trang Cart.
  - Ghi nhận hạn chế UX/UI: Trang Cart không hiển thị ảnh thumbnail sản phẩm và không có bộ điều chỉnh số lượng (Quantity picker).

* **Phân hệ Checkout (Thanh toán & Đặt hàng)**:
  - Kiểm tra luồng E2E thanh toán đặt hàng thành công (`Sauce Labs Fleece Jacket` $49.99, Payment SauceCard #31337, Shipping Free Pony Express).
  - Kiểm tra validation báo lỗi khi để trống các trường bắt buộc (First Name, Last Name, Zip Code).
  - Kiểm tra Boundary Test: Nhập số âm (`-12345`) vào ô Postal Code (Phân tích kết quả thực tế chấp nhận số âm làm cơ sở xác định Validation Defect).

### 2.2 Ngoài phạm vi (Out-of-Scope)
- Cổng thanh toán ngân hàng thực tế (Real payment gateways).
- Kiểm thử bảo mật chuyên sâu (SQL Injection, XSS penetration).

---

## 3. MA TRẬN PHÂN BỔ 15 TEST CASES (TEST CASE MATRIX)

| STT | Test ID | Module | Phân loại | Tên Test Case | Mục tiêu kiểm thử |
| :---: | :---: | :---: | :---: | :--- | :--- |
| 1 | `TC-LOG-01` | Login | Positive | Standard User Login Success | Đảm bảo luồng đăng nhập hợp lệ hoạt động đúng |
| 2 | `TC-LOG-02` | Login | Negative | Locked Out User Login Attempt | Kiểm tra hệ thống từ chối đăng nhập đối với tài khoản bị khóa |
| 3 | `TC-LOG-03` | Login | Negative | Invalid Password Attempt | Đảm bảo chặn truy cập với mật khẩu không đúng |
| 4 | `TC-LOG-04` | Login | Negative | Login with Empty Credentials | Kiểm tra bắt lỗi bắt buộc nhập dữ liệu inline |
| 5 | `TC-LOG-05` | Login | Performance Observation | Performance Glitch User Delay Check | Quan sát thời gian phản hồi của luồng đăng nhập đối với tài khoản performance_glitch_user |
| 6 | `TC-PROD-01` | Product | Positive | Catalog 6 Items Display Verification | Kiểm tra toàn vẹn danh mục 6 sản phẩm (Tên, Giá, Ảnh) |
| 7 | `TC-PROD-02` | Product | Positive | Test 4 Product Sorting Options | Kiểm tra thuật toán lọc A-Z, Z-A, Price Low-High, High-Low |
| 8 | `TC-PROD-03` | Product | Positive | Add to Cart Toggle to Remove & Badge Increment | Đảm bảo chuyển trạng thái nút & đồng bộ số lượng giỏ hàng |
| 9 | `TC-PROD-04` | Product | Validation | Problem User Image Glitch Detection | Phát hiện lỗi vỡ ảnh sản phẩm trên tài khoản `problem_user` |
| 10 | `TC-CART-01` | Cart | Positive | Cart Item Detail Display Verification | Bảo toàn dữ liệu Tên, Mô tả, Giá tiền từ danh mục sang Cart |
| 11 | `TC-CART-02` | Cart | Positive | Remove Item from Cart Page | Kiểm tra xóa sản phẩm và giảm badge icon giỏ hàng |
| 12 | `TC-CART-03` | Cart | UX Validation | Cart UX Limitation Assessment | Ghi nhận hạn chế UX thiếu thumbnail ảnh & thiếu chỉnh qty |
| 13 | `TC-CHK-01` | Checkout | Positive E2E | Complete Order Flow Verification | Kiểm tra luồng E2E đặt hàng thành công (SauceCard #31337) |
| 14 | `TC-CHK-02` | Checkout | Negative | Checkout Blank Fields Validation | Kiểm tra bắt lỗi khi bỏ trống trường First Name / Last Name |
| 15 | `TC-CHK-03` | Checkout | Boundary | Negative Postal Code Boundary Check | Kiểm tra nhập Zip code số âm `-12345` (Xác định Validation Defect) |

---

## 4. MÔ TRƯỜNG & CÔNG CỤ THỰC THI (ENVIRONMENT & TOOLS)
- **Đối tượng thử nghiệm**: Website SauceDemo (`https://www.saucedemo.com`)
- **Trình duyệt áp dụng (Cross-Browser Testing)**: Chromium, Firefox và WebKit.
- **Công cụ tự động hóa**: Playwright Framework (Node.js)
- **Quản lý bằng chứng**: Tự động lưu ảnh chụp màn hình (`test-results/screenshots/*.png`) và ghi vết log thực thi (`test-results/logs/execution.log`).

---

## 5. PHƯƠNG PHÁP PHÂN LOẠI LỖI KHI THỰC THI (FAILURE CLASSIFICATION METHODOLOGY)
Trong quá trình tự động hóa kiểm thử, dự án phân định rõ 2 loại kết quả lỗi:
1. **Automation Failure**: 
   - Lỗi do kịch bản test (ví dụ: selector không đủ phạm vi gây lỗi Playwright strict mode ở `TC-CART-01`).
   - Xử lý: Hiệu đính bộ chọn DOM (`.cart_item .inventory_item_name`) để kịch bản thực thi chính xác -> PASS trên cả 3 trình duyệt.
2. **Application Defect**:
   - Lỗi do ứng dụng (ví dụ: `TC-PROD-04` vỡ ảnh `problem_user` và `TC-CHK-03` hệ thống chấp nhận Zip code số âm).
   - Xử lý: Giữ nguyên assertion kỳ vọng chuẩn QA -> Kịch bản kiểm thử **FAIL** để chứng minh bộ kiểm thử tự động có khả năng phát hiện Bug thực tế của ứng dụng.

---

## 6. KẾT QUẢ THỰC THI (TEST EXECUTION RESULTS)

Bộ 15 Test Cases được thực thi tự động bằng Playwright trên 3 browser: Chromium, Firefox và WebKit.

### Initial Execution
- **Tổng số lượt thực thi**: **45** (15 Test Cases × 3 browsers)
- **Passed**: **38**
- **Failed**: **7**

Các failure được phân tích và chia thành:
- **`TC-CART-01`**: Automation Failure do locator `.inventory_item_name` khớp nhiều phần tử và gây Playwright Strict Mode violation.
- **`TC-PROD-04`**: Application Defect được phát hiện trên cả Chromium, Firefox và WebKit.
- **`TC-CHK-03`**: Application Defect được phát hiện trên cả Chromium, Firefox và WebKit.

### Automation Failure Resolution
`TC-CART-01` được hiệu đính bằng cách giới hạn selector vào phạm vi Cart:
```text
.cart_item .inventory_item_name
```
Sau khi sửa, `TC-CART-01` đã PASS trên cả 3 browsers.

### Confirmed Application Defects
Hai lỗi ứng dụng được xác nhận:
1. **`TC-PROD-04`**: Tài khoản `problem_user` sử dụng broken/wrong image asset chứa `sl-404`.
2. **`TC-CHK-03`**: Hệ thống chấp nhận Postal Code âm `-12345` và cho phép chuyển sang Checkout Overview.

Các lỗi trên được giữ nguyên trong automated test để đảm bảo hệ thống kiểm thử có khả năng phát hiện application defect.
