"use client"
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'
function dashboard() {
  return (
    <div>
      <h2 className='font-bold text-2xl'>Dashboard</h2>
      <h2 className='text-gray-500'>Create And Start you AI Mock Interview</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 my-5' >

      <AddNewInterview />
      </div>
      {/* Previous interview*/}

      
      <InterviewList />
    </div>
  )
}

export default dashboard