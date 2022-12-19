import styled from "styled-components";

export const Container = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.PINK};
  color: ${({ theme }) => theme.COLORS.BACKGROUND_DARK};

  height: 5.6rem;
  border: 0;
  padding: 0 1.6rem;
  border-radius: 10px;
  font-weight: 500;
  font-size: 1.6rem;

  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    opacity: 0.5;
  }
`;
