import { Carousel } from '@mantine/carousel';
import { Card, Text, Badge, Modal, Group, Button, Stack } from '@mantine/core';
import { useState } from 'react';
import '@mantine/carousel/styles.css';

interface ServiceInfo {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  description: string;
  attendees: number;
  coordinator: string;
  requirements?: string[];
}

function ServiceCarousel() {
  const [selectedService, setSelectedService] = useState<ServiceInfo | null>(null);

  const services: ServiceInfo[] = [
    {
        id: '1',
        title: 'Community Clean-up Drive',
        date: '2024-11-15',
        time: '09:00 AM',
        location: 'Central Park',
        status: 'upcoming',
        description: "Join us for our monthly community clean-up initiative. We'll be focusing on park maintenance and recycling awareness. Estimated costs: $500 for supplies including gloves, trash bags, and refreshments.",
        attendees: 45,
        coordinator: 'Sarah Johnson',
        requirements: ['Gloves', 'Water bottle', 'Comfortable shoes']
      },
      {
        id: '2',
        title: 'Senior Care Visit',
        date: '2024-11-18',
        time: '02:00 PM',
        location: 'Sunshine Elderly Home',
        status: 'upcoming',
        description: "Volunteer to spend time with senior citizens, helping with activities and providing companionship. Estimated costs: $100 in transportation and materials.",
        attendees: 20,
        coordinator: 'Mike Peters',
        requirements: ['Background check', 'Medical clearance']
      }
      
    // Add more services as needed
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'blue';
      case 'ongoing':
        return 'green';
      case 'completed':
        return 'gray';
      default:
        return 'blue';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Carousel
  slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
  slideGap="xs"
  align="start"
  slidesToScroll={1}
  withControls
  loop
  styles={{
    root: {
      position: 'relative', // Ensure relative positioning for absolute children
    },
    controls: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      pointerEvents: 'none', // This ensures clicks pass through to slides
    },
    control: {
      pointerEvents: 'auto', // Re-enable pointer events for buttons
      '&[data-inactive]': {
        opacity: 0,
        cursor: 'default',
      },
      backgroundColor: 'white',
      borderRadius: '50%',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      width: 40,
      height: 40,
      margin: '0 10px',
    }
  }}
>
        {services.map((service) => (
          <Carousel.Slide key={service.id}>
            <Card 
              shadow="sm" 
              padding="lg" 
              radius="md"
              withBorder
              style={{ height: '100%', cursor: 'pointer', width: '20em' }}
              onClick={() => setSelectedService(service)}
            >
              <Stack gap="xs">
                <Badge 
                  color={getStatusColor(service.status)}
                  variant="light"
                >
                  {service.status.toUpperCase()}
                </Badge>

                <Text fw={700} size="lg" truncate="end">
                  {service.title}
                </Text>

                <Text size="sm" c="dimmed">
                  📅 {formatDate(service.date)}
                </Text>

                <Text size="sm" c="dimmed">
                  🕒 {service.time}
                </Text>

                <Text size="sm" c="dimmed" truncate="end">
                  📍 {service.location}
                </Text>

                <Text size="sm" c="dimmed">
                  👥 {service.attendees} Volunteers
                </Text>
              </Stack>
            </Card>
          </Carousel.Slide>
        ))}
      </Carousel>

      <Modal
        opened={selectedService !== null}
        onClose={() => setSelectedService(null)}
        title={
          <Text size="lg" fw={700}>
            {selectedService?.title}
          </Text>
        }
        size="lg"
      >
        {selectedService && (
          <Stack gap="md">
            <Group gap="xl">
              <Badge 
                color={getStatusColor(selectedService.status)}
                size="lg"
                variant="light"
              >
                {selectedService.status.toUpperCase()}
              </Badge>
              
              <Text size="sm" c="dimmed">
                {selectedService.attendees} Volunteers Registered
              </Text>
            </Group>

            <Stack gap="xs">
              <Text fw={500}>📅 Date & Time</Text>
              <Text>
                {formatDate(selectedService.date)} at {selectedService.time}
              </Text>
            </Stack>

            <Stack gap="xs">
              <Text fw={500}>📍 Location</Text>
              <Text>{selectedService.location}</Text>
            </Stack>

            <Stack gap="xs">
              <Text fw={500}>📝 Costs & Description</Text>
              <Text>{selectedService.description}</Text>
            </Stack>

            <Stack gap="xs">
              <Text fw={500}>👤 Coordinator</Text>
              <Text>{selectedService.coordinator}</Text>
            </Stack>

            {selectedService.requirements && (
              <Stack gap="xs">
                <Text fw={500}>✅ Requirements</Text>
                <Stack gap="xs">
                  {selectedService.requirements.map((req, index) => (
                    <Text key={index}>• {req}</Text>
                  ))}
                </Stack>
              </Stack>
            )}

            <Group justify="flex-end" mt="xl">
              <Button 
                variant="light" 
                color="gray" 
                onClick={() => setSelectedService(null)}
              >
                Close
              </Button>
              <Button color="blue">
                Register as Volunteer
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </>
  );
}

export default ServiceCarousel;