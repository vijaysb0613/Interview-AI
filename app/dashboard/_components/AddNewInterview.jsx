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
import { model } from "@/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import {v4 as uuidv4} from 'uuid';
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { db } from "@/utils/db";

function AddNewInterview() {
  const [OpenDialog, setOpenDialog] = useState(false);
  const [JobPosition,setJobPosition] = useState();
  const [JobDescription,setJobDescription] = useState();
  const [JobExperience,setJobExperience] = useState();
  const[loading,setLoading]=useState(false);
  const[JsonRespons,setJsonRespons]=useState([]);
  const {user} =useUser();
   const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  const onSubmit=async (e) =>

  {
    setLoading(true);
    e.preventDefault()
    console.log(JobPosition,JobDescription,JobExperience)
    
    const InputPrompt ="Job Position:"+JobPosition+", Job Description: "+JobDescription+"Job Experience: "+JobExperience+", Depending On the given job Position,Job Description,Job Experinece give us a" +process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+"Interview Questions along with Answer in json format"
    try{
      async function run() {
        const chatSession = model.startChat({
          generationConfig,
          history: [
          ],
        });
      
        const result = await chatSession.sendMessage(InputPrompt);
        const MockJsonResp=(result.response.text()).replace('```json','').replace('```','')
        console.log(JSON.parse(MockJsonResp));
        setJsonRespons(MockJsonResp)
        
       const resp=await db.insert(MockInterview).values({
        mockId:uuidv4(), 
        jsonMockResp:MockJsonResp,
        jobPosition:JobPosition,
        jobDesc:JobDescription,
        jobExperience:JobExperience,
        createdBy:user.primaryEmailAddress?.emailAddress,
        createdAt:moment().format('DD-MM-yyyy')
      
       }).returning({mockiId:MockInterview.mockId})

       console.log("Inserted ID: ",resp)
       if(resp)
       {
        setOpenDialog(false);
       }
       setLoading(false);

      }
      
      run();
    
    }
    catch (error) {
      console.error("Error during model call:", error);
    }
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
              <Button type="submit" disabled={loading}>
              {loading?<> <LoaderCircle className="animate-spin"/> 'Generating from AI'</>:'Start Interview'}
              </Button>
            </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
