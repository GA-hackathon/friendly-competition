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
import { useStateValue } from "../../../providers/CurrentUserProvider";

function ContestCreate() {

  const [isCreated, setCreated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rules: "",
    ending_time: "",
    picture: "",
  });
  const { name, rules, ending_time, picture } = formData
  const [{ currentUser }] = useStateValue()

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
    let { name, value } = e.target;
    // to make sure it gets selected time
    if (name === "ending_time" && value) {
      let date = new Date(value);
      value = date.toISOString();
    }
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
            {picture ? (
              <img
                className="contest-image"
                src={picture}
                alt={name}
              />
            ) : (

                <WallpaperIcon style={{ cursor: 'pointer' }} fontSize='large' onClick={selectImage} className="image-icon" />
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

          </label>
          <Button disabled={!currentUser} variant="contained" style={{ background: '#00DB94' }} className="form-btn" type="submit">
            {currentUser ? <> Get Started </> : <>Please Log In</>}
          </Button>
          <input
            type="file"
            id="image-upload"
            required
            style={{ visibility: "hidden" }}
            onChange={onImageSelected}
          />
        </form>
      </div>
    </>
  );
}
export default ContestCreate;