import api from "@/lib/axios-api/api";

// Create an AbortController instance to provide an option to cancel the upload if needed.


/**
 * Authenticates and retrieves the necessary upload credentials from the server.
 *
 * This function calls the authentication API endpoint to receive upload parameters like signature,
 * expire time, token, and publicKey.
 *
 * @returns {Promise<{signature: string, expire: string, token: string, publicKey: string}>} The authentication parameters.
 * @throws {Error} Throws an error if the authentication request fails.
 */
export const authenticator = async () => {
    try {
        // Perform the request to the correct upload authentication endpoint.
        const response = await api.get("/upload-auth-imagekit"); // Updated endpoint
        if (!response.status.toString().startsWith("2")) {
            // If the response status is not in the 2xx range, throw an error.
            // If the server response is not successful, extract the error text for debugging.
            const errorText = await response?.data?.message;
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        // Parse and destructure the response JSON for upload credentials.
        const data = await response.data;
        const { signature, expire, token, publicKey } = data;
        return { signature, expire, token, publicKey };
    } catch (error) {
        // Log the original error for debugging before rethrowing a new error.
        console.error("Authentication error:", error);
        throw new Error("Authentication request failed");
    }
};

/**
 * Handles the file upload process.
 *
 * This function:
 * - Validates file selection.
 * - Retrieves upload authentication credentials.
 * - Initiates the file upload via the ImageKit SDK.
 * - Updates the upload progress.
 * - Catches and processes errors accordingly.
 */
