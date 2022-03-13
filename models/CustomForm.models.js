import mongoose from 'mongoose'
const {Schema, model} = mongoose

const customFormSchema = new Schema(
    {
        metric: [{
            name: '',
            type: String,
            input: {
                type: '', 
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

const CustomForm = model('CustomForm', customFormSchema)

export default CustomForm