import axios from "axios"

const API_URL = import.meta.env.VITE_BACKEND_URL

const getHospitals = async()=>{
    try{
        const response = await axios.get(API_URL+'hospitals?limit=300')
        return response.data?.data
    }catch(err){
        console.error("Hospitals services:");
        console.error(err);
        throw(err)
    }
}

const hospitalServices = {
    getHospitals
}
export default hospitalServices