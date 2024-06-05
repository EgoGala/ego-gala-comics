import React from 'react';

import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

// import Icon from '../../components/Icon';
import { IComic } from '../../db/models/Comic';
import {
  fetchComic,
  fetchEarliestDiaryComicId,
  fetchLatestDiaryComicId,
  fetchNextDiaryComicId,
  fetchPreviousDiaryComicId,
} from '../../services/comics';

interface ComicViewerProps {
  comic: IComic;
}

const ComicViewer = ({ comic }: ComicViewerProps) => {
  const theme = useTheme();
  const isMobile = theme.breakpoints.down('sm');
  const router = useRouter();
  const panelNumber = Number(router.query.panelNumber) || 1;
  const currentPanel = comic.panels.find((panel) => panel.panel_number === panelNumber);

  // const iconButtonStyles = {
  //   color: theme.palette.secondary.light,
  //   // marginRight: '10px',
  //   '&:hover': {
  //     // color: theme.palette.info.main,
  //     color: theme.palette.secondary.main,
  //     backgroundColor: 'none',
  //   },
  // };
  const goToPrevComic = async () => {
    try {
      const id = await fetchPreviousDiaryComicId(comic._id);
      router.push(`/comic/${id}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const goToNextComic = async () => {
    try {
      // Fetch the next comic based on the current comic's publication date
      const id = await fetchNextDiaryComicId(comic._id);
      router.push(`/comic/${id}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const goToEarliestDiaryComic = async () => {
    try {
      const id = await fetchEarliestDiaryComicId();
      router.push(`/comic/${id}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const goToLatestDiaryComic = async () => {
    try {
      const id = await fetchLatestDiaryComicId();
      router.push(`/comic/${id}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box my={12}>
      {currentPanel && (
        <Container
          maxWidth="md"
          sx={{
            width: isMobile ? '95vw' : '90vw',
            backgroundColor: theme.palette.primary.light,
            marginTop: '20px',
            padding: '20px 0px 20px 0px',
            boxShadow: theme.shadows[3],
          }}
        >
          <Grid container px="10px">
            {/* First Row */}
            <Grid item container pb="15px" justifyContent="space-between" gap="1%">
              {comic.category === 'diary' ? (
                <>
                  <Grid item sx={{ width: '24%' }}>
                    {comic.title !== 'January 1, 2019' ? (
                      <Button
                        fullWidth
                        color="secondary"
                        variant="contained"
                        onClick={goToPrevComic}
                      >
                        Prev
                      </Button>
                    ) : null}
                  </Grid>
                  <Grid item sx={{ width: '24%' }}>
                    <Button
                      fullWidth
                      color="secondary"
                      variant="contained"
                      onClick={goToEarliestDiaryComic}
                    >
                      First Comic
                    </Button>
                  </Grid>
                  <Grid item sx={{ width: '24%' }}>
                    <Button
                      fullWidth
                      color="secondary"
                      variant="contained"
                      onClick={goToLatestDiaryComic}
                    >
                      Last Comic
                    </Button>
                  </Grid>
                  <Grid item sx={{ width: '24%' }}>
                    {comic.title !== 'November 27, 2021' ? (
                      <Button
                        fullWidth
                        color="secondary"
                        variant="contained"
                        onClick={goToNextComic}
                      >
                        Next
                      </Button>
                    ) : null}
                  </Grid>
                </>
              ) : null}
            </Grid>

            {/* Second Row */}
            <Grid item container justifyContent="center" alignItems="center">
              <Box sx={{ width: '100%' }}>
                <Image
                  src={currentPanel.image_url}
                  alt={`Panel ${currentPanel.panel_number}`}
                  quality={100}
                  width={640}
                  height={551}
                  style={{
                    backgroundColor: 'white',
                    boxShadow: theme.shadows[3],
                    width: '100%',
                    height: 'auto',
                    padding: '2vw',
                    border: `10px solid ${theme.palette.primary.main}`,
                    // border: '5px solid white',
                  }}
                />
              </Box>
            </Grid>

            {/* Third Row */}
            {/* <Grid item container pt="15px" justifyContent="center" gap="2%">
              {comic.category === 'diary' ? (
                <>
                  <Grid item sx={{ width: '49%' }}>
                    <Button
                      fullWidth
                      color="secondary"
                      variant="contained"
                      onClick={goToEarliestDiaryComic}
                    >
                      First Comic
                    </Button>
                  </Grid>
                  <Grid item sx={{ width: '49%' }}>
                    <Button
                      fullWidth
                      color="secondary"
                      variant="contained"
                      onClick={goToLatestDiaryComic}
                    >
                      Last Comic
                    </Button>
                  </Grid>
                </>
              ) : null}
            </Grid> */}
          </Grid>
        </Container>
      )}
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const comicId = context.params?.comicId as string;
  const panelNumber = context.query.panelNumber as string;

  try {
    const comic = await fetchComic(comicId);

    if (comic.panels.length === 1 && panelNumber) {
      return {
        redirect: {
          destination: `/comic/${comicId}`,
          permanent: false, // Set to false for temporary redirect
        },
      };
    }

    if (comic.panels.length > 1 && !panelNumber) {
      return {
        redirect: {
          destination: `/comic/${comicId}/001`,
          permanent: false, // Set to false for temporary redirect
        },
      };
    }

    return { props: { comic } };
  } catch (error) {
    // console.error('Error fetching comic:', error);
    return { notFound: true };
  }
};

export default ComicViewer;
