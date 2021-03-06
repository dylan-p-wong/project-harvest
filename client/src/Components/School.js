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
        <div className="schoolPage">
            <label htmlFor="name">School Name</label>
            <p>{data.schoolName}</p>
            <br />
            <label htmlFor="about">About</label>
            <p>{data.about}</p>
            <br />
            <label htmlFor="location">Location</label>
            <p>{data.location}</p>
            <br />
            <label htmlFor="admissions">Admissions</label>
            <p>{data.admissions}</p>
            <br />
            <label htmlFor="image">Image</label>
            <img alt="school" style={{maxHeight: "150px", maxWidth: "150px"}} src={data.imageLocation}></img>
            <br />
            <button>
                <Link to={`/update-school/${data._id}`}>Update</Link>
            </button>
        </div>
    )
}