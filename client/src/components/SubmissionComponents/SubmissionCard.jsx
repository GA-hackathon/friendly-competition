import React from 'react'

function SubmissionCard({ submission }) {
  return (
    <div>
      <h1>{submission.name}</h1>
      <p>{submission.content}</p>
      <img src={submission.file} />
    </div>
  )
}

export default SubmissionCard
