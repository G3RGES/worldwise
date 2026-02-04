/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();

const intialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "cities/loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };

    case "cities/removed":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown action type");
  }
}

const API_URL = "http://localhost:4000";
function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    intialState,
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "cities/loading" });
      try {
        const response = await fetch(`${API_URL}/cities`);
        const data = await response.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "Error fetching cities: " + error.message,
        });
      }
    }
    fetchCities();
  }, []);

  async function getCityById(id) {
    if (Number(id) === currentCity.id) return;

    dispatch({ type: "cities/loading" });
    try {
      const response = await fetch(`${API_URL}/cities/${id}`);
      const data = await response.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "Error fetching city: " + error.message,
      });
    }
  }
  async function createCity(newCity) {
    dispatch({ type: "cities/loading" });
    try {
      const response = await fetch(`${API_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // setCurrentCity(data);

      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "Error creating city: " + error.message,
      });
    }
  }
  async function removeCity(id) {
    dispatch({ type: "cities/loading" });
    try {
      await fetch(`${API_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "cities/removed", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "Error removing city: " + error.message,
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        error,
        getCityById,
        currentCity,
        createCity,
        removeCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext must be used within a CitiesProvider");
  return context;
}

export { CitiesContext, CitiesProvider, useCities };
