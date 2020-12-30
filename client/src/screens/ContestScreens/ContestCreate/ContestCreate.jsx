import { useState } from "react";
import "./ContestCreate.css";
import Layout from "../../../layout/Layout";
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
        picture: fileReader.result,
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
    <Layout>
      <div className="contest-form">
        ` <h3>Creating your own contest</h3>`{" "}
        <h5>Tell us a little bit about what you'd like in the contest</h5>
        <form className="input-group" onSubmit={handleSubmit}>
          <label>
            Contest Name:
            <Input onChange={handleChange} type="text" name="name" />
          </label>
          <label>
            Rules:
            <Input onChange={handleChange} type="text" name="rules" />
          </label>

          <label>
            Ending Date:
            <Input
              onChange={handleChange}
              type="datetime-local"
              name="ending_time"
            />
          </label>

          <label className="image-container">
            Contest picture:
            {formData.picture ? (
              <img
                className="contest-image"
                src={formData.picture}
                alt={formData.name}
              />
            ) : (
                <WallpaperIcon onClick={selectImage} className="image-icon" />
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
              style={{ visibility: "hidden" }}
              onChange={onImageSelected}
            />

          </label>
          <Button variant="contained" className="form-btn" type="submit">
            Get Started
          </Button>
        </form>
      </div>
    </Layout>
  );
}

export default ContestCreate;
