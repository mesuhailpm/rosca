import { AdminModelType } from '@types';
import { model, models, Schema } from 'mongoose';
const adminSchema = new Schema<AdminModelType>({
    userName: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    }
})

const Admin = models.Admin || model<AdminModelType>('Admin', adminSchema);
export default Admin;
