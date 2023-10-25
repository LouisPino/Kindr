import { useState } from "react";
import CloudinaryUploadWidget from "./UploadImage";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import './upload.css'

export default function ImgUpload({newForm, setNewForm, handleImage}) {
  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dpsymdmyi");
  const [uploadPreset] = useState("xy6vadhr");


  const [uwConfig] = useState({
    cloudName,
    uploadPreset
  });

  const cld = new Cloudinary({
    cloud: {
      cloudName
    }
  });

  const myImage = cld.image(publicId);

  return (
    <div className="App">
      <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} handleImage={handleImage} newForm={newForm} setNewForm={setNewForm}/>
      <div style={{ width: "800px" }}>
        <AdvancedImage
          style={{ maxWidth: "100%" }}
          className="uploadedimage"
          cldImg={myImage}
          plugins={[responsive(), placeholder()]}
        />
      </div>
    </div>
  );
}
