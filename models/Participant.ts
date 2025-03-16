import { Model, model, models, Schema } from "mongoose";
import { ParticipantModelType } from '@types';

const participantSchema = new Schema<ParticipantModelType>({
  name: {
    type: String,
    required: true,
  },
  serial: {
    type: Number,
    min:1,
    max:50,
    required: true,
  },
  claimed: {
    type: Boolean,
    required: true,
  },
  roscaId: { type: Schema.Types.ObjectId, ref: "ROSCA", required: true },
},{timestamps: true});

const Participant: Model<ParticipantModelType> =
  models.Participant || model<ParticipantModelType>("Participant", participantSchema);
export default Participant;
