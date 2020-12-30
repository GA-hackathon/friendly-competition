import { useState } from "react";
import "./ContestCreate.css";
import Navbar from "../../../layout/Navbar/Navbar";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import WallpaperIcon from "@material-ui/icons/Wallpaper";
import { postContest } from "../../../services/contests";
import { Redirect } from "react-router-dom";

function ContestCreate() {
  const [isCreated, setCreated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rules: "",
    ending_time: null,
    picture: "",
  });

  const onImageSelected = (e) => {
    const img = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      setFormData({
        ...formData,
        image: fileReader.result,
      });
    });
    if (img) {
      fileReader.readAsDataURL(img);
    }
  };

  const selectImage = () => {
    document.getElementById("image-upload").click();
  };

  const handleImageClear = () => {
    setFormData({
      ...formData,
      picture: "",
    });
    document.getElementById("image-upload").value = "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (isCreated) {
    return <Redirect to={"/"} />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const created = await postContest(formData);
    setCreated({ created });
  };

  return (
    <>
      <Navbar />
      <div className="contest-form">
        <h3>Creating your own contest</h3>
        <h5>Tell us a little bit about what you'd like in the contest</h5>
        <form className="input-group" onSubmit={handleSubmit}>
          <label>
            Contest Name:
            <Input required
              fullWidth={true} onChange={handleChange} type="text" name="name" />
          </label>
          <label>
            Rules:
            <Input required
              fullWidth={true} onChange={handleChange} type="text" name="rules" />
          </label>

          <label>
            Ending Date:
            <Input fullWidth={true}
              onChange={handleChange}
              required
              type="datetime-local"
              name="ending_time"
            />
          </label>
          <label>
            Zip code:
            <Input fullWidth={true} type="text" name="zip_code" />
          </label>
          <label className="image-container">
            Upload picture:
            {formData.picture ? (
              <img
                className="contest-image"
                src={formData.picture}
                alt={formData.name}
              />
            ) : (
                <WallpaperIcon fontSize='large' onClick={selectImage} className="image-icon" />
              )}
            {formData.picture && (
              <IconButton
                onMouseDown={(e) => e.preventDefault()}
                className="icon-button clear"
                onClick={handleImageClear}
              >
                <ClearIcon className="big-camera-icon" />
              </IconButton>
            )}
            <input
              type="file"
              id="image-upload"
              required
              style={{ visibility: "hidden" }}
              onChange={onImageSelected}
            />

          </label>
          <Button variant="contained" style={{ background: '#00DB94' }} className="form-btn" type="submit">
            Get Started
          </Button>
        </form>
      </div>
    </>
  );
}
export default ContestCreate;