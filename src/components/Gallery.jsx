import getPhotoUrl from 'get-photo-url';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import { db } from '../dexie';

const Gallery = () => {
    // const [allPhotos, setAllPhotos] = useState([]);
    const allPhotos = useLiveQuery(() => db.gallery.toArray(), []);

    const addPhoto = async () => {
        // const newPhoto = {
        //     id: Date.now(),
        //     url: await getPhotoUrl('#addPhotoInput')
        // }

        // // add all elements from allPhotos array and add them to the new newPhoto array
        // setAllPhotos([newPhoto, ...allPhotos]);

        db.gallery.add({
            url: await getPhotoUrl('#addPhotoInput'),
        })
    }

    const removePhoto = (id) => {
        db.gallery.delete(id);
    }

    return (
        <>
            <input type="file" name="photo" id="addPhotoInput" />
            <label htmlFor="addPhotoInput" onClick={addPhoto}>
                <i className="add-photo-button fas fa-plus-square"></i>
            </label>

            <section className="gallery">
                {/* allPhotos?.map -> if we put ? it means that is optional */}
                {allPhotos?.map((photo) => {
                   return  <div className="item" key={photo.id}>
                        <img src={photo.url} className="item-image" alt="" />
                        <button className="delete-button" onClick={() => removePhoto(photo.id)}>Delete</button>
                    </div>
                })}
            </section>
        </>
    )
}

export default Gallery;