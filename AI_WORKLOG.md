# 📝 AI_WORKLOG.md - AI Usage & Verification Log

Tài liệu ghi chép chi tiết quá trình ứng dụng AI, kiểm chứng thực tế (Fact-Checking & Anti-Hallucination) và định hướng phát triển theo đúng 5 phần quy định của Challenge.

---

## 1. AI Tools Used
- **ChatGPT**: Được sử dụng làm trợ lý AI chính để phân tích yêu cầu, xây dựng Test Cases, thiết kế Prompt Engineering và hỗ trợ review kết quả kiểm thử.
- **Antigravity**: Được sử dụng để hỗ trợ triển khai và thực hiện các tác vụ trong project, bao gồm hỗ trợ làm việc với mã nguồn, cấu trúc project và quá trình kiểm thử tự động.
- **Git/GitHub**: Được sử dụng để quản lý phiên bản và lưu trữ các tài liệu của challenge.

---

## 2. How AI Helped
1. **Tự động hóa sinh kịch bản kiểm thử (Test Cases Generation)**: 
   - Từ các yêu cầu kiểm thử E-Commerce, AI giúp cấu trúc nhanh chóng đúng **15 Test Cases** bao phủ 4 phân hệ (Login: 5, Product: 4, Cart: 3, Checkout: 3) với đầy đủ 4 phân loại: Positive, Negative, Boundary, và Validation.
2. **Hỗ trợ định dạng & Cấu trúc Prompt**:
   - Tối ưu hóa kỹ thuật Prompt Engineering theo mẫu chuẩn (Role + Context + Requirement + Constraints + Output Format) để sinh kịch bản nhất quán.
3. **Chuẩn hóa Báo cáo lỗi (Bug Report Formatting)**:
    - AI hỗ trợ phân tích các bất thường được phát hiện trong quá trình kiểm thử, như việc Postal Code `-12345` được chấp nhận và hình ảnh lỗi của `problem_user`.
   - Các kết quả phân tích này sẽ được sử dụng làm cơ sở để xây dựng Bug Report ở bước tiếp theo.

---

## 3. Incorrect AI Outputs
Trong quá trình làm việc, một số đề xuất của AI chưa hoàn toàn chính xác so với thực tế trang SauceDemo và đã được hiệu đính:

1. **Đề xuất các tính năng không tồn tại (Potential Hallucinations)**:
   - AI có nguy cơ đề xuất các chức năng không tồn tại trên SauceDemo, chẳng hạn như Forgot Password, Social Login hoặc Product Reviews. Các đề xuất này đã được loại bỏ sau khi đối chiếu với giao diện thực tế.
2. **Sai lệch bộ chọn CSS (Selector Misalignment)**:
   - AI sinh ra các bộ chọn CSS chung chung như `button.add-to-cart`, trong khi SauceDemo sử dụng các thuộc tính riêng như `data-test="add-to-cart-sauce-labs-backpack"`.
3. **Giả định sai về giao diện Giỏ hàng (`/cart.html`)**:
   - AI giả định rằng trang Giỏ hàng hiển thị đầy đủ hình ảnh sản phẩm (thumbnails), nhưng khi kiểm tra thực tế phát hiện trang Cart **không hiển thị hình ảnh sản phẩm**.
4. **Sai biệt giữa Dự đoán của AI và Kết quả Thực tế (AI Prediction ≠ Actual Result - Postal Code Boundary)**:
   - AI ban đầu đề xuất hành vi mong đợi là hệ thống phải từ chối Postal Code âm. Tuy nhiên, khi kiểm tra thực tế, SauceDemo cho phép nhập `-12345` và tiếp tục sang trang Overview. Kết quả thực tế được sử dụng làm cơ sở để xác định đây là một validation defect thay vì chỉ xem đây là giả định của AI.

---

## 4. How I Improved AI Output
Để khắc phục các điểm chưa chính xác trên và đảm bảo tính đúng đắn cho bài làm, tôi đã thực hiện các bước hiệu đính:

1. **Bổ sung ràng buộc nghiêm ngặt trong Prompt (Strict Prompt Constraints)**:
   - Thêm các câu lệnh ràng buộc vào **Prompt 1**:  
     `"Chỉ đưa ra Test Case dựa trên thông tin và chức năng được cung cấp hoặc đã xác minh. Nếu thông tin chưa đủ để xác định hành vi mong đợi, phải ghi rõ 'Cần kiểm chứng' thay vì tự suy đoán. Đối với Performance Testing, không tự đặt ngưỡng thời gian nếu chưa có SLA cụ thể."`
2. **Kiểm chứng Selector trước Automation**:
   - Các selector do AI đề xuất sẽ được đối chiếu với DOM thực tế của SauceDemo trước khi sử dụng trong Playwright.
   - Ưu tiên các thuộc tính `data-test` có sẵn trên hệ thống thay vì tự suy đoán selector.
3. **Chuyển thông tin sai biệt thành Test Case kiểm thử & Phát hiện Bug thực tế**:
   - Sai biệt về Zip code số âm được ghi nhận trong Test Case `TC-CHK-03` và sử dụng làm cơ sở để phân tích Bug ở bước tiếp theo.
   - Sai biệt về hình ảnh trang Cart được ghi nhận trong Test Case `TC-CART-03` dưới dạng UX Observation thay vì kết luận đây là Defect.

---

## 5. What I Would Improve With 7 More Days
Nếu có thêm 7 ngày để nâng cấp sản phẩm AI QA Engineer Assistant:

* **Ngày 1 - 2 (Tích hợp Live LLM API & Dynamic Crawler)**: Kết nối trực tiếp API của OpenAI/Gemini vào hệ thống Backend Express để người dùng chỉ cần nhập URL bất kỳ, AI sẽ tự cào DOM và sinh Test Cases thời gian thực.
* **Ngày 3 - 4 (Kiểm thử so sánh giao diện Visual Regression Testing)**: Tích hợp công cụ so sánh ảnh `Pixelmatch` để AI tự động phát hiện lệch Pixel, vỡ ảnh hoặc vỡ layout trên các tài khoản lỗi như `problem_user`.
* **Ngày 5 (Tự động hóa CI/CD Pipeline)**: Cấu hình GitHub Actions tự động kích hoạt bộ test Playwright mỗi khi có commit mới và gửi báo cáo kết quả qua Slack / Telegram Bot Webhook.
* **Ngày 6 - 7 (Xây dựng Dashboard trực quan)**: Phát triển giao diện Web Dashboard bằng React + Tailwind CSS hiển thị biểu đồ thống kê Pass/Fail, danh sách bằng chứng ảnh chụp và cho phép tải xuống Bug Reports chuẩn Jira với 1-click.
