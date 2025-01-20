// import {
// 	Navbar,
// 	NavbarBrand,
// } from "@nextui-org/react";

import NextLink from "next/link";

import { Logo } from "./icons";
function Navbars() {
return (
    <div className="bg-green-600 p-1 sticky top-0 z-50 mb-2">
        <div className="pl-5 ml-5 w-full">
            <div className="list-none">
                <NextLink className="" href="http://prepresscontrolcenter.lsccom.com/">
                    <Logo className=""/>
                </NextLink>
            </div>
        </div>
    </div>
)}
export default Navbars;