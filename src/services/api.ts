import axios from "axios";

export const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params:{
        api_key: "03db35e6149b5ca60ef7574be5f9e9f1",
        language: 'pt-BR',
        include_adult: false,
    }
})