import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useDashboardData = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const token = await user.getIdToken();

        const res = await fetch(
          `${import.meta.env.VITE_SERVER_API_URL}/dashboard-stats?email=${user.email}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Dashboard fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return { stats, loading };
};

export default useDashboardData;
