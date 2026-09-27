# 🤖 Bộ Prompt Mẫu AI QA (AI QA Prompt Engineering)

Tài liệu ghi chép chi tiết các câu Prompt chính được sử dụng trong dự án kiểm thử hệ thống bán hàng **SauceDemo** ([https://www.saucedemo.com](https://www.saucedemo.com)).

---

## 📌 PROMPT 1: SINH 15 TEST CASES KIỂM THỬ SAUCEDEMO (TEST CASE GENERATION PROMPT)

Prompt được thiết kế theo kỹ thuật **Prompt Engineering** chuẩn hóa (Role + Context + Requirement + Constraints + Output Format):

```text
[ROLE]: 
Bạn là Senior QA Automation Lead với 10 năm kinh nghiệm trong lĩnh vực E-Commerce Testing.

[CONTEXT]: 
Chúng tôi đang tiến hành thiết kế kịch bản kiểm thử cho hệ thống bán hàng SauceDemo (https://www.saucedemo.com).
Hệ thống bao gồm 4 phân hệ chính: 
1. Đăng nhập (Login)
2. Danh mục sản phẩm (Product Catalog)
3. Giỏ hàng (Cart)
4. Thanh toán đặt hàng (Checkout)

[REQUIREMENT & INPUT]:
Tạo bộ kịch bản kiểm thử chuẩn hóa gồm đúng 15 Test Cases được phân bổ bắt buộc như sau:
1. Module Login: 5 Test Cases (Positive đăng nhập hợp lệ, Negative locked_out_user, Invalid password, Blank fields, Performance glitch user).
2. Module Product: 4 Test Cases (Hiển thị 6 items + Tên/Giá/Ảnh, 4 chế độ Sort, Add to cart toggle sang Remove + Badge, Problem user broken images).
3. Module Cart: 3 Test Cases (Chi tiết sản phẩm trong giỏ, Nút Remove xóa sản phẩm, Hạn chế UX thiếu thumbnail & thiếu nút chỉnh số lượng).
4. Module Checkout: 3 Test Cases (Luồng thanh toán E2E thành công với SauceCard #31337, Bắt lỗi để trống field, Phát hiện lỗi Zip code nhận số âm -12345).

[CONSTRAINTS]:
- Không bịa ra các tính năng không có trên SauceDemo (như Forgot Password, Social Login).
- Chỉ đưa ra Test Case dựa trên thông tin và chức năng được cung cấp hoặc đã xác minh.
- Nếu thông tin chưa đủ để xác định hành vi mong đợi, phải ghi rõ "Cần kiểm chứng" thay vì tự suy đoán.
- Đối với Performance Testing, không tự đặt ngưỡng thời gian nếu chưa có SLA hoặc yêu cầu hiệu năng cụ thể.
- Mỗi Test Case phải có lập luận QA (Reasoning) lý giải tầm quan trọng.

[OUTPUT FORMAT]:
Mỗi Test Case bao gồm các trường thông tin:
- Test ID
- Phân loại (Positive / Negative / Boundary / Validation)
- Tiêu đề Test Case
- Tiền điều kiện (Prerequisites)
- Các bước thực hiện (Steps to Reproduce)
- Kết quả mong đợi (Expected Result)
- Lý do QA (QA Reasoning)
```

---

## 📌 PROMPT 2: CHUYỂN ĐỔI 15 TEST CASES THÀNH MÃ PLAYWRIGHT (CODE GENERATION PROMPT)

Prompt được sử dụng để chỉ đạo AI tạo mã nguồn kiểm thử tự động Playwright `tests/saucedemo.spec.js`:

```text
[ROLE]: 
Bạn là Senior Playwright Automation Developer.

[CONTEXT]: 
Tôi đã có danh sách 15 Test Cases kiểm thử ứng dụng SauceDemo (https://www.saucedemo.com).

[TASK]:
Chuyển đổi toàn bộ 15 Test Cases thành file mã nguồn tự động Playwright `tests/saucedemo.spec.js`.

[REQUIREMENTS]:
1. Sử dụng thư viện `@playwright/test` chuẩn ES Module.
2. Với mỗi Test Case, tự động chụp ảnh màn hình bằng chứng và lưu vào `test-results/screenshots/`.
3. Tạo hàm `logEvidence()` ghi vết thời gian thực thi vào file log `test-results/logs/execution.log`.
4. Sử dụng các thuộc tính data-test thực tế của SauceDemo (`data-test="username"`, `data-test="password"`, `data-test="login-button"`...).
5. Với TC-PROD-04 (Problem User) và TC-CHK-03 (Postal Code âm), thiết lập assertion theo kỳ vọng chuẩn QA để kiểm thử FAIL và phát hiện Bug tự động.

[OUTPUT FORMAT]: Mã nguồn JavaScript Playwright hoàn chỉnh, sạch sẽ, không dùng placeholder.
```

---

## 📝 GIẢI THÍCH KỸ THUẬT NGHỆ THUẬT VIẾT PROMPT (PROMPT ANALYSIS)

1. **Bối cảnh & Vai trò (Role & Context)**: Giúp AI hiểu rõ góc nhìn của một Senior QA Lead & Automation Engineer khi kiểm thử ứng dụng E-Commerce.
2. **Phân bổ định lượng rõ ràng**: Yêu cầu AI tạo đúng 15 Test Cases theo tỷ lệ 5 Login - 4 Product - 3 Cart - 3 Checkout để bao quát toàn bộ ứng dụng.
3. **Ràng buộc loại trừ (Constraints)**: Ngăn chặn AI tự bịa ra các tính năng không tồn tại trên SauceDemo (Anti-Hallucination).
4. **Cấu trúc đầu ra (Output Format)**: Đảm bảo dữ liệu đầu ra đồng nhất, giúp dễ dàng chuyển đổi thành mã tự động Playwright thực thi thực tế.
