import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;

  margin-top: 16px;

  .details{
    margin-left: 24px;

    span{
      font-size: 20px;
      color: ${({ theme }) => theme.colors.danger.main};
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
    }
  }
`;
