import styled from 'styled-components';

// ASSETS
import { cloudyImg } from '../assets';

export const Wrapper = styled.div`
  display: flex;

  width: 100%;
  height: 100%;

  background: center / cover no-repeat url(${cloudyImg});
  color: ${(props) => props.theme.white};
`;
