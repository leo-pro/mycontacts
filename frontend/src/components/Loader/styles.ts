import styled from 'styled-components';

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.colors.loader.background};

  display: flex;
  align-items: center;
  justify-content: center;
`;
