import React, { useState, useEffect } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Pagination from '@mui/material/Pagination';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';

import { IComic } from '../db/models/Comic';
import { fetchComicsByCategory, deleteComic } from '../services/comics';

const COMICS_PER_PAGE = 10;

const StyledComicList = styled.div`
  grid-area: comic-list;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
`;

interface ComicListProps {
  category: string;
  currentPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  showCMSFeatures?: boolean;
}

const ComicList = ({
  category,
  currentPage,
  onPageChange,
  showCMSFeatures = false,
}: ComicListProps) => {
  const theme = useTheme();
  const [comics, setComics] = useState<IComic[]>([]);
  const [totalComics, setTotalComics] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const getComicURL = (comic: IComic) => {
    if (showCMSFeatures) return undefined;
    if (comic.panels.length > 1) return `/comic/${comic._id}/001`;
    return `/comic/${comic._id}`;
  };

  const handleDeleteComic = async (event: React.MouseEvent, comicId: string) => {
    const comicToDelete = comics.find((comic) => comic._id === comicId);

    if (comicToDelete) {
      // Delete comic from database
      await deleteComic(comicId);

      // Remove deleted comic from local state
      const updatedComics = comics.filter((comic) => comic._id !== comicId);
      setComics(updatedComics);
    }
  };

  useEffect(() => {
    const fetchCategoryComics = async () => {
      try {
        const response = await fetchComicsByCategory(category, currentPage);
        setComics(response.comics);
        setTotalPages(response.totalPages);
        if (category === 'ego gala') {
          setTotalComics(response.totalComics);
        }
      } catch (error) {
        console.error('Error fetching category-specific comics:', error);
      }
    };

    fetchCategoryComics();
  }, [category, currentPage]);

  return (
    <StyledComicList>
      <PaginationWrapper>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={onPageChange}
          color="primary"
          siblingCount={0}
          boundaryCount={1}
          showFirstButton
          showLastButton
        />
      </PaginationWrapper>

      <List>
        {comics.map((comic, index) => (
          <Link href={getComicURL(comic)} key={comic._id} underline="none">
            <ListItem
              button
              disableGutters
              sx={{
                padding: 0,
                backgroundColor: theme.palette.common.white,
                borderBottom: `1px solid ${theme.palette.primary.main}`,
                borderTop:
                  comics.indexOf(comic) === 0 ? `1px solid ${theme.palette.primary.main}` : 'none',
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemAvatar>
                {category === 'ego gala' ? (
                  <Box
                    sx={{
                      width: '80px',
                      height: '80px',
                      marginRight: '16px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.common.white,
                      fontSize: '1.3rem',
                    }}
                  >
                    #{totalComics - ((currentPage - 1) * COMICS_PER_PAGE + index)}
                    {/* #{(currentPage - 1) * COMICS_PER_PAGE + index + 1} */}
                  </Box>
                ) : (
                  <Avatar
                    variant="square"
                    src={comic.thumbnail_url}
                    alt={comic.title}
                    style={{ width: '80px', height: '80px', marginRight: '16px' }}
                  />
                )}
              </ListItemAvatar>
              <Box display="flex" alignItems="center" width="100%">
                {/* <ListItemText
                  primary={
                    category === 'ego gala'
                      ? `Diary Comic #${(currentPage - 1) * COMICS_PER_PAGE + index + 1}`
                      : comic.title
                  }
                  sx={{ textAlign: 'left' }}
                /> */}
                <ListItemText
                  // primary={category !== 'ego gala' ? comic.title : null}
                  primary={comic.title}
                  sx={{ textAlign: 'left' }}
                />

                {/* {category !== 'ego gala' && (
                  <center>
                    <ListItemText primary={comic.description} />
                  </center>
                )} */}

                <ListItemText
                  secondary={
                    category !== 'ego gala'
                      ? new Intl.DateTimeFormat('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }).format(new Date(comic.publication_date))
                      : null
                  }
                  sx={{ paddingRight: '16px', textAlign: 'right' }}
                />
                {showCMSFeatures && (
                  <Button onClick={(event) => handleDeleteComic(event, comic._id)}>
                    <DeleteIcon />
                  </Button>
                )}
              </Box>
            </ListItem>
          </Link>
        ))}
      </List>

      <PaginationWrapper>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={onPageChange}
          color="primary"
          siblingCount={0}
          boundaryCount={1}
          showFirstButton
          showLastButton
        />
      </PaginationWrapper>
    </StyledComicList>
  );
};

export default ComicList;
