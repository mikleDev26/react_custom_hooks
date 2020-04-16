import React, { useReducer, useEffect } from 'react';


function fetchReducer (state, action) {
  switch (action.type) {
    
    case 'FETCHING':
      return {
        ...state,
        laoding: true,
      }
    case 'SUCCESS': {
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      }
    }
    case 'ERROR': {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }
    default:
      return state;
  }
}

export default function useFetch (url) {

  const initialState = {
    loading: true,
    data: null,
    error: null,
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCHING' });
        const data = await fetch(url);
        dispatch({ type: 'SUCCESS', payload: data })
      } catch (error) {
        dispatch({ type: 'ERROR', payload: error.message })
      }
    };

    fetchData();

  }, [url]);

  return {
    loading: state.loading,
    data: state.data,
    error: state.error,
  };
}