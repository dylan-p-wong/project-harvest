import axios from 'axios';
import {Formik, Form} from 'formik';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";

export default function UpdateSchool(){
    const history = useHistory();
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
            <Formik
                initialValues={{name: data.schoolName, about: data.about, location: data.location, admissions: data.admissions, image: ''}}

                validate={values => {
                    const errors = {};

                    if (!values.name || !values.location || !values.about || !values.admissions){
                        errors.error = "Fill in all fields";
                        return errors;
                    }

                    if (values.image && values.image.type !== "image/jpeg" && values.image.type !== "image/png"){
                        errors.error = "Must have a .jpg or .png extension";
                    }

                    return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    let formData = new FormData();
                    formData.append("schoolId", data._id)
                    formData.append("about", values.about);
                    formData.append("location", values.location);
                    formData.append("admissions", values.admissions);
                    if (values.image){
                        formData.append("image", values.image);
                    }
                    
                    try {
                        await axios.post(process.env.REACT_APP_API_URL + "/schools/update", formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        });
                        
                        history.push(`/school/${data._id}`);
                    } catch (e) {
                        console.log(e.response);
                    }
                    setSubmitting(false);
                }}
            >
            {({ handleChange, errors, sumbitForm, isSubmitting, setFieldValue, values}) => (
                <Form>
                    <p>{data.schoolName}</p>
                    <textarea name="about" rows="4" cols="50" onChange={handleChange}>{values.about}</textarea>
                    <textarea name="location" rows="4" cols="50" onChange={handleChange}>{values.location}</textarea>
                    <textarea name="admissions" rows="4" cols="50" onChange={handleChange}>{values.admissions}</textarea>
                    <input type="file" name="file" onChange={(e) => {
                        setFieldValue("image", e.currentTarget.files[0]);
                    }}/>
                    <button type="submit" disabled={isSubmitting} onClick={sumbitForm}>Update</button>
                    {errors.error}
                </Form>
            )}
            </Formik>
        </div>
    )
}