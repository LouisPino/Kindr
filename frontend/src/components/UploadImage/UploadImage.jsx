// const cloudName = "dpsymdmyi";
// const uploadPreset = "xy6vadhr"; // replace with your own upload preset
// const cloudinary = require("cloudinary").v2;
// const streamifier = require("streamifier");
// const clConfig = require("../../config/cloudinary.js");

// cloudinary.config(clConfig);

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


  return (
    <>
      <label id="add-photo-btn" className="photo-submit">
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
    </>
  );
}




//upload to cloudinary, get link back, set link as newFormData picture value

//streamupload function sends photo to cloud and returns url in response

//on upload photo, make request to service/api/backend to upload photo and return link
//when it comes back, call handleChange with link as picture

//or

//upload directly to user on db
//trigger regrab of user data and display new photo, separate from form


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
