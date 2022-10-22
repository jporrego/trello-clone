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

interface AddBoardPopoverProps {
  setShowListMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddBoardPopover: React.FC<AddBoardPopoverProps> = ({
  setShowListMenu,
}) => {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (opened) {
      setShowListMenu(true);
    } else {
      setShowListMenu(false);
    }
  }, [opened]);

  const handleSignOut = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create board"
      >
        {/* Modal content */}
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Create new board</Button>
      </Group>
    </>
  );
};

export default AddBoardPopover;
