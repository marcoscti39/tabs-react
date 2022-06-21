import React, {useState, useEffect} from 'react'

import PersonsNav from './PersonsNav'


import {AiFillForward} from 'react-icons/ai'

import "./Tabs.css"

function Tabs() {
    const [data, setData] = useState([])
    const [allCompanies, setallCompanies] = useState([])
    const [companyClicked, setcompanyClicked] = useState([])
    const [loading, setLoading] = useState(true)

    const url = 'https://course-api.com/react-tabs-project'
    const fetchData = async () => {
        try{
            let response = await fetch(url);
            let data = await response.json()
            setLoading(false)
            setData(data)
            setcompanyClicked([data[0]])
            setallCompanies(data)
            
        } catch(err){
            console.log(err)
        }
        
    }
   

    const findCompanies = 
        allCompanies.map(allCompanies =>{
            const {company} = allCompanies
            return company
        })
        
    const markAndUnmarkSelected = (clicked) =>{
        const tabsPerson = document.querySelectorAll(".tabs-person")

        tabsPerson.forEach(person =>{
            person.classList.remove("selected")

            if(person.textContent === clicked){
                person.classList.add("selected")
            }
        })
    }
    

    const companySelected = (clicked) =>{
        const findingCompanyCliked = data.find(companies =>{
            const {company} = companies
            return company === clicked
        })
        markAndUnmarkSelected(clicked)
        const companyClickedArray = []
        companyClickedArray.push(findingCompanyCliked)
        setcompanyClicked(companyClickedArray)
    }

    
    

    useEffect(() =>{
        fetchData()


    },[])
    

    if(loading){
        return (
            <main> <h2 style={{fontSize: "5rem"}}>Loading...</h2>  </main>
        )
    }

    return (
        <>

            <main>
                <PersonsNav findCompanies={findCompanies} companySelected={companySelected}/>

                   {companyClicked.map(companies =>{
                       const {id, title, dates, company, duties } = companies
                       return (
                           <section key={id} className="tabs-container">
                               <h2 className="person-career">{title}</h2>
                               <span className="person-name">{company}</span>
                               <span className="person-data">{dates}</span>
                               <div className="person-info">
                                   {duties.map((duty, index) => {
                                       return (
                                           <React.Fragment key={index}>   
                                                <div  className="person-icon-and-text-wrapper">
                                                    <AiFillForward className="icon"/> 
                                                    <p className="person-info-text">{duty}</p>
                                                </div>
                                           </React.Fragment>
                                       )
                                   })}
                               </div>
                           </section>
 
                       )
                   })}



            </main>
            <button className="tabs-button">More info</button>

        </>
    )
}

export default Tabs
