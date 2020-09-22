import React, {useState, useEffect, Fragment} from 'react'
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

    const handleImageClick = (e, imageURL) => {
        e.preventDefault()
        if (!e.charCode || e.charCode === 32 || e.charCode === 13) window.open(imageURL) //only by the click of Mouse, Enter and Space
    }

    return (
        !isError ?
            <>
                <ImagesContainer>
                    {images.map((image, idx) => (
                        <ImageItem
                            key={image.id}
                            src={image.webformatURL.replace('_640', '_180')}
                            onClick={(e) => handleImageClick(e, image.largeImageURL)}
                            onKeyPress={(e) => handleImageClick(e, image.largeImageURL)}
                            alt={image.tags}
                            tabIndex={idx + 3}
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