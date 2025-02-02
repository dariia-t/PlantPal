import axios from 'axios'
// API Requests

// Search bar get request
export const addPlant = async (plant) => {
  try {
    const res = await axios.post('http://localhost:8080/plants', plant); //post request to add plant to local db 
    console.log('Plant added:', res.data);
  } catch (error) {
    console.error('Error adding plant:', error);
  }
};


// Get Plants of User
export const getPlants = async (userId) => {
    try {
      const res = await axios.get('http://localhost:8080/plants', { //get list of plants in users garden
        params: { userId }  
      });
      console.log('Plants:', res.data);
      return res.data.plants;  
    } catch (error) {
      console.error('Error fetching plants:', error);  
      return [];
    }
};

//delete plants
export const deletePlant = async (plantId) => { //pass in id
  try {
    console.log("Deleting Plant with ID:", plantId);
    const res = await axios.delete(`http://localhost:8080/plants/${plantId}`); //delete plant from users garden
    console.log('Plant Deleted:', res.data);
    return res.data.plant; 
  } catch (error) {
    console.error('Error deleting plant:', error);
    return null; 
  }
};


//PUT for watering the plants
export const waterPlants = async (plantId) => {
  try {
    console.log("Watering Plant with ID:", plantId); // Debugging
    const res = await axios.put('http://localhost:8080/plants/water', { plantId }); //water the plant by id 
    console.log('Plant Watered:', res.data);
    return res.data.plant; 
  } catch (error) {
    console.error('Error watering plants:', error);
    return null; 
  }
};



const plantTips = [ //array of plant tips--> only available to premium users
  "Water deeply but infrequently to encourage strong root growth.",
  "Check the soil moisture before watering—if it's dry 1-2 inches deep, it's time to water.",
  "Use room-temperature water to avoid shocking your plants.",
  "Water plants early in the morning to reduce evaporation and disease risk.",
  "Avoid letting water sit on leaves to prevent fungal diseases.",
  "Use a saucer under pots to catch excess water but don’t let plants sit in it.",
  "Group plants with similar watering needs together.",
  "Use self-watering pots for plants that prefer consistent moisture.",
  "Avoid overwatering—it’s the most common cause of plant problems.",
  "Use rainwater or distilled water for plants sensitive to tap water chemicals.",
  "Place plants in areas with adequate sunlight for their needs.",
  "Rotate plants weekly to promote even growth.",
  "Use grow lights for indoor plants in low-light areas.",
  "Avoid placing plants in direct sunlight if they prefer indirect light.",
  "Clean windows regularly to maximize natural light.",
  "Watch for signs of light stress, such as scorched leaves or legginess.",
  "Adjust the position of plants seasonally to account for changing sunlight.",
  "Use well-draining soil to prevent root rot.",
  "Repot plants every 1-2 years to refresh the soil.",
  "Add compost to soil to boost nutrients.",
  "Test soil pH to ensure it meets your plant’s preferences.",
  "Aerate compacted soil to improve root growth.",
  "Use specialized soil mixes for cacti, succulents, or orchids.",
  "Avoid using garden soil for indoor plants—it’s too heavy.",
  "Mulch the topsoil to retain moisture and regulate temperature.",
  "Fertilize during the active growing season (spring and summer).",
  "Use a balanced fertilizer for most plants unless specified otherwise.",
  "Dilute liquid fertilizers to avoid over-fertilizing.",
  "Apply fertilizer sparingly in the fall and winter.",
  "Feed flowering plants with a high-phosphorus fertilizer.",
  "Use slow-release fertilizers for long-term nutrient supply.",
  "Always follow the fertilizer package instructions.",
  "Flush the soil occasionally to remove salt buildup from fertilizers.",
  "Trim dead or yellowing leaves to encourage new growth.",
  "Prune leggy stems to maintain a compact shape.",
  "Sterilize pruning tools to prevent the spread of disease.",
  "Remove spent flowers to promote more blooms.",
  "Wipe leaves with a damp cloth to remove dust.",
  "Avoid pruning heavily during the dormant season.",
  "Shape plants by pinching back growth tips.",
  "Deadhead flowers to prevent seed formation and encourage blooming.",
  "Inspect plants regularly for pests like aphids or spider mites.",
  "Use neem oil or insecticidal soap to treat infestations.",
  "Quarantine new plants for a few weeks before placing them with others.",
  "Remove severely infected leaves to prevent disease spread.",
  "Ensure good airflow around plants to prevent mildew.",
  "Avoid overcrowding plants, which can invite pests.",
  "Watch for sticky residue—a sign of pest infestation.",
  "Use natural predators like ladybugs for pest control.",
  "Repot when roots are circling the pot or emerging from the drainage hole.",
  "Choose a pot one size larger when repotting.",
  "Propagate plants through cuttings, division, or seeds.",
  "Use rooting hormone to encourage root growth in cuttings.",
  "Avoid repotting during the dormant season.",
  "Sterilize pots before reusing them to avoid transferring diseases.",
  "Keep propagated cuttings in a warm, humid environment.",
  "Maintain consistent temperatures for indoor plants.",
  "Avoid placing plants near drafts or heating vents.",
  "Group plants together to increase humidity.",
  "Mist plants that prefer high humidity, like ferns.",
  "Use a pebble tray or humidifier to raise humidity levels.",
  "Monitor for signs of temperature stress, such as leaf curling.",
  "Protect outdoor plants from frost using covers or mulch.",
  "Adjust watering frequency based on seasonal changes.",
  "Bring outdoor plants indoors before the first frost.",
  "Prepare outdoor beds with mulch for winter protection.",
  "Prune deciduous plants in late winter or early spring.",
  "Start seeds indoors a few weeks before spring planting.",
  "Clean up fallen leaves to prevent pests and diseases.",
  "Avoid placing plants near air conditioners or heaters.",
  "Provide consistent care to avoid stress-induced leaf drop.",
  "Use a moisture meter to accurately measure soil hydration.",
  "Rotate pots every few weeks for even light exposure.",
  "Use decorative pots with drainage holes for aesthetics and practicality.",
  "Group plants with similar light and water needs for easier care.",
  "Space plants properly for good airflow and sunlight.",
  "Mulch garden beds to conserve water and reduce weeds.",
  "Water deeply to reach roots, especially during dry spells.",
  "Stake tall plants to prevent wind damage.",
  "Use organic compost to improve soil health.",
  "Choose native plants for easier maintenance and environmental benefits.",
  "Remove weeds regularly to reduce competition.",
  "Research plant-specific care requirements before purchase.",
  "Create a watering schedule to avoid neglect.",
  "Use labels to remember plant names and care needs.",
  "Avoid sudden changes in environment for your plants.",
  "Invest in quality gardening tools for easier maintenance.",
  "Keep pets away from toxic plants.",
  "Use natural pest deterrents like cinnamon or garlic sprays.",
  "Be patient with slow-growing plants.",
  "Avoid touching delicate leaves unnecessarily.",
  "Clean and sharpen gardening tools regularly.",
  "Keep track of plant growth and changes in a gardening journal.",
  "Avoid overcrowding plants in small spaces.",
  "Provide climbing supports for vines.",
  "Choose drought-tolerant plants for low-maintenance gardens.",
  "Regularly check for and address signs of stress.",
  "Take cuttings from healthy plants for backups.",
  "Have fun experimenting with new plant varieties.",
  "Celebrate small successes in your plant care journey!"
];

export default function getRandomPlantTip() {
  const randomIndex = Math.floor(Math.random() * plantTips.length); //randomly retrieve plant list from array 
  return plantTips[randomIndex];
}