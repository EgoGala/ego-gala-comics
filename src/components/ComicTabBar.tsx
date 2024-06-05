import React from 'react';

import { useTheme, useMediaQuery, styled } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

interface ComicTabBarProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const StyledTabs = styled(Tabs)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,

  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
    height: '0px',
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  fontWeight: 600,
  flex: 1, // Default to equal width on larger screens
  maxWidth: 200,
  minWidth: 120, // Set a fixed minimum width
  textAlign: 'center',
  '&:hover': {
    color: theme.palette.primary.dark,
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.secondary.light,
  },
  [theme.breakpoints.down('sm')]: {
    flex: '1', // Ensure full width on small screens
    minWidth: 'unset', // Remove fixed minimum width on small screens
    fontSize: '0.8rem',
  },
}));

const ComicTabBar = ({ activeTab, onTabClick }: ComicTabBarProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const tabs = ['ego gala', 'autobio', 'fantology', 'other works'];
  const activeTabIndex = tabs.indexOf(activeTab);

  return (
    <StyledTabs
      value={activeTabIndex}
      onChange={(event: React.ChangeEvent<unknown>, newValue: number) => {
        onTabClick(tabs[newValue]);
      }}
      variant={isSmallScreen ? 'fullWidth' : undefined}
      centered={!isSmallScreen}
    >
      {tabs.map((tab) => (
        <StyledTab key={tab} label={tab.charAt(0).toUpperCase() + tab.slice(1)} />
      ))}
    </StyledTabs>
  );
};

export default ComicTabBar;
