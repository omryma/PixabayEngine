import React, { useEffect } from 'react'
import SearchBar from "./components/searchBar";
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { engineSelector, fetchImages } from "./slices/engine";
import ImagesTable from "./components/imagesTable";

const App = (props) => {

    const { images } = useSelector(engineSelector)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        const path = history.location.pathname.substring(1)
        if (path) { //in case we refresh url with query
            console.log('yo')
            const tags = path.split('+')
            dispatch(fetchImages(tags))
        }
    }, [])

    return (
        <>
            <h1>Walty Photos Engine</h1>
            <SearchBar />
            <ImagesTable />
        </>
    )
}

export default App