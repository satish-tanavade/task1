import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Rootlayout from "./layout/Rootlayout";
import DashBoard from "../pages/DashBoard";
import CompModal from "../pages/CompModal";
import ProductList from "../pages/ProductList";


export const router =createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element = {<Rootlayout/>}>
            <Route index  element = {<DashBoard/>}/>
            <Route path="dialogBox"  element = {<CompModal/>}/>
            <Route path="product" element = {<ProductList/>}/>
        </Route>
    )
)