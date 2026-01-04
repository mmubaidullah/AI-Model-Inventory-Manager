import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

const ModelDetails = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [model, setModel] = useState({});
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);

  // -------- Fetch Model (Public) --------
  useEffect(() => {
    const fetchModel = async () => {
      try {
        setLoading(true);

        const headers = {};
        if (user?.accessToken) {
          headers.authorization = `Bearer ${user.accessToken}`;
        }

        const res = await fetch(
          `${import.meta.env.VITE_SERVER_API_URL}/models/${id}`,
          { headers }
        );

        const data = await res.json();
        setModel(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchModel();
  }, [id, user, refetch]);

  // -------- Delete Model --------
  const handleDelete = () => {
    if (!user) return navigate("/login");

    Swal.fire({
      title: "Are you sure?",
      text: `${model.name} will be deleted!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `${import.meta.env.VITE_SERVER_API_URL}/models/${model._id}`,
          {
            method: "DELETE",
            headers: {
              authorization: `Bearer ${user.accessToken}`,
            },
          }
        )
          .then((res) => res.json())
          .then(() => {
            toast.success("Successfully deleted this model");
            navigate("/dashboard/my-models");
          })
          .catch((err) => console.log(err));
      }
    });
  };

  // -------- Purchase Model --------
  const handlePurchasedModel = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const finalModel = {
      name: model.name,
      framework: model.framework,
      useCase: model.useCase,
      dataset: model.dataset,
      description: model.description,
      image: model.image,
      purchasedBy: user.email,
      createdBy: model.createdBy,
      createdAt: new Date(),
      modelId: model._id,
    };

    fetch(
      `${import.meta.env.VITE_SERVER_API_URL}/purchased-model/${model._id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalModel),
      }
    )
      .then((res) => res.json())
      .then(() => {
        toast.success("Successfully purchased this model");
        setRefetch(!refetch);
      })
      .catch((err) => console.log(err));
  };

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8 mt-12 mb-6">
      <div className="card bg-base-100 shadow-xl rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 p-6">
          <div className="w-full md:w-1/2">
            <img
              src={model.image}
              alt={model.name}
              className="w-full rounded-xl shadow-md"
            />
          </div>

          <div className="w-full md:w-1/2 space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">{model.name}</h1>
              <span className="badge badge-primary">{model.framework}</span>
            </div>

            <p><strong>UseCase:</strong> {model.useCase}</p>
            <p><strong>Dataset:</strong> {model.dataset}</p>
            <p><strong>Description:</strong> {model.description}</p>
            <p>
              <strong>Purchased:</strong>{" "}
              <span className="font-bold text-purple-600">
                {model.purchased || 0}
              </span>
            </p>

            <div className="flex gap-3 mt-6">
              {user ? (
                <button onClick={handlePurchasedModel} className="btn">
                  Purchase
                </button>
              ) : (
                <Link to="/login" className="btn">
                  Login to Purchase
                </Link>
              )}

              {model.createdBy === user?.email && (
                <>
                  <Link to={`/update-model/${model._id}`} className="btn">
                    Update
                  </Link>
                  <button onClick={handleDelete} className="btn btn-error">
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetails;
