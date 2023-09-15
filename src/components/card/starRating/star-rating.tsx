import React from 'react';
import {Star} from '../star/star'
import css from './star-rating.module.scss'

type StarRatingProps = {
    totalStars: number;
    selectedStars: number;
    onRate: (rating: number) => void;
};

export const StarRating: React.FC<StarRatingProps> = ({ totalStars, selectedStars, onRate }) => (
    <div className={css['star-rating']}>
        {[...Array(totalStars)].map((_, i) => (
            <Star
                key={i}
                selected={i < selectedStars}
                onSelect={() => onRate(i + 1)}
            />
        ))}
        <p>{selectedStars}</p>
    </div>
);
