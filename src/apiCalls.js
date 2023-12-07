import axios from "axios";
import { useContext } from "react";
import { userThemeContext } from "./ThemeProvider";

export const baseUrl= "http://localhost:5000"
export const publicRequest=axios.create(
{baseURL: baseUrl,
headers:{
    'Content-Type': 'application/json'
}
}
)

export const userRequest =(token)=> {return axios.create(
    {baseURL: baseUrl,
    headers:{
        'Content-Type': 'application/json',
        'token': `Bearer ${token}`
    }
    }
    )}