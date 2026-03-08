import React, { useState } from "react";
import { Rating, TextField, Button } from "@mui/material";
import { FaUserCircle } from "react-icons/fa";

const ProductReview = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const reviews = [
    {
      name: "Rahul Sharma",
      rating: 5,
      comment: "Quality bahut achi hai, fitting perfect 🔥",
    },
    {
      name: "Aman Verma",
      rating: 4,
      comment: "Material achha hai but delivery thodi late thi.",
    },
  ];

  return (
    <div className="mt-10 border-t pt-8">

      {/* TITLE */}
      <h2 className="text-xl font-semibold mb-6">Customer Reviews</h2>

      {/* EXISTING REVIEWS */}
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="flex gap-4">
            <FaUserCircle className="text-4xl text-gray-400" />

            <div>
              <h4 className="font-semibold">{review.name}</h4>

              <Rating
                value={review.rating}
                readOnly
                size="small"
                className="mb-1"
              />

              <p className="text-gray-600 text-sm">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ADD REVIEW */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">Write a Review</h3>

        {/* STAR SELECT */}
        <div className="mb-4">
          <p className="text-sm mb-1">Your Rating</p>
          <Rating
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
          />
        </div>

        {/* COMMENT */}
        <TextField
          label="Your Review"
          multiline
          rows={4}
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* SUBMIT */}
        <Button
          variant="contained"
          color="error"
          className="mt-4"
        >
          Submit Review
        </Button>
      </div>

    </div>
  );
};

export default ProductReview;
