# 🛒 Multi-Branch POS API (Hệ thống API Bán hàng Đa Chi nhánh)

> **Central API Server** đóng vai trò là hạt nhân trung tâm xử lý dữ liệu, đồng bộ hóa hóa đơn, và cung cấp các dịch vụ quản trị cho hệ thống quản lý bán hàng (POS) phân tán đa chi nhánh. Dự án được phát triển bằng **Node.js**, **Express.js**, và **Sequelize ORM** kết hợp **SQLite**.

---

## 🌟 Tính Năng Cốt Lõi

*   **Quản Lý Đa Chi Nhánh (Multi-Branch Management):** Quản trị danh sách các chi nhánh của chuỗi cửa hàng, bao gồm thông tin liên hệ và vị trí địa lý.
*   **Quản Lý Sản Phẩm & SKU:** Danh mục sản phẩm đồng nhất với mã định danh duy nhất (SKU), mô tả sản phẩm và cấu hình giá bán.
*   **Quản Lý Tồn Kho Theo Chi Nhánh (Branch-Specific Inventory):** Tự động theo dõi số lượng tồn kho của từng sản phẩm riêng biệt tại mỗi chi nhánh khác nhau.
*   **Xác Thực & Phân Quyền (JWT Authentication):** 
    *   Hệ thống đăng nhập an toàn sử dụng cơ chế JSON Web Token (JWT) và mã hóa mật khẩu `bcryptjs`.
    *   Phân quyền chi tiết: **Admin** (Quản trị viên toàn quyền hệ thống) và **Staff** (Nhân viên vận hành, bị giới hạn phạm vi dữ liệu theo chi nhánh được gán).
*   **Hàng Đợi Đồng Bộ Hóa Ngoại Tuyến (Offline Synchronization Engine):**
    *   Cung cấp các API chuyên dụng giúp các Client bán hàng Desktop (chạy ngoại tuyến) có thể đẩy hóa đơn bán lẻ tạm lưu khi mất mạng lên máy chủ trung tâm ngay khi trực tuyến trở lại.
    *   Bảo đảm tính toàn vẹn dữ liệu, giải quyết xung đột mã hóa đơn và tự động điều chỉnh số lượng tồn kho thực tế của chi nhánh sau khi đồng bộ thành công.
*   **Kiểm Tra & Xác Thực Dữ Liệu Chặt Chẽ (Data Validation):** Sử dụng `express-validator` để ràng buộc kiểu dữ liệu, định dạng và tính hợp lệ của mọi thông tin đầu vào trước khi xử lý, đảm bảo hệ thống luôn ổn định và an toàn.
*   **Hệ Thống Ghi Vết Nâng Cao (Advanced Logging System):** Tích hợp `winston` và `morgan` theo dõi tự động các thao tác hệ thống, HTTP request, và báo lỗi kịp thời vào các tệp log riêng biệt.
*   **Báo Cáo & Phân Tích (Admin Analytics Dashboard):** Tổng hợp doanh thu theo dòng thời gian, xếp hạng doanh số giữa các chi nhánh, giám sát mặt hàng sắp hết hàng (Low Stock), và danh sách giao dịch mới nhất.
*   **Tài Liệu API Tự Động (Swagger Integration):** Tích hợp công cụ **Swagger UI** giúp lập trình viên tra cứu và thử nghiệm trực tiếp toàn bộ các endpoint API tại địa chỉ `/api-docs`.

---

## 🛠️ Công Nghệ Sử Dụng

*   **Runtime:** Node.js (Yêu cầu phiên bản `>= 22.0.0`)
*   **Framework:** Express.js (v5.x hỗ trợ các tính năng routing hiện đại)
*   **Database ORM:** Sequelize v6 (Sử dụng driver `sqlite3` làm cơ sở dữ liệu mặc định, dễ dàng mở rộng sang PostgreSQL, MySQL hoặc MS SQL Server bằng cách cấu hình lại kết nối).
*   **Security & Validation:** `bcryptjs` để băm mật khẩu, `jsonwebtoken` để cấp phát Bearer Token, và `express-validator` để kiểm duyệt dữ liệu đầu vào.
*   **API Documentation:** `swagger-jsdoc` & `swagger-ui-express` để viết tài liệu trực tiếp trong code theo chuẩn OpenAPI 3.0.
*   **Logs & Development:** `winston` kết hợp `morgan` tạo hệ thống ghi vết nhật ký hệ thống mạnh mẽ, lưu trữ theo file ngày; `nodemon` hỗ trợ reload server tức thì khi code thay đổi.

---

## 📂 Cấu Trúc Thư Mục Dự Án

```text
multi-branch-pos-api/
├── logs/                   # Chứa các file nhật ký hệ thống (Winston logs)
├── src/
│   ├── config/             # Cấu hình hệ thống (Kết nối DB, Swagger...)
│   │   ├── database.js     # Khởi tạo kết nối Sequelize SQLite
│   │   └── swagger.js      # Cấu hình Swagger OpenAPI doc
│   ├── models/             # Định nghĩa Schema & Model Cơ sở dữ liệu
│   │   ├── branch.model.js     # Thông tin chi nhánh
│   │   ├── user.model.js       # Tài khoản & Quyền hạn
│   │   ├── product.model.js    # Thông tin hàng hóa chung
│   │   ├── inventory.model.js  # Số lượng tồn kho theo chi nhánh
│   │   ├── customer.model.js   # Danh bạ khách hàng chuỗi
│   │   ├── order.model.js      # Thông tin tổng quát hóa đơn
│   │   ├── order-item.model.js # Chi tiết hàng hóa trong hóa đơn
│   │   └── associations.js     # Thiết lập mối quan hệ giữa các bảng (1-n, n-n)
│   ├── routes/             # Định tuyến API
│   │   ├── auth.routes.js      # Xác thực tài khoản
│   │   ├── branch.routes.js    # Quản lý chi nhánh
│   │   ├── customer.routes.js  # Quản lý khách hàng
│   │   ├── dashboard.routes.js # Thống kê, biểu đồ Admin
│   │   ├── inventory.routes.js # Quản trị kho hàng chi nhánh
│   │   ├── order.routes.js     # Hóa đơn bán lẻ
│   │   ├── product.routes.js   # Quản lý danh mục sản phẩm
│   │   └── sync.routes.js      # API tiếp nhận đồng bộ hóa offline
│   ├── controllers/        # Điều hướng nghiệp vụ logic tiếp nhận từ route
│   ├── services/           # Xử lý Logic Nghiệp vụ (Business Logic Layer)
│   ├── repositories/       # Tương tác trực tiếp với Database qua Sequelize Model
│   ├── validations/        # Các schema kiểm tra dữ liệu đầu vào (Express-validator)
│   ├── middlewares/        # Bộ lọc xử lý (Xác thực Token, kiểm tra quyền hạn, validation...)
│   ├── utils/              # Các hàm tiện ích dùng chung
│   │   └── logger.js       # Cấu hình Winston logger
│   └── app.js              # Khởi tạo Express App và cấu hình Middleware toàn cục
├── postman/                # Các file Postman Collection & Environments để test API
├── .env                    # Biến môi trường cục bộ (Bảo mật)
├── .env.example            # Bản mẫu cấu hình biến môi trường
├── package.json            # Quản lý thư viện và script npm
├── seed.js                 # Script nạp dữ liệu mẫu thử nghiệm ban đầu
└── server.js               # Điểm khởi chạy (Entrypoint) của ứng dụng
```

---

## 🚀 Hướng Dẫn Cài Đặt & Khởi Chạy

### 1. Yêu Cầu Hệ Thống
*   Đã cài đặt **Node.js** phiên bản `22.0.0` trở lên.
*   Trình quản lý gói **npm** (đi kèm khi cài đặt Node.js).

### 2. Tải Mã Nguồn & Cài Đặt Thư Viện
Sao chép thư mục hoặc clone dự án về máy, di chuyển vào thư mục dự án và chạy lệnh:
```bash
npm install
```

### 3. Cấu Hình Biến Môi Trường
1.  Sao chép file `.env.example` thành `.env`:
    ```bash
    cp .env.example .env
    ```
2.  Mở file `.env` và điều chỉnh các tham số cấu hình nếu cần (Mặc định đã cấu hình chạy SQLite cục bộ và cổng kết nối `3000`).

### 4. Gieo Dữ Liệu Thử Nghiệm (Seed Database)
Để hệ thống tự tạo cấu trúc bảng SQLite và nạp trước một số dữ liệu mẫu (Chi nhánh Hà Nội & TP.HCM, tài khoản quản trị `admin`, nhân viên `staff1`, `staff2` và các sản phẩm mẫu), chạy lệnh sau:
```bash
npm run seed
```
> **⚠️ Lưu ý:** Lệnh này sẽ thiết lập lại hoàn toàn cơ sở dữ liệu (`force: true`). Tránh chạy lệnh này trên môi trường Production vì nó sẽ xóa sạch dữ liệu cũ.

### 5. Khởi Chạy Ứng Dụng

*   **Chế độ Phát triển (Development Mode):**
    Tự động khởi động lại ứng dụng mỗi khi bạn lưu thay đổi trong mã nguồn nhờ `nodemon`:
    ```bash
    npm run dev
    ```

*   **Chế độ Vận hành (Production Mode):**
    Chạy trực tiếp bằng Node.js thông thường:
    ```bash
    npm start
    ```

---

## 📖 Tài Liệu Hướng Dẫn Sử Dụng API (Swagger UI)

Khi server đang chạy local (ví dụ tại `http://localhost:3000`), bạn có thể mở trình duyệt và truy cập:
👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

🌍 **Môi trường Live:**
👉 **[https://api.yourdomain.com/api-docs](https://api.yourdomain.com/api-docs)**

Tại đây, bạn sẽ thấy toàn bộ danh sách API được phân loại trực quan:
1.  **Auth (`/api/auth`):** `POST /login`, `POST /register`, `GET /me`...
2.  **Branches (`/api/branches`):** Các tác vụ CRUD cho chi nhánh cửa hàng.
3.  **Products (`/api/products`):** Xem danh sách và tạo mới sản phẩm trong hệ thống.
4.  **Inventories (`/api/inventories`):** Cập nhật tồn kho của từng sản phẩm tại chi nhánh.
5.  **Customers (`/api/customers`):** Quản lý thông tin danh bạ khách hàng.
6.  **Orders (`/api/orders`):** Tạo đơn hàng trực tiếp hoặc truy vấn lịch sử hóa đơn.
7.  **Sync (`/api/sync`):** 
    *   `POST /api/sync/orders`: Đẩy hàng loạt đơn hàng tạm từ offline client lên cloud.
    *   `GET /api/sync/pending`: Xem danh sách các đơn hàng đang chờ đồng bộ hóa trên Express Server.
    *   `PUT /api/sync/status`: Cập nhật trạng thái của các hóa đơn sau khi hoàn thành đối soát.
8.  **Dashboard (`/api/dashboard`):** Lấy dữ liệu phân tích biểu đồ quản trị (Doanh số chi nhánh, tổng quan doanh thu).

---

## 📮 Kiểm Thử Bằng Postman (Postman Collection)

Bên cạnh Swagger UI, dự án cũng cung cấp sẵn bộ **Postman Collection** và **Environments** để thuận tiện cho việc kiểm thử API và làm việc nhóm. Toàn bộ dữ liệu Postman đã được đồng bộ và lưu trong thư mục `postman/`.

> **🔗 Live Server URL:** Hệ thống sau khi được deploy có thể gọi trực tiếp đến API qua đường dẫn cấu hình (ví dụ: `https://api.yourdomain.com/api`). Đừng quên sửa đổi `base_url` trong môi trường Postman tương ứng.

### Cách Sử Dụng:
1. Mở Postman (hoặc VS Code có extension Postman) và chọn **Import**.
2. Kéo thả hoặc chọn toàn bộ các file trong thư mục `postman/`:
   - `postman_collection.json` (Chứa danh sách đầy đủ các Endpoint, Test Scripts và các Examples response).
   - `postman_environment_admin.json` (Môi trường đi kèm cấu hình Admin).
   - `postman_environment_staff.json` (Môi trường đi kèm cấu hình Staff).
3. Sau khi Import, chọn Environment tương ứng ở góc phải trên cùng của Postman (Ví dụ: `Development (Admin)` hoặc `Development (Staff)`).
4. Chạy request **`Auth -> Login`** đầu tiên. Script tự động của collection sẽ tự động trích xuất chuỗi JWT và gán vào biến môi trường `token`. Từ đó, bạn có thể gọi tất cả các API được bảo mật tiếp theo mà không cần copy/paste token thủ công.

> **💡 Lưu ý:** Toàn bộ các test case phân quyền (bao gồm các trường hợp thành công và bị từ chối `403 Forbidden` đối với từng Role) đều đã được tạo sẵn Example Responses bên trong thư mục. Để bảo mật, các token mẫu (JWT) đã được làm sạch và thay thế bằng `<REDACTED_TOKEN>`.

---

## 🔒 Tài Khoản Thử Nghiệm Mặc Định

Sau khi cấu hình biến môi trường `DEFAULT_ADMIN_PASSWORD` trong file `.env` và chạy lệnh `npm run seed`, bạn có thể sử dụng các tài khoản sau để đăng nhập thử nghiệm:

| Tên Đăng Nhập (Username) | Mật Khẩu (Password) | Quyền Hạn (Role) | Chi Nhánh Được Gán (Branch Location) |
| :--- | :--- | :--- | :--- |
| **admin** | *(Giá trị của `DEFAULT_ADMIN_PASSWORD`)* | `admin` | Hà Nội - Chi nhánh 1 |
| **staff1** | *(Giá trị của `DEFAULT_ADMIN_PASSWORD`)* | `staff` | Hà Nội - Chi nhánh 1 |
| **staff2** | *(Giá trị của `DEFAULT_ADMIN_PASSWORD`)* | `staff` | TP.HCM - Chi nhánh 2 |

---

## ⚠️ Các Mặt Hạn Chế Hiện Tại (Current Limitations)

Mặc dù hệ thống đã xây dựng cấu trúc cơ sở dữ liệu cơ bản cho mô hình đa chi nhánh, nhưng bài toán "đa chi nhánh" thực tế vẫn chưa được giải quyết triệt để:
*   **Thiếu tính năng điều chuyển kho (Stock Transfer):** Chưa hỗ trợ quy trình xuất/nhập và luân chuyển hàng hóa an toàn giữa các chi nhánh.
*   **Thiếu chính sách giá linh hoạt:** Các sản phẩm hiện tại đang áp dụng chung một mức giá trên toàn hệ thống thay vì có chính sách giá riêng biệt cho từng chi nhánh hoặc khu vực.
*   **Cô lập dữ liệu (Data Isolation) chưa chặt chẽ:** Một số API backend chưa thực hiện kiểm tra và giới hạn quyền truy xuất dữ liệu nghiêm ngặt theo `branchId` của Staff ở cấp độ Server, phần lớn mới chỉ lọc ở phía Client.

---

## 🤝 Hướng Dẫn Phát Triển Đóng Góp

1.  Mọi Model cơ sở dữ liệu mới cần được khai báo tại `src/models/` và liên kết quan hệ trong `src/models/associations.js`.
2.  Đảm bảo import đầy đủ các Model mới vào file `server.js` trước khi Sequelize thực hiện sync để hệ thống tự động sinh bảng tương ứng.
3.  Viết chú thích `@swagger` phía trên mỗi Route mới để tài liệu Swagger UI tự động cập nhật chính xác.
