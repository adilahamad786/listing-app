import { useState } from "react";


const useInput = (validate) => {
    const [value, setValue] = useState("");
    const [touched, setTouched] = useState(false);

    const isValid = validate(value);
    const isInvalid = !isValid && touched;

    const touchHandler = (e) => {
        e.preventDefault();
        setTouched(true);
    }

    const changeHandler = (e) => {
        e.preventDefault();
        setValue(e.target.value);
    }

    const reset = () => {
        setTouched(false);
        setValue("");
    }

    return {
        value,
        isValid,
        hasError: isInvalid,
        touchHandler,
        changeHandler,
        reset
    }
}

export default useInput;