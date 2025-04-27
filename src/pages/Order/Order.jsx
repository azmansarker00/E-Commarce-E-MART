import React, { useContext, useState } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Loader from '../../components/loader/Loader';
import { updateDoc, doc } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import { toast } from 'react-toastify';

function Order() {
  const userid = JSON.parse(localStorage.getItem('user')).user.uid;
  const context = useContext(myContext);
  const { mode, loading, order } = context;

  // State for holding review and rating
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const handleReview = async (item) => {
    if (rating === 0) {
      toast.error('Please select a star rating');
      return;
    }

    if (!reviewText) {
      toast.error('Please write a review');
      return;
    }

    try {
      const productRef = doc(fireDB, 'products', item.id);
      await updateDoc(productRef, {
        reviews: [
          ...(item.reviews || []),
          {
            userId: userid,
            reviewText: reviewText,
            rating: rating, // Store the rating as well
          },
        ],
      });
      toast.success('Review added successfully!');
      setRating(0);
      setReviewText('');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add review');
    }
  };

  return (
    <Layout>
      {loading && <Loader />}
      {order.length > 0 ? (
        <div className="h-full pt-10">
          {order
            .filter((obj) => obj.userid === userid)
            .map((order, index) => (
              <div key={index} className="mx-auto max-w-5xl px-6 space-y-6">
                {order.cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    className={`rounded-lg shadow-md p-6 flex flex-col sm:flex-row sm:justify-between ${
                      mode === 'dark'
                        ? 'bg-gray-800 text-white'
                        : 'bg-white text-gray-900'
                    }`}
                  >
                    <img
                      src={item.imageUrl}
                      alt="product"
                      className="w-full sm:w-40 h-35 rounded-lg"
                    />
                    <div className="sm:ml-4 flex flex-col justify-between mt-4 sm:mt-0">
                      <div>
                        <h2 className="text-lg font-bold">{item.title}</h2>
                        <p className="mt-1 text-sm">{item.description}</p>
                        <p className="mt-1 text-sm font-semibold">
                          Price: {item.price}
                        </p>

                        {/* Star Rating */}
                        <div className="mt-2 flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              onClick={() => setRating(star)}
                              xmlns="http://www.w3.org/2000/svg"
                              fill={star <= rating ? 'orange' : 'gray'}
                              viewBox="0 0 24 24"
                              className="w-6 h-6 cursor-pointer"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>

                        {/* Review Input */}
                        <textarea
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          placeholder="Write your review here..."
                          className="mt-2 p-2 border border-gray-300 rounded w-full"
                        />

                        {/* Review Button */}
                        <button
                          onClick={() => handleReview(item)}
                          className="mt-4 text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded"
                        >
                          Add Review
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      ) : (
        <h2 className="text-center text-3xl text-dark mt-10">No Orders Found</h2>
      )}
    </Layout>
  );
}

export default Order;
