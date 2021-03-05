import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function School(){
    const { id } = useParams();

    const [data, setData] = useState({schools: []});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {            
            try {
                setLoading(true);
                const result = await axios(process.env.REACT_APP_API_URL + "/schools/" + id);
                setData(result.data.school);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    if (loading){
        return <p>Loading...</p>
    }

    return (
        <div>
            {data ? 
            <div>
                <p>
                    Name: {data.schoolName}
                </p>
                <p>
                    About: {data.about}
                </p>
                <p>
                    Location: {data.location}
                </p>
                <p>
                    Admissions: {data.admissions}
                </p>
                <img style={{maxHeight: "150px", maxWidth: "150px"}} src={data.imageLocation}></img>
            </div>
            : 
            null}
        </div>
    )
}