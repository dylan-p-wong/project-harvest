import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    }, [id]);

    if (loading){
        return <p>Loading...</p>
    }

    if (!data){
        return <p>Error</p>
    }

    return (
        <div>
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
                <img alt="school" style={{maxHeight: "150px", maxWidth: "150px"}} src={data.imageLocation}></img>
            </div>
            <Link to={`/update-school/${data._id}`}>Update</Link>
        </div>
    )
}