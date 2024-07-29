import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Product, Comment } from '../utils/Pdt.types';
import {
    PdtApi,
    commentViewApi,
    commentAddApi,
    replyAddApi,
    commentDeleteApi,
    replyDeleteApi,
    rateProductApi,
    likeApi,
    unlikeApi
} from '../services/allApis';
import CommentSection from './CommentSection';
import StarRating from './StarRating';
import './ProductDetails.css';
import { ToastContainer, toast } from 'react-toastify';

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [userRating, setUserRating] = useState<number | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
    const userId = localStorage.getItem('currentId') ?? null;
    const userName = JSON.parse(localStorage.getItem("currentUser") ?? "{}")?.userName ?? 'guest';
    const token = localStorage.getItem('token');

    const reqHeader = useMemo(() => ({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }), [token]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productResponse = await PdtApi(reqHeader, id);
                if ('data' in productResponse && productResponse.data) {
                    const transformedProduct: Product = {
                        id: String(productResponse.data.id),
                        title: productResponse.data.title,
                        description: productResponse.data.description,
                        imageUrl: productResponse.data.image,
                        rating: productResponse.data.rating.rate,
                    };
                    setProduct(transformedProduct);
                } else {
                    console.error('No product data found in response.');
                }

                const commentsResponse = await commentViewApi(reqHeader, id);
                if ('data' in commentsResponse && commentsResponse.data) {
                    const transformedComments: Comment[] = commentsResponse.data.map((comment: any) => ({
                        id: String(comment._id),
                        productId: String(comment.productId),
                        content: comment.content,
                        userId: comment.userId,
                        userName: comment.userName,
                        likes: comment.likes ?? 0,
                        likedBy: comment.likedBy ?? [],
                        replies: comment.replies.map((reply: any) => ({
                            id: String(reply._id),
                            commentId: String(comment._id),
                            content: reply.content,
                            userId: reply.userId,
                            userName: reply.userName,
                            likes: reply.likes ?? 0,
                            likedBy: reply.likedBy ?? [],
                        })),
                    }));
                    setComments(transformedComments);
                } else {
                    console.error('No comments data found in response.');
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchData();
    }, [id, reqHeader]);

    const addComment = async (content: string) => {
        try {
            const newComment: Comment = {
                id: String(Date.now()),
                productId: String(id),
                content,
                userId: userId!,
                userName,
                likes: 0,
                likedBy: [],
                replies: []
            };
            setComments([...comments, newComment]);
            const result = await commentAddApi(reqHeader, { content }, id);

            if ('response' in result) {
                const err: string | any = result.response?.data;
                toast.info(err, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const addReply = async (commentId: string, content: string) => {
        try {
            const updatedComments = comments.map(comment =>
                comment.id === commentId
                    ? {
                        ...comment,
                        replies: [
                            ...comment.replies,
                            {
                                id: String(Date.now()),
                                commentId,
                                content,
                                userId: userId!,
                                userName,
                                likes: 0,
                                likedBy: []
                            }
                        ]
                    }
                    : comment
            );
            setComments(updatedComments);
            const result = await replyAddApi(reqHeader, { content }, commentId);
            if ('response' in result) {
                const err: string | any = result.response?.data;
                toast.info(err, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            console.error('Error adding reply:', error);
        }
    };

    const deleteComment = async (commentId: string) => {
        try {
            const updatedComments = comments.filter(comment => comment.id !== commentId);
            setComments(updatedComments);
            const result = await commentDeleteApi(reqHeader, commentId);
            if ('response' in result) {
                const err: string | any = result.response?.data;
               
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const deleteReply = async (commentId: string, replyId: string) => {
        try {
            const updatedComments = comments.map(comment =>
                comment.id === commentId
                    ? { ...comment, replies: comment.replies.filter(reply => reply.id !== replyId) }
                    : comment
            );
            setComments(updatedComments);
            const result = await replyDeleteApi(reqHeader, commentId, replyId);
            console.log(result)

           
        } catch (error) {
            console.error('Error deleting reply:', error);
        }
    };

    const handleRateProduct = async (rating: number) => {
        try {
            setUserRating(rating);
            const result = await rateProductApi(reqHeader, { rating }, id);
            if ('response' in result) {
                const err: string | any = result.response?.data;
                toast.info(err, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            console.error('Error rating product:', error);
        }
    };

    const handleLikeComment = async (commentId: string) => {
        try {
            const result = await likeApi(reqHeader, commentId, 'Comment');
            if (result.status === 200 && 'data' in result) {
                const updatedComment = result.data;
                const updatedComments = comments.map(comment =>
                    comment.id === commentId ? { ...comment, likes: updatedComment.likes, likedBy: updatedComment.likedBy } : comment
                );
                setComments(updatedComments);
            }
        } catch (err) {
            console.error('Failed to like comment:', err);
        }
    };

    const handleUnlikeComment = async (commentId: string) => {
        try {
            const result = await unlikeApi(reqHeader, commentId, 'Comment');
            if (result.status === 200 && 'data' in result) {
                const updatedComment = result.data;
                const updatedComments = comments.map(comment =>
                    comment.id === commentId ? { ...comment, likes: updatedComment.likes, likedBy: updatedComment.likedBy } : comment
                );
                setComments(updatedComments);
            }
        } catch (err) {
            console.error('Failed to unlike comment:', err);
        }
    };
    const handleLikeReply = async (commentId: string, replyId: string) => {
        try {
            const result = await likeApi(reqHeader, replyId, 'Reply');
            if (result.status === 200 && 'data' in result) {
                const updatedReply = result.data;
                const updatedComments = comments.map(comment =>
                    comment.id === commentId
                        ? {
                            ...comment,
                            replies: comment.replies.map(reply =>
                                reply.id === replyId ? { ...reply, likes: updatedReply.likes, likedBy: updatedReply.likedBy } : reply
                            )
                        }
                        : comment
                );
                setComments(updatedComments);
            }
        } catch (err) {
            console.error('Failed to like reply:', err);
        }
    };
    
    const handleUnlikeReply = async (commentId: string, replyId: string) => {
        try {
            const result = await unlikeApi(reqHeader, replyId, 'Reply');
            if (result.status === 200 && 'data' in result) {
                const updatedReply = result.data;
                const updatedComments = comments.map(comment =>
                    comment.id === commentId
                        ? {
                            ...comment,
                            replies: comment.replies.map(reply =>
                                reply.id === replyId ? { ...reply, likes: updatedReply.likes, likedBy: updatedReply.likedBy } : reply
                            )
                        }
                        : comment
                );
                setComments(updatedComments);
            }
        } catch (err) {
            console.error('Failed to unlike reply:', err);
        }
    };
    
    return (
        <div className="product-details">
            {product ? (
                <>
                    <h1 className="text-center">{product.title}</h1>
                    <div className="product-content">
                        <div className="product-info">
                            <img src={product.imageUrl} alt={product.title} className="product-image" />
                            <p>{product.description}</p>
                            <div className="rating">
                                <StarRating rating={product.rating} readOnly={true} />
                                <p>Rating: {product.rating.toFixed(2)}</p>
                            </div>
                        </div>
                        <CommentSection
                            comments={comments}
                            addComment={addComment}
                            addReply={addReply}
                            deleteComment={deleteComment}
                            deleteReply={deleteReply}
                            isLoggedIn={isLoggedIn}
                            userRating={userRating}
                            handleRateProduct={handleRateProduct}
                            handleLikeComment={handleLikeComment}
                            handleUnlikeComment={handleUnlikeComment}
                            handleLikeReply={handleLikeReply}
                            handleUnlikeReply={handleUnlikeReply}
                            currentUserId={userId}
                        />
                    </div>
                </>
            ) : (
                <p>Loading product details...</p>
            )}
            <ToastContainer />
        </div>
    );
};

export default ProductDetails;
