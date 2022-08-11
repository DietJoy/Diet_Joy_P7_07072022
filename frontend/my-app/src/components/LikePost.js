import React, { useState, useEffect } from 'react';
import { UiwLikeO} from '../assets/likeIcone'
import { like } from '../apiCalls';

const LikePost = (props) => {

const {post, handlePosts} = props

    const [nextVoteValue, setNextVoteValue] = useState(null) // pour gérer la vlauer du prochain like
    const [hasUserLiked, setHasUserLiked] = useState(null) // pour gérer la couleur du like
    useEffect(() =>{
        console.log({post})
        const userId = localStorage.getItem("userId") // récupération de l'userId du localStorage
        const hasLiked = post.usersLiked.includes(userId) // On regarde si notre userId est présent dans le tableau usersLiked du post
        setHasUserLiked(hasLiked)
        hasLiked === true  
            ? setNextVoteValue(0) // si hasLiked est true (c'est qu'il a déjà voté) donc sont prochain vote sur ce post sera a Zero
            : setNextVoteValue(1) // si hasLiked est false (c'est qu'il a pas encore voté) donc sont prochain vote sur ce post sera a 1
    }, [post])

const handleLike = async () => {
        try{
            await like(post._id, nextVoteValue)
            await handlePosts()
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <div onClick={handleLike}>
         <UiwLikeO hasUserLiked={hasUserLiked} /> 
         <span>{post.likes}</span> 
        </div>
    );
}

export default LikePost;