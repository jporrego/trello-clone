import React, { useState, useEffect } from "react";
import { Menu, Button, Text, createStyles, Modal, Group } from "@mantine/core";
import {
  Settings,
  Search,
  Photo,
  MessageCircle,
  Trash,
  ArrowsLeftRight,
} from "tabler-icons-react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useAppDispatch } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import styles from "./AddBoard.module.css";

const useStyles = createStyles((theme) => ({
  item: {
    "&[data-expanded]": {
      backgroundColor:
        theme.colors[theme.primaryColor][theme.fn.primaryShade()],
      color: theme.white,
      zIndex: 200,
    },
    "&[data-hovered]": {
      backgroundColor:
        theme.colors[theme.primaryColor][theme.fn.primaryShade()],
      color: theme.white,
      zIndex: 200,
    },
  },
}));

interface ChecklistPopoverProps {
  setShowListMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChecklistPopover: React.FC<ChecklistPopoverProps> = ({
  setShowListMenu,
}) => {
  const [opened, setOpened] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create board"
      >
        <div>hey</div>
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Create new board</Button>
      </Group>
    </>
  );
};

export default ChecklistPopover;
