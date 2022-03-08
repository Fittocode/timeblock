import DailyMetric from '../../../models/DailyMetric.models'

const handler = async (req, res) => {
    const { mid } = req.query
    const metrics  = await DailyMetric.findOne({_id: mid})
    return {
      props: {
        metrics: res.end(metrics)
      }
    }
}

  export default handler