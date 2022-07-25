import styled, { css } from 'styled-components';

const containerVariants:any = {
  default: css`
    background: ${({ theme }) => theme.colors.primary.main};
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger.main};
  `,
  success: css`
    background: ${({ theme }) => theme.colors.success.main};
  `,
};

interface ToastMessageContainerProps {
  type: any
}

export const Container = styled.div<ToastMessageContainerProps>`
  padding: 16px 32px;
  color: #fff;
  border-radius: 4px;
  box-shadow: 0px 20px 20px -16px rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ type }) => containerVariants[type] || containerVariants.default}

  & + & {
    margin-top: 12px;
  }

  img {
    margin-right: 8px;
  }
`;
