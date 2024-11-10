import React from 'react';
import { Container, Text, Button, Group } from '@mantine/core';
import { createStyles } from '@mantine/styles';

const useStyles = createStyles((theme: any) => ({
  root: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: theme.spacing.xl * 1.5,
    textAlign: 'center',
    [theme.fn.smallerThan('sm')]: {
      fontSize: 50, // Adjust for smaller screens if needed
    },
  },
}));

export default function LandingPage() {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <Text size= "xl" className={classes.title} variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
          BudgetCents
        </Text>
        <Group justify="center" mt="xl">
          <a href='/api/auth/login'>
            <Button size="lg" variant="outline">
              Login
            </Button>
          </a>
          <a href='/api/auth/signup'>
            <Button size="lg">
              Sign Up
            </Button>
          </a>
          
        </Group>
      </Container>
    </div>
  );
}