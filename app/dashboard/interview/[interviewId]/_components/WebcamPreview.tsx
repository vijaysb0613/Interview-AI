"use client"
import React, { useState } from "react"
import Webcam from "react-webcam"
import { WebcamIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WebcamPreview() {
  const [webCamEnabled, setWebCamEnabled] = useState(false)

  return webCamEnabled ? (
    <Webcam
      onUserMedia={() => setWebCamEnabled(true)}
      onUserMediaError={() => setWebCamEnabled(false)}
      style={{
        height: 300,
        width: 300,
      }}
      mirrored={true}
    />
  ) : (
    <>
      <WebcamIcon className="h-72 w-full my-7 p-20 bg-blue-200 rounded-md border" />
      <Button onClick={() => setWebCamEnabled(true)} variant="ghost">
        Enable WebCam And Microphone
      </Button>
    </>
  )
}
