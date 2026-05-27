import mongoose from "mongoose";

const blogContentSchema = new mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  bannerimg: {
    type: String,
    required: true,
  },
  blogContent: Array,
  ispublished: {
    type: String,
    enum: ["Published", "Unpublished"],
    required: true,
  },
  ismetapublished: {
    type: String,
    enum: ["meta", "notmeta"],
    required: true,
  },
  metatitle: String,
  metadescription: String,
  keywords: String,
  canonical: String,
  schema: String,
  ogtitle: String,
  ogdescription: String,
  ogurl: String,
  ogimg: String,
  ogalt: String,
  date: {
    type: String,
    required: true,
  },
  updatedDate: String,
  ipAddress: String,
});

export default mongoose.models.blogcontents ||
  mongoose.model("blogcontents", blogContentSchema);
