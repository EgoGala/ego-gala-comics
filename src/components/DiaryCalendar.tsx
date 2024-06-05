import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';

const OuterContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  margin: 10px 0;
  padding: 10px;
`;

const InnerContainer = styled.div`
  display: flex;
  max-width: 100%;
  flex-basis: 420px;
  flex-direction: column;
  flex-grow: 100;
  align-items: stretch;
  padding-top: 1em;
  margin: 0 auto;
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2);
`;

const StyledCalendar = styled(Calendar)`
  border: 10px solid #31496e;
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  width: 100%;

  .react-calendar__tile {
    color: black;
  }

  .react-calendar__month-view__days__day--weekend {
    color: black;
  }

  .react-calendar__tile--disabled {
    background: none !important;

    > abbr {
      opacity: 1 !important;
      color: gray !important;
    }
  }
`;

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const DiaryCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [datesToIds, setDatesToIds] = useState<{ [date: string]: string }>({});
  const router = useRouter();

  // TODO: Switch to async/await if possible - gave me some trouble
  useEffect(() => {
    axios.get('/api/comics/dates').then((response) => {
      setDatesToIds(response.data);
    });
  }, []);

  const onDateChange = (date: Value) => {
    setSelectedDate(date);
  };

  const onDayClick = (value: Value) => {
    // convert datestring from '2021-02-03T05:00:00.000Z' to '2020-02-03', which is what
    // the dateToIds map uses for keys
    const dateClicked = value instanceof Date ? value.toISOString().split('T')[0] : null;
    if (dateClicked && datesToIds[dateClicked]) {
      router.push(`/comic/${datesToIds[dateClicked]}`);
    } else {
      alert(`No Diary Comic was illustrated on ${dateClicked}.`);
    }
  };

  const tileDisabled = ({ date: tileDate, view }: { date: Date; view: string }) => {
    // Disable the date if it's not in the datesToIds map
    const dateString = tileDate.toISOString().split('T')[0];
    return view === 'month' && !datesToIds[dateString];
  };

  return (
    <OuterContainer>
      <InnerContainer>
        <StyledCalendar
          defaultActiveStartDate={new Date(2019, 0, 1)}
          locale="en-US"
          maxDate={new Date(2021, 10, 27)}
          minDate={new Date(2019, 0, 1)}
          calendarType="gregory"
          onChange={onDateChange}
          onClickDay={onDayClick}
          tileDisabled={tileDisabled}
          value={selectedDate}
        />
      </InnerContainer>
    </OuterContainer>
  );
};

export default DiaryCalendar;
