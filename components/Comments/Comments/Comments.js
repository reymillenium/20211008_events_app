import styles from './Comments.module.css';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import generateRoutes from "../../../tools/generateRoutes";
import Example from "../../ui/WaveLoading/WaveLoading";

import CommentList from '../CommentList/CommentList';
import NewCommentForm from '../NewCommentForm/NewCommentForm';
import {NotificationContext} from "../../../store/notificationContext";
import ReactLoading from 'react-loading';

function Comments(props) {
    const {eventId} = props;
    const routes = generateRoutes();
    const {createPath: commentCreateRoute, perEventIndexPath: perEventIndexRoute} = routes.comments.api;
    const notificationContext = useContext(NotificationContext);
    const {showNotification, hideNotification} = notificationContext;

    const [showComments, setShowComments] = useState(false);
    const [commentsState, setCommentsState] = useState([]);
    const [isAddingState, setIsAddingState] = useState(false);
    const [isLoadingCommentsState, setIsLoadingComments] = useState(false);

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
        setIsLoadingComments(true);
        const response = await fetch(`${perEventIndexRoute(eventId)}`);
        const responseData = await response.json();
        setIsLoadingComments(false);
        return responseData.comments;
    }, [])

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
            {/*<Example type={'bars'} color={'black'}/>*/}
            <div className={styles.centered}>

                {showComments && isLoadingCommentsState && <ReactLoading type={'bars'} color={'black'} height={10} width={40}/>}
                {/*{showComments && isLoadingCommentsState && <ReactLoading type={'spinningBubbles'} color={'black'} height={10} width={40}/>}*/}
                {/*{showComments && isLoadingCommentsState && <ReactLoading type={'spokes'} color={'black'} height={10} width={40}/>}*/}
            </div>
            {showComments && !isLoadingCommentsState && <CommentList comments={commentsState}/>}
        </section>
    );
}

export default Comments;
