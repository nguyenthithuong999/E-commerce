### 1 🔐 Login Page 
| case_id | module_id | type | description | note |
|---|---|---|---|---|
| LOGIN_001 | Login | Negative | Login fail với username/password sai. Kiểm tra hiển thị error message | Đã có |
| LOGIN_002 | Login | Positive | Login thành công. Kiểm tra chuyển hướng và product title hiển thị | Đã có |
| LOGIN_003 | Login | Negative | Để trống username, nhập password hợp lệ, bấm Login. Expected: Hiển thị error message "Epic sadface: Username is required" | Thiếu |
| LOGIN_004 | Login | Negative | Nhập username hợp lệ, để trống password, bấm Login. Expected: Hiển thị error message "Epic sadface: Password is required" | Thiếu |
| LOGIN_005 | Login | Negative | Để trống cả username và password, bấm Login. Expected: Hiển thị error message "Epic sadface: Username is required" | Thiếu |
| LOGIN_006 | Login | Negative | Nhập locked_out_user / secret_sauce, bấm Login. Expected: Hiển thị error "Epic sadface: Sorry, this user has been locked out." | Thiếu |
| LOGIN_007 | Login | Positive | Verify error message content chính xác. Đăng nhập sai và assert nội dung text của error message | Thiếu |
| LOGIN_008 | Login | Positive | Đóng error message. Đăng nhập sai → error xuất hiện → bấm nút X đóng error → Expected: Error message biến mất | Thiếu |

### 2 📦 Product Page
| case_id | module_id | type | description | note |
|---|---|---|---|---|
| PRODUCT_001 | Product | Positive | Bấm nút "Add to cart" ở sản phẩm đầu tiên. Kiểm tra nút đổi thành "Remove" và cart badge là 1 | Đã có |
| PRODUCT_002 | Product | Positive | Bấm nút "Remove" của sản phẩm đó. Kiểm tra nút đổi ngược lại thành "Add to cart" và cart badge biến mất | Đã có |
| PRODUCT_003 | Product | Positive | Chọn sort Price (low to high). Lấy giá sản phẩm và assert giá tăng dần | Đã có |
| PRODUCT_004 | Product | Positive | Chọn sort Name (Z to A). Lấy tên sản phẩm và assert tên giảm dần | Đã có |
| PRODUCT_005 | Product | Positive | Chọn sort "az" → Lấy tất cả tên sản phẩm → Expected: Danh sách tên đã sắp xếp tăng dần (A→Z) | Thiếu |
| PRODUCT_006 | Product | Positive | Chọn sort "hilo" → Lấy tất cả giá → Expected: Danh sách giá sắp xếp giảm dần | Thiếu |
| PRODUCT_007 | Product | Positive | Thêm nhiều sản phẩm vào giỏ hàng. Bấm "Add to cart" cho 3 sản phẩm khác nhau → Expected: Cart badge hiển thị 3, có 3 nút "Remove" | Thiếu |
| PRODUCT_008 | Product | Positive | Add rồi Remove rồi Add lại → Expected: Cart badge = 1, nút hiển thị "Remove" | Thiếu |
| PRODUCT_009 | Product | Positive | Bấm vào tên sản phẩm để xem chi tiết → Expected: Navigate đến trang chi tiết, hiển thị đúng tên + mô tả + giá + nút "Add to cart" | Thiếu |
| PRODUCT_010 | Product | Positive | Verify số lượng sản phẩm trên trang → Expected: Hiển thị đúng 6 sản phẩm (mặc định của SauceDemo) | Thiếu |
| PRODUCT_011 | Product | Positive | Add to cart từ trang chi tiết → Bấm "Add to cart" → Expected: Nút đổi thành "Remove", cart badge = 1 | Thiếu |

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