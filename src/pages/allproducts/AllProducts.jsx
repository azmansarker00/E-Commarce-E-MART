import React, { useContext, useEffect } from "react";
import myContext from "../../context/data/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import Filter from "../../components/filter/Filter";
import Layout from "../../components/layout/Layout";

function ProductCard() {
  const context = useContext(myContext);
  const {
    mode,
    product,
    searchkey,
    setSearchkey,
    filterType,
    setFilterType,
    filterPrice,
    setFilterPrice,
  } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Add to cart", {
      position: "top-center",
    });
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <Filter />
        <div className="container px-5 py-8 md:py-16 mx-auto">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
            <h1
              className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Our Latest Collection
            </h1>
            <div className="h-1 w-20 bg-orange-400 rounded"></div>
          </div>

          <div className="flex flex-wrap -m-4">
            {product
              .filter((obj) =>
                obj.title.toLowerCase().includes(searchkey.toLowerCase())
              )
              .filter((obj) =>
                obj.category.toLowerCase().includes(filterType.toLowerCase())
              )
              .filter((obj) => {
                if (filterPrice) {
                  const priceRange = filterPrice.split("-");
                  const minPrice = parseInt(priceRange[0]);
                  const maxPrice =
                    priceRange[1] === "+" ? Infinity : parseInt(priceRange[1]);

                  return obj.price >= minPrice && obj.price <= maxPrice;
                }
                return true;
              })
              .sort((a, b) => {
                if (a.price && b.price) {
                  if (filterPrice === "htl") {
                    return b.price - a.price;
                  } else if (filterPrice === "lth") {
                    return a.price - b.price;
                  }
                }
                return 0;
              })
              .map((item, index) => {
                const {
                  title,
                  price,
                  imageUrl,
                  id,
                  rating = 0,
                  totalRatings = 0,
                } = item;
                return (
                  <div key={index} className="p-4 md:w-1/4 drop-shadow-lg">
                    <div
                      className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                      style={{
                        backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                        color: mode === "dark" ? "white" : "",
                      }}
                    >
                      <div
                        onClick={() =>
                          (window.location.href = `/productinfo/${id}`)
                        }
                        className="flex justify-center cursor-pointer"
                      >
                        <img
                          className="rounded-2xl w-full h-86 p-3 hover:scale-110 transition-transform duration-300 ease-in-out"
                          src={imageUrl}
                          alt="product"
                        />
                      </div>
                      <div className="p-5 border-t-2">
                        <h2
                          className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          E- MART
                        </h2>
                        <h1
                          className="title-font text-lg hideExtra font-medium text-gray-900 mb-3"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          {title}
                        </h1>
                        <p
                          className="leading-relaxed mb-3 font-bold"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          {price} TK
                        </p>

                        {/* Product Rating */}
                        <div className="flex items-center mb-3">
                          {Array.from({ length: 5 }).map((_, idx) => {
                            const ratingValue = idx + 1;
                            return (
                              <svg
                                key={idx}
                                xmlns="http://www.w3.org/2000/svg"
                                fill={
                                  ratingValue <= Math.round(rating)
                                    ? "currentColor"
                                    : "none"
                                }
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="w-5 h-5 text-orange-400"
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            );
                          })}
                          <span
                            className="text-gray-600 ml-2"
                            style={{ color: mode === "dark" ? "white" : "" }}
                          >
                            ({totalRatings} Reviews)
                          </span>
                        </div>

                        <div className=" flex justify-center">
                          <button
                            type="button"
                            onClick={() => addCart(item)}
                            className="focus:outline-none text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full cursor py-2"
                          >
                            Add To Cart
                          </button>
                        </div>
                        {/* Add More button */}
                        <div className="flex justify-center mt-2">
                          <button
                            onClick={() =>
                              (window.location.href = `/productinfo/${id}`)
                            }
                            className="focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full cursor py-2"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default ProductCard;
