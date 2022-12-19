import styled from "styled-components";

export const Container = styled.header`
  grid-area: header;

  width: 100%;
  height: 11.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.BACKGROUND_LIGHT};

  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 3rem;
  padding: 3rem 12.3rem;

  > h2 {
    color: ${({ theme }) => theme.COLORS.PINK};
    font-size: 2.4rem;
  }

  > h3 {
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-size: 2rem;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;

  > div {
    display: flex;
    flex-direction: column;
    margin-right: 1rem;
    align-items: flex-start;
    min-width: 10rem;
    max-width: 20rem;
    font-size: 2rem;
    font-weight: bold;
  }
`;

export const Name = styled.div`
  color: ${({ theme }) => theme.COLORS.WHITE};
  align-self: flex-end;
`;

export const SignOut = styled.a`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.COLORS.GRAY_TEXT};
`;
