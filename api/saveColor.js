import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.MONGO_DB_NAME;
const COLLECTION_NAME = 'colors';  // 存储颜色的集合名

// 创建 MongoDB 客户端
const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { r, g, b, luminance } = req.body;

      // 连接到 MongoDB 数据库
      await client.connect();
      const database = client.db(DB_NAME);
      const collection = database.collection(COLLECTION_NAME);

      // 创建颜色文档
      const colorDocument = {
        r,
        g,
        b,
        luminance,
        createdAt: new Date(),  // 存储颜色的创建时间
      };

      // 插入颜色数据到数据库
      const result = await collection.insertOne(colorDocument);

      // 返回成功响应
      res.status(200).json({
        message: 'Color saved successfully',
        data: result.ops[0],  // 返回插入的颜色数据
      });
    } catch (error) {
      console.error('Error saving color:', error);
      res.status(500).json({ message: 'Failed to save color', error: error.message });
    } finally {
      // 确保在请求处理完后关闭数据库连接
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
