import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Modal from '../../components/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';

function Cart() {
  const context = useContext(myContext);
  const { mode } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success('Deleted cart item');
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const temp = cartItems.reduce((acc, cartItem) => acc + parseInt(cartItem.price), 0);
    setTotalAmount(temp);
  }, [cartItems]);

  const shipping = 120;
  const grandTotal = shipping + totalAmount;

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const buyNow = async () => {
    if (!name || !address || !pincode || !phoneNumber) {
      return toast.error('All fields are required', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }

    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
    };

    const orderInfo = {
      cartItems,
      addressInfo,
      paymentId: Math.floor(Math.random() * 1000000),
      date: new Date().toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
      email: JSON.parse(localStorage.getItem('user')).user.email,
      userid: JSON.parse(localStorage.getItem('user')).user.uid,
      status: 'Pending',
    };

    try {
      const orderRef = collection(fireDB, 'order');
      await addDoc(orderRef, orderInfo);

      toast.success('Order placed successfully!', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });

      // Optional: Clear cart after order
      cartItems.forEach((item) => {
        dispatch(deleteFromCart(item));
      });

    } catch (error) {
      console.error('Order Error:', error);
      toast.error('Something went wrong! Please try again.');
    }
  };

  return (
    <Layout>
      <div
        className={`h-screen pt-5 mb-[60%] transition-all ${
          mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100'
        }`}
      >
        <h1 className="mb-10 text-center text-3xl font-semibold">Cart Items</h1>
        <div className="mx-auto max-w-7xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3 space-y-6">
            {cartItems.map((item, index) => {
              const { title, price, description, imageUrl } = item;
              return (
                <div
                  key={index}
                  className={`flex items-center justify-between rounded-lg border bg-white p-6 shadow-xl hover:shadow-2xl transition-all ${
                    mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'
                  }`}
                >
                  <img
                    src={imageUrl}
                    alt="product-image"
                    className="w-full sm:w-32 h-auto rounded-lg"
                  />
                  <div className="sm:ml-6 flex flex-col sm:space-y-3">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <p className="text-sm text-gray-500">{description}</p>
                    <p className="mt-2 text-xl font-bold">{price} TK</p>
                  </div>
                  <button
                    onClick={() => deleteCart(item)}
                    className="ml-6 text-red-600 hover:text-red-800 focus:outline-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>

          <div
            className={`mt-6 rounded-lg p-6 shadow-md md:w-1/3 ${
              mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'
            }`}
          >
            <div className="mb-4 flex justify-between">
              <p className="text-lg font-semibold">Subtotal</p>
              <p className="text-lg font-semibold">{totalAmount} TK</p>
            </div>
            <div className="flex justify-between mb-4">
              <p className="text-lg font-semibold">Shipping</p>
              <p className="text-lg font-semibold">{shipping} TK</p>
            </div>
            <hr className="my-4 border-gray-300" />
            <div className="flex justify-between mb-6">
              <p className="text-xl font-bold">Total</p>
              <p className="text-xl font-bold">{grandTotal} TK</p>
            </div>
            <Modal
              name={name}
              address={address}
              pincode={pincode}
              phoneNumber={phoneNumber}
              setName={setName}
              setAddress={setAddress}
              setPincode={setPincode}
              setPhoneNumber={setPhoneNumber}
              buyNow={buyNow}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
