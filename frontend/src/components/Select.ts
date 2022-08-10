import styled from 'styled-components';

export default styled.select`
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
  appearance: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.input.text};

  &:focus{
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
  }

  &[disabled]{
    background-color: ${({ theme }) => theme.colors.input.background};
    border-color: ${({ theme }) => theme.colors.input.border};
  }
`;
