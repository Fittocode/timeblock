import connectDB from '../../lib/mongodb';
import MetricsDB from '../../models/Metric.models.js'

export default async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req

    await connectDB()

    switch(method) {
        case 'GET' /* Get a model by its ID */:
            try {
                const metrics = await MetricsDB.findById(id)
                if (!metrics) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, data: metrics})
            } catch(error) {
                res.status(400).json({success: false})
            }
            break;
        case 'PUT' /* Edit a model by its ID */:
            try {
                const metrics = await MetricsDB.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                })
                if (!metrics) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, data: metrics})
            } catch(error) {
                res.status(400).json({success: false})
            }
            break;
        case 'DELETE' /* Delete a model by its ID */:
            try {
                const deletedMetrics = await MetricsDB.deleteOne({ _id: id })
                if (!deletedMetrics) {
                  return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: {} })
              } catch (error) {
                res.status(400).json({ success: false })
              }
              break;
        default:
            res.status(400).json({ success: false })
            break
    }
}