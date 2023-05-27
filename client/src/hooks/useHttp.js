import { useCallback, useState } from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (configData, apply) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(configData.url, {
                method: configData.method ? configData.method : "GET",
                headers: configData.headers ? configData.headers : {},
                body: configData.body ? configData.body : null
            });
    
            const data = await response.json();

            if (!response.ok) {
                throw new Error(JSON.stringify(data));
            }
    
            apply(data);
        } catch (error) {
            setError(JSON.parse(error.message));
        }

        setIsLoading(false);
    }, []);

    return {
        isLoading,
        error,
        sendRequest
    }
}

export default useHttp;