import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_URL,
});

export default cloudinary;
