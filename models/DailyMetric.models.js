import mongoose from 'mongoose'
const {Schema, model} = mongoose

const dailyMetricSchema = new Schema(
    {
        date: {
            type: Date,
            default: Date.now
        },
        walk: {
            type: Number,
            required: true,
        }, 
        stoic_med: {
            type: Boolean,
            required: true,
        },
        meditation: {
            type: Number,
            required: true,
        },
        exercise: {
            type: String,
            required: true,
        },
        tranquility: {
            type: Number,
            min: 1,
            max: 10,
            required: true,
        },
        deep_work: {
            type: String,
            required: true,
        },
        freedom_active: {
            type: Boolean,
            required: true,
        },
        read: {
            type: String,
            required: true,
        },
    },
)

mongoose.models = {}

const DailyMetric = model('DailyMetric', dailyMetricSchema)

export default DailyMetric