import { Button, Icon } from "@chakra-ui/react";
import { PWAContext } from "pages/_app";
import React, { useContext } from "react";
import { Download } from "react-feather";

export default function InstallButton() {
  const c = useContext(PWAContext);

  return (
    c.installable && (
      <Button
        rightIcon={<Icon as={Download} />}
        variant="outline"
        mt="20px"
        onClick={c.install}
      >
        Install
      </Button>
    )
  );
}
