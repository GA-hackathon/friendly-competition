import { useState } from "react";
import "./ContestCreate.css";
import Layout from "../../../layout/Layout";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import WallpaperIcon from '@material-ui/icons/Wallpaper';;


function ContestCreate() {
  const [formData, setFormData] = useState({
    contest_name: "",
    description: "",
    date: null,
    zip_code: "",
    picture: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ [e.target.name]: e.target.value });
    console.log(formData);
  };

  const onImageSelected = (e) => {
    const img = e.target.files[0];
    const fileReader = new FileReader()
    fileReader.addEventListener('load', () => {
      setFormData({
        ...formData,
        picture: fileReader.result,
      })
    })
    if (img) {
      fileReader.readAsDataURL(img);
    }
  }

  const selectImage = () => {
    document.getElementById('image-upload').click()
  }

  const handleImageClear = () => {
    setFormData({
      ...formData,
      picture: ""
    })
    document.getElementById('image-upload').value = "";
  }

  return (
    <Layout>
      <div className="contest-form">
        <h3>Creating your own contest</h3>
        <h5>Tell us a little bit about what you'd like in the contest</h5>
        <form className="input-group" onSubmit={handleSubmit}>
          <label>
            Contest Name:
            <Input type="text" name="contest_name" />
          </label>
          <label>
            Description:
            <Input type="text" name="description" />
          </label>
          <label>
            Start Date:
            <Input type="datetime-local" name="start_date" />
          </label>
          <label>
            End Date:
            <Input type="datetime-local" name="end_date" />
          </label>
          <label>
            Zip code:
            <Input type="text" name="zip_code" />
          </label>
          <label className='image-container'>Contest picture:
          {formData.picture ? (<img className='contest-image' src={formData.picture} alt='contest picture' />) : (<WallpaperIcon className='image-icon' />)}
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
