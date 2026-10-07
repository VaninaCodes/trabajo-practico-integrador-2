import { useState } from 'react';

export const useForm = (initialState = {}) => {
    const [formState, setFormState] = useState(initialForm);

    const handleInputChange = ({target}) => {
        const { name, value} = target;
        setFormState(prev => ({
            ...prev,
            [name]: value

        }));
    };

    const handleReset = () => {
        setFormState(initialForm);
    };

    return {
        formState,
        handleInputChange,
        handleReset
    };
};