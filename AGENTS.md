# Quy ước làm việc trong project

- Box nền xanh dùng chung gradient, lớp sáng và đường cong chuyển động như PAGE 02. Dùng `assets/blue-background.svg` và CSS `.blue-gradient-motion`, `.blue-glow-motion`; không tạo hiệu ứng riêng cho từng page. Giữ màu nền và độ tương phản chữ, tôn trọng giảm chuyển động. Icon nhỏ giữ màu flat.

- Đây là slider trình chiếu desktop 16:9, HTML/CSS/JavaScript thuần. Không có back-end, React/Next.js hoặc yêu cầu responsive mobile.
- Người dùng gọi từng page bằng số hai chữ số: `01`, `02`, `03`… Khi người dùng nói “01” trong yêu cầu sửa nội dung, hiểu là page 01 và chỉ sửa page đó. Dùng bảng `PAGES.md` để xác định file tương ứng.
- Thứ tự page theo danh sách `slides` trong `scripts/build-assets.cjs`. Không đổi số hoặc thứ tự các page hiện có nếu chưa được yêu cầu.
- SVG được cung cấp là visual source of truth. Giữ nguyên SVG gốc, không tự đổi nội dung, typography, màu sắc hoặc đồ họa. Khi được yêu cầu sửa nội dung của page, chỉnh bản trình chiếu/asset phái sinh và giữ bản nguồn gốc.
- `assets/slides.js` là asset được sinh bởi `node scripts/build-assets.cjs`; chỉnh nguồn sinh rồi chạy lại, không chỉ chỉnh file sinh vì sẽ bị ghi đè.
- Kiểm tra navigation, animation và khung desktop trên localhost sau thay đổi ảnh hưởng giao diện.
- Giữ header “VIBE CODING LANDING PAGE” và footer “TRAVEL AWARDS 2026” khi thêm page. Số footer là page hiện tại hai chữ số / tổng số page thực tế. Chỉ thêm page có nội dung được cung cấp; tổng tự cập nhật khi thêm hoặc bỏ page. Không giới hạn navigation.

## Khi người dùng nói "Đẩy lên GitHub", "đẩy lên" hoặc "Tạo commit và đẩy lên"

1. Kiểm tra Git status, diff, file chưa được theo dõi, branch và remote.
2. Chỉ stage từng file thuộc project đã kiểm tra; bỏ qua file tạm, dữ liệu nhạy cảm và secret.
3. Chạy các kiểm tra phù hợp nếu có.
4. Fetch `origin` trước khi commit và push. Nếu remote có commit mới chưa đồng bộ, có conflict hoặc lỗi, dừng và báo người dùng; không tự pull, merge hoặc rebase trong quy trình đẩy lên.
5. Tạo commit message ngắn, mô tả đúng thay đổi. Không tạo commit rỗng.
6. Push lên `origin/main`, sau khi xác nhận các commit sẽ đẩy thuộc phạm vi yêu cầu. Không force push, kể cả `--force-with-lease`.
7. Báo commit hash và trạng thái push.

## Khi người dùng nói "đồng bộ project"

Áp dụng trong chat này hoặc khi mở cùng repository bằng Codex ở môi trường hay máy tính khác. Hiểu yêu cầu là lấy phiên bản mới nhất đã được đẩy lên `origin/main` về project cục bộ.

1. Xác định đúng repository, đường dẫn project và remote `origin`. Đọc `AGENTS.md` của checkout hiện tại và kiểm tra Git status, branch, thay đổi chưa commit và commit cục bộ chưa push.
2. Fetch `origin` và so sánh lịch sử với `origin/main`. Nếu có thay đổi chưa commit, file chưa theo dõi có thể bị ảnh hưởng, commit cục bộ chưa push, lịch sử phân kỳ, conflict hoặc lỗi, dừng và báo người dùng để giữ nguyên công việc cục bộ.
3. Với checkout sạch trên `main`, cập nhật bằng `git pull --ff-only origin main`. Nếu đang ở branch khác, dừng và báo người dùng; không tự chuyển branch. Không tự stash, reset, xóa file, merge, rebase hoặc force push.
4. Đọc lại `AGENTS.md` sau đồng bộ, chạy kiểm tra phù hợp nếu có và báo commit hash hiện tại cùng trạng thái đồng bộ. Nếu đã cập nhật mới nhất, báo rõ.

Đồng bộ chỉ lấy được thay đổi đã commit và push lên GitHub. Thay đổi chưa push trên máy khác và lịch sử chat không được tự chuyển qua Git. Quy ước này có hiệu lực trên máy khác khi `AGENTS.md` đã được đẩy lên repository và checkout đó đọc được file.
