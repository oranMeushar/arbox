import styled from '@emotion/styled';

export const Button = styled.div`
        outline:none;
        font-size: 2vmin;
        padding:1vmin 0.5vmin;
        border-radius: 0.6rem;
        cursor: pointer;
        background-color:white;
        border:1px solid black;
        color:#0BADBF;
`;

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap:2vmin;
    padding: 2vmin;
    background-color: white;
    border-radius: 6px;

    p{
        margin-bottom: 0.5vmin;
        font-size: 2vmin;
    }

    input{
        outline: none;
        border:1px solid black;
        width: 80%;
        letter-spacing: 0.2rem;
        padding: 0.5vmin;
        border-top:none;
        border-left:none;
        border-right:none;
        width:35vmin;
    }
`;

export const Title = styled.div`
    font-size: 4vmin;
`;

export const SubmitButton = styled.div`
    background-color:#0094B0;
    width:fit-content;
    margin-top: 1vmin;
    padding:0.5vmin 2vmin;
    border-radius: 6px;
    font-size: 3vmin;
    cursor: pointer;
    color:white;

`;