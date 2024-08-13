import { mongooseConnect } from '@/lib/mongoose';
import { Order } from '@/models/Order';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { userId } = req.query;
    await mongooseConnect();
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
