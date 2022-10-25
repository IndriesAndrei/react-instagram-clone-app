import { useState, useEffect } from 'react';
import getPhotoUrl from 'get-photo-url';
import profileIcon from '../assets/profileIcon.svg';
import { db } from '../dexie';

const Bio = () => {
    const [userDetails, setUserDetails] = useState({
        name: 'Andrei Indries',
        about: 'Building ReactJs cool apps'
    }); 
    const [editFormIsOpen, setEditFormIsOpen] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(profileIcon);

    useEffect(() => {
        const setDataFromDb = async () => {
            const userDetailsFromDb = await db.bio.get('info');
            userDetailsFromDb && setUserDetails(userDetailsFromDb);
        }

        setDataFromDb()
    })

    const editForm = (
        <form className='edit-bio-form' onSubmit={(e) => updateUserDetails(e)}>
            <input type="text" id="" name="nameOfUser" placeholder="Your name" />
            <input type="text" id="" name="aboutUser" placeholder="About you" /> 
            <br />
            <button type="button" className="cancel-button" onClick={() => setEditFormIsOpen(false)}>Cancel</button>
            <button type="submit" className="save-button">Save</button>
        </form>
    )

    // update user details
    const updateUserDetails = async (e) => {
        e.preventDefault();

        const objectData = {
            name: e.target.nameOfUser.value,
            about: e.target.aboutUser.value
        }
        setUserDetails(objectData);

        // update bio object store here and info will be set as primary key
        await db.bio.put(objectData, 'info');

        // close the form after submission
        setEditFormIsOpen(false);
    }

    const updateProfilePhoto = async () => {
        // get selected photo
        const newProfilePhoto = await getPhotoUrl('#profilePhotoInput');

        // update state
        setProfilePhoto(newProfilePhoto);
    }

    const editButton = <button onClick={() => setEditFormIsOpen(true)}>Edit</button>;


    return (
        <section className="bio">
            <input type="file" accept="image/*" name="photo" id="profilePhotoInput" />
            <label htmlFor="profilePhotoInput" onClick={updateProfilePhoto}>
                <div className="profile-photo" role="button" title="Click to edit photo">
                    <img src={profilePhoto} alt="profile" />
                </div>
            </label>
            <div className="profile-info">
                <p className="name">{userDetails.name}</p>
                <p className="about">{userDetails.about}</p>
                {editFormIsOpen ? editForm :  editButton}
            </div>
        </section>
    )
}

export default Bio;