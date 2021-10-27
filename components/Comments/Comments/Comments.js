import styles from './Comments.module.css';
import {useCallback, useContext, useEffect, useState} from 'react';
import generateRoutes from "../../../tools/generateRoutes";

import CommentList from '../CommentList/CommentList';
import NewCommentForm from '../NewCommentForm/NewCommentForm';
import {NotificationContext} from "../../../store/notificationContext";

function Comments(props) {
    const {eventId} = props;
    const routes = generateRoutes();
    const {createPath: commentCreateRoute, perEventIndexPath: perEventIndexRoute} = routes.comments.api;
    const notificationContext = useContext(NotificationContext);
    const {showModification, hideModification} = notificationContext;

    const [showComments, setShowComments] = useState(false);
    const [commentsState, setCommentsState] = useState([]);
    const [isAddingState, setIsAddingState] = useState(false);

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    async function addCommentHandler(commentData) {
        // sends the data to API
        setIsAddingState(true);
        showModification({title: 'In course', message: 'Adding the comment', status: 'pending'});
        const response = await fetch(`${commentCreateRoute}`, {
            method: 'POST',
            body: JSON.stringify(commentData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseData = await response.json();
        console.log('Comments -> addCommentHandler -> responseData = ', responseData);
        setIsAddingState(false);
        // showModification({title: 'In course', message: 'Adding the comment', status: 'pending'});
        hideModification();

    }

    const getCommentsPerEventHandler = useCallback(async (eventId) => {
        // send data to API
        const response = await fetch(`${perEventIndexRoute(eventId)}`);
        const responseData = await response.json();
        return responseData.comments;
    }, [])

    useEffect(() => {
        getCommentsPerEventHandler(eventId).then(response => {
            setCommentsState(response);
        });
    }, [getCommentsPerEventHandler, eventId, isAddingState])

    return (
        <section className={styles.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewCommentForm eventId={eventId} onAddComment={addCommentHandler}/>}
            {showComments && <CommentList comments={commentsState}/>}
        </section>
    );
}

export default Comments;
