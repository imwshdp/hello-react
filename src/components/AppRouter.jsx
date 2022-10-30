import React, { useContext } from 'react';
import { Route, Routes } from "react-router-dom";
import { AuthContext } from '../context';
import { privateRoutes, publicRoutes } from '../router/routes';
import Loader from './UI/loader/Loader';

const AppRouter = () => {
    
    const {isAuth, setIsAuth, isLoading} = useContext(AuthContext)

    if(isLoading) {
        return <Loader />
    }

    return (
        <Routes>
            {isAuth
                ?
                    privateRoutes.map(route =>
                        <Route
                            key={route.path}
                            path={route.path}
                            element={route.element}
                            exact={route.exact}
                        />
                    )
                :
                    publicRoutes.map(route =>
                        <Route
                            key={route.path}
                            path={route.path}
                            element={route.element}
                            exact={route.exact}
                        />
                    )
            }  
        </Routes>
    );
}

export default AppRouter ;