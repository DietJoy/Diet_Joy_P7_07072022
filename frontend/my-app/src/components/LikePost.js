// import React, { useState, useEffect } from 'react';
// import { UiwLikeO} from '../assets/likeIcone'
// import { like } from '../apiCalls';

// const LikePost = (props) => {

// const {post, userId} = props
// const [liked, setLiked] = useState(false);


// // useEffect((post) => { 
// //     handleLike(post._id)
// // }, 1 )


// // const handleLike = async () => {
    
// //         try{
// //             if (!liked) {
// //                 await setLiked
// //                 await like (post, userId)
// //             }
// //         }
// //         catch(err){
// //             console.log(err)
// //         }
// //     }

//     return (
//         <div onClick={handleLike} className="iconeLike">
//          <UiwLikeO /> 
//          <span>{post.userLiked.length}</span> 
//         </div>
//     );
// }

// export default LikePost;