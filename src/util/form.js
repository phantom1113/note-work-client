import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const onChange = event => {
        if (event.target.type === 'file') {
            setValues({ ...values, [event.target.name]: event.target.files[0] })
        } else {
            setValues({ ...values, [event.target.name]: event.target.value })
        }
    };
    const onSubmit = event => {
        event.preventDefault();
        callback();
        setValues({ ...initialState, body: '' })
    }

    return {
        onChange,
        onSubmit,
        values
    }
}