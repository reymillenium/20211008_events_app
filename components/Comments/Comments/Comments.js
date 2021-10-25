import styles from './Comments.module.css';
import {useState} from 'react';
import generateRoutes from "../../../tools/generateRoutes";

import CommentList from '../CommentList/CommentList';
import NewCommentForm from '../NewCommentForm/NewCommentForm';

function Comments(props) {
    const {eventId} = props;
    const routes = generateRoutes();
    const commentCreateRoute = routes.comments.api.createPath;

    const [showComments, setShowComments] = useState(false);

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    async function addCommentHandler(commentData) {

        // send data to API
        const response = await fetch(`${commentCreateRoute}`, {
            method: 'POST',
            body: JSON.stringify(commentData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // const responseData = await response.json();
        // await router.replace(`${meetupsIndexPath}`);
    }

    return (
        <section className={styles.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewCommentForm eventId={eventId} onAddComment={addCommentHandler}/>}
            {showComments && <CommentList eventId={eventId}/>}
        </section>
    );
}

export default Comments;
