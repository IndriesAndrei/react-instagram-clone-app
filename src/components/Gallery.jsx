import getPhotoUrl from 'get-photo-url';
import { useState } from 'react';

const Gallery = () => {
    const [allPhotos, setAllPhotos] = useState([]);

    const addPhoto = async () => {
        const newPhoto = {
            id: Date.now(),
            url: await getPhotoUrl('#addPhotoInput')
        }

        // add all elements from allPhotos array and add them to the new newPhoto array
        setAllPhotos([newPhoto, ...allPhotos]);
    }

    return (
        <>
            <input type="file" name="photo" id="addPhotoInput" />
            <label htmlFor="addPhotoInput" onClick={addPhoto}>
                <i className="add-photo-button fas fa-plus-square"></i>
            </label>

            <section className="gallery">
                {allPhotos.map((photo) => {
                   return  <div className="item" key={photo.id}>
                        <img src={photo.url} className="item-image" alt="" />
                        <button className="delete-button">Delete</button>
                    </div>
                })}
            </section>
        </>
    )
}

export default Gallery;