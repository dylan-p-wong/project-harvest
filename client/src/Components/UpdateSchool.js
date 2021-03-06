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
                    <label htmlFor="name">School Name</label>
                    <p>{data.schoolName}</p>
                    <br />
                    <label htmlFor="about">About</label>
                    <textarea name="about" rows="4" cols="50" onChange={handleChange} defaultValue={values.about}></textarea>
                    <label htmlFor="location">Location</label>
                    <textarea name="location" rows="4" cols="50" onChange={handleChange} defaultValue={values.location}></textarea>
                    <label htmlFor="admissions">Admissions</label>
                    <textarea name="admissions" rows="4" cols="50" onChange={handleChange} defaultValue={values.admissions}></textarea>
                    <label htmlFor="image">Image</label>
                    <input type="file" name="file" onChange={(e) => {
                        setFieldValue("image", e.currentTarget.files[0]);
                    }}/>
                    <p style={{fontSize: "12px"}}>{errors.error}</p>
                    <br />
                    <button type="submit" disabled={isSubmitting} onClick={sumbitForm}>Update</button>
                </Form>
            )}
            </Formik>
        </div>
    )
}