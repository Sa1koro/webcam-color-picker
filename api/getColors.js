import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.MONGO_DB_NAME;
const COLLECTION_NAME = 'colors';

const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await client.connect();
      const database = client.db(DB_NAME);
      const collection = database.collection(COLLECTION_NAME);

      const colors = await collection.find({}).toArray();

      res.status(200).json({ colors });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch colors', error: error.message });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
