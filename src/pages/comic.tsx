import React, { useState } from 'react';

import DiaryCalendar from '@/components/DiaryCalendar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import ComicList from '../components/ComicList';
import ComicTabBar from '../components/ComicTabBar';
import { fetchEarliestDiaryComicId } from '../services/comics';
import theme from '../styles/theme';

const CONTENT = {
  'ego gala': {
    title: 'Ego Gala Archive',
    subtitle: 'Daily diary comics',
    body: [
      'On January 1, 2019, I decided to make a diary comic every day for a whole year.',
      'The structure remained consistent every day: four panels drawn in black-and-white, illustrating the events that transpired the day before.',
      'Once I finished a full year of diary comics, I continued the practice for another year. And then another.',
      'It was a transformative three years. I created comics that covered a vast variety of subject matters: getting my masters degree from the Center for Cartoon Studies, self-publishing two issues of Fantology, working in the service industry during the pandemic, falling in love, and mourning the loss of two friends.',
      'Eventually, I gave up the daily practice and moved to making autobiographical comics whenever I felt like it, this time with color.',
    ],
    buttonText: 'FIRST COMIC',
  },
  autobio: {
    title: 'Autobio',
    subtitle: 'Autbio subtitle here',
    body: ['Autobio text here.', 'Autobio text here. (Line 2)', 'Autobio text here. (Line 3)'],
    buttonText: 'YOU SHOULD NEVER SEE ME!',
  },
  fantology: {
    title: 'Fantology',
    subtitle: 'A fantasy comic anthology',
    body: [
      'In the summer of 2019, between my two years at the Center for Cartoon Studies, I came up with an idea to stay busy making comics with friend and fellow classmate, Emily Zea.',
      'The idea was to create a fantasy comic anthology (so dubbed Fantology) featuring fantasy comics from a variety of artists all set in the same world.',
      'I considered it to be an experiment in collaborative world building. With each comic an artist contributes to our anthology, the reader will learn more about the world they are set in, populating it with fantastical plots, magic, gods, monsters, creatures, histories, and lore.',
      'But really what I wanted was a book to showcase my own fantasy comics.',
      'Featured here are my contributions to the first three issues of Fantology: “Thirsty” (from Issue One: Origins), “Scales” (from Issue Two: Flora and Fauna), and “Chance and Gamble” (from Issue Three: Treasure).',
      'If you have further inquiries (or would like to contribute!), reach out to fantologyinfo@gmail.com',
      'To purchase a copy of Fantology, please visit our shop by clicking the button below.',
    ],
    buttonText: 'PURCHASE FANTOLOGY', // TODO: Link to https://fantologycomic.storenvy.com/
  },
  'other works': {
    title: 'Other Works',
    subtitle: "Zines n' things",
    body: [
      "Here's a spot for all the comics I've made that don't fit into either Ego Gala or Fantology.",
      'These have been made into zines, finished in collaboration with other publications, or posted just-for-fun on my Instagram.',
    ],
    buttonText: 'YOU SHOULD NEVER SEE ME!',
  },
};

const ComicPageGrid = styled.div`
  display: grid;
  grid-gap: 5vw;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr auto;
  grid-template-areas:
    'comic-list content'
    'comic-list .';
  padding: 5vw;

  @media (max-width: 768px) {
    grid-gap: 5vw;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, auto);
    grid-template-areas:
      'content'
      'comic-list';
    // padding: 5vw;
  }

  @media (max-width: 480px) {
    // Add styles for mobile view
  }
`;

const StyledContent = styled.div`
  grid-area: content;
`;

type ContentType = 'ego gala' | 'autobio' | 'fantology' | 'other works';

const ComicPage = () => {
  const router = useRouter();
  const [activeCategoryTab, setActiveCategoryTab] = useState('ego gala');
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabClick = (category: string) => {
    setActiveCategoryTab(category);
    setCurrentPage(1);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const goToEarliestDiaryComic = async () => {
    try {
      const id = await fetchEarliestDiaryComicId();
      router.push(`/comic/${id}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          position: 'sticky',
          top: isMobile ? 56 : 64,
          zIndex: 1100,
        }}
      >
        <ComicTabBar activeTab={activeCategoryTab} onTabClick={handleTabClick} />
      </Paper>
      <br />
      <br />
      <ComicPageGrid>
        <ComicList
          category={activeCategoryTab}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        <StyledContent>
          <Typography variant="h4" gutterBottom>
            {CONTENT[activeCategoryTab as ContentType].title}
          </Typography>

          <Typography variant="h5" gutterBottom>
            {CONTENT[activeCategoryTab as ContentType].subtitle}
          </Typography>

          {CONTENT[activeCategoryTab as ContentType].body.map((paragraph) => (
            <Typography key={uuidv4()} variant="body1" paragraph>
              {paragraph}
            </Typography>
          ))}

          {['ego gala', 'fantology'].includes(activeCategoryTab) ? (
            <Button fullWidth variant="contained" color="primary" onClick={goToEarliestDiaryComic}>
              {CONTENT[activeCategoryTab as ContentType].buttonText}
            </Button>
          ) : null}
        </StyledContent>

        {activeCategoryTab === 'ego gala' ? <DiaryCalendar /> : null}
      </ComicPageGrid>
    </>
  );
};

export default ComicPage;
