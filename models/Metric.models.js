import mongoose from 'mongoose'
const {Schema, model} = mongoose

const metricSchema = new Schema(
    {
        date: {
            type: Date,
            default: Date.now
        },
        metrics: [
            {type: mongoose.Schema.Types.ObjectId, ref: 'CustomForm'}
        ]
    }
)

mongoose.models = {}

const Metric = model('Metric', metricSchema)

export default Metric