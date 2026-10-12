// Serialize exact source markup so index.html also works when opened via file://.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const originalSvg = fs.readFileSync(path.join(root, 'Silder 1.svg'), 'utf8');
// Keep the exact header, footer and rules from page 01 for the new page.
const frame = originalSvg.slice(0, originalSvg.indexOf('<mask'));
const content = fs.readFileSync(path.join(root, 'assets/page-02-content.svg'), 'utf8').replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
let framePath = 0;
const page02Frame = frame.replace(/<path\b[^>]*\/>/g, node => ++framePath === 4
  ? '<text x="1820" y="1037" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="16" fill="black">02/10</text>'
  : node);
const page02Svg = page02Frame + content + '</svg>\n';
const page03Content = fs.readFileSync(path.join(root, 'assets/page-03-content.svg'), 'utf8').replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
const page03Svg = page02Frame.replace('>02/10</text>', '>03/10</text>') + page03Content + '</svg>\n';
const page04Content = fs.readFileSync(path.join(root, 'assets/page-04-content.svg'), 'utf8').replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
const page04Svg = page02Frame.replace('>02/10</text>', '>04/10</text>') + page04Content + '</svg>\n';
const page05Content = fs.readFileSync(path.join(root, 'assets/page-05-content.svg'), 'utf8').replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
const page05Svg = page02Frame.replace('>02/10</text>', '>05/10</text>') + page05Content + '</svg>\n';
const page06Content = fs.readFileSync(path.join(root, 'assets/page-06-content.svg'), 'utf8').replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
const keyVisual = fs.readFileSync(path.join(root, 'assets/page-01-keyvisual.svg'), 'utf8').replace('<svg ', '<svg x="1200" y="220" width="360" height="360" preserveAspectRatio="xMidYMid meet" ');
const page06Svg = page02Frame.replace('>02/10</text>', '>06/10</text>') + page06Content.replace('<!-- KEYVISUAL -->', keyVisual) + '</svg>\n';
const page07Content = fs.readFileSync(path.join(root, 'assets/page-07-content.svg'), 'utf8').replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
const page07Svg = page02Frame.replace('>02/10</text>', '>07/10</text>') + page07Content + '</svg>\n';
const page08Content = fs.readFileSync(path.join(root, 'assets/page-08-content.svg'), 'utf8').replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
const page08Svg = page02Frame.replace('>02/10</text>', '>08/10</text>') + page08Content + '</svg>\n';
const page09Content = fs.readFileSync(path.join(root, 'assets/page-09-content.svg'), 'utf8').replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
const page09Svg = page02Frame.replace('>02/10</text>', '>09/10</text>') + page09Content + '</svg>\n';
const page10Content = fs.readFileSync(path.join(root, 'assets/page-10-content.svg'), 'utf8').replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
const page10Svg = page02Frame.replace('>02/10</text>', '>10/10</text>') + page10Content + '</svg>\n';
const page11Content = fs.readFileSync(path.join(root, 'assets/page-11-content.svg'), 'utf8').replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace('__PAGE11_IMAGE__', 'data:image/jpeg;base64,' + fs.readFileSync(path.join(root, 'assets/2.jpg')).toString('base64'));
const page11Svg = page02Frame.replace('>02/10</text>', '>11/11</text>') + page11Content + '</svg>\n';
const page12Content = fs.readFileSync(path.join(root, 'assets/page-12-content.svg'), 'utf8').replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace('__PAGE12_IMAGE__', 'data:image/png;base64,' + fs.readFileSync(path.join(root, 'assets/1.png')).toString('base64'));
const page12Svg = page02Frame.replace('>02/10</text>', '>12/12</text>') + page12Content + '</svg>\n';
const page13Content = fs.readFileSync(path.join(root, 'assets/page-13-content.svg'), 'utf8').replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace('__PAGE13_IMAGE__', 'data:image/jpeg;base64,' + fs.readFileSync(path.join(root, 'assets/3.JPG')).toString('base64'));
const page13Svg = page02Frame.replace('>02/10</text>', '>13/13</text>') + page13Content + '</svg>\n';
const page14Content = fs.readFileSync(path.join(root, 'assets/page-14-content.svg'), 'utf8').replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
const page14Svg = page02Frame.replace('>02/10</text>', '>14/14</text>') + page14Content + '</svg>\n';
const slides = [{
  title: 'Vibe coding — Travel Awards 2026',
  description: 'Vibe coding. Travel Awards 2026. Phiên bản thử nghiệm. CODEX. Dấu ấn Tiên phong — The First Signature. VNEXPRESS.',
  svg: originalSvg,
  footer: { node: 5 },
  layers: [
    { node: 11, name: 'vibe-coding', delay: 0, y: 18 },
    { node: 12, name: 'travel-awards', delay: 90, y: 18 },
    { node: 13, name: 'subtitle', delay: 180, y: 12 },
    { node: 14, name: 'codex-logo', delay: 260, y: 12 },
    { node: 9, name: 'landscape', delay: 110, x: 20, duration: 740 },
    { node: 10, name: 'signature', delay: 340, y: 12, duration: 640 }
  ]
}, {
  title: 'Hiểu trước, làm sau',
  description: 'Hiểu trước, làm sau. Mỗi người sẽ có cách để tự làm tốt công việc của mình theo cách riêng của họ. Quan sát, định hướng, giao tiếp. Claude, Codex, AI Studio. Không hiểu thì không thể làm tốt',
  svg: page02Svg,
  footer: { node: 5 },
  layers: [],
  motionGroups: ['page-02-intro', 'page-02-slogan']
}, {
  title: 'Quy trình bắt đầu dự án Landing page',
  description: '01: Tạo repo GitHub và đồng bộ folder bằng GitHub Desktop. 02: Truy cập folder đã tạo sẵn từ GitHub Desktop trong Codex. 03: Tạo câu lệnh dự án, bắt buộc Codex tự khởi sinh file AGENTS.md.',
  svg: page03Svg,
  footer: { node: 5 },
  layers: [],
  motionGroups: ['page-03-title', 'page-03-step-1', 'page-03-step-2', 'page-03-step-3', 'page-03-icon-1', 'page-03-icon-2', 'page-03-icon-3']
}, {
  title: 'Để Codex không đi lạc — Guideline và trợ lý dự án',
  description: 'AGENTS.md giúp Codex thống nhất quy tắc, giữ đúng phạm vi và làm việc nhất quán. Tạo Trợ lý [Tên dự án]; Ta quan sát, định hướng và giao tiếp còn lại để trợ lý lo...',
  svg: page04Svg,
  footer: { node: 5 },
  layers: [],
  motionGroups: ['page-04-guideline', 'page-04-tip']
}, {
  title: 'Vẽ Figma hay là giao tiếp?',
  description: 'Workflow không thay đổi, chỉ có tốc độ nhanh hơn. Vẫn là vẽ nhưng vẽ bằng sự giao tiếp. Khởi tạo Design System như cách chúng ta bắt đầu vẽ với Figma, điều này giúp Codex hiểu style mong muốn, mã màu, font chữ, quy tắc và văn phong của VnExpress. Tip: xuất Header/Footer từ Figma thành SVG.',
  svg: page05Svg,
  footer: { node: 5 },
  layers: [],
  motionGroups: ['page-05-system', 'page-05-tip']
}, {
  title: 'Thành phần cần có của 1 Design System cơ bản cho Landing page',
  description: 'Màu sắc, Typography, Buttons & links, Graphic elements, Image treatment, Section heading, Surfaces, Graphic hierarchy, Motion.',
  svg: page06Svg,
  footer: { node: 5 },
  layers: [],
  motionGroups: ['page-06-title', 'page-06-prompt', 'page-06-kv', 'page-06-item-1', 'page-06-item-2', 'page-06-item-3', 'page-06-item-4', 'page-06-item-5', 'page-06-item-6', 'page-06-item-7', 'page-06-item-8', 'page-06-item-9']
}, {
  title: 'Giao tiếp, quan sát và lại giao tiếp...',
  description: 'Giao tiếp, quan sát và lại giao tiếp...',
  svg: page07Svg,
  footer: { node: 5 },
  layers: [],
  motionGroups: ['page-07-title']
}, {
  title: 'Hand-off Tech',
  description: 'Cấu trúc HTML từ ảnh demo: một wrapper và chín khối nội dung. Câu lệnh chuẩn bị HTML bàn giao cho Tech.',
  svg: page08Svg,
  footer: { node: 5 },
  layers: [],
  motionGroups: ['page-08-structure', 'page-08-handoff']
}, {
  title: 'GitHub → Vercel — Đẩy code và kiểm tra chéo',
  description: 'Đẩy code lên GitHub với folder hand-off.html, kết nối Vercel để kiểm tra chéo. Tạo chat mới trong folder dự án với câu lệnh thiết lập rule AGENTS.md.',
  svg: page09Svg,
  footer: { node: 5 },
  layers: [],
  motionGroups: ['page-09-workflow', 'page-09-prompt']
}, {
  title: 'AI còn có thể làm gì ngoài công việc?',
  description: 'AI còn có thể làm gì ngoài công việc?',
  svg: page10Svg,
  footer: { node: 5 },
  layers: [],
  motionGroups: ['page-10-title', 'page-10-writing', 'page-10-literature', 'page-10-interior', 'page-10-architecture', 'page-10-astrology'],
  motionGroupDelay: 450,
  motionGroupDuration: 1200
}, {
  title: 'Thiết kế nội thất — Ảnh số 2',
  description: 'Ảnh thiết kế phòng ngủ từ assets/2.jpg, hiển thị lớn và giữ nguyên tỷ lệ.',
  svg: page11Svg,
  footer: { node: 5 },
  layers: [],
  motionGroups: ['page-11-image']
}, {
  title: 'Thiết kế góc làm việc — Ảnh số 1',
  description: 'AI ứng dụng thực tế vào thiết kế nội thất giúp: Dựng phối cảnh 3D; Render thông số kỹ thuật cho thợ; Tiết kiệm tiền công thiết kế 3D. Bản vẽ góc làm việc từ assets/1.png ở bên phải.',
  svg: page12Svg,
  footer: { node: 5 },
  layers: [],
  motionGroups: ['page-12-content', 'page-12-image']
}, {
  title: 'Góc làm việc — Ảnh số 3',
  description: 'Sản phẩm thực tế dựa trên bản vẽ kỹ thuật của AI. Ảnh góc làm việc từ assets/3.JPG ở bên phải.',
  svg: page13Svg,
  footer: { node: 5 },
  layers: [],
  motionGroups: ['page-13-content', 'page-13-image']
}, {
  title: 'Thank You',
  description: 'Thank You',
  svg: page14Svg,
  footer: { node: 5 },
  layers: [],
  motionGroups: ['page-14-title'],
  motionGroupDuration: 1200
}];
fs.mkdirSync(path.join(root, 'assets'), { recursive: true });
fs.writeFileSync(path.join(root, 'assets/page-02.svg'), page02Svg);
fs.writeFileSync(path.join(root, 'assets/page-03.svg'), page03Svg);
fs.writeFileSync(path.join(root, 'assets/page-04.svg'), page04Svg);
fs.writeFileSync(path.join(root, 'assets/page-05.svg'), page05Svg);
fs.writeFileSync(path.join(root, 'assets/page-06.svg'), page06Svg);
fs.writeFileSync(path.join(root, 'assets/page-07.svg'), page07Svg);
fs.writeFileSync(path.join(root, 'assets/page-08.svg'), page08Svg);
fs.writeFileSync(path.join(root, 'assets/page-09.svg'), page09Svg);
fs.writeFileSync(path.join(root, 'assets/page-10.svg'), page10Svg);
fs.writeFileSync(path.join(root, 'assets/page-11.svg'), page11Svg);
fs.writeFileSync(path.join(root, 'assets/page-12.svg'), page12Svg);
fs.writeFileSync(path.join(root, 'assets/page-13.svg'), page13Svg);
fs.writeFileSync(path.join(root, 'assets/page-14.svg'), page14Svg);
const blueBackground = fs.readFileSync(path.join(root, 'assets/blue-background.svg'), 'utf8');
fs.writeFileSync(path.join(root, 'assets/slides.js'), '// Generated by scripts/build-assets.cjs. Original SVG is unchanged.\nwindow.SLIDE_SOURCES = ' + JSON.stringify(slides) + ';\nwindow.BLUE_BACKGROUND_SVG = ' + JSON.stringify(blueBackground) + ';\n');
console.log(`Generated ${slides.length} slide(s).`);
