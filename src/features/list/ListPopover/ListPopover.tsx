import { Menu, Button, Text, createStyles } from "@mantine/core";
import {
  Settings,
  Search,
  Photo,
  MessageCircle,
  Trash,
  ArrowsLeftRight,
} from "tabler-icons-react";

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

function ListPopover() {
  const { classes } = useStyles();
  return (
    <Menu shadow="md" width={200} transition="fade" classNames={classes}>
      <Menu.Target>
        <Button>...</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>List actions</Menu.Label>
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
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ListPopover;
