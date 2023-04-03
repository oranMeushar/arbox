import styled from '@emotion/styled';

export const BuildingArea = styled.div`
    background-color: #f5f5f5;
    width: 80vw;
    height: 95vh;
    display:grid;
    place-items:center;
`;
export const Structure = styled.div`
    width: 60%;
    height: 80%;
    display:flex;
    flex-direction:column-reverse;
    align-items:center;
    justify-items: center;
    position:relative;
`;

export const ImageContainer = styled.div`
    position:absolute;
    bottom: ${({verticalPosition}) => verticalPosition};
    left: ${({horizontalPosition}) => horizontalPosition};
    transform: translate(-50%, -50%);
    width:4vmin;
    height:4vmin;
    transition: bottom 4s ease-in-out;
    display:grid;
    place-items:center;
`;