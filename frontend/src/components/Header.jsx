import React from "react";

const Header = () => {
    return (
        <>
            <nav className="bg-[#3C98BE]">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
                    <a className="flex items-center space-x-3 rtl:space-x-reverse">
                        <h1 className="text-4xl font-semibold font-sans text-[#FAFDFF] text-center">Gestión de Carreras</h1>
                    </a>
                    
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
