import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { addPlant } from "@/api/api";
import { useToast } from "@/hooks/use-toast";

//page to search for plants and add them to your garden
export default function SearchPage() {
  const { toast } = useToast();
  //initialize all states
  const [searchTerm, setSearchTerm] = useState("");
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [containerHeight, setContainerHeight] = useState("auto");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem('id');  
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/');  
    } else {
      setIsAuthenticated(true); 
    }
  }, [navigate]);
  
  const handleSearch = async () => { //fetch list of plants
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://perenual.com/api/species-list?key=${import.meta.env.VITE_PLANT_API_KEY}&q=${searchTerm}` //pull from api based on search term
      );
      const data = response.data.data;
      console.log("Fetched plants:", data);
      setPlants(data);
    } catch (error) {
      console.error("Error fetching plant data:", error);
      setPlants([]);
    } finally {
      setLoading(false);
    }
  };

  
  const handleAddPlant = async (common_name) => { //add specific plants to garden
    if (!userId) {
      alert('User not authenticated. Please log in.');
      return;
    }
    try {
      await addPlant({ userId, common_name });  
      toast({
        description: "Your plant has been added to your list 😁",
        duration: 2000,
        variant: "addPlant",
      });
    } catch (error) {
      console.error('Error adding plant:', error);
      alert('Failed to add plant. Please try again.');
    }
  };

  // Adjust container height based on plant list length
  useEffect(() => {
    if (plants.length > 0) {
      setContainerHeight("auto");
    } else {
      setContainerHeight("620px");
    }
  }, [plants]);

  //design of search bar and how the fetched results are displayed
  return isAuthenticated ? (
    <div
      className="flex flex-col items-center w-screen bg-gradient-to-br from-pink-200 via-emerald-100 to-blue-200 p-6 min-h-screen"
      style={{ transition: "min-height 0.3s ease" }}
    >
      <h1 className="text-3xl font-bold text-pink-400 mb-4">🌸 Find Your Plant 🌿</h1>
      <div className="relative w-full max-w-md">
        <Input
          type="text"
          placeholder="Search for plants"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full rounded-lg border-2 border-emerald-300 focus:ring-2 focus:ring-pink-100 focus:outline-none transition-all duration-300"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-200"
          size={20}
        />
      </div>
      <button
        onClick={handleSearch}
        className="mt-4 px-4 py-2 rounded-md bg-emerald-400 text-white font-medium hover:bg-emerald-500 transition duration-300"
      >
        {loading ? "Searching..." : "Search"}
      </button>
      <div className="mt-6 w-full max-w-md text-center">
        {plants.length > 0 ? (
          plants.map((plant) => (
            <div key={plant.id} className="p-4 mb-4 rounded-lg bg-white shadow-md">
              <h2 className="text-xl font-bold text-emerald-600">{plant.common_name || "Unknown Plant"}</h2>
              <p className="text-sm text-gray-500">
                {plant.scientific_name ? `Scientific Name: ${plant.scientific_name}` : "No scientific name available."}
              </p>
              <button
                onClick={() => handleAddPlant(plant.common_name)}
                className="mt-2 px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600"
              >
                Add to My Plants
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
