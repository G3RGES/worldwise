import { createContext, useEffect, useState } from "react";

const CitiesContext = createContext();

const API_URL = "http://localhost:4000";
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/cities`);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        alert("Error fetching cities: " + error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);
}
