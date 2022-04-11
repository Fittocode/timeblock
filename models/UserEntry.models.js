import mongoose from 'mongoose'
const {Schema, model} = mongoose

const userEntrySchema = new Schema(
    {
        date: {
            type: Date,
            default: Date.now,
            unique: true,
            required: true
        },
        metrics: []    
    }
)

mongoose.models = {}

const UserEntry = model('UserEntry', userEntrySchema)

export default UserEntry