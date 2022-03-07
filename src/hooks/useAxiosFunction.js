import { useState, useEffect } from "react";

const useAxiosFunction = () => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState();

  const axiosFetch = async (config) => {
    const { axiosInstance, method, url, requestConfig = {} } = config;

    try {
      setLoading(true);
      const cntrl = new AbortController();
      setController(cntrl);
      const res = await axiosInstance[method.toLowerCase()](url, {
        ...requestConfig,
        signal: cntrl.signal,
      });
      console.log(res);
      setResponse(res.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => controller && controller.abort();
  }, [controller]);

  return [response, error, loading, axiosFetch];
};

export default useAxiosFunction;
