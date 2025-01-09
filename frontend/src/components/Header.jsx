import React from "react";

const Header = () => {
    return (
        <>
            <nav className="bg-gradient-to-r from-[#D1EEFC] via-[#D1EEFC] to-[#F3FAFD] w-full z-20">
                <div className="max-w-screen-xl flex flex-wrap min-h-full items-center justify-center mx-auto p-4">
                    <a className="flex items-center space-x-3 rtl:space-x-reverse">
                        <h1 className="text-4xl font-normal font-sans text-[#253E4E] text-center">Gestión de Carreras</h1>
                    </a>
                    
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
