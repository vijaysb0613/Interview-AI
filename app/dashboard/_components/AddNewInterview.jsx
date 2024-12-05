"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input} from "@/components/ui/input"

import { Button } from "@/components/ui/button";
function AddNewInterview() {
  const [OpenDialog, setOpenDialog] = useState(false);
  const [JobPosition,setJobPosition] = useState();
  const [JobDescription,setJobDescription] = useState();
  const [JobExperience,setJobExperience] = useState();

  const onSubmit=(e) =>
  {
    e.preventDefault()
    console.log(JobPosition,JobDescription,JobExperience)
  }

  return (
    <div>
      <div
        className="p-6 sm:p-8 border rounded-xl bg-gradient-to-r
     from-orange-400 to-orange-500 text-white shadow-md hover:scale-105 hover:shadow-lg
      hover:from-orange-500 hover:to-orange-600 cursor-pointer transition-transform duration-300 ease-in-out"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-semibold text-lg text-center tracking-wide">
          + Add New
        </h2>
      </div>
      <Dialog open={OpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <form onSubmit={onSubmit}>
            <div>
              <h2>Tell Us More About your Job </h2>
              <h2>
                Add Details about your job position/role,Job description, Years
                of Experirence
              </h2>
              <div className="mt-7 my-2">
                <label>Job Role/Jobe Positon</label>
                <Input placeholder="EX. Full Stack Developer" required
                onChange={(e)=>setJobPosition(e.target.value)}></Input>
              </div>
              <div className="mt-7 my-2">
                <label>Job Description/Tech Stack (In Short)</label>
                <Input placeholder="EX. React,Angular,Nodejs,MySQL" required 
                 onChange={(e)=>setJobDescription(e.target.value)}></Input>
              </div>
              <div className="mt-7 my-2">
                <label>Job Experience</label>
                <Input placeholder="EX.5" type="number" max="50" required 
                 onChange={(e)=>setJobExperience(e.target.value)}></Input>
              </div>
            </div>
            <div className="flex gap-5 justify-end">
              <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Start Inteview</Button>
            </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
