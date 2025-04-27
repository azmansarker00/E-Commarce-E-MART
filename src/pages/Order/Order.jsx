import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Loader from '../../components/loader/Loader';

function Order() {
  const userid = JSON.parse(localStorage.getItem('user')).user.uid;
  const context = useContext(myContext);
  const { mode, loading, order, submitReview } = context;

  // Filter orders for current user
  const userOrders = order.filter(item => item.userid === userid);

  return (
    <Layout>
      <div className="p-4">
        {loading && <Loader />}
        {userOrders.length === 0 ? (
          <p className="text-center text-lg">No orders found!</p>
        ) : (
          userOrders.map((orderItem, idx) => (
            <div key={idx}>
              <h2 className="text-xl font-bold mb-4">
                Order Placed: {orderItem.date || "Unknown date"}
              </h2>

              {/* Now loop over cartItems */}
              {orderItem.cartItems && orderItem.cartItems.map((product, pIdx) => (
                <div
                  key={pIdx}
                  className={`rounded-lg shadow-md p-6 flex flex-col sm:flex-row sm:justify-between mb-6 ${
                    mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                  }`}
                >
                  <img src={product.imageUrl} alt={product.title} className="w-full sm:w-40 h-35 rounded-lg" />
                  <div className="sm:ml-4 flex flex-col justify-between mt-4 sm:mt-0 w-full">
                    <div>
                      <h2 className="text-lg font-bold">{product.title}</h2>
                      <p className="mt-1 text-sm">{product.description}</p>
                      <p className="mt-1 text-sm font-semibold">Price: {product.price}</p>
                    </div>

                    {/* Rating Section */}
                    <div className="mt-4">
                      <label className="block text-sm mb-2 font-semibold">Rate this product:</label>
                      <select
                        onChange={(e) => submitReview(product.id, parseInt(e.target.value))}
                        defaultValue=""
                        className="w-32 p-2 rounded-md border"
                      >
                        <option value="" disabled>Select Stars</option>
                        {[...Array(10)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} Star{i + 1 > 1 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}

export default Order;
