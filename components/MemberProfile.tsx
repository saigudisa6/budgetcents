'use client';

import { Paper, Text, Container, Stack, Avatar, Title, Group, Button } from '@mantine/core';
import { MemberData } from '@/types/member';

interface ProfileProps {
  data: MemberData;
  onEdit: () => void;
}

export default function MemberProfile({ data, onEdit }: ProfileProps) {
  return (
    <Container size="xs" px="xs">
      <Paper shadow="sm" p="xl" withBorder mt={50}>
        <Stack gap="xl">
          <Group justify="center">
            <Avatar 
              size="xl" 
              radius="xl" 
              color="blue"
            >
              {data.name.charAt(0).toUpperCase()}
            </Avatar>
          </Group>

          <Stack gap="xs">
            <Title order={3} ta="center">{data.name}</Title>
            
            <Group justify="center" gap="xs">
              <Text fw={500}>Member Type:</Text>
              <Text>{data.memberType}</Text>
            </Group>

            <Group justify="center" gap="xs">
              <Text fw={500}>Pledge Class:</Text>
              <Text>{data.pledgeClass}</Text>
            </Group>
          </Stack>

          <Button 
            onClick={onEdit}
            variant="light"
          >
            Edit Profile
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
