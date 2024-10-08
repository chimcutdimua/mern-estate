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
mern-estate/
├── api/
|   ├───controllers
|   |   |--- auth.controller.js
|   |   |--- listing.controller.js
|   |   |--- user.controller.js
|   |──models
|   |   |--- listing.model.js
|   |   |--- user.model.js
|   |───utils 
|   |   |--- error.js
|   |   |--- verifyUser.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── listing.route.js
│   │   └── user.route.js
│   ├── index.js
│   └── package.json
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── ListingItem.jsx
│   │   │   ├── OAuth.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── SignUp.jsx
│   │   │   ├── LogIn.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── CreateListing.jsx
│   │   │   ├── UpdateListing.jsx
│   │   │   ├── Listing.jsx
│   │   │   └── Search.jsx
│   │   ├── redux/
│   │   |   ├── user/
│   │   │   |   ├── userSlice.jsx
│   │   │   ├── store.js
│   │   ├── App.js
│   │   ├── firebase.js
│   │   └── index.js
│   ├── dist/  # Thư mục này sẽ được tạo sau khi build ứng dụng React
│   └── package.json
├── .env
├── README.md
└── package.json
