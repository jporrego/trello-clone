import { useState, useEffect } from "react";
import { Menu, Button, Text, createStyles } from "@mantine/core";
import {
  Settings,
  Search,
  Photo,
  MessageCircle,
  Trash,
  ArrowsLeftRight,
} from "tabler-icons-react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { auth, provider } from "../../../firebase";
import { useAppDispatch } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../features/user/UserSlice";
import { boardsCleared } from "../../../features/board/boardsSlice";

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

interface ProfilePopoverProps {
  setShowListMenu: React.Dispatch<React.SetStateAction<boolean>>;
  img: string;
}

const ProfilePopover: React.FC<ProfilePopoverProps> = ({
  setShowListMenu,
  img,
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
      await auth.signOut();
      dispatch(logoutUser());
      dispatch(boardsCleared());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Menu
      shadow="md"
      width={200}
      classNames={classes}
      position="bottom-start"
      opened={opened}
      onChange={setOpened}
    >
      <Menu.Target>
        <img src={img} alt="pfp" />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Account</Menu.Label>
        <Menu.Divider />
        <Menu.Item onClick={() => handleSignOut()}>Log out</Menu.Item>
        {/*
        <Menu.Item icon={<Settings size={14} />}>Settings</Menu.Item>
        <Menu.Item icon={<MessageCircle size={14} />}>Messages</Menu.Item>
        <Menu.Item icon={<Photo size={14} />}>Gallery</Menu.Item>
        <Menu.Item
          icon={<Search size={14} />}
          rightSection={
            <Text size="xs" color="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item icon={<ArrowsLeftRight size={14} />}>
          Transfer my data
        </Menu.Item>

        <Menu.Item color="red" icon={<Trash size={14} />}>
          Delete my account
        </Menu.Item>*/}
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfilePopover;
