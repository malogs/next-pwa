'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";

const PWAInstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault(); // Prevent automatic prompt
      setDeferredPrompt(event);
      setIsInstallable(true); // Enable the button
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt(); // Show install prompt

    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response: ${outcome}`);

    setDeferredPrompt(null); // Reset after prompt
    setIsInstallable(false);
  };

  return (
    <>
      {isInstallable && (
        <button onClick={handleInstallClick} style={{ padding: "10px", fontSize: "16px" }}>
          Install PWA
        </button>
      )}
    </>
  );
};

export default PWAInstallButton;
