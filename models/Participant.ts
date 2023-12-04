import { model, models, Schema } from "mongoose";
import { ParticpantModelType } from '@types';

const participantSchema = new Schema<ParticpantModelType>({
  name: {
    type: String,
    required: true,
  },
  serial: {
    type: Number,
    required: true,
  },
  claimed: {
    type: Boolean,
    required: true,
  },
});

const Participant =
  models.Participant || model<ParticpantModelType>("Participant", participantSchema);
export default Participant;
