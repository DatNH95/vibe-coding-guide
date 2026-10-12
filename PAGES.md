# Danh sách page

Khi người dùng gọi một số như “01”, xử lý đúng page trong bảng này. Page giữ số cố định theo thứ tự trình chiếu; không suy diễn nội dung page chưa được cung cấp.

| Page | Nội dung | SVG nguồn gốc | Khai báo trong code |
| --- | --- | --- | --- |
| 01 | Vibe coding — Travel Awards 2026, phiên bản thử nghiệm | `Silder 1.svg` | Object đầu tiên trong `slides` tại `scripts/build-assets.cjs` |
| 02 | Vibe coding là gì? — Cách sử dụng với Codex | Không có SVG gốc mới; dùng header/footer page 01 | `assets/page-02-content.svg`; object thứ hai trong `slides`; `assets/page-02.svg` được sinh tự động |

| 03 | Quy trình bắt đầu dự án Landing page | Header/footer page 01 | `assets/page-03-content.svg`; object thứ ba trong `slides` |

| 04 | Để Codex không đi lạc — Guideline và trợ lý dự án | Bố cục page 02, header/footer page 01 | `assets/page-04-content.svg`; object thứ tư trong `slides` |

| 05 | Khởi tạo Design System | Bố cục page 02, header/footer page 01 | `assets/page-05-content.svg`; object thứ năm trong `slides` |

| 06 | Thành phần cần có của 1 Design System cơ bản | Header/footer page 01 | `assets/page-06-content.svg`; object thứ sáu trong `slides` |

| 07 | Giao tiếp, quan sát và lại giao tiếp... | Header/footer page 01 | `assets/page-07-content.svg`; object thứ bảy trong `slides` |

| 08 | Hand-off Tech | Header/footer page 01 | `assets/page-08-content.svg`; object thứ tám trong `slides` |

| 09 | GitHub → Vercel — Đẩy code và kiểm tra chéo | Header/footer page 01 | `assets/page-09-content.svg`; object thứ chín trong `slides` |

| 10 | AI còn có thể làm gì ngoài công việc? | Bố cục page 07, header/footer page 01 | `assets/page-10-content.svg`; object thứ mười trong `slides` |

| 11 | Thiết kế nội thất — Ảnh số 2 | `assets/2.jpg`, header/footer page 01 | `assets/page-11-content.svg`; object thứ mười một trong `slides` |

| 12 | Thiết kế góc làm việc — Ảnh số 1 | `assets/1.png`, header/footer page 01 | `assets/page-12-content.svg`; object thứ mười hai trong `slides` |

| 13 | Góc làm việc — Ảnh số 3 | `assets/3.JPG`, header/footer page 01 | `assets/page-13-content.svg`; object thứ mười ba trong `slides` |

| 14 | Thank You | Bố cục page 10, header/footer page 01 | `assets/page-14-content.svg`; object thứ mười bốn trong `slides` |

Page 15… sẽ được thêm khi có nội dung tương ứng. Footer và thanh điều khiển dùng `01/14`, `02/14`…; tổng tự tăng bằng số page thực tế. Navigation chỉ đi tới page đã có nội dung. SVG gốc không thay đổi.
