import { useState, useEffect } from "react";
import axios from "axios";
import RAPID_API_KEY from "../.env";

const useFetch = ({ endpoint, query }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "x-rapidapi-key": "6b5dd583c8mshf33a2dbf10677ccp104398jsn07ee76987fb6",
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
      setError(error);
      alert("There is an error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(endpoint, "endpoint");
    console.log(error, "error");
    fetchData();
  }, []);

  const refetch = () => {
    setLoading(true);
    fetchData();
  };

  return { data, loading, error, refetch };
};

export default useFetch;
