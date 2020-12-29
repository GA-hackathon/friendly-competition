import React, { Fragment } from 'react'
import Input from "@material-ui/core/Input";
import Navbar from './../Navbar/Navbar.jsx';

function ContestForm() {
    return (
        <>
          <Navbar />
          <h3>Creating your own contest</h3> 
          <h5>Tell us a little bit about what you'd like in the contest</h5>
          <form>
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
          </form>
        </>
    )
}

export default ContestForm
