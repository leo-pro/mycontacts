import styled, { css } from 'styled-components';

interface InputProps{
  error?: boolean
}

export default styled.input<InputProps>`
  width: 100%;
  height: 52px;
  background: ${({ theme }) => theme.colors.input.background};
  border: 2px solid ${({ theme }) => theme.colors.input.border};
  box-shadow: 0px 4px 10px rgba(0,0,0,0.04);
  border-radius: 4px;
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  transition: border-color 0.2s ease-in;
  color: ${({ theme }) => theme.colors.input.text};

  &:focus{
    border: 2px solid ${({ theme }) => theme.colors.primary.main}
  }

  ${({ theme, error }) => error
    && css`
      color: ${theme.colors.danger.main};
      border-color: ${theme.colors.danger.main} !important;
    `}

  &[disabled]{
    background-color: ${({ theme }) => theme.colors.gray[100]};
    border-color: ${({ theme }) => theme.colors.gray[200]};
  }
`;
