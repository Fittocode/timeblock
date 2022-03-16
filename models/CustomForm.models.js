import mongoose from 'mongoose'
const {Schema, model} = mongoose

const customFormSchema = new Schema(
    {
        name: '',
        type: String,
        options: [{
                name: ''
            }],
        units: '',
        required: 'false',
        unique: 'false'
    }
)

mongoose.models = {}

const CustomForm = model('CustomForm', customFormSchema)

export default CustomForm