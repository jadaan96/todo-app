import { useState, useEffect , useContext} from 'react';
import { loginContext } from '../Context/AuthContext/AuthContext';
import axios from "axios"

const useForm = (callback, defaultValues = {}) => {
  const { can } = useContext(loginContext);

  const [values, setValues] = useState({});

  const handleSubmit = async (event) => {
    try {
      if (can('create')) {
        event.preventDefault();
        callback({ ...values });
        let obj = {
          text: event.target.text.value,
          assignee: event.target.assignee.value,
          difficulty: event.target.difficulty.value,
        }
        const res = await axios.post(`${process.env.REACT_APP_RENDER}/todo`, obj)
        // console.log(process.env.REACT_APP_RENDER);
      }
      event.preventDefault();
    } catch (e) {
      console.log(e.message);
    }

  };

  const handleChange = (event) => {
    let name, value;
    if (typeof (event) === 'object') {
      name = event.target.name;
      value = event.target.value;
    } else {
      console.log('event from slider', event)
      // hard coded for Mantine slider functionality 
      // change "difficulty" language if desired
      // change name dynamically if doing stretch goal!
      name = 'difficulty';
      value = event;
    }

    if (parseInt(value)) {
      value = parseInt(value);
    }

    setValues(values => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    setValues(defaultValues);
  }, [defaultValues]);

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;
