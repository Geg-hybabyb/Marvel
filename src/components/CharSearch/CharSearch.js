import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMassage} from 'formik';
import * as Yup from 'yup'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charSearch.scss'

const CharSearch = () => {

    const [char, setChar] = useState(null)

    const {loading, error, getCharacterByName} = useMarvelService()

    const onRequest = (name) => {
        getCharacterByName(name)
            .then(setState)
    }

    const setState = (char) => {
        setChar(char);
    }

    const massage = error ? <ErrorMessage/> : null
    const results = !char ? null : char.length > 0 ?
        <div className='char__found'>
            <p className='q'>There is! Visit {char[0].name} page?</p>
            <Link to={`/character/${char[0].id}`}>
                    <button 
                        className="button button__secondary">
                        <div className="inner">to Page</div>
                    </button>
            </Link>
        </div> : <div className='error'>The character was not found. Check the name and try again</div>

    return (
        <Formik
            initialValues={{name: ''}}
            validationSchema={Yup.object({
                name: Yup.string().required('This field is required')
                })    
            }
            onSubmit={values => onRequest(values.name)}>
            <Form className='form'>
                <label className='form__text'>Or find a character by name:</label>
                <br/>
                <Field className='form__input' placeholder='Enter name' name='name' id="name" type="text" />
                    <button type="submit"
                        className="button button__main"
                        disabled={loading}>
                        <div className="inner">find</div>
                    </button>
                <FormikErrorMassage name='name' component='div' className='error' />
                {results}
                {massage}
            </Form>
        </Formik>
    )
}

export default CharSearch;