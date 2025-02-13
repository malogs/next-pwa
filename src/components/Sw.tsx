'use client'
import {useEffect} from 'react'

const Sw = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(() => {
        console.log("Service Worker Registered");
      });
    }
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log("This is running as standalone.");
    }
  }, []);
  return (
    <></>
  )
}

export default Sw