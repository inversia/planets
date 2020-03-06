import React, { useState, useEffect} from 'react'
import Info from './Info'

const testPlanet = {"name":"Alderaan","rotation_period":"24","orbital_period":"364","diameter":"12500","climate":"temperate","gravity":"1 standard","terrain":"grasslands, mountains","surface_water":"40","population":"2000000000","residents":["https://swapi.co/api/people/5/","https://swapi.co/api/people/68/","https://swapi.co/api/people/81/"],"films":["https://swapi.co/api/films/6/","https://swapi.co/api/films/1/"],"created":"2014-12-10T11:35:48.479000Z","edited":"2014-12-20T20:58:18.420000Z","url":"https://swapi.co/api/planets/2/"}

export default function App () {

    const [currentPlanet, setCurrentPlanet] = useState(undefined)
    const [planets, setPlanets] = useState([])
    const [searchString, setSearchString] = useState ('')
    const [isLoading, setIsLoading] = useState(true)

    async function fetchPlanets() {
        try {
            const { results } = await fetch('https://swapi.co/api/planets/').then (x => x.json())
            setPlanets (results)
            setIsLoading(false)
        } catch (e) {
            console.error (e)
            setTimeout (fetchPlanets, 1000)
        }
    }

    useEffect(() => {
        fetchPlanets()
    }, [])

    function planetFilter (p) {
        return !searchString || p.name.toLowerCase().includes (searchString) || p.terrain.toLowerCase().includes(searchString)
    }

    return <div className='container'>
            <input className='search' value={searchString} onChange={e => setSearchString (e.target.value)} type="text" placeholder="search by planet name, weather or terrain" />
            <div className='table'>
                <ul>
                    {isLoading && <div className='loading'><CircularLoader /></div>}
                    {planets
                        .filter (planetFilter)
                        .map(x => <li key={x.name} onClick={() => setCurrentPlanet(x)}>{x.name}</li>)}
                </ul>
            </div>
            {currentPlanet ?  <Info {...{currentPlanet, setCurrentPlanet}}/> : <h1>Choose planet</h1>}
        </div>
}

function CircularLoader () {

    return <svg className="circular-loader" viewBox="25 25 50 50" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="20"></circle>
    </svg>
}