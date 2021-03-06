import React, { useEffect, useState } from "react";
import "./_comments.scss";
import Comment from "../comment/Comment"
import { useDispatch, useSelector } from "react-redux";

import { addComment, getCommentsOfVideoById } from '../../redux/actions/comments.action'

const Comments = ({videoId}) => {

  const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getCommentsOfVideoById(videoId))
    },[dispatch,videoId]);

    const comments = useSelector(state => state.commentList.comments)

    const _comments = comments?.map( comment => comment.snippet.topLevelComment.snippet)

    const [text,setText] = useState('')

    const handleComment = (e) => {
      e.preventDefault();
      if(text.length === 0)
        return
      dispatch(addComment(videoId,text))
      setText('')
    }

  return (
    <div className="comments">
      <div className="comments__form d-flex w-100 my-2">
        <img
          src={user?.photoURL} alt={user?.name}
          className="rounded-circle me-3"
        />

        <form onSubmit={handleComment} className="d-flex flex-grow-1">
            <input type="text" className="flex-grow-1 p-2" placeholder="Write a comment..."
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <button className="border-0 p-2">Comment</button>
        </form>
      </div>

       <div className="comments__list">
           {
               _comments?.map((comment,index) =>(
                 <Comment comment={comment} key={index} />
               ))
           }
       </div>
    </div>
  );
};

export default Comments;
