import React,{createContext,useContext} from "react";
import Cookies from "js-cookie";
export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user,setUser] = React.useState(Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null);
    const [token,setToken] = React.useState(Cookies.get('token') ? Cookies.get('token') : null);
    return (
        <UserContext.Provider value={{user,setUser,token,setToken}}>
            {children}
        </UserContext.Provider>
    )
}


export const useUser = () => useContext(UserContext);