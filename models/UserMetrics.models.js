import mongoose from 'mongoose'
const {Schema, model} = mongoose

const userMetricsSchema = new Schema(
    {
        date: {
            type: Date,
            default: Date.now
        },
        metrics: 
            [
                {
                    name: {type: mongoose.Schema.Types.ObjectId, ref: 'Metric'}, 
                    data_value: '', 
                }
            ]    
    }
)

mongoose.models = {}

const UserMetrics = model('UserMetric', userMetricsSchema)

export default UserMetrics