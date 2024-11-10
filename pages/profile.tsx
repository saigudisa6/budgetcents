'use client';

import { useEffect, useState } from 'react';
import { Paper, Text, Container, Stack, Avatar, Title, Group, Progress, Button, Flex, NavLink } from '@mantine/core';
import { changeStatus, getMemberData } from './api/fetch';
import { useUser } from '@auth0/nextjs-auth0/client';
import BudgetRequestForm from '@/components/BudgetRequestForm';
import { IconChevronRight } from '@tabler/icons-react';
import { getStripe } from '@/lib/stripe-client';

interface ProfileData {
  name: string;
  memberType: 'Pledge' | 'Brother';
  pledgeClass: string;
  dues: {
    totalDue: number;
    totalPaid: number;
    status: 'ACTIVE' | 'LOA' | 'PART-TIME';
  };
}

export default function ProfilePage() {
  const { user, isLoading } = useUser();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('ACTIVE');

  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            returnUrl: window.location.href, // Current page URL
          }),
      });

      const { sessionId } = await response.json();
      const stripe = await getStripe();
      
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          throw error;
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchProfile() {
      try {
        if (user?.sub) {
          const response = await getMemberData(user.sub);
          if (response.success && response.member) {
            setProfileData(response.member);
            setStatus(response.member.dues.status)
          } else {
            setError(response.error || 'Failed to fetch profile data');
          }
        }
      } catch (err) {
        setError('Error fetching profile data');
        console.error('Error:', err);
      }
    }

    if (!isLoading && user?.sub) {
      fetchProfile();
    }
  }, [user, isLoading]);

  const handleStatusChange = async (newStatus: 'ACTIVE' | 'LOA' | 'PART-TIME') => {
    changeStatus({
        userId: user?.sub ? user?.sub : '',
        status: newStatus
    })
    setStatus(newStatus);
    console.log('Status changed to:', newStatus);
  };

  if (isLoading) {
    return (
      <Flex align="center" justify="center" style={{ minHeight: '100vh' }}>
        <Container size="lg" px={0}>
          <Paper 
            shadow="sm" 
            p="xl" 
            withBorder
            w="100%"
            maw={1000}
            mx="auto"
          >
            <Text ta="center">Loading...</Text>
          </Paper>
        </Container>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex align="center" justify="center" style={{ minHeight: '100vh' }}>
        <Container size="md" px="xl">
          <Paper 
            shadow="sm" 
            p="xl" 
            withBorder
            style={{ maxWidth: '800px', margin: '0 auto' }}
          >
            <Text ta="center" color="red">{error}</Text>
          </Paper>
        </Container>
      </Flex>
    );
  }

  if (!profileData) {
    return (
      <Flex align="center" justify="center" style={{ minHeight: '100vh' }}>
        <Container size="lg" px={0}>
          <Paper 
            shadow="sm" 
            p="xl" 
            withBorder
            w='100%'
            maw={1000} 
            mx="auto"
          >
            <Text ta="center">No profile data found</Text>
          </Paper>
        </Container>
      </Flex>
    );
  }

  const duesProgress = (profileData.dues.totalPaid / profileData.dues.totalDue) * 100;

  return (
    <Flex align="center" justify="center" style={{ minHeight: '100vh'}}>
        <Container size="lg" px={0}>
          <Paper 
            shadow="sm" 
            p="xl" 
            withBorder
            w='75vw'
            maw={1000} 
            mx="auto"
          >
          <Group justify="right" mb="md"> {/* Added logout button at the top */}
            <Button 
              component="a"
              href="/api/auth/logout"
              size="xs"
              variant="light"
              color="red"
            >
              Logout
            </Button>
          </Group>

          <Stack gap="xl">
            <Group justify="center">
              <Avatar 
                size="xl" 
                radius="xl" 
                color="blue"
              >
                {profileData.name.charAt(0).toUpperCase()}
              </Avatar>
            </Group>

            <Stack gap="xs">
              <Title order={3} ta="center">{profileData.name}</Title>
              
              <Group justify="left" gap="xs">
                <Text fw={500}>Member Type:</Text>
                <Text>{profileData.memberType}</Text>
              </Group>

              <Group justify="left" gap="xs">
                <Text fw={500}>Pledge Class:</Text>
                <Text>{profileData.pledgeClass}</Text>
              </Group>

              <Stack gap="md" mt="lg">
                <Title order={4} ta="center">Dues Information</Title>
                
                <Group justify="space-between">
                  <Text fw={500}>Total Due:</Text>
                  <Text>${profileData.dues.totalDue}</Text>
                </Group>

                <Group justify="space-between">
                  <Text fw={500}>Total Paid:</Text>
                  <Text>${profileData.dues.totalPaid}</Text>
                </Group>

                <Stack gap="xs">
                  <Text fw={500} size="sm">Payment Progress:</Text>
                  <Progress 
                    value={duesProgress} 
                    color={duesProgress === 100 ? 'green' : 'blue'}
                  />
                </Stack>

                <Button 
                  onClick={handleCheckout}
                  disabled={duesProgress === 100}
                >
                  Pay Dues
                </Button>

                <BudgetRequestForm/>


                <Stack gap="xs">
                  <Text fw={500}>Membership Status:</Text>
                  <Group gap="xs">
                    <Button 
                      variant={status === 'ACTIVE' ? 'filled' : 'light'}
                      onClick={() => handleStatusChange('ACTIVE')}
                      size="xs"
                    >
                      Active
                    </Button>
                    <Button 
                      variant={status === 'LOA' ? 'filled' : 'light'}
                      onClick={() => handleStatusChange('LOA')}
                      size="xs"
                    >
                      LOA
                    </Button>
                    <Button 
                      variant={status === 'PART-TIME' ? 'filled' : 'light'}
                      onClick={() => handleStatusChange('PART-TIME')}
                      size="xs"
                    >
                      Part-Time
                    </Button>
                  </Group>
                  <NavLink
                        href="/dashboards"
                        label="Go to Dashboard"
                        rightSection={
                            <IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />
                        }
                        active
                        w={219}
                    />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Flex>
  );
}
