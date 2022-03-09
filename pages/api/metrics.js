import connectDB from '../../lib/mongodb';
import DailyMetric from '../../models/DailyMetric.models'

const handler = async(req, res) => {
  const metrics  = await DailyMetric.find();
  console.log(metrics)
  res.json(metrics);
}

export default connectDB(handler)