import mongoose from 'mongoose'
const {Schema, model} = mongoose

const dailyMetricSchema = new Schema(
    {
        date: {
            type: Date,
            default: Date.now
        },
        metric: [{
            name: 'String',
            type: String,
            required: 'String'
        }]
    },
)

mongoose.models = {}

const DailyMetric = model('DailyMetric', dailyMetricSchema)

export default DailyMetric