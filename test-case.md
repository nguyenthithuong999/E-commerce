### 1 🔐 Login Page 
| case_id | module_id | type | description |
|---|---|---|---|
| LOGIN_001 | Login | Negative | Login fail với username/password sai. Kiểm tra hiển thị error message "Epic sadface: Username and password do not match any user in this service" → bấm nút X đóng error → Expected: Error message biến mất |
| LOGIN_002 | Login | Negative | Để trống username, nhập password hợp lệ, bấm Login. Expected: Hiển thị error message "Epic sadface: Username is required" |
| LOGIN_003 | Login | Negative | Nhập username hợp lệ, để trống password, bấm Login. Expected: Hiển thị error message "Epic sadface: Password is required" |
| LOGIN_004 | Login | Negative | Để trống cả username và password, bấm Login. Expected: Hiển thị error message "Epic sadface: Username is required" |
| LOGIN_005 | Login | Positive | Login thành công. Kiểm tra chuyển hướng và product title hiển thị |

### 2 📦 Product Page
| case_id | module_id | type | description |
|---|---|---|---|
| PRODUCT_001 | Product | Positive | Bấm nút "Add to cart" ở sản phẩm đầu tiên. Kiểm tra nút đổi thành "Remove" và cart badge là 1 | 
| PRODUCT_002 | Product | Positive | Bấm nút "Add to cart" → Expected: Cart badge = 1. Bấm nút "Remove" của sản phẩm đó. Kiểm tra nút đổi ngược lại thành "Add to cart" và cart badge biến mất | 
| PRODUCT_003 | Product | Positive | Chọn sort "az" → Lấy tất cả tên sản phẩm → Expected: Danh sách tên đã sắp xếp tăng dần (A→Z) | 
| PRODUCT_004 | Product | Positive | Chọn sort "za" → Lấy tất cả tên sản phẩm → Expected: Danh sách tên đã sắp xếp giảm dần (Z→A) | 
| PRODUCT_005 | Product | Positive | Chọn sort "lohi" → Lấy tất cả giá → Expected: Danh sách giá sắp xếp tăng dần | 
| PRODUCT_006 | Product | Positive | Chọn sort "hilo" → Lấy tất cả giá → Expected: Danh sách giá sắp xếp giảm dần | 
| PRODUCT_007 | Product | Positive | Thêm nhiều sản phẩm vào giỏ hàng. Bấm "Add to cart" cho 3 sản phẩm khác nhau → Expected: Cart badge hiển thị 3, có 3 nút "Remove" | 
| PRODUCT_008 | Product | Positive | Bấm vào tên sản phẩm để xem chi tiết → Expected: Navigate đến trang chi tiết, hiển thị đúng tên + mô tả + giá + nút "Add to cart" | 
| PRODUCT_009 | Product | Positive | Verify số lượng sản phẩm trên trang → Expected: Hiển thị đúng 6 sản phẩm (mặc định của SauceDemo) | 


### 3 🛒 Cart Page
| case_id | module_id | type | description | note |
|---|---|---|---|---|
| CART_001 | Cart | Positive | Add 2 sản phẩm, click cart, verify cart title, items count và checkout button | Đã có |
| CART_002 | Cart | Positive | Xem giỏ hàng trống. Không add sản phẩm → Click cart icon → Expected: Hiển thị title "Your Cart", số cart item = 0 | Thiếu |
| CART_003 | Cart | Positive | Xóa sản phẩm trong giỏ hàng. Add 2 sản phẩm → Vào cart → Bấm "Remove" 1 sản phẩm → Expected: Chỉ còn 1 item | Thiếu |
| CART_004 | Cart | Positive | Xóa hết sản phẩm trong giỏ hàng. Add 1 sản phẩm → Vào cart → Remove → Expected: Cart rỗng, cart badge biến mất | Thiếu |
| CART_005 | Cart | Positive | Bấm "Continue Shopping". Vào cart → Bấm "Continue Shopping" → Expected: Quay lại trang Products | Thiếu |
| CART_006 | Cart | Positive | Verify thông tin sản phẩm trong cart. Add "Sauce Labs Backpack" → Vào cart → Expected: Tên, giá, số lượng hiển thị chính xác | Thiếu |
| CART_007 | Cart | Positive | Bấm Checkout. Add sản phẩm → Vào cart → Bấm "Checkout" → Expected: Navigate đến trang Checkout Step One | Thiếu |

### 4 💳 Checkout Page
| case_id | module_id | type | description | note |
|---|---|---|---|---|
| CHECKOUT_001 | Checkout | Positive | Checkout thành công (happy path). Add sản phẩm → Cart → Checkout → Điền info → Finish → Expected: Hiển thị "Thank you for your order!" | Thiếu |
| CHECKOUT_002 | Checkout | Negative | Checkout với first name rỗng → Continue → Expected: Error "First Name is required" | Thiếu |
| CHECKOUT_003 | Checkout | Negative | Checkout với last name rỗng → Continue → Expected: Error "Last Name is required" | Thiếu |
| CHECKOUT_004 | Checkout | Negative | Checkout với zip code rỗng → Continue → Expected: Error "Postal Code is required" | Thiếu |
| CHECKOUT_005 | Checkout | Positive | Verify thông tin tổng kết đơn hàng ở Checkout Step Two → Expected: Hiển thị đúng tên sản phẩm, giá, Item total, Tax, Total | Thiếu |
| CHECKOUT_006 | Checkout | Positive | Bấm Cancel ở Checkout Step One → Expected: Quay lại trang Cart | Thiếu |
| CHECKOUT_007 | Checkout | Positive | Bấm Cancel ở Checkout Step Two → Expected: Quay lại trang Products | Thiếu |
| CHECKOUT_008 | Checkout | Positive | Bấm "Back Home" sau khi hoàn tất → Expected: Quay lại trang Products | Thiếu |
| NAV_001 | Navigation | Positive | Mở menu hamburger → Expected: Sidebar menu mở ra, có các options: All Items, About, Logout, Reset App State | Thiếu |
| NAV_002 | Navigation | Positive | Logout. Mở menu → Click "Logout" → Expected: Navigate về trang login | Thiếu |
| NAV_003 | Navigation | Positive | Reset App State. Add sản phẩm → Mở menu → Click "Reset App State" → Expected: Cart badge biến mất, tất cả nút "Remove" đổi thành "Add to cart" | Thiếu |