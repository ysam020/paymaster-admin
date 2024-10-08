import mongoose from "mongoose";

const Schema = mongoose.Schema;

const contentSchema = new Schema({
  banner_heading: {
    type: String,
  },
  banner_content: { type: String },
  banner_bg: { type: String },
  banner_image: { type: String },
  about_us_content: {
    type: String,
  },
  about_us_bg: {
    type: String,
  },
  about_us_img: {
    type: String,
  },
});

const ContentModel = mongoose.model("Content", contentSchema);
export default ContentModel;
