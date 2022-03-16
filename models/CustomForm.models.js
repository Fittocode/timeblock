import mongoose from 'mongoose'
const {Schema, model} = mongoose

const customFormSchema = new Schema(
    {
        date: {
            type: Date,
            default: Date.now
        },
        metrics_data: [
            {type: mongoose.Schema.Types.ObjectId, ref: 'CustomForm'}
        ]
    }
)

mongoose.models = {}

const CustomForm = model('CustomForm', customFormSchema)

export default CustomForm