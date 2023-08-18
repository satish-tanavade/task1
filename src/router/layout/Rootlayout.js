import React from 'react'
import { Outlet } from 'react-router-dom'
import CompNavbar from '../../component/CompNavbar'

function Rootlayout() {
    return (
        <>
            <CompNavbar/>
            <Outlet />
        </>
    )
}

export default Rootlayout