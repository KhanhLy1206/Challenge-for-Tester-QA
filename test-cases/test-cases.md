# 📋 Danh Sách 15 Test Cases Kiểm Thử SauceDemo (AI-Generated & QA Verified)

**Website kiểm thử**: [SauceDemo](https://www.saucedemo.com)  
**Phân bổ Module**: Login (5) | Product (4) | Cart (3) | Checkout (3) = **Tổng cộng 15 Test Cases**

---

## 📌 MODULE 1: LOGIN (5 TEST CASES)

### `TC-LOG-01` [Positive] Đăng nhập thành công với tài khoản hợp lệ
* **Mô tả**: Kiểm tra đăng nhập với `standard_user` và mật khẩu đúng `secret_sauce`.
* **Tiền điều kiện**: Đang ở trang đăng nhập `https://www.saucedemo.com`.
* **Các bước thực hiện**:
  1. Nhập Username: `standard_user`.
  2. Nhập Password: `secret_sauce`.
  3. Bấm nút **Login**.
* **Kết quả mong đợi**: Đăng nhập thành công, điều hướng sang trang danh mục `/inventory.html`, hiển thị tiêu đề "Products".
* **Lý do QA**: Xác minh tính năng đăng nhập cốt lõi của ứng dụng.

### `TC-LOG-02` [Negative] Bắt lỗi đăng nhập tài khoản bị khóa (Locked Out User)
* **Mô tả**: Đăng nhập với tài khoản `locked_out_user`.
* **Tiền điều kiện**: Trang đăng nhập SauceDemo.
* **Các bước thực hiện**:
  1. Nhập Username: `locked_out_user`.
  2. Nhập Password: `secret_sauce`.
  3. Bấm nút **Login**.
* **Kết quả mong đợi**: Hệ thống từ chối đăng nhập và hiển thị thông báo lỗi: `Epic sadface: Sorry, this user has been locked out.`.
* **Lý do QA**: Kiểm tra cơ chế khóa tài khoản bảo mật backend.

### `TC-LOG-03` [Negative] Bắt lỗi đăng nhập sai mật khẩu
* **Mô tả**: Đăng nhập với Username đúng nhưng Password sai.
* **Tiền điều kiện**: Trang đăng nhập SauceDemo.
* **Các bước thực hiện**:
  1. Nhập Username: `standard_user`.
  2. Nhập Password: `wrong_password`.
  3. Bấm nút **Login**.
* **Kết quả mong đợi**: Hiển thị lỗi `Epic sadface: Username and password do not match any user in this service`.
* **Lý do QA**: Đảm bảo không cho phép truy cập trái phép.

### `TC-LOG-04` [Negative] Bắt lỗi đăng nhập để trống thông tin
* **Mô tả**: Bấm Login khi cả 2 ô thông tin để trống.
* **Tiền điều kiện**: Trang đăng nhập SauceDemo.
* **Các bước thực hiện**:
  1. Để trống Username và Password.
  2. Bấm nút **Login**.
* **Kết quả mong đợi**: Hiển thị lỗi validation inline: `Epic sadface: Username is required`.
* **Lý do QA**: Xác minh kiểm tra dữ liệu bắt buộc (Required Fields).

### `TC-LOG-05` [Validation/Performance] Đánh giá độ trễ tài khoản Performance Glitch
* **Mô tả**: Đăng nhập với tài khoản `performance_glitch_user` để đo thời gian phản hồi.
* **Tiền điều kiện**: Trang đăng nhập SauceDemo.
* **Các bước thực hiện**:
  1. Nhập Username: `performance_glitch_user`.
  2. Nhập Password: `secret_sauce`.
  3. Bấm nút **Login** và đo thời gian xử lý.
* **Kết quả mong đợi**: Đăng nhập thành công vào `/inventory.html` trong thời gian cho phép (< 15,000ms).
* **Lý do QA**: Đo lường SLA hiệu năng dưới điều kiện độ trễ mạng giả lập.

---

## 📌 MODULE 2: PRODUCT - TRANG SẢN PHẨM (4 TEST CASES)

### `TC-PROD-01` [Positive] Kiểm tra hiển thị đầy đủ thông tin danh mục sản phẩm
* **Mô tả**: Xác minh danh mục hiển thị đủ 6 sản phẩm với đầy đủ Tên, Giá, Hình ảnh và Nút Add to cart.
* **Tiền điều kiện**: Đã đăng nhập bằng `standard_user`.
* **Các bước thực hiện**:
  1. Truy cập trang `/inventory.html`.
  2. Đếm số lượng sản phẩm trên danh mục.
  3. Kiểm tra các yếu tố: Tên sản phẩm, Giá ($), Hình ảnh thumbnail, Nút "Add to cart".
* **Kết quả mong đợi**: Hiển thị đúng 6 sản phẩm, mỗi sản phẩm có đủ Tên, Giá, Ảnh hiển thị sắc nét và nút Add to cart.
* **Lý do QA**: Đảm bảo toàn vẹn dữ liệu hiển thị giao diện bán hàng.

### `TC-PROD-02` [Positive] Kiểm tra 4 chế độ sắp xếp (Sort) sản phẩm
* **Mô tả**: Kiểm tra chức năng sắp xếp danh mục theo 4 tiêu chí: Name (A to Z), Name (Z to A), Price (low to high), Price (high to low).
* **Tiền điều kiện**: Đã đăng nhập vào trang `/inventory.html`.
* **Các bước thực hiện**:
  1. Chọn "Name (A to Z)" -> Kiểm tra sản phẩm đầu tiên là `Sauce Labs Backpack`.
  2. Chọn "Name (Z to A)" -> Kiểm tra sản phẩm đầu tiên là `Test.allTheThings() T-Shirt (Red)`.
  3. Chọn "Price (low to high)" -> Kiểm tra giá sản phẩm đầu tiên là `$7.99`.
  4. Chọn "Price (high to low)" -> Kiểm tra giá sản phẩm đầu tiên là `$49.99`.
* **Kết quả mong đợi**: Sản phẩm tái sắp xếp chính xác theo đúng tiêu chí đã chọn.
* **Lý do QA**: Xác minh thuật toán lọc/sắp xếp của sản phẩm.

### `TC-PROD-03` [Positive] Thêm sản phẩm vào giỏ và thay đổi trạng thái nút
* **Mô tả**: Bấm "Add to cart" sản phẩm trên trang chủ, xác minh nút đổi thành "Remove" và badge giỏ hàng tăng số lượng.
* **Tiền điều kiện**: Đang ở trang `/inventory.html`.
* **Các bước thực hiện**:
  1. Bấm nút **Add to cart** của sản phẩm `Sauce Labs Backpack`.
  2. Quan sát nút tại sản phẩm đó trên trang chủ.
  3. Quan sát biểu tượng Giỏ hàng trên header.
* **Kết quả mong đợi**: Nút "Add to cart" đổi thành nút **"Remove"**, badge trên icon Giỏ hàng hiển thị số `1`.
* **Lý do QA**: Đảm bảo đồng bộ trạng thái UI tương tác thời gian thực.

### `TC-PROD-04` [Negative/Bug Detection] Phát hiện lỗi hiển thị hình ảnh không đúng với sản phẩm của tài khoản Problem User
* **Mô tả**: Kiểm tra giao diện hiển thị khi đăng nhập bằng `problem_user`.
* **Tiền điều kiện**: Đăng nhập bằng `problem_user` / `secret_sauce`.
* **Các bước thực hiện**:
  1. Truy cập trang sản phẩm `/inventory.html`.
  2. Kiểm tra thuộc tính `src` của các thẻ ảnh sản phẩm.
* **Kết quả mong đợi**: Mỗi sản phẩm hiển thị đúng hình ảnh tương ứng với sản phẩm đó, không hiển thị ảnh lỗi hoặc ảnh của sản phẩm khác.
* **Kết quả thực tế**:Các hình ảnh sản phẩm hiển thị không đúng và trỏ về ảnh lỗi `/assets/sl-404-Cq1a9k9X.jpg`.
* **Lý do QA**: Kiểm tra tính chính xác của hình ảnh sản phẩm đối với từng tài khoản người dùng..

---

## 📌 MODULE 3: CART - TRANG GIỎ HÀNG (3 TEST CASES)

### `TC-CART-01` [Positive] Kiểm tra thông tin chi tiết sản phẩm trong Giỏ hàng
* **Mô tả**: Truy cập giỏ hàng để kiểm tra các thông tin sản phẩm đã thêm.
* **Tiền điều kiện**: Đã thêm 1 sản phẩm (`Sauce Labs Backpack`) vào giỏ hàng và mở trang `/cart.html`.
* **Các bước thực hiện**:
  1. Click vào biểu tượng Giỏ hàng.
  2. Kiểm tra thông tin hiển thị của item trong giỏ.
* **Kết quả mong đợi**: Giỏ hàng hiển thị đúng Tên sản phẩm, Mô tả (Description) và Giá tiền ($29.99).
* **Lý do QA**: Xác nhận dữ liệu sản phẩm được truyền chính xác sang giỏ hàng.

### `TC-CART-02` [Positive/Remove] Xóa sản phẩm trực tiếp từ trang Giỏ hàng
* **Mô tả**: Bấm nút "Remove" trong trang Cart để xóa sản phẩm.
* **Tiền điều kiện**: Giỏ hàng đang có 1 sản phẩm.
* **Các bước thực hiện**:
  1. Đang ở trang `/cart.html`.
  2. Bấm nút **Remove** bên cạnh sản phẩm.
  3. Kiểm tra danh sách giỏ hàng và badge icon.
* **Kết quả mong đợi**: Sản phẩm bị xóa khỏi giỏ hàng, badge số lượng trên icon Cart biến mất.
* **Lý do QA**: Đảm bảo chức năng quản lý giỏ hàng loại bỏ sản phẩm chính xác.

### `TC-CART-03` [UX Observation] Phát hiện hạn chế UX/UI Giỏ hàng (Thiếu hình ảnh & Thiếu nút chỉnh số lượng)
* **Mô tả**: Kiểm tra thiết kế trang Giỏ hàng so với tiêu chuẩn UX E-commerce.
* **Tiền điều kiện**: Đang ở trang `/cart.html`.
* **Các bước thực hiện**:
  1. Quan sát danh sách item trong giỏ hàng.
  2. Kiểm tra sự tồn tại của hình ảnh thumbnail sản phẩm và bộ chỉnh số lượng (Quantity selector/input).
* **Kết quả mong đợi**: Ghi nhận hạn chế thiết kế: Trang giao diện Cart hiện tại không cung cấp thumbnail trực tiếp và không có chức năng điều chỉnh quantity.
* **Lý do QA**: Đánh giá trải nghiệm người dùng (UX Improvement Analysis).

---

## 📌 MODULE 4: CHECKOUT - TRANG THANH TOÁN (3 TEST CASES)

### `TC-CHK-01` [Positive E2E] Hoàn tất luồng thanh toán đặt hàng thành công
* **Mô tả**: Thực hiện đầy đủ quy trình Checkout từ Giỏ hàng đến trang hoàn tất đơn hàng.
* **Tiền điều kiện**: Có 1 sản phẩm trong giỏ (`Sauce Labs Fleece Jacket` - $49.99).
* **Các bước thực hiện**:
  1. Ở trang `/cart.html`, bấm **Checkout**.
  2. Nhập First Name: `John`, Last Name: `Doe`, Zip/Postal Code: `700000`.
  3. Bấm **Continue** sang trang Checkout Overview (`/checkout-step-two.html`).
  4. Kiểm tra thông tin: Payment Information (`SauceCard #31337`), Shipping (`Free Pony Express Delivery!`), Item total (`$49.99`).
  5. Bấm **Finish**.
* **Kết quả mong đợi**: Điều hướng đến `/checkout-complete.html` với thông báo "Thank you for your order!".
* **Lý do QA**: Xác minh luồng giao dịch doanh thu cốt lõi End-to-End.

### `TC-CHK-02` [Negative] Bắt lỗi khi bỏ trống các trường thông tin Checkout
* **Mô tả**: Bấm Continue ở bước 1 Checkout khi chưa nhập First Name, Last Name hoặc Zip Code.
* **Tiền điều kiện**: Đang ở trang `/checkout-step-one.html`.
* **Các bước thực hiện**:
  1. Để trống cả 3 ô nhập liệu.
  2. Bấm nút **Continue**.
* **Kết quả mong đợi**: Hệ thống hiển thị thông báo lỗi `Error: First Name is required`.
* **Lý do QA**: Đảm bảo không cho phép tạo đơn hàng thiếu thông tin giao hàng.

### `TC-CHK-03` [Boundary/Bug Detection] Phát hiện lỗi chấp nhận Zip/Postal Code số âm (Thiếu ràng buộc Validation)
* **Mô tả**: Kiểm tra nhập giá trị số âm vào ô Postal Code khi thanh toán.
* **Tiền điều kiện**: Đang ở trang `/checkout-step-one.html`.
* **Các bước thực hiện**:
  1. Nhập First Name: `John`, Last Name: `Doe`.
  2. Nhập Zip/Postal Code: `-12345` (Giá trị số âm không hợp lệ cho mã bưu chính).
  3. Bấm nút **Continue**.
* **Kết quả mong đợi (QA mong muốn)**: Hệ thống phải báo lỗi Postal Code không hợp lệ. Người dùng không được chuyển sang trang Checkout Overview.
* **Kết quả thực tế (Bug phát hiện)**: Hệ thống chấp nhận giá trị `-12345` và cho phép người dùng chuyển sang trang Checkout Overview.
* **Lý do QA**: Postal Code là mã định danh khu vực địa lý, không phải đại lượng có giá trị âm. Việc chấp nhận giá trị `-12345` cho thấy trường dữ liệu chưa có validation phù hợp đối với giá trị âm. 
