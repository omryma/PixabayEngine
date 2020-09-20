import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { engineSelector, fetchImages } from "../slices/engine";
import { ImageItem, ImagesContainer } from "./styled/imagesStyles";

const ImagesTable = () => {
    const { resultsPage, currentTags, isLoading, isError, keepFetch, images } = useSelector(engineSelector)
    const dispatch = useDispatch()
    const [isBottom, setBottom] = useState(false)

    const isScrolling = () => {
        if (window.innerHeight + window.pageYOffset >= document.body.scrollHeight - 40) {
            setTimeout(() => setBottom(true), 400)
        } else setBottom(false)
    }

    useEffect(() => {
        window.addEventListener('scroll', isScrolling)
        return () => window.removeEventListener('scroll', isScrolling)
    }, [])

    useEffect(() => {
        isBottom && !isLoading && keepFetch && dispatch(fetchImages(currentTags, resultsPage))
    }, [isBottom])

    return (
        !isError ?
            <>
                <ImagesContainer>
                    {images.map((image) => (
                        <ImageItem
                            key={image.id}
                            src={image.webformatURL.replace('_640', '_180')}
                            onClick={() => window.open(image.largeImageURL)}
                        />
                    ))}
                </ImagesContainer>

                {isLoading && <h4>Loading...</h4>}
                {!keepFetch && (images.length ? <h4>End of Results.</h4> : <h4>Sorry, no Results.</h4>)}
            </>
        :
        <h4>Sorry, something went wrong :(</h4>
    )
}

export default ImagesTable