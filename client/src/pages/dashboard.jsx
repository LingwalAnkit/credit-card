import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardGenerator from "../components/layout/cardGenerator";
import { Alert } from "../components/ui/alert";
import CardList from "../components/layout/cardList";
import { Button } from "../components/ui/button";

const Dashboard = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("visa");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const fetchCards = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/auth/cards", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) setCards(data.cards || []);
      else setError(data.message || "Failed to fetch cards");
    } catch {
      setError("Failed to fetch cards");
    }
  };

  const generateCard = async () => {
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/auth/card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cardType: selectedType }),
      });
      const data = await response.json();
      if (response.ok) fetchCards();
      else setError(data.message || "Failed to generate card");
    } catch {
      setError("Failed to generate card");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="min-h-screen bg-white p-12 text-black">
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Credit Card Dashboard</h1>
          <Button
            text="Logout"
            onClick={handleLogout}
            className="px-4 py-2 bg-black text-white shadow-lg hover:bg-gray-400 disabled:opacity-50 hover:text-black"
          >
          </Button>
        </div>
        {error && <Alert variant="error">{error}</Alert>}
        <CardGenerator
          onGenerate={generateCard}
          loading={loading}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
        <CardList cards={cards} />
      </div>
    </div>
  );
};

export default Dashboard;
