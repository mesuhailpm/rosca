import { RoscaType } from "@types";
import { Document, Model, Schema, model, models } from "mongoose";
export interface RoscaDoc extends RoscaType, Document {}
const RoscaSchema: Schema<RoscaDoc> = new Schema<RoscaDoc>({
    name: {type: String, required: true},
    admins: [{ type: Schema.Types.ObjectId, required: true, ref: "Admin" }], // Multiple admins
    participants: [{ type: Schema.Types.ObjectId, required :true, ref: "Participant" }], // Multiple participants
  });
  
  
const Rosca: Model<RoscaDoc> = models.ROSCA || model<RoscaType>("ROSCA", RoscaSchema);
export default Rosca;