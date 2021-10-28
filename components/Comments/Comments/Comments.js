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
    const {showNotification, hideNotification} = notificationContext;

    const [showComments, setShowComments] = useState(false);
    const [commentsState, setCommentsState] = useState([]);
    const [isAddingState, setIsAddingState] = useState(false);

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    async function addCommentHandler(commentData) {
        // Performs a request to the API Route:
        setIsAddingState(true);
        showNotification({title: 'Storing!', message: 'Adding the comment...', status: 'pending'});
        const response = await fetch(`${commentCreateRoute}`, {
            method: 'POST',
            body: JSON.stringify(commentData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseData = await response.json();
        const {message} = responseData;
        // console.log('Comments -> addCommentHandler -> responseData = ', responseData);
        await setIsAddingState(false);

        if (!response.ok) {
            showNotification({title: 'OOPS!', message: message, status: 'error'});
            return;
        }

        const {name} = responseData.comment;
        showNotification({title: `Success ${name}!`, message: message, status: 'success'});
    }

    const getCommentsPerEventHandler = useCallback(async (eventId) => {
        // Performs a request to the API Route:
        const response = await fetch(`${perEventIndexRoute(eventId)}`);
        const responseData = await response.json();
        return responseData.comments;
    }, [])

    useEffect(() => {
        getCommentsPerEventHandler(eventId).then(response => {
            setCommentsState(response);
        });
    }, [getCommentsPerEventHandler, eventId, showComments, isAddingState])

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
