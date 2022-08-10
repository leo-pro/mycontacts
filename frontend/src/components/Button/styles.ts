import styled, { css } from 'styled-components';

interface StyledButtonProps {
  danger?: boolean
}

export const StyledButton = styled.button<StyledButtonProps>`
  height: 52px;
  border: none;
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.white};
  box-shadow: 0px 4px 10px rgba(0,0,0,0.04);
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  transition: background all 0.2s ease-in;
  padding: 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover{
    background-color: ${({ theme }) => theme.colors.primary.light};
  }

  &:active{
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }

  &[disabled]{
    background-color: ${({ theme }) => theme.colors.gray[200]};
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

  &[disabled]{
    background: #ccc !important;
    cursor: default !important;
  }
`;
