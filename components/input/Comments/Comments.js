import {useState} from 'react';

import CommentList from '../CommentList/CommentList';
import NewCommentForm from '../NewCommentForm/NewCommentForm';
import styles from './Comments.module.css';

function Comments(props) {
    const {eventId} = props;

    const [showComments, setShowComments] = useState(false);

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    function addCommentHandler(commentData) {
        // send data to API
    }

    return (
        <section className={styles.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewCommentForm onAddComment={addCommentHandler}/>}
            {showComments && <CommentList/>}
        </section>
    );
}

export default Comments;
