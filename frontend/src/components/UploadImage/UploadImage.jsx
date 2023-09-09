const cloudName = "dpsymdmyi";
const uploadPreset = "xy6vadhr"; // replace with your own upload preset
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const { clConfig } = require("../config/cloudinary.js");

cloudinary.config(clConfig);

export default function UploadImage() {
//   function streamUpload(req) {
//     return new Promise(function (resolve, reject) {
//       let stream = cloudinary.uploader.upload_stream((error, result) => {
//         if (result) {
//           resolve(result);
//         } else {
//           reject(error);
//         }
//       });

//       streamifier.createReadStream(req.file.buffer).pipe(stream);
//     });
//   }

console.log(e)

  return (
    <>
      <form
        class="img-form"
        id="img-form"
        method="POST"
        autocomplete="off"
        action="/vacations/<%=vacation._id%>/photos/single"
        enctype="multipart/form-data"
      >
        <label id="add-photo-btn" class="photo-submit">
          <input
            id="img-input"
            type="file"
            name="imageUpload"
            required
            accept="image/*, pdf"
          />
          <p>
            UPLOAD PHOTO
          </p>
        </label>
      </form>
    </>
  );
}










// const myWidget = cloudinary.createUploadWidget(
//   {
//     cloudName: cloudName,
//     uploadPreset: uploadPreset,
// cropping: true, //add a cropping step
// showAdvancedOptions: true,  //add advanced options (public_id and tag)
// sources: [ "local", "url"], // restrict the upload sources to URL and local files
// multiple: false,  //restrict upload to a single file
// folder: "user_images", //upload files to the specified folder
// tags: ["users", "profile"], //add the given tags to the uploaded files
// context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
// clientAllowedFormats: ["images"], //restrict uploading to image files only
// maxImageFileSize: 2000000,  //restrict file size to less than 2MB
// maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
// theme: "purple", //change to a purple theme
//   },
//   (error, result) => {
//     if (!error && result && result.event === "success") {
//       console.log("Done! Here is the image info: ", result.info);
//       document
//         .getElementById("uploadedimage")
//         .setAttribute("src", result.info.secure_url);
//     }
//   }
// );

// document.getElementById("upload_widget").addEventListener(
//   "click",
//   function () {
//     myWidget.open();
//   },
//   false
// );
