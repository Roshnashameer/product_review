import React, { useState } from 'react';
import { Comment } from '../utils/Pdt.types';
import StarRating from './StarRating';
import './CommentSection.css';

interface CommentSectionProps {
    comments: Comment[];
    addComment: (content: string) => void;
    addReply: (commentId: string, content: string) => void;
    deleteComment: (commentId: string) => void;
    deleteReply: (commentId: string, replyId: string) => void;
    isLoggedIn: boolean;
    userRating: number | null;
    handleRateProduct: (rating: number) => void;
    handleLikeComment: (commentId: string) => void;
    handleUnlikeComment: (commentId: string) => void;
    handleLikeReply: (commentId: string, replyId: string) => void;
    handleUnlikeReply: (commentId: string, replyId: string) => void;
    currentUserId: string | any;
}

const CommentSection: React.FC<CommentSectionProps> = ({
    comments,
    addComment,
    addReply,
    deleteComment,
    deleteReply,
    isLoggedIn,
    userRating,
    handleRateProduct,
    handleLikeComment,
    handleUnlikeComment,
    handleLikeReply,
    handleUnlikeReply,
    currentUserId
}) => {
    const [newComment, setNewComment] = useState('');
    const [replyInputs, setReplyInputs] = useState<{ [key: string]: string }>({});

    const handleAddComment = () => {
        if (newComment.trim() !== '') {
            addComment(newComment);
            setNewComment('');
        }
    };

    const handleAddReply = (commentId: string) => {
        const replyContent = replyInputs[commentId];
        if (replyContent && replyContent.trim() !== '') {
            addReply(commentId, replyContent);
            setReplyInputs({ ...replyInputs, [commentId]: '' });
        }
    };

    const handleReplyInputChange = (commentId: string, value: string) => {
        setReplyInputs({ ...replyInputs, [commentId]: value });
    };

    const handleDeleteComment = (commentId: string) => {
        deleteComment(commentId);
    };


    return (
        <div className="comment-section">
            <div className="rating-section">
                {userRating !== null ? (
                    <div className="container-flex user-rating">
                        <h5 className="text-secondary-emphasis">Your Rating is {userRating} Stars</h5>
                        <StarRating rating={userRating} readOnly={true} />
                    </div>
                ) : (
                    <div className="container-flex">
                        <h5 className="text-secondary-emphasis">Rate this product</h5>
                        <StarRating rating={userRating} onRatingChange={handleRateProduct} />
                    </div>
                )}
                <br />
            </div>
            <div className="comment-input-group">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add Your Comments"
                    className="form-control"
                />
                <button
                    className="btn btn-secondary"
                    onClick={handleAddComment}
                    disabled={newComment.trim() === ''}
                >
                    Comment
                </button>
            </div>
            <h5 className="mt-3">Comments<i className="fa-solid fa-message mx-2"></i></h5>
            <div className="comment-list">
                {comments.map((comment) => (
                    <div key={comment.id} className="comment-box mb-3">
                        <div className="comment-content">
                            <div className="comment-header">
                                <i className="fa-regular fa-user"></i>
                                <small style={{ marginLeft: '8px' }}>{comment.userName}</small>
                            </div>
                            <p>{comment.content}</p>
                            <div className="comment-actions">
                                {isLoggedIn && (
                                    <>
                                        <span className="comment-likes">{comment.likes}</span>
                                        {currentUserId === comment.userId ? (
                                            <>
                                                <i className="fa-solid fa-thumbs-up"></i>
                                                <i className="fa-solid fa-trash ml-auto" onClick={() => handleDeleteComment(comment.id)}></i>
                                            </>
                                        ) : (
                                            <>
                                                {comment.likedBy.includes(currentUserId) ? (
                                                    <i className="fa-regular fa-thumbs-down" onClick={() => handleUnlikeComment(comment.id)}></i>
                                                ) : (
                                                    <i className="fa-regular fa-thumbs-up" onClick={() => handleLikeComment(comment.id)}></i>
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                        {comment.replies.map((reply) => (
                            <div key={reply.id} className="reply-box">
                                <div className="reply-header">
                                    <i className="fa-regular fa-user"></i>
                                    <small style={{ marginLeft: '8px' }}>{reply.userName}</small>
                                </div>
                                <p>
                                    {reply.content}
                                </p>
                               <div className='reply-actions'>
                                    {isLoggedIn && (
                                        <>
                                            <span className="reply-likes">{reply.likes}</span>
                                            {currentUserId === reply.userId ? (
                                                <>
                                                     <i className="fa-solid fa-thumbs-up"></i>
                                                    <i className="fa fa-trash ml-auto" onClick={() => deleteReply(comment.id, reply.id)}></i>
                                                </>
                                            ) : (
                                                <>
                                                    {reply.likedBy.includes(currentUserId) ? (
                                                        <i className="fa-regular fa-thumbs-down" onClick={() => handleUnlikeReply(comment.id, reply.id)}></i>
                                                    ) : (
                                                        <i className="fa-regular fa-thumbs-up" onClick={() => handleLikeReply(comment.id, reply.id)}></i>
                                                    )}
                                                </>
                                            )}
                                        </>
                                    )}
    
                               </div>
                            </div>
                        ))}
                        <div className="reply-input-group mb-3">
                            <input
                                type="text"
                                value={replyInputs[comment.id] || ''}
                                onChange={(e) => handleReplyInputChange(comment.id, e.target.value)}
                                placeholder="Reply to this comment"
                                className="form-control"
                            />
                            <button
                                className="btn btn-secondary"
                                onClick={() => handleAddReply(comment.id)}
                                disabled={!replyInputs[comment.id] || replyInputs[comment.id].trim() === ''}
                            >
                                Reply
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
