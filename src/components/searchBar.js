import React, { useRef, useEffect, useState } from 'react'
import CreatableSelect from 'react-select/creatable';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import { engineSelector, fetchImages } from "../slices/engine";
import { SearchButton, selectCustomStyles } from "./styled/searchStyles";

const SearchBar = () => {
    const { recentTags } = useSelector(engineSelector)
    const [currentTags, setTags] = useState([]) //state for the 'temp tags' before the fire
    const selectRef = useRef()
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const path = history.location.pathname.substring(1)
        path && setTags(path.split('+').map((tag) => ({ value: tag, label: tag })))
    }, []) ////in case we refresh url with query

    const onSearchFire = () => {
        const selectedTags = currentTags.map((tag) => tag.value.trim())
        history.push(`/${selectedTags.join('+')}`)
        dispatch(fetchImages(selectedTags))
    }

    const formatRecentTags = () => {
        const formattedOptions = recentTags.map((tag) => ({ value: tag, label: tag }))
        return [{ label: 'Recent Tags', options: formattedOptions }]
    }

    const generateWarningMessage = (input) => {
        if (!input.trim().length || input.includes("Add ")) return "Please enter a legal tag"
        return "Only 4 tags are allowed"
    }

    return (
        <>
            <CreatableSelect
                styles={selectCustomStyles}
                isMulti
                options={formatRecentTags()}
                placeholder="Enter your tags..."
                onChange={(values) => values ? setTags(values) : setTags([])}
                formatCreateLabel={(value) => `Add "${value}"`}
                ref={ref => selectRef.current = ref}
                isValidNewOption={(input, selected) => selected.length < 4 && input.trim().length > 0}
                value={currentTags}
                noOptionsMessage={({ inputValue }) => generateWarningMessage(inputValue)}
            />
            <SearchButton
                onClick={onSearchFire}
                disabled={!currentTags.length}
            >
                Search
            </SearchButton>
        </>
    )
}

export default SearchBar