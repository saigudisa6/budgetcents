import { 
  AppShell,
  Group, 
  Burger, 
  Title, 
  Avatar, 
  Menu, 
  UnstyledButton, 
  Text,
  Divider,
  rem,
} from '@mantine/core';
import { 
  IconChevronDown, 
  IconSettings, 
  IconLogout, 
  IconUserCircle 
} from '@tabler/icons-react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}

export function HeaderComponent({ opened, toggle }: HeaderProps) {
  const { user } = useUser();
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <AppShell.Header p="md">
      <Group justify="space-between" h="100%">
        <Group h="100%">
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
          />
          <Title order={3}>Financial Dashboard</Title>
        </Group>

        <Menu
          width={260}
          position="bottom-end"
          transitionProps={{ transition: 'pop-top-right' }}
          onClose={() => setUserMenuOpened(false)}
          onOpen={() => setUserMenuOpened(true)}
          withinPortal
        >
          <Menu.Target>
            <UnstyledButton
            >
              <Group gap={7}>
                <Avatar 
                  src={user?.picture} 
                  alt={user?.name || ''} 
                  radius="xl" 
                  size={30}
                >
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </Avatar>
                <Text fw={500} size="sm" lh={1} mr={3}>
                  {user?.name || 'User'}
                </Text>
                <IconChevronDown style={{ width: rem(12), height: rem(12) }} />
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={
                <IconUserCircle style={{ width: rem(16), height: rem(16) }} />
              }
              component={Link}
              href="/profile"
            >
              Profile
            </Menu.Item>
            <Divider />
            <Menu.Item
              leftSection={
                <IconLogout style={{ width: rem(16), height: rem(16) }} />
              }
              component={Link}
              href="/api/auth/logout"
              color="red"
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </AppShell.Header>
  );
}
