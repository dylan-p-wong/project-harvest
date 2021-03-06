import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home(){
    const location = useLocation();
    const [data, setData] = useState({schools: []});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
        setLoading(true);
        const result = await axios(process.env.REACT_APP_API_URL + "/schools");
        setData(result.data.schools);
        setLoading(false);
        }
        fetchData();
    }, [location.pathname]);

    return (
    <div>
        <div className="container">
        {loading ? <p>Loading</p> : data && data.length > 0 ?
        data.map((school) =>           
            (<div key={school._id} className="schoolName">
            <p style={{fontSize: "19px"}}>{school.schoolName}</p>
            <button>
                <Link to={`/school/${school._id}`}>View</Link>
            </button>
            </div>)
        )
        : <p>No Schools</p>}
        </div>
    </div>
    )
}