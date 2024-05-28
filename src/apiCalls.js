import axios from "axios";
// import { userThemeContext } from "./ThemeProvider";

// export const baseUrl= "http://51.20.63.132";
// export const baseUrl= "http://localhost:5000";
export const baseUrl= "https://nextgen-kappa.vercel.app";
export const publicRequest=axios.create(
{baseURL: baseUrl,
headers:{
    'Content-Type': 'application/json',
}
}
)

export const userRequest =(token)=> {
    return axios.create(
    {baseURL: baseUrl,
    headers:{
        'Content-Type': 'application/json',
        'token': `Bearer ${token}`
    }
    }
    )}