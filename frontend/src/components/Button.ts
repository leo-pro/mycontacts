import styled, { css } from 'styled-components';

interface ButtonProps {
  danger?: boolean
}

export default styled.button<ButtonProps>`
  height: 52px;
  border: none;
  background: ${({ theme }) => theme.colors.primary.main};
  color: #fff;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.04);
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  transition: background all 0.2s ease-in;
  padding: 0 16px;

  &:hover{
    background-color: ${({ theme }) => theme.colors.primary.light};
  }

  &:active{
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }

  &[disabled]{
    background-color: #CCC;
    cursor: default;
  }

  ${({ theme, danger }) => (
    danger
    && css`
      background-color: ${theme.colors.danger.main};

      &:hover{
        background-color: ${theme.colors.danger.light};
      }

      &:active{
        background-color: ${theme.colors.danger.dark};
      }
    `
  )}
`;
