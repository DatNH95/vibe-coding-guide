# SVG → Animated HTML Slider

HTML/CSS/JavaScript thuần, không có back-end hay thư viện ngoài. Dành cho trình chiếu desktop, giữ nguyên thiết kế SVG 1920×1080 và tỷ lệ 16:9, không crop hoặc thay font. Khung co giãn theo cửa sổ desktop; không có layout hay tương tác riêng cho mobile theo yêu cầu mới nhất.

## Chạy

- Mở trực tiếp `index.html` trong trình duyệt; các vector và ảnh nhúng nằm trong `assets/slides.js`, không cần fetch hay kết nối mạng.
- Hoặc chạy `node scripts/serve.cjs` rồi mở http://localhost:4173. Đây chỉ là công cụ preview cục bộ, không phải back-end sản phẩm.
- Phím ← / → chuyển slide; Home / End đến đầu/cuối; R phát lại animation; F toàn màn hình.
- Tôn trọng `prefers-reduced-motion`: bỏ animation khi người dùng bật giảm chuyển động.

## Cấu trúc và thiết kế

- `Silder 1.svg`: nguồn gốc, không chỉnh sửa.
- `index.html`: khung trình chiếu và điều khiển ngoài SVG.
- `styles.css`: khung 16:9 theo cửa sổ desktop và giao diện điều khiển.
- `slider.js`: SVG DOM, animation, navigation, bàn phím và fullscreen.
- `assets/slides.js`: markup SVG giữ nguyên, được đóng gói thành asset JavaScript để chạy cả qua `file://`.
- `assets/page-02-content.svg`: nội dung PAGE 02 có thể chỉnh sửa, với cùng bảng màu/font Arial và khung thiết kế page 01.
- `assets/page-02.svg`: PAGE 02 hoàn chỉnh sinh tự động, ghép nội dung mới với header/footer của SVG gốc.
- `scripts/build-assets.cjs`: khai báo slide/layer và sinh lại asset bằng `node scripts/build-assets.cjs`.

Project hiện có **14 page có nội dung**. Tổng trình chiếu tối thiểu là **20** theo yêu cầu: footer và thanh điều khiển dùng `01/20`, `02/20`; khi thêm hơn 20 page thì tổng tự tăng theo số page thực tế. Previous/Next chỉ điều hướng tới page đã có nội dung, không tạo page rỗng. SVG gốc page 01 giữ nguyên; số footer được cập nhật trong DOM phái sinh.

Page được đánh số `01`, `02`, `03`… theo thứ tự trong danh sách slide. Khi người dùng nói “01”, hiểu là sửa page 01. Xem `PAGES.md` để tìm file của từng page; giữ thứ tự và cập nhật bảng này khi bổ sung page.

SVG có 16 phần tử cấp ngoài: nền trắng; header/footer dạng path; hai đường kẻ; mask và nhóm rỗng; rect ảnh phong cảnh nhúng; nhóm 41 path chữ/đồ họa xanh; ba path tiêu đề/dòng phụ; rect logo ảnh nhúng; defs. Typography đã outline nên không cần cài font. Hai ảnh bitmap gốc được giữ nguyên, không thể biến thành vector mà vẫn bảo toàn artwork.

Animation page 01 có stagger 0–340 ms, opacity và dịch chuyển 12–20 đơn vị SVG, kết thúc trong 980 ms. Page 02 có entrance theo nhóm nội dung và bốn bước, stagger 90 ms. Header/footer giữ tĩnh; riêng số page cập nhật theo yêu cầu. Wrapper `<g>` bổ sung lúc chạy giữ nguyên paint order, path, clip, mask, màu và transform gốc. Exit 220 ms rồi entrance slide tiếp theo; điều khiển khóa trong lúc chuyển để tránh tranh chấp animation.

Nội dung hướng dẫn PAGE 02 được biên soạn theo [OpenAI: Prompting với Codex](https://learn.chatgpt.com/docs/prompting), có liên kết tham khảo trực tiếp trên slide. Định nghĩa vibe coding là phần diễn giải khái niệm cho người mới; câu về vai trò người dùng và Codex dùng nội dung do người dùng cung cấp.

## Thêm SVG được cung cấp sau

Thêm một object vào mảng `slides` trong `scripts/build-assets.cjs`, dùng `fs.readFileSync` để đọc SVG mới và khai báo `title`, `description`. `layers` là tùy chọn: chỉ số `node` là vị trí phần tử con trực tiếp của SVG, bắt đầu từ 0. Không có `layers` thì cả slide fade/translate nhẹ. Chạy lại lệnh build asset; bộ đếm, dots, nút và bàn phím cập nhật theo số slide. SVG mới nên có viewBox 16:9; các ID defs được scope tự động để tránh trùng giữa file.

## GitHub → Vercel

Đẩy các file lên GitHub rồi import repository trong Vercel, kết nối production với branch `main`. `vercel.json` chọn **Framework Preset: Other**, chạy **Build Command: node scripts/build-assets.cjs**, bỏ qua cài dependency và dùng thư mục gốc làm **Output Directory** (`.`). Mỗi deployment tạo lại asset từ nguồn; trình duyệt kiểm tra lại cache để nhận bản mới. Asset cũng được lưu trong repo nên có thể dùng GitHub Pages với thư mục root; các đường dẫn đều tương đối.
