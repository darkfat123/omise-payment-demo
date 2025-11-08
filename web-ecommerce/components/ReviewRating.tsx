import React from "react";

type ReviewRatingProps = {
    rating: number;
};

function ReviewRating({ rating }: ReviewRatingProps) {
    return <div className="flex space-x-1">
        <svg className="w-5 h-5 text-yellow-400 inline-block" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.947a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.947c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.285-3.947a1 1 0 00-.364-1.118L2.044 9.374c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.951-.69l1.303-3.947z" />
        </svg><span className="ml-0.5">{rating}</span></div>;
};

export default ReviewRating;
