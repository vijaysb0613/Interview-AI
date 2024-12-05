"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
function AddNewInterview() {
    const [OpenDialog,setOpenDialog] = useState(false)
  return (
    <div>
    <div className='p-6 sm:p-8 border rounded-xl bg-gradient-to-r
     from-orange-400 to-orange-500 text-white shadow-md hover:scale-105 hover:shadow-lg
      hover:from-orange-500 hover:to-orange-600 cursor-pointer transition-transform duration-300 ease-in-out'
      onClick={()=>setOpenDialog(true)}
      >
      <h2 className='font-semibold text-lg text-center tracking-wide'>+ Add New</h2>
   </div>
   <Dialog open={OpenDialog}>
  
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
        <div>
            <Button>
                Cancel
            </Button>
            <Button>
                Start Inteview
            </Button>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default AddNewInterview
