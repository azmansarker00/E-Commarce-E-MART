import React, { useContext } from 'react'
import myContext from '../../context/data/myContext'
import Layout from '../../components/layout/Layout'
import Loader from '../../components/loader/Loader'

function Order() {
  const userid = JSON.parse(localStorage.getItem('user')).user.uid
  const context = useContext(myContext)
  const { mode, loading, order } = context

  return (
    <Layout>
      {loading && <Loader />}
      {order.length > 0 ? (
        <div className="h-full pt-10">
          {
            order.filter(obj => obj.userid === userid).map((order, index) => (
              <div key={index} className="mx-auto max-w-5xl px-6 space-y-6">
                {
                  order.cartItems.map((item, idx) => (
                    <div key={idx} className={`rounded-lg shadow-md p-6 flex flex-col sm:flex-row sm:justify-between ${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                      <img src={item.imageUrl} alt="product" className="w-full sm:w-40 h-35 rounded-lg" />
                      <div className="sm:ml-4 flex flex-col justify-between mt-4 sm:mt-0">
                        <div>
                          <h2 className="text-lg font-bold">{item.title}</h2>
                          <p className="mt-1 text-sm">{item.description}</p>
                          <p className="mt-1 text-sm font-semibold">Price: {item.price}</p>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            ))
          }
        </div>
      ) : (
        <h2 className="text-center text-2xl text-white mt-10">No Orders Found</h2>
      )}
    </Layout>
  )
}

export default Order
