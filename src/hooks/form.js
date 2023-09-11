import { useState, useEffect , useContext} from 'react';
import { loginContext } from '../Context/AuthContext/AuthContext';
import axios from "axios"

const useForm = (callback, defaultValues={}) => {
  const {can} = useContext(loginContext); 

  const [values, setValues] = useState({});

  const handleSubmit = (event) => {
    if(can('post')){
      event.preventDefault();
      callback({...values});
      console.log( values,'1111111111');
      axios.post(`http://localhost:3001/todo`, values).then((data) => {
        console.log(data);
      });
    } 
    event.preventDefault();

  };

  const handleChange = (event) => {
    let name, value;
    if(typeof(event) === 'object'){
      name = event.target.name;
      value = event.target.value;
    } else {
      console.log('event from slider', event)
    
      name = 'difficulty';
      value = event;
    }

    if (parseInt(value)) {
      value = parseInt(value);
    }

    setValues(values => ({ ...values, [name]: value }));
  };

  useEffect( () => {
    setValues( defaultValues );
  }, [defaultValues]);

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;
