import React, { createContext, useState } from "react";

export const TopLevelContext = createContext({
  state: null,
  setState: null,
});

const Context = ({ children }) => {
  const [state, setState] = useState(() => {
    const token = JSON.parse(localStorage.getItem("authToken"));
    const user = JSON.parse(localStorage.getItem("user"));

    return {
      user,
      token,
      notes: {},
      isRemember: null,
    };
  });

  console.log(state);

  return (
    <TopLevelContext.Provider value={{ state, setState }}>
      {children}
    </TopLevelContext.Provider>
  );
};

export default Context;
