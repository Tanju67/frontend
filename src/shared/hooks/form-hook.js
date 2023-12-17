import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      return {
        ...state,
        [action.id]: { value: action.payload, isValid: action.isValid },
      };

    case "VALID":
      let validArray = [];
      for (const x in state) {
        validArray.push(state[x].isValid);
      }
      const validity = validArray.filter((v) => v === false).length === 0;
      return { ...state, isValid: validity };

    default:
      return state;
  }
};
export const useForm = (initialState) => {
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      payload: value,
      isValid: isValid,
      id: id,
    });

    dispatch({ type: "VALID" });
  }, []);

  return [inputHandler, formState];
};
