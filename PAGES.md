# Danh sách page

Khi người dùng gọi một số như “01”, xử lý đúng page trong bảng này. Page giữ số cố định theo thứ tự trình chiếu; không suy diễn nội dung page chưa được cung cấp.

| Page | Nội dung | SVG nguồn gốc | Khai báo trong code |
| --- | --- | --- | --- |
| 01 | Vibe coding — Travel Awards 2026, phiên bản thử nghiệm | `Silder 1.svg` | Object đầu tiên trong `slides` tại `scripts/build-assets.cjs` |
| 02 | Vibe coding là gì? — Cách sử dụng với Codex | Không có SVG gốc mới; dùng header/footer page 01 | `assets/page-02-content.svg`; object thứ hai trong `slides`; `assets/page-02.svg` được sinh tự động |

| 03 | Quy trình bắt đầu dự án Landing page | Header/footer page 01 | `assets/page-03-content.svg`; object thứ ba trong `slides` |

| 04 | Để Codex không đi lạc — Guideline và trợ lý dự án | Bố cục page 02, header/footer page 01 | `assets/page-04-content.svg`; object thứ tư trong `slides` |

| 05 | Khởi tạo Design System | Bố cục page 02, header/footer page 01 | `assets/page-05-content.svg`; object thứ năm trong `slides` |

Page 06… sẽ được thêm khi có nội dung tương ứng. Footer và thanh điều khiển dùng `01/10`, `02/10`…; tổng tối thiểu 10, tự tăng bằng số page thực tế khi vượt 10. Navigation chỉ đi tới page đã có nội dung. SVG gốc không thay đổi.
