import mongoose from 'mongoose'
const {Schema, model} = mongoose

const userMetricsSchema = new Schema(
    {
        date: {
            type: Date,
            default: Date.now,
            unique: true,
            required: true
        },
        metrics: []    
    }
)

mongoose.models = {}

const UserMetrics = model('UserMetric', userMetricsSchema)

export default UserMetrics