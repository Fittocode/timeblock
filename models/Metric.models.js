import mongoose from 'mongoose'
const {Schema, model} = mongoose

const metricSchema = new Schema(
    {
        name: '',
        type: String,
        options: [{
                name: ''
            }],
        units: '',
        required: false,
        unique: false
    }
)

mongoose.models = {}

const Metric = model('Metric', metricSchema)

export default Metric