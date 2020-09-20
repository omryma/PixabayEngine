import styled from "styled-components";

export const ImagesContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
`

export const ImageItem = styled.img`
    flex: 0 1 100px;
    margin: 10px;
    border-radius: 5px;
    &:hover {
        opacity: 0.5;
    }
`