import React, {useState} from 'react';

export const AppContext = React.createContext();

export const AppProvider = props => {
  const [searchUser, setSearchUser] = useState('');
  return (
    <AppContext.Provider value={[searchUser, setSearchUser]}>
      {props.children}
    </AppContext.Provider>
  );
};
