import DailyMetric from '../../../models/DailyMetrics.models'

export default async function handler(req, res) {
    const { mid } = req.query
    const metrics  = await DailyMetric.findById(mid)
    res.end(`Daily Metrics: ${metrics}`)
  }
