import styled from "styled-components";

export const SearchButton = styled.button`
    border-radius: 20px;
    border: none;
    background: ${props => props.disabled ? '#c2b9b9' : '#0086b3'};
    color: white;
    font-size: 2vw;
    height:4vw;
    width: 20%;
    margin: 3%;
    &:hover{
        background: ${props => props.disabled ? '#c2b9b9' : '#00ace6'};
    }
    &:focus{
          box-shadow: 0px 0px 6px 2px black;
          outline: none;
    }
`;

export const selectCustomStyles = {
    control: (provided, state) => ({
        ...provided,
        borderRadius: 20
    }),
    multiValue: (provided, state) => ({
        ...provided,
        borderRadius: 10,
    }),
}