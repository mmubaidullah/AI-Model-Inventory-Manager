import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import PurchaseModelTableRow from "../components/PurchaseModelTableRow";
import PurchaseModelCard from "../components/PurchaseModelCard";
import LoadingSpinner from "../components/LoadingSpinner";

const ModelPurchase = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [models, setModels] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchPurchasedModels = async () => {
      try {
        setLoading(true);
        const token = await user.getIdToken();

        const res = await fetch(
          `${import.meta.env.VITE_SERVER_API_URL}/model-purchase-page?email=${user.email}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setModels(data);
      } catch (error) {
        console.error("Purchase fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedModels();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8">
        Purchased Models
      </h1>

      {/* ===== Desktop / Laptop Table ===== */}
      <div className="hidden lg:block bg-white rounded-2xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gradient-to-r from-[#6A00FF] to-[#9D4EDD] text-white">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Framework</th>
                <th>Use Case</th>
                <th>Created By</th>
                <th>Purchased By</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model, index) => (
                <PurchaseModelTableRow
                  key={model._id}
                  model={model}
                  index={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Mobile / Tablet Cards ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
        {models.map((model, index) => (
          <PurchaseModelCard
            key={model._id}
            model={model}
            index={index}
          />
        ))}
      </div>

      {/* Empty State */}
      {models.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          You haven’t purchased any models yet.
        </p>
      )}
    </div>
  );
};

export default ModelPurchase;
