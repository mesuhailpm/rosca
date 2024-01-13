import { AdminModelType } from '@types';
import { Document, Model, model, models, Schema } from 'mongoose';
interface AdminDocument extends AdminModelType, Document {}
const adminSchema:Schema<AdminDocument> = new Schema({
    userName: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    }
})





const Admin:Model<AdminDocument> = models.Admin || model<AdminModelType>('Admin', adminSchema);
export default Admin;
