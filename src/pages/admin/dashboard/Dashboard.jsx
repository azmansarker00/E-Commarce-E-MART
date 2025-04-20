import React, { useContext } from "react";
import { FaBoxOpen, FaShoppingCart, FaUsers } from "react-icons/fa";
import myContext from "../../../context/data/myContext";
import Layout from "../../../components/layout/Layout";
import DashboardTab from "./DashboardTab";

function Dashboard() {
  const context = useContext(myContext);
  const { mode, user, order, product } = context;

  return (
    <Layout>
      <section className="mt-12 mb-10 px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className={`rounded-2xl p-6 shadow-xl flex flex-col items-center border ${mode === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
            <FaBoxOpen size={50} className="text-purple-500 mb-4" />
            <h2 className={`text-4xl font-bold mb-2 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>{product.length}</h2>
            <p className={`font-semibold tracking-wide ${mode === "dark" ? "text-purple-400" : "text-purple-600"}`}>Total Products</p>
          </div>

          <div className={`rounded-2xl p-6 shadow-xl flex flex-col items-center border ${mode === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
            <FaShoppingCart size={50} className="text-purple-500 mb-4" />
            <h2 className={`text-4xl font-bold mb-2 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>{order.length}</h2>
            <p className={`font-semibold tracking-wide ${mode === "dark" ? "text-purple-400" : "text-purple-600"}`}>Total Orders</p>
          </div>

          <div className={`rounded-2xl p-6 shadow-xl flex flex-col items-center border ${mode === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
            <FaUsers size={50} className="text-purple-500 mb-4" />
            <h2 className={`text-4xl font-bold mb-2 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>{user.length}</h2>
            <p className={`font-semibold tracking-wide ${mode === "dark" ? "text-purple-400" : "text-purple-600"}`}>Total Users</p>
          </div>
        </div>

        <div className="mt-12">
          <DashboardTab />
        </div>
      </section>
    </Layout>
  );
}

export default Dashboard;