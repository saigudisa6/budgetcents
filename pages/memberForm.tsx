import { useUser } from '@auth0/nextjs-auth0/client';
import { useForm } from '@mantine/form';
import { TextInput, Radio, Button, Paper, Stack, Container } from '@mantine/core';
import { useRouter } from 'next/router';
import { saveMemberData } from './api/fetch'; // Create this file to store the function

interface FormValues {
  name: string;
  memberType: 'Pledge' | 'Brother';
  pledgeClass: string;
}

export default function MembershipForm() {
  const { user } = useUser();
  const router = useRouter();

  const form = useForm<FormValues>({
    initialValues: {
      name: '',
      memberType: 'Pledge',
      pledgeClass: '',
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must be at least 2 characters' : null),
      pledgeClass: (value) => (value.length < 1 ? 'Pledge class is required' : null),
    },
  });

  const handleSubmit = async (values: FormValues) => {
    if (!user?.sub) return;

    try {
      await saveMemberData({
        ...values,
        userId: user.sub
      });
      router.push('/profile');
    } catch (error) {
      console.error('Error saving member:', error);
    }
  };

  return (
    <Container size="xs" px="xs">
      <div style={{ maxWidth: 400, margin: '50px auto' }}>
        <Paper shadow="sm" p="xl" withBorder>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                required
                label="Full Name"
                placeholder="Enter your full name"
                {...form.getInputProps('name')}
              />

              <Radio.Group
                label="Membership Type"
                description="Are you a pledge or brother?"
                required
                {...form.getInputProps('memberType')}
              >
                <Stack mt="xs">
                  <Radio value="pledge" label="Pledge" />
                  <Radio value="brother" label="Brother" />
                </Stack>
              </Radio.Group>

              <TextInput
                required
                label="Pledge Class Name"
                placeholder="Enter your pledge class name"
                {...form.getInputProps('pledgeClass')}
              />

              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </Paper>
      </div>
    </Container>
  );
}
