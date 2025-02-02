import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPlants } from "@/api/api";  // Import the function to get plants
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Flower2 } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { waterPlants } from "@/api/api";
import { deletePlant } from "@/api/api";
import getRandomPlantTip from "@/api/api";

export default function Home() {
  const { toast } = useToast();
  const navigate = useNavigate();
  //initialize all our states
  const [plantItems, setPlantItems] = useState([]); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const paid = localStorage.getItem('paid'); 

  useEffect(() => { //check log in 
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/');  
    } else {
      setIsAuthenticated(true); 
    }
  }, [navigate]);

  useEffect(() => {
    if (isAuthenticated) { // users garden of plants
      const userId = localStorage.getItem('id'); 
      
      getPlants(userId)
        .then((data) => {
          console.log('Fetched plants:', data);
          setPlantItems(data);
        })
        .catch((error) => {
          console.error('Error fetching plants:', error);
        });
    }
  }, [isAuthenticated]);

  const onDelete = (plantId) => { //delete plant 
    const originalPlantItems = [...plantItems];
    setPlantItems((prevItems) => prevItems.filter((plant) => plant.plantid !== plantId));
    deletePlant(plantId)
      .then(() => {
        toast({
          description: "Your plant has been deleted ❌",
          duration: 2000,
          variant: "deletePlant",
        });
      })
      .catch((error) => {
        console.error("Error deleting plant:", error);
        setPlantItems(originalPlantItems); // Revert UI if deletion fails
        toast({
          description: "Failed to delete the plant. Please try again!",
          duration: 2000,
          variant: "error",
        });
      });
  };

  const onWater = (plantId) => { //water the plants 
    console.log("check plant id", plantId)
    setPlantItems((prevItems) =>
      prevItems.map((plant) =>
        plant.plantid === plantId && plant.water_done < plant.water_frequency
          ? { ...plant, water_done: plant.water_done + 1 }
          : plant
      )
    );
    waterPlants(plantId)
      .then((updatedPlant) => {
        if (updatedPlant) {
          setPlantItems((prevItems) =>
            prevItems.map((plant) =>
              plant.plantid === updatedPlant.plantid ? updatedPlant : plant
            )
          );
          toast({
            description: "Your plant has been watered successfully 💧",
            duration: 2000,
            variant: "water",
          });
        }
      })
      .catch((error) => {
        console.error("Error watering plant:", error);
        toast({
          description: "Failed to water the plant. Please try again!",
          duration: 2000,
          variant: "error",
        });
      });
  };

  const onGetTips = () => { //random plant tip
    let tip = getRandomPlantTip();
    toast({
      description: tip,
      duration: 4000,
      variant: "tip",
    });
  }
  //each plant in a box, adds buttons for water and plant tips, etc 
  return isAuthenticated ? (
    <div className="min-h-screen w-screen bg-gradient-to-br from-pink-200 via-emerald-100 to-blue-200 p-6 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-6 w-full">
        {plantItems.length > 0 ? (
          plantItems.map((plant, index) => (
            <Card key={index} className="w-full max-w-md">
              <CardHeader className="relative">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-700 focus:outline-none text-3xl pr-2"
                  onClick={() => onDelete(plant.plantid)}
                >
                  ✕
                </button>
                <CardTitle>{plant.common_name}</CardTitle>
                <CardDescription>Health: {plant.plant_health}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <div className="flex space-x-2 justify-center">
                  {Array.from({ length: plant.water_frequency }).map((_, i) => (
                    <Flower2
                      key={i}
                      size={70}
                      className={`${
                        i < plant.water_done ? "text-green-500" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-4 text-center">
                  <strong>Watering Progress:</strong> {plant.water_done}/{plant.water_frequency}
                </p>
                {/*<p className="text-center">
                  <strong>Sunlight:</strong> {plant.sunlight}
                </p>*/}
                <p className="text-center">
                  <strong>Watering:</strong> {plant.water_frequency} times a week
                </p>
              </CardContent>
              <CardFooter className="space-x-5">
                <Button
                  variant="water"
                  onClick={() => onWater(plant.plantid)}
                  disabled={plant.water_done >= plant.water_frequency}
                >
                  Water
                </Button>
                {paid === "true" && (
                <Button 
                variant="tips"
                onClick={() => onGetTips()}
                >Plant Tips</Button> )}
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 text-2xl font-semibold">No plants found. Please add some plants!</p>
        )}
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center">Loading...</div>
  );
}
