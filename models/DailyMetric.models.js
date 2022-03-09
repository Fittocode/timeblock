import mongoose from 'mongoose'
const {Schema, model} = mongoose

const dailyMetricSchema = new Schema(
    {
        date: {
            type: Date,
            default: Date.now
        },
        walk: {
            type: mongoose.Types.Decimal128,
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
        exercise: [{
            kind: {
                type: String,
                required: true,
            },
            duration: {
                type: mongoose.Types.Decimal128,
                required: true,
            }
        }],
        tranquility: {
            type: Number,
            min: 1,
            max: 10,
            required: true,
        },
        deep_work: {
            type: mongoose.Types.Decimal128,
            required: true,
        },
        freedom_active: {
            type: Boolean,
            required: true,
        },
        read: {
            type: Number,
            required: true,
        },
    },
)

mongoose.models = {}

const DailyMetric = model('DailyMetric', dailyMetricSchema)

export default DailyMetric