import styled from "styled-components";

export const ImagesContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
`

export const ImageItem = styled.img`
    flex: 0 1 auto;
    margin: 5px;
    object-fit: cover;
    border-radius: 5px;
    max-width: 22%;
    background-color: #f2f2f2;
    box-sizing: padding-box;
    &:hover {
        opacity: 0.5;
    }
    &:focus {
        box-shadow: 0px 0px 6px 2px black;
    }
`