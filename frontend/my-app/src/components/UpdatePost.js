import {useRef, useState} from 'react';
import {updatePost} from '../apiCalls';
import { RiDeleteBin6Fill } from '../assets/deleteIcone';

import React from 'react';

const UpdatePost = (props) => {

  const {post, handlePosts, setIsUpdating} = props

  const [textUpdate, setTextUpdate] = useState(post.text || null);
  const [file, setFile] = useState(null);
  const fileRef = useRef(null)

  const resetPostInputs = () => {
    fileRef.current.value = ""
    setTextUpdate("")
    setFile(null)
  }

  const handlePicture = (e) => {
    //fonction qui permet la prévisualisation de l image au clic du bouton
    // setPostPicture(URL.createObjectURL(e.target.files[0])); // prévisualisation de la photo en front
    setFile(e.target.files[0]); // fichier file prêt à être envoyé dans la bdd
  };

  const updateItem = async () => {
    try {
      const data = new FormData();
      if(textUpdate){
        data.append('text', textUpdate);
      }
      if (file) {
        data.append('image', file);
      }

      await updatePost(data, post._id);
      resetPostInputs()
      setIsUpdating(false);
      await handlePosts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="updatePost">
      <textarea
        value={textUpdate}
        onChange={(e) => setTextUpdate(e.target.value)}
      />
      <div onClick={resetPostInputs}>
        <RiDeleteBin6Fill />
        <input type="file" onChange={handlePicture} ref={fileRef} />
      </div>
      <div className="buttonContainer">
        <button className="btn" onClick={updateItem}>
          Valider les modifications
        </button>
      </div>
    </div>
  );
};

export default UpdatePost;
