import styles from './Comments.module.css';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import generateRoutes from "../../../tools/generateRoutes";
import LoadingIndicator from "../../ui/LoadingIndicator/LoadingIndicator";

import CommentList from '../CommentList/CommentList';
import NewCommentForm from '../NewCommentForm/NewCommentForm';
import {NotificationContext} from "../../../store/notificationContext";

function Comments(props) {
    const {eventId} = props;
    const routes = generateRoutes();
    const {createPath: commentCreateRoute, perEventIndexPath: perEventIndexRoute} = routes.comments.api;
    const commentsPerEventIndexRoute = perEventIndexRoute(eventId);
    const notificationContext = useContext(NotificationContext);
    const {showNotification} = notificationContext;

    const [showComments, setShowComments] = useState(false);
    const [commentsState, setCommentsState] = useState([]);
    const [isAddingState, setIsAddingState] = useState(false);
    const [isFetchingComments, setIsFetchingComments] = useState(false);

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
            showNotification({title: 'Error!', message: message, status: 'error'});
            return;
        }

        const {name} = responseData.comment;
        showNotification({title: `Success ${name}!`, message: message, status: 'success'});
    }

    const getCommentsPerEventHandler = useCallback(async (eventId) => {
        // Performs a request to the API Route:
        setIsFetchingComments(true);
        const response = await fetch(`${commentsPerEventIndexRoute}`);
        const responseData = await response.json();
        setIsFetchingComments(false);
        return responseData.comments;
    }, [commentsPerEventIndexRoute])

    useEffect(() => {
        if (showComments) {
            getCommentsPerEventHandler(eventId).then(response => {
                setCommentsState(response);
            });
        }
    }, [getCommentsPerEventHandler, eventId, showComments, isAddingState])

    return (
        <section className={styles.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewCommentForm eventId={eventId} onAddComment={addCommentHandler}/>}
            <div className={styles.centered}>
                {showComments && isFetchingComments && <LoadingIndicator type={'bars'}/>}
            </div>
            {showComments && !isFetchingComments && <CommentList comments={commentsState}/>}
        </section>
    );
}

export default Comments;
