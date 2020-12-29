import React, { Fragment, useState } from 'react'
import Input from "@material-ui/core/Input";
import Navbar from './../Navbar/Navbar.jsx';
import Button from '@material-ui/core/Button';
import './ContestForm.css';

function ContestForm() {

    const [ formData, setFormData ] = useState({
        contest_name: '',
        description: '',
        date: null,
        zip_code: '',
        picture: null
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData({[e.target.name] : e.target.value })
        console.log(formData)
    }

    return (
        <>
          <Navbar />
          <div className='contest-form'>
          <h3>Creating your own contest</h3> 
          <h5>Tell us a little bit about what you'd like in the contest</h5>
          <form className='input-group' onSubmit={handleSubmit}>
              <label>
                  Contest Name:
                  <Input type='text' name='contest_name' />
              </label>
              <label>
                  Description:
                  <Input type='text' name='description' />
              </label>
              <label>
                  Dates:
                  <Input type='date' name='date' />
              </label>
              <label>
                  Zip code:
                  <Input type='text' name='zip_code' />
              </label>
              <label>
                  Picture:
                  <Input type='text' name='picture' />
              </label>
              <Button variant='contained' className='form-btn' type='submit'>Get Started</Button>
          </form>
          </div>
        </>
    )
}

export default ContestForm
