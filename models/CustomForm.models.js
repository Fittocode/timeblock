import mongoose from 'mongoose'
const {Schema, model} = mongoose

const customFormSchema = new Schema(
    {
        metric: [{
            name: '',
            type: String,
            options: [{
                name: ''
            }],
            required: 'false',
            unique: 'false'
        }]
    },
)

mongoose.models = {}

const CustomForm = model('CustomForm', customFormSchema)

export default CustomForm