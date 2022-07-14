import React, {useEffect, useState} from 'react';

const useDebounce = (input: string = '', time: number = 500) => {
  const [debounced, setDebounce] = useState(input);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounce(input);
    }, time);

    return () => {
      clearTimeout(timeout);
    };

    //change when input is update
  }, [input]);

  return debounced
};

export default useDebounce;
