import styled from 'styled-components';

export const WrapperSectionLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  flex: 1;
  gap: 20px;
  padding: 5rem 7rem;

  /* Glassmorphism */
  background: rgb(0 0 0 / 12%);
  border-radius: 0;
  box-shadow: 0 4px 30px rgb(0 0 0 / 10%);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`;

export const City = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  > .city {
    font-size: 2.5rem;
    font-weight: 600;
  }

  > .date {
    font-weight: 200;
    font-size: 1.5rem;
  }
`;

export const SectionLeftTop = styled.div`
  display: flex;

  gap: 30px;
  width: 100%;

  > span {
    display: flex;
    align-items: center;

    color: ${(props) => props.theme.white};
    font-size: 7.5rem;
    font-weight: 600;
  }

  > .more-infos {
    display: flex;
    flex-direction: column;
    justify-content: center;

    font-size: 1.25rem;
    font-weight: 200;
  }

  > .content-icon {
    display: flex;
    flex-direction: column;
    align-items: center;

    height: 100%;
    margin-left: 40px;

    > span {
      font-size: 1.5rem;
      font-weight: 200;
    }
  }
`;

export const SectionLeftMiddle = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;
  padding-left: 0.9375rem;

  font-weight: 100;

  > svg {
    font-size: 1.25rem;
  }
`;

export const SectionLeftBottom = styled.div`
  display: flex;
  gap: 10px;
`;

export const ForecastItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 5px;

  > span {
    font-size: 1rem;
    font-weight: 200;
  }
`;
