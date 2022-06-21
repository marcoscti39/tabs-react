import React from 'react'

import './PersonsNav.css'
function PersonsNav({findCompanies, companySelected}) {
    return (
        <nav className="tabs-nav">
            {findCompanies.map((company, index) =>{
                return (
                    <button key={index}
                    onClick={() => companySelected(company)}
                    className={`tabs-person ${index === 0? "selected": ""}`}>{company}</button>
                )
            })}
            
        </nav>
    )
}

export default PersonsNav
