import styled from '@emotion/styled';

export const Container = styled.div`
    width: 100%;
    display:grid;
    /* grid-template-columns: 0.8fr repeat(5, minmax(min-content, 1fr)) 1.2fr; */
    grid-template-columns:${({polsLength}) => `0.8fr repeat(${polsLength}, minmax(min-content, 1fr)) 1.2fr`};
    flex-grow: 1;
`;

export const FloorLevel = styled.div`
    font-size: 2vmin;
    display:grid;
    place-items:center;
    text-align:center;
    font-weight:600;
`;

export const FloorButton = styled.button`
    align-self: center;
    justify-self: center;
    padding: 0.5vmin 1vmin;
    background: ${({isClicked, hasReachedFloor}) => hasReachedFloor ? `none` :  isClicked ? `#F24B59` : `#5ABF7D` };
    border:${({hasReachedFloor}) => hasReachedFloor ? `1px solid #5ABF7D` : `none` };
    cursor: pointer;
    color:${({hasReachedFloor}) => hasReachedFloor ? `#5ABF7D` : `white` };
    font-weight:600;
    border-radius:0.6rem;
`;