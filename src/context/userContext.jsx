import React,{createContext,useContext} from "react";
import Cookies from "js-cookie";
export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const userCookie = Cookies.get('user')
    const [user,setUser] = React.useState(userCookie ? JSON.parse(userCookie) : "");
    const [token,setToken] = React.useState(Cookies.get('token') ? Cookies.get('token') : "" ) ;
    return (
        <UserContext.Provider value={{user,setUser,token,setToken}}>
            {children}
        </UserContext.Provider>
    )
}


export const useUser = () => useContext(UserContext);