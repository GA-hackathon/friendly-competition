import { useState } from 'react'
import './ContestCreate.css'
import Navbar from '../../../layout/Navbar/Navbar'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import WallpaperIcon from '@material-ui/icons/Wallpaper'
import { postContest } from '../../../services/contests'
import { Redirect } from 'react-router-dom'
import { useStateValue } from '../../../providers/CurrentUserProvider'

function ContestCreate() {
  const [formData, setFormData] = useState({
    name: '',
    rules: '',
    category: '',
    picture: '',
  })
  const [isCreated, setCreated] = useState(false)
  const { name, category, rules, picture } = formData
  const [{ currentUser }] = useStateValue()
  const onImageSelected = (e) => {
    const img = e.target.files[0]
    const fileReader = new FileReader()
    fileReader.addEventListener('load', () => {
      setFormData({
        ...formData,
        picture: fileReader.result,
      })
    })
    if (img) {
      fileReader.readAsDataURL(img)
    }
  }

  const selectImage = () => {
    document.getElementById('image-upload').click()
  }

  const handleImageClear = () => {
    setFormData({
      ...formData,
      picture: '',
    })
    document.getElementById('image-upload').value = ''
  }

  const handleChange = (e) => {
    let { name, value } = e.target
    // to make sure it gets selected time
    if (name === 'ending_time' && value) {
      if (navigator?.userAgent?.indexOf('Firefox') !== -1) {
        // https://i.imgur.com/Hcocekf.png
        let result = value?.split(':')

        let endingTime = formData['ending_date']
        // double questionmarks checks if value is undefined. it's called the Nullish coalescing operator.
        // https://www.google.com/search?client=firefox-b-1-d&q=double+question+mark+javascript
        // IF the date was not selected by user and the user jumps directly to the time field,
        // ending time would be undefined.
        // we're assuming the ending_date is the current date
        endingTime = endingTime ?? new Date()
        endingTime.setHours(result[0], result[1])

        setFormData((prevState) => ({
          ...prevState,
          ending_time: endingTime.toISOString(),
        }))
      } else {
        let date = new Date(value)
        value = date.toISOString()
      }
      // value isn't giving us the timezoneOffset, we'll take care of it in lines 81.
    } else if (name === 'ending_date' && value) {
      let date = new Date(value)
      // we're setting minutes to 0, hours to 0 and milliseconds to 0
      date.setMinutes(0, 0, 0)
      // getTime() gives you the date's representation in milliseconds
      // we're using getTime and converting timezone offset to time, 1 minute has 60 seconds, to convert it to milliseconds you multiply it by a thousand
      date = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000)
      setFormData((prevState) => ({
        ...prevState,
        ending_date: date,
      }))
    }
    if (
      // if we don't have firefox as browser or ending date as name
      !(
        (name === 'ending_time' || name === 'ending_date') &&
        navigator?.userAgent?.indexOf('Firefox') !== -1
      )
    ) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    }
  }

  if (isCreated) {
    return <Redirect to={'/'} />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const created = await postContest(formData)
    setCreated({ created })
  }

  return (
    <>
      <Navbar />
      <div className="contest-form">
        <h3>Creating your own contest</h3>
        <h5>Tell us a little bit about what you'd like in the contest</h5>
        <form className="input-group" onSubmit={handleSubmit}>
          <label>
            Contest Name:
            <Input
              required
              fullWidth={true}
              value={name}
              onChange={handleChange}
              type="text"
              name="name"
            />
          </label>
          <label>
            Category:
            <Input
              required
              fullWidth={true}
              value={category}
              onChange={handleChange}
              type="text"
              name="category"
            />
          </label>
          <label>
            Rules:
            <Input
              required
              fullWidth={true}
              value={rules}
              onChange={handleChange}
              type="text"
              name="rules"
            />
          </label>

          <label>
            Ending Date:
            {navigator?.userAgent?.indexOf('Firefox') !== -1 ? (
              <>
                <Input
                  fullWidth={true}
                  onChange={handleChange}
                  required
                  type="date"
                  name="ending_date"
                />
                <Input
                  fullWidth={true}
                  onChange={handleChange}
                  required
                  type="time"
                  name="ending_time"
                />
              </>
            ) : (
              <Input
                fullWidth={true}
                onChange={handleChange}
                required
                type="datetime-local"
                name="ending_time"
              />
            )}
          </label>
          <label>
            Zip code:
            <Input required fullWidth={true} type="text" name="zip_code" />
          </label>
          <label className="image-container">
            Upload picture:
            {picture ? (
              <img className="contest-image" src={picture} alt={name} />
            ) : (
              <WallpaperIcon
                style={{ cursor: 'pointer' }}
                fontSize="large"
                onClick={selectImage}
                className="image-icon"
              />
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
          <Button
            disabled={!currentUser || !picture}
            variant="contained"
            style={{ background: '#00DB94' }}
            className="form-btn"
            type="submit"
          >
            {currentUser ? <> Get Started </> : <>Please Log In</>}
          </Button>
          <input
            type="file"
            id="image-upload"
            style={{ visibility: 'hidden' }}
            onChange={onImageSelected}
          />
        </form>
      </div>
    </>
  )
}
export default ContestCreate
