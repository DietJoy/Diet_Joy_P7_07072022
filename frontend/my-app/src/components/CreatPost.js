import React, { useState, useRef } from 'react';
import axios from 'axios';
import { getPost } from '../apiCalls';
import { IcSharpImage } from '../assets/imageIcone';
import { postPublication } from '../apiCalls';


const CreatPost = (props) => {

const { setPosts } = props

const formRef = useRef(null)


const [postPicture, setPostPicture]= useState(""); // affichage de l image dans le front
const [postText, setPostText]= useState("");
const [file, setFile] = useState(""); // à utliser pour l envoi de l image dans la bdd 
const [error, setError] = useState("");


const handleCreatePost = async (event)=> {
    event.preventDefault()
   
try{
    if ( postText || postPicture){ 
        const data = new FormData();
        data.append('text', postText);
        data.append("image", file);
       
        await postPublication(data)
        resetPost()
        const posts = await getPost()
        setPosts(posts)
    };
} 
catch (err) {
    setError(err.response.data?.error || err.message);
    }
};

const handlePicture = (e) => {//fonction qui permet la prévisualisation de l image au clic du bouton 
setPostPicture(URL.createObjectURL(e.target.files[0])); // prévisualisation de la photo en front
setFile(e.target.files[0]); // fichier file prêt à être envoyé dans la bdd
}; 


const resetPost = () => { //fonction qui annulera la rédaction du post 
    setPostPicture("")
    setPostText("")
    setFile("")
    formRef.current.reset()
};

    return (
        <form onSubmit={handleCreatePost} ref={formRef}>
        <div className='CreatPostContainer'>
        {postPicture
                ? <img src={postPicture} alt="image de la publication" /> 
                : null} {/* si le post contient une image on l'affiche sinon on montre rien */}

            <div className='PostForm'>
               <textarea 
               name="text"
               id="text"
               placeholder='votre texte'
               onChange={(e) => setPostText (e.target.value) }
               value= {postText}
               />  
            </div>

            <div className='PostImage'>
                <IcSharpImage />
                <input type="file" 
                id="file-upload" 
                name="imageUrl" 
                accept='.jpg, .jpeg, .png '
                onChange={(e) => handlePicture(e)} 
                />
            </div>

            <div className='btnSend'>
                { postText || postPicture ? ( <button className='cancel' onClick={resetPost}>Annuler</button>) : null} {/*si il y a une image et un text on permet d annuler la saisi via un bouton */}
            <button className='send' type="submit">Envoyer</button>
            </div>
            <small>{error}</small>{' '}
        {/* message d erreur qui s affiche si il y en a une */}
        </div>
        </form>
    );

};
export default CreatPost ;