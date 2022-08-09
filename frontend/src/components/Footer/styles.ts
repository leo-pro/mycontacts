import styled from 'styled-components';

export const Container = styled.footer`
  width: 100%;
  height: 64px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 32px;
  margin-bottom: 16px;

  font-size: 18px;
  color: ${({ theme }) => theme.colors.gray[200]};

  a {
    text-decoration: none;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.gray[200]};
  }
`;
