import mongoose from 'mongoose'
const {Schema, model} = mongoose

const dailyMetricSchema = new Schema(
    {
        walk: {
            type: String
        }, 
        stoicMed: {
            type: Boolean
        },
        meditation: {
            type: String
        },
        exercise: {
            type: String,
        },
        tranquility: {
            type: String,
        },
        deepWork: {
            type: String
        },
        read: {
            type: String
        },
    },
)

mongoose.models = {}

const DailyMetric = model('DailyMetric', dailyMetricSchema)

export default DailyMetric