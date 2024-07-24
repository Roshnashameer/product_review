import React from 'react';
import './StarRating.css';

interface StarRatingProps {
    rating: number | null;
    onRatingChange?: (rating: number) => void;
    readOnly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, readOnly = false }) => {
    const handleRatingChange = (newRating: number) => {
        if (!readOnly && onRatingChange) {
            onRatingChange(newRating);
        }
    };

    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={`star ${rating !== null && rating >= star ? 'filled' : ''}`}
                    onClick={() => handleRatingChange(star)}
                    style={{ cursor: readOnly ? 'default' : 'pointer' }}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default StarRating;
