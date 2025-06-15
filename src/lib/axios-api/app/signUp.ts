import api from "../api"

export const signUp = async (fullName: string, email: string, password: string) => {

    try {
        
        const response = await api.post("/sign-up", {fullName, email, password, role: "user"});
        return response;

    } catch (error) {
        console.log("Error while sending request for sign up: ", error);
        throw error
    }
}