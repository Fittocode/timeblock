import connectDB from '../../lib/mongodb';
import MetricsDB from '../../models/DailyMetric.models'

export default async function handler(req, res) {
  const { method } = req
  await connectDB()

  switch (method) {
    case 'GET':
      try {
        const metrics = MetricsDB.find({}) /* find all data in database */
        res.status(200).json({success: true, data: metrics})
      } catch (error) {
        res.status(400).json({success: false})
      }
      break;
    case 'POST':
      try {
        const metrics = await MetricsDB.create(
          req.body
        ) /* create new model in database */
        res.status(201).json({success: true, data: metrics})
      } catch(error) {
        res.status(400).json({success: false})
      }
      break;
    default:
      res.status(400).json({success: false})
      break
  }
}