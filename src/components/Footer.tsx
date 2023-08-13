import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Avatar,
  Card,
  CardContent,
  CardActionArea,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Facebook, Twitter, Instagram, Reddit } from '@mui/icons-material';

const Footer: React.FC = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const socialLinks = [
    {
      name: 'Twitter',
      icon: <Twitter style={{ fontSize: 32 }} />,
      url: 'https://twitter.com/ego_gala',
    },
    {
      name: 'Instagram',
      icon: <Instagram style={{ fontSize: 32 }} />,
      url: 'https://www.instagram.com/ego_gala/',
    },
    {
      name: 'Facebook',
      icon: <Facebook style={{ fontSize: 32 }} />,
      url: 'https://www.facebook.com/k10.shull',
    },
    {
      name: 'Reddit',
      icon: <Reddit style={{ fontSize: 32 }} />,
      url: 'https://www.reddit.com/user/ego_gala/',
    },
  ];

  return (
    <Container component="footer" disableGutters maxWidth={false}>
      <Grid
        container
        spacing={5}
        direction="column"
        style={{
          padding: '45px',
          backgroundColor: theme.palette.primary.main,
          color: '#fff',
        }}
      >
        <Grid item container justifyContent="center">
          <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
            Follow Ego Gala
            <hr style={{ width: '75%', margin: '10px auto' }} />
          </Typography>
        </Grid>
        <Grid
          item
          container
          spacing={2}
          justifyContent="center"
          style={{ margin: '0 10px' }}
        >
          {socialLinks.map((social, index) => (
            <Grid item xs={isTablet ? 6 : 3} key={index}>
              <Card
                style={{
                  display: 'flex',
                  backgroundColor: '#f0f0f0',
                  width: 200,
                }}
              >
                <CardActionArea
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'start',
                    color: '#222',
                    '&:hover': {
                      backgroundColor: '#e0e0e0',
                    },
                  }}
                >
                  <Avatar style={{ width: 55, height: 55, margin: 10 }}>
                    {social.icon}
                  </Avatar>
                  <CardContent style={{ paddingLeft: 8 }}>
                    <Typography variant="h6">{social.name}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid
        container
        item
        style={{
          padding: '24px',
          backgroundColor: theme.palette.secondary.main,
          color: '#fff',
          alignItems: 'center',
        }}
      >
        <Grid item xs={6} sm={6}>
          <Typography variant="h4" align="left">
            Ego Gala
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Typography
            variant={isTablet ? 'body2' : 'body1'}
            align={isTablet ? 'center' : 'right'}
          >
            &copy; {new Date().getFullYear()} Ego Gala, All Rights Reserved
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer;
