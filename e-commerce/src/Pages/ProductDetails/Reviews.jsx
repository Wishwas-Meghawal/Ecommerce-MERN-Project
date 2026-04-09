import { Button, Rating, TextField, Skeleton, CircularProgress } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { MyContext } from "../../App";
import { fetchDataFromApi, postData } from "../../utils/api";

const Reviews = ({ productId, setReviewsCount }) => {
  const context = useContext(MyContext);

  const [form, setForm] = useState({
    image: "",
    userName: "",
    review: "",
    rating: 1,
    userId: "",
    productId: "",
  });

  const [reviewsData, setReviewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      image: context?.userData?.avatar,
      userName: context?.userData?.name,
      userId: context?.userData?._id,
      productId,
    }));

    getReviews();
  }, [context?.userData, productId]);

  const getReviews = async () => {
    setLoading(true);
    const res = await fetchDataFromApi(
      `/api/user/getReviews?productId=${productId}`,
    );

    if (res?.error === false) {
      setReviewsData(res.reviews);
      setReviewsCount(res.reviews.length);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.review) {
      return context?.alertBox("Review cannot be empty", "error");
    }

    setSubmitting(true);

    const res = await postData("/api/user/addReview", form);

    if (res?.error === false) {
      context?.alertBox(res.message, "success");
      setForm((prev) => ({ ...prev, review: "", rating: 1 }));
      getReviews();
    } else {
      context?.alertBox(res.message, "error");
    }

    setSubmitting(false);
  };

  return (
    <div className="mt-10 p-8 rounded-2xl bg-white/60 backdrop-blur-md shadow-xl border border-gray-200 hover:shadow-2xl transition-all">
      {/* HEADER */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Customer Reviews
      </h2>

      {/* LOADING SKELETON */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="rounded" height={80} />
          ))}
        </div>
      ) : reviewsData.length === 0 ? (
        /* EMPTY STATE */
        <div className="text-center py-10 text-gray-500">
          <p className="text-lg">No reviews yet 😔</p>
          <p className="text-sm">Be the first to review this product</p>
        </div>
      ) : (
        /* REVIEW LIST */
        <div className="max-h-[400px] overflow-y-auto space-y-4 pr-2 custom-scroll">
          {reviewsData.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-all border border-gray-100"
            >
              <img
                src={item.image}
                alt="user"
                className="w-12 h-12 rounded-full object-cover shadow"
              />

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-800">
                    {item.userName}
                  </h4>
                  <span className="text-xs text-gray-400">
                    <Rating
                      value={item.rating}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                  </span>
                </div>

                <span className="text-xs text-gray-400">
                  {item.createdAt?.split("T")[0]}
                </span>

                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  {item.review}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FORM */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">Write a Review</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* RATING */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Your Rating:</span>
            <Rating
              value={form.rating}
              precision={0.5}
              onChange={(e, val) =>
                setForm((prev) => ({ ...prev, rating: val }))
              }
            />
          </div>

          {/* TEXTFIELD */}
          <TextField
            placeholder="Write your review here..."
            multiline
            rows={4}
            fullWidth
            value={form.review}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, review: e.target.value }))
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                fontSize: "14px",
                transition: "0.3s",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#e5e7eb",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#6366f1",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#6366f1",
              },
            }}
          />

          {/* BUTTON */}
          <Button
            type="submit"
            disabled={submitting}
            variant="contained"
            size="medium"
            sx={{
              mt: 2, // 🔥 spacing from TextField (important)
              borderRadius: "8px", // normal ecom style
              fontSize: "14px",
              fontWeight: 600,
              px: 3,
              py: 1,
              background: "#ff5252", // same as your theme
              textTransform: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",

              "&:hover": {
                background: "#e04848",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              },

              "&:active": {
                transform: "scale(0.98)",
              },
            }}
            startIcon={
              submitting ? (
                <CircularProgress size={16} sx={{ color: "#fff" }} />
              ) : null
            }
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
