import mongoose from 'mongoose'
const {Schema, model} = mongoose

const dailyMetricSchema = new Schema(
    {
        date: {
            type: Date,
            default: Date.now
        },
        metric: [{
            name: '',
            type: String,
            input_type: {
                single: '', 
                multiple: {
                    number_options: '', options: []
                }
            },
            required: 'false',
            unique: 'false'
        }]
    },
)

mongoose.models = {}

const DailyMetric = model('DailyMetric', dailyMetricSchema)

export default DailyMetric