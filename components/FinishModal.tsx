import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { WinStatus } from "types/winStatus";
import InstallButton from "./InstallButton";

type ModalProps = {
  winStatus: WinStatus;
  isOpen: boolean;
  onClose: () => void;
};

export default function FinishModal({
  isOpen,
  winStatus,
  onClose,
}: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          You{" "}
          {winStatus === "draw" ? "Drew" : winStatus === "win" ? "Won" : "Lost"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          You{" "}
          {winStatus === "draw" ? "Drew" : winStatus === "win" ? "Won" : "Lost"}
          {"\n"}
          <InstallButton />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Retry
          </Button>
          <Link href="/stats">
            <Button variant="ghost">View Stats</Button>
          </Link>
          <Link href="/">
            <Button variant="ghost">Home</Button>
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
