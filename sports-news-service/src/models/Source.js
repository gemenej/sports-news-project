import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sourceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  wrapper: {
    type: String,
  },
  selector: {
    selector: {
      type: String,
    },
    attribute: {
      type: String,
    },
    value: {
      type: String,
    },
  },
});

export default mongoose.model("Source", sourceSchema);
