# MERN Estate

MERN Estate là một ứng dụng web quản lý bất động sản được xây dựng bằng MERN stack (MongoDB, Express.js, React, Node.js). Ứng dụng này cho phép người dùng đăng ký, đăng nhập, tạo danh sách bất động sản, và tìm kiếm các danh sách bất động sản.

## Chức năng chính

- **Đăng ký và Đăng nhập**: Người dùng có thể tạo tài khoản mới và đăng nhập vào hệ thống.
- **Quản lý hồ sơ cá nhân**: Người dùng có thể cập nhật thông tin cá nhân của mình.
- **Tạo danh sách bất động sản**: Người dùng có thể tạo mới, cập nhật và xóa danh sách bất động sản.
- **Tìm kiếm bất động sản**: Người dùng có thể tìm kiếm các danh sách bất động sản dựa trên các tiêu chí khác nhau.
- **Xem chi tiết bất động sản**: Người dùng có thể xem chi tiết của từng bất động sản.

## Công nghệ sử dụng

### Frontend

- **React**: Thư viện JavaScript để xây dựng giao diện người dùng.
- **React Router**: Thư viện để quản lý điều hướng trong ứng dụng React.
- **Redux**: Thư viện để quản lý state.
- **tailwind css**: Xử dụng để xây dựng giao diện.
- **fisebase**: Xác thực người dùng google (Authentication), Lưu trữ tệp hình ảnh (Storage)

### Backend

- **Node.js**: Môi trường chạy JavaScript phía server.
- **Express.js**: Framework web cho Node.js để xây dựng các API RESTful.
- **MongoDB**: Cơ sở dữ liệu NoSQL để lưu trữ dữ liệu.
- **Mongoose**: Thư viện để làm việc với MongoDB trong Node.js.
- **bcryptjs**:  thư viện JavaScript để mã hóa mật khẩu và so sánh mật khẩu đã mã hóa.

### Authentication

- **JWT (JSON Web Tokens)**: Được sử dụng để xác thực và ủy quyền người dùng.

### Khác

- **dotenv**: Thư viện để quản lý các biến môi trường.
- **cookie-parser**: Middleware để phân tích cú pháp cookie.
- **path**: Module để làm việc với đường dẫn tệp và thư mục.

## Cấu trúc thư mục:
![Screenshot 2024-10-08 145058](https://github.com/user-attachments/assets/02258840-1a2b-41d1-9c4b-cdab3679b65c)


