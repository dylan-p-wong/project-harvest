import axios from 'axios';
import {Formik, Form} from 'formik';
import { useHistory } from 'react-router-dom';

export default function CreateSchool(){
    const history = useHistory();

    return (
        <div>
            <Formik
                initialValues={{name: '', about: '', location: '', admissions: '', image: ''}}
                
                validate={values => {
                    const errors = {};

                    if (!values.name || !values.location || !values.about || !values.admissions || !values.image){
                        errors.error = "Fill in all fields";
                        return errors;
                    }

                    if (values.image.type !== "image/jpeg" && values.image.type !== "image/png"){
                        errors.error = "Must have a .jpg or .png extension";
                    }

                    return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    let formData = new FormData();
                    formData.append("schoolName", values.name);
                    formData.append("about", values.about);
                    formData.append("location", values.location);
                    formData.append("admissions", values.admissions);
                    formData.append("image", values.image);
                    
                    try {
                        await axios.post(process.env.REACT_APP_API_URL + "/schools/create", formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        });
                        
                        history.push("/");
                    } catch (e) {
                        console.log(e.response);
                    }
                    setSubmitting(false);
                }}
            >
            {({ handleChange, errors, sumbitForm, isSubmitting, setFieldValue}) => (
                <Form>
                    <label htmlFor="name">School Name</label>
                    <input type="name" name="name" onChange={handleChange}></input>
                    <br />
                    <label htmlFor="about">About</label>
                    <textarea name="about" rows="4" cols="50" onChange={handleChange}/>
                    <label htmlFor="location">Location</label>
                    <textarea name="location" rows="4" cols="50" onChange={handleChange}/>
                    <label htmlFor="admissions">Admissions</label>
                    <textarea name="admissions" rows="4" cols="50" onChange={handleChange}/>
                    <br />
                    <label htmlFor="image">Image</label>
                    <input type="file" name="file" onChange={(e) => {
                        setFieldValue("image", e.currentTarget.files[0]);
                    }}/>
                    <br />
                    <p style={{fontSize: "12px"}}>{errors.error}</p>
                    <br />
                    <button type="submit" disabled={isSubmitting} onClick={sumbitForm}>Create</button>
                </Form>
            )}
            </Formik>
        </div>
    )
}