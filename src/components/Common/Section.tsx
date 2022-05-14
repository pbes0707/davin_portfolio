import styled from "styled-components";

export const Section = styled.div<{ isFull: boolean, isMobile: boolean }>`
  position:relative;
  width:100%;
  ${p => p.isFull ? `
    height: 100vh;
  `:`
    padding: 80px 0;
  `}
`;

export const Wrapper = styled.div`
  text-align: center;
`;
