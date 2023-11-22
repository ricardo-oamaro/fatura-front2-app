import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home"
import useAuth from "../hooks/useAuth";

const Private = ({Item}) => {
    const signed = useAuth();

    return signed > 0 ? <Item /> : <Login />
}

const RoutesApp = () => {
    return(
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route exact path="/home" element={<Private Item={Home} />}/>
                    <Route path="/" element={<Login />}/>
                    <Route path="*" element={<Login />}/>
                </Routes>
            </Fragment>
        </BrowserRouter>
    )
}

export default RoutesApp;