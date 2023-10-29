import { model, models, Schema } from 'mongoose';
const adminSchema = new Schema({
    userName:{
        required: true,
        type: 'string',
    },
    password:{
        required: true,
        type: 'string',
    }
})

const Admin = models.Admin || model('Admin',adminSchema);
export default Admin;