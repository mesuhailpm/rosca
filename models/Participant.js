import { model, models, Schema } from "mongoose";

const participantSchema = new Schema({
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
    default: false,
  },
});

const Participant =
  models.Participant || model("Participant", participantSchema);
export default Participant;
