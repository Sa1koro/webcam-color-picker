// api/color.js
export default function handler(req, res) {
    if (req.method === 'POST') {
      const { hex, rgb, hsl } = req.body;
      // 在这里处理保存颜色数据的逻辑
      // 例如，存储到数据库或者返回一个固定的响应
      res.status(200).json({ message: 'Color data saved', color: { hex, rgb, hsl } });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }