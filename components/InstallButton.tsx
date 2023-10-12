"use client"
import { Button } from "@mantine/core";
import { MouseEventHandler, useEffect, useState } from "react";
import { Download } from "react-feather";

const InstallButton = () => {
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);

  const handler: EventListener = (e) => {
    e.preventDefault();
    setInstallPrompt(e);
  };

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    // @ts-ignore
    installPrompt?.prompt();
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!installPrompt) return null;

  return (
    <Button
      rightSection={<Download />}
      mt="20px"
      onClick={onClick}
    >
      Install
    </Button>
  );
}

export default InstallButton;
