import React, { useContext,useState } from "react";
import { AppContext } from "../AppContextProvider";
const Counter = () => {

  const { appState, appActions } = React.useContext(AppContext)

  const {count} = appState;

  return (
    <div>
      <span>Has clickado {count} veces</span>
      <button onClick={()=>appActions.incrementCount()}>Click Here!</button>
    </div>
  );
};
export default Counter;
