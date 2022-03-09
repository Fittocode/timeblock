import connectDB from '../../../lib/mongodb';
import DailyMetric from '../../../models/DailyMetric.models'

// export function daysMetrics({metrics}) {
//   return (
//     <>
//       <div>{metrics}</div>
//     </>
//   )
// }

const metricsHandler = async (req, res) => {
    const { mid } = req.query
    console.log(mid)
    const metrics  = await DailyMetric.findOne({_id: mid})
    console.log(res.json(metrics))
    // return {
    //   props: {
    //     metrics: JSON.parse(JSON.stringify(metrics))
    //   }
    // }
}

export default connectDB(metricsHandler)