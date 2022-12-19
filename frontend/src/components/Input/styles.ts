import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_LIGHT};
  border-radius: 10px;
  height: 5.6rem;

  > input {
    margin-left: 1.6rem;
    width: 80%;
    background: transparent;
    color: ${({ theme }) => theme.COLORS.WHITE};
    border: 0;
    font-size: 1.6rem;
    outline: none;

    &:placeholder {
      color: ${({ theme }) => theme.COLORS.GRAY_TEXT};
    }

    &:focus {
      outline: ${({ theme }) => theme.COLORS.WHITE} solid 0px;
    }
  }

  > svg {
    margin-left: 1.6rem;
  }
`;
