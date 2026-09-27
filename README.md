# 🤖 AI QA Engineer Assistant - SauceDemo Automated Testing

Dự án **7-Day AI Builder Challenge for Tester / QA**  
**Trang web kiểm thử**: [SauceDemo](https://www.saucedemo.com/)  

---

## 📌 1. BỐI CẢNH & ĐẶT VẤN ĐỀ (BACKGROUND & PROBLEM STATEMENT)
Đội ngũ QA/Tester dành rất nhiều thời gian thủ công cho các công việc hàng ngày:
- Đọc và phân tích yêu cầu (Reading requirements / User stories).
- Viết kịch bản kiểm thử (Writing test cases).
- Chạy kiểm thử hồi quy (Regression testing).
- Phân tích nguyên nhân khi test thất bại (Analyzing test failures).
- Viết báo cáo lỗi (Writing bug reports).

**Giải pháp**: Xây dựng **Trợ lý AI QA Engineer Assistant** hỗ trợ AI và tự động hóa một phần quy trình QA
$$\text{Requirement / URL} \longrightarrow \text{Test Cases} \longrightarrow \text{Execute Tests (Playwright)} \longrightarrow \text{Analyze Failures} \longrightarrow \text{Bug Report}$$

---

## 🎯 2. LÝ DO CHỌN SAUCEDEMO & CÁC PHÂN HỆ KIỂM THỬ (TEST WEBSITE SELECTION)

### 2.1 Tại sao chọn SauceDemo? (Why SauceDemo?)
[SauceDemo](https://www.saucedemo.com/) là ứng dụng thương mại điện tử chuẩn được lựa chọn thử nghiệm vì:
1. Mô phỏng quy trình E-Commerce thực tế đầy đủ: Đăng nhập, Danh mục sản phẩm, Sắp xếp, Giỏ hàng và Thanh toán đặt hàng E2E.
2. Tích hợp sẵn các tài khoản thử nghiệm đặc thù cho QA:
   - `standard_user`: Kiểm thử luồng hợp lệ (Happy Path).
   - `locked_out_user`: Kiểm thử lỗi bảo mật / khóa tài khoản.
   - `problem_user`: Mô phỏng ứng dụng bị lỗi giao diện/dữ liệu (`sl-404`).
   - `performance_glitch_user`: Kiểm thử độ trễ mạng và quan sát hiệu năng.

### 2.2 Các phân hệ ứng dụng được chọn kiểm thử (What parts were tested?)
- **Login Module**: Xác thực người dùng, xử lý lỗi đăng nhập và tài khoản bị khóa.
- **Product Catalog Module**: Hiển thị danh mục 6 sản phẩm, 4 chế độ sắp xếp, chuyển đổi nút Add to cart sang Remove và cập nhật giỏ hàng.
- **Cart Module**: Hiển thị chi tiết Tên/Mô tả/Giá tiền, xóa sản phẩm khỏi giỏ và đánh giá hạn chế UX/UI.
- **Checkout Module**: Luồng thanh toán E2E hoàn tất đơn hàng (`SauceCard #31337`), validation trường bắt buộc và phát hiện lỗi Boundary chấp nhận Zip code số âm (`-12345`).

---

## 📥 3. YÊU CẦU ĐẦU VÀO (INPUT USER STORY / REQUIREMENT)
Hệ thống chấp nhận yêu cầu đầu vào dạng User Story:
> *"Là một người dùng thương mại điện tử, tôi muốn đăng nhập, xem danh mục sản phẩm, quản lý giỏ hàng và hoàn tất thanh toán trên trang SauceDemo."*

---

## 🔄 4. AI QA WORKFLOW

```text
Requirement / User Story
   ↓
AI Test Case Generation (Prompt Engineering)
   ↓
Playwright Automation (Chromium / Firefox / WebKit)
   ↓
Test Execution & Evidence Collection (Screenshots / Logs)
   ↓
Failure Analysis (Automation Failure vs. Application Defect)
   ↓
Bug Report (Markdown Format)
```

---

## 📊 5. TEST COVERAGE – 15 TEST CASES

Bộ 15 Test Cases được cấu trúc chuẩn hóa bao phủ 4 phân hệ cốt lõi:

| Phân hệ (Module) | Số lượng Test Cases | Các kịch bản kiểm thử |
| :--- | :---: | :--- |
| **1. Login** | **5** | • `TC-LOG-01` [Positive]: Standard User Đăng nhập thành công.<br>• `TC-LOG-02` [Negative]: Bắt lỗi tài khoản bị khóa `locked_out_user`.<br>• `TC-LOG-03` [Negative]: Bắt lỗi đăng nhập sai Mật khẩu.<br>• `TC-LOG-04` [Negative]: Bắt lỗi để trống thông tin credentials.<br>• `TC-LOG-05` [Performance Observation]: Quan sát thời gian phản hồi của `performance_glitch_user`. |
| **2. Product** | **4** | • `TC-PROD-01` [Positive]: Kiểm tra hiển thị 6 sản phẩm (Tên, Giá, Ảnh, Add to cart).<br>• `TC-PROD-02` [Positive]: Kiểm tra 4 chế độ lọc Sắp xếp (A-Z, Z-A, Price low-high, Price high-low).<br>• `TC-PROD-03` [Positive]: Nút Add to cart đổi thành Remove & tăng badge giỏ hàng +1.<br>• `TC-PROD-04` [Validation Defect]: Phát hiện lỗi vỡ ảnh của tài khoản `problem_user`. |
| **3. Cart** | **3** | • `TC-CART-01` [Positive]: Kiểm tra Tên, Mô tả, Giá tiền trong Giỏ hàng.<br>• `TC-CART-02` [Positive]: Nút Remove xóa sản phẩm trực tiếp từ trang Cart.<br>• `TC-CART-03` [UX Observation]: Ghi nhận hạn chế UX Giỏ hàng (Thiếu thumbnail & nút chỉnh qty). |
| **4. Checkout** | **3** | • `TC-CHK-01` [Positive E2E]: Hoàn tất đơn hàng `Sauce Labs Fleece Jacket` ($49.99, SauceCard #31337).<br>• `TC-CHK-02` [Negative]: Bắt lỗi để trống các trường bắt buộc khi Checkout.<br>• `TC-CHK-03` [Boundary Defect]: Bắt lỗi hệ thống chấp nhận Zip Code số âm (`-12345`). |

---

## 🤖 6. AI USAGE & VERIFICATION

### 6.1 AI được sử dụng như thế nào?

AI được sử dụng để hỗ trợ các bước trong quy trình QA:

| QA Activity          | AI Usage                                                                                  |
| -------------------- | ----------------------------------------------------------------------------------------- |
| Requirement Analysis | Phân tích User Story / Requirement và xác định phạm vi kiểm thử                           |
| Test Case Generation | Sinh Positive, Negative, Boundary và Validation Test Cases                                |
| Prompt Engineering   | Xây dựng Prompt theo Role + Context + Requirement + Constraints + Output                  |
| Automation           | Hỗ trợ chuyển Test Cases thành Playwright Test Scripts                                    |
| Failure Analysis     | Phân tích nguyên nhân Test Failure và phân biệt Automation Failure với Application Defect |
| Bug Reporting        | Hỗ trợ xây dựng cấu trúc Bug Report từ Test Result và Evidence                            |

### 6.2 Prompt Engineering

Prompt được thiết kế theo cấu trúc:

```text
Role
  +
Context
  +
Requirement
  +
Constraints
  +
Expected Output
```

Prompt yêu cầu AI:

* Sinh đúng 15 Test Cases.
* Phân bổ Login 5, Product 4, Cart 3, Checkout 3.
* Bao phủ Positive, Negative, Boundary và Validation.
* Không tự giả định chức năng không tồn tại.
* Không đưa ra Performance Threshold nếu không có SLA.
* Mỗi Test Case phải có QA Reasoning.
* Với các Test Case phát hiện defect, assertion phải dựa trên Expected Result.

Các Prompt được lưu tại:

[`prompts/prompts.md`](prompts/prompts.md)

### 6.3 AI Output Verification

AI output không được sử dụng trực tiếp.

Các Test Case, selector và assumption do AI đề xuất được kiểm chứng lại với website và DOM thực tế của SauceDemo trước khi đưa vào automation.

Một số ví dụ:

**1. AI hallucination**

AI có thể đề xuất các chức năng như:

* Forgot Password
* Social Login
* Product Reviews

Sau khi kiểm tra website thực tế, các chức năng này được loại bỏ vì không thuộc giao diện và scope thực tế của SauceDemo.

**2. Selector không chính xác**

Một selector tổng quát ban đầu khiến `TC-CART-01` bị Playwright Strict Mode Error.

Sau khi phân tích failure, selector được scope lại:

```text
.cart_item .inventory_item_name
```

Test sau đó PASS trên Chromium, Firefox và WebKit.

**3. AI assumption về Cart**

AI assumption rằng Cart có product thumbnail được kiểm tra lại với giao diện thực tế.

Kết quả cho thấy Cart hiện tại không hiển thị thumbnail, vì vậy nội dung này được phân loại thành **UX Observation** thay vì Application Defect.

**4. Boundary Validation**

AI Test Case kiểm tra Postal Code âm với giá trị:

```text
-12345
```

Kết quả thực tế cho thấy hệ thống vẫn cho phép chuyển sang Checkout Overview.

Thay vì sửa assertion để Test PASS, Test Case được giữ FAIL để ghi nhận Application Defect.

### 6.4 Failure Classification

Project phân biệt:

```text
Test Failure
     │
     ├── Automation Failure
     │      └── Selector / Script / Test Implementation
     │
     └── Application Defect
            └── Application violates Expected Result
```

Cách phân loại này giúp tránh việc sửa Test Case chỉ để làm cho automation PASS.


## 📈 7. KẾT QUẢ THỰC THI (EXECUTION RESULT)

- **Tổng số lượt thực thi (Total Executions)**: **45** (15 Test Cases × 3 browsers)
- **Passed**: **39**
- **Failed**: **6**
- **Confirmed Application Defects**: **2** (Cả 2 lỗi đều được tái hiện trên Chromium, Firefox và WebKit.)
- **Thời gian thực thi**: ~15.7 giây

---

## 🐞 8. BÁO CÁO LỖI (BUG REPORTS)

Các lỗi ứng dụng thực tế được xác nhận và lưu tại [`bug-reports/bug-report.md`](bug-reports/bug-report.md):

1. **`BUG-SAUCE-001`**: Hệ thống chấp nhận giá trị số âm (`-12345`) cho ô Postal Code khi Checkout và cho phép chuyển sang trang Overview mà không có validation message. (Tái hiện trên Chromium ❌, Firefox ❌, WebKit ❌).
2. **`BUG-SAUCE-002`**: Hình ảnh sản phẩm hiển thị không đúng khi đăng nhập bằng tài khoản problem_user; qua kiểm tra DOM, image src chứa sl-404. Lỗi được tái hiện trên Chromium, Firefox và WebKit.
3. **`OBS-SAUCE-001`**: Ghi nhận hạn chế trải nghiệm người dùng (UX Observation) tại trang Giỏ hàng khi không có ảnh thumbnail và nút điều chỉnh số lượng (Quantity Picker).
---

## 🎁 9. TÍNH NĂNG BONUS – AI WEBSITE EXPLORER

### Status: Not Implemented

Tính năng AI Website Explorer là phần Bonus của Challenge.

Trong phiên bản hiện tại, project **chưa triển khai tính năng AI tự động crawl/explore website và tự đề xuất Test Case**.

Thay vào đó, project tập trung vào workflow chính của Challenge:

```text
Requirement / User Story
        ↓
AI Test Case Generation
        ↓
Playwright Automation
        ↓
Test Execution
        ↓
Failure Analysis
        ↓
Bug Report
```

Việc không triển khai Bonus giúp project tập trung vào chất lượng Test Thinking, AI Verification, Automation và Bug Detection.

## 📦 10. CHALLENGE DELIVERABLES

| Challenge Requirement            | Project Deliverable                                      |
| -------------------------------- | -------------------------------------------------------- |
| Test Strategy                    | [`TEST_STRATEGY.md`](TEST_STRATEGY.md)                   |
| AI-Generated Test Cases          | [`test-cases/`](test-cases/)                             |
| Minimum 15 meaningful Test Cases | **15 Test Cases**                                        |
| Automated Tests                  | [`tests/saucedemo.spec.js`](tests/saucedemo.spec.js)     |
| Test Results                     | **45 executions: 39 Passed / 6 Failed**                  |
| Screenshot Evidence              | `test-results/screenshots/`                              |
| Execution Logs                   | `test-results/logs/execution.log`                        |
| Bug Report                       | [`bug-reports/bug-report.md`](bug-reports/bug-report.md) |
| AI Usage & Verification          | [`AI_WORKLOG.md`](AI_WORKLOG.md)                         |
| Prompt Engineering               | [`prompts/prompts.md`](prompts/prompts.md)               |
| Demo                             | Demo video                                               |

---

## 🎬 11. DEMO

Demo trình bày workflow từ Requirement đến Bug Report:

```text
Requirement / User Story
          ↓
AI Test Case Generation
          ↓
15 Test Cases
          ↓
Playwright Automation
          ↓
Chromium / Firefox / WebKit
          ↓
45 Test Executions
          ↓
39 Passed / 6 Failed
          ↓
Failure Analysis
          ↓
Evidence
          ↓
Bug Report
```

### Nội dung Demo

1. Giới thiệu Requirement / User Story.
2. Giới thiệu Prompt dùng để sinh Test Cases.
3. Hiển thị 15 Test Cases.
4. Hiển thị Playwright automation.
5. Chạy test trên Chromium, Firefox và WebKit.
6. Hiển thị kết quả `39 Passed / 6 Failed`.
7. Phân tích các Test Case Failed.
8. Hiển thị Screenshot và Execution Log làm Evidence.
9. Hiển thị `BUG-SAUCE-001` và `BUG-SAUCE-002`.

**Demo Video:** `[Thêm link video khi hoàn thành]`


## 📁 12. PROJECT STRUCTURE

```text
.
├── 📄 README.md                 # Tài liệu tổng quan dự án & hướng dẫn chạy
├── 📄 AI_WORKLOG.md             # Nhật ký ứng dụng AI, kiểm chứng & lộ trình 7 ngày
├── 📄 TEST_STRATEGY.md          # Chiến lược kiểm thử & ma trận kết quả thực thi
├── 📄 playwright.config.js      # Cấu hình Playwright Test Runner & cross-browser
├── 📄 package.json              # Cấu hình dự án & các thư viện dependencies
├── 📄 package-lock.json         # Lockfile quản lý phiên bản dependencies
├── 📄 .gitignore                # File cấu hình bỏ qua các tệp không commit
│
├── 📁 test-cases/
│   └── 📄 test-cases.md         # Chi tiết 15 Test Cases (Login, Product, Cart, Checkout)
│
├── 📁 tests/
│   └── 📄 saucedemo.spec.js     # Bộ mã Playwright tự động hóa 15 Test Cases
│
├── 📁 test-results/
│   ├── 📁 screenshots/          # Thư mục lưu ảnh chụp bằng chứng (Evidence Screenshots)
│   └── 📁 logs/                 # Thư mục lưu nhật ký thực thi (Execution Logs)
│
├── 📁 bug-reports/
│   └── 📄 bug-report.md         # Báo cáo chi tiết các lỗi ứng dụng (BUG-SAUCE-001, BUG-SAUCE-002)
│
└── 📁 prompts/
    └── 📄 prompts.md            # Bộ Prompt mẫu dùng cho AI QA Prompt Engineering
```

---

## ⚡ 13. HOW TO RUN

### Bước 1: Cài đặt Dependencies
```bash
npm install
```

### Bước 2: Cài đặt Trình duyệt Playwright (Chromium, Firefox, WebKit)
```bash
npx playwright install
```

### Bước 3: Thực thi Bộ Kiểm Thử Tự Động
```bash
# Chạy bộ test tự động trên cả 3 trình duyệt
npx playwright test tests/saucedemo.spec.js

# Hoặc chạy riêng từng test case
npx playwright test tests/saucedemo.spec.js -g "TC-LOG-01"
```

### Bước 4: Xem Báo Cáo Kết Quả HTML
```bash
npx playwright show-report
```
