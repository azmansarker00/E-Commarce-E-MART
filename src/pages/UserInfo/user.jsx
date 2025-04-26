import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userRef = doc(fireDB, "usersInfo", id);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUser(userSnap.data());
      } else {
        console.log("No such user!");
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-4xl">
        <div className="flex flex-col items-center">
          {/* Profile Picture */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-400 shadow-lg mb-6">
            <img
              src={user.logo}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Name */}
          <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Details Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <DetailItem label="Phone" value={user.number} />
          <DetailItem label="Country" value={user.country} />
          <DetailItem label="Address" value={user.address} />
          <DetailItem label="Hashed Password" value={user.hashedPasword} />
          <DetailItem label="Id" value={user.id} />
          <DetailItem label="Uid" value={user.uid} />

          {user.createdAt && (
            <DetailItem
              label="Account Created"
              value={user.time.toDate().toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Small Component for Detail Item
const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <p className="text-lg font-semibold text-gray-800 break-words">{value}</p>
  </div>
);

export default UserDetails;
