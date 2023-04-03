import styled from '@emotion/styled';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    border:1px solid grey;
    position:relative;
    display:flex;
    justify-content:center;
    font-size: 1.8vmin;
    background:white;
`;

export const Image = styled.img`
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width:4vmin;
    height:4vmin;
`;