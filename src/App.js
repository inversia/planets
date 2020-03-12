import React, { useState, useEffect} from 'react'
import Info from './Info'

export default function App () {

    const [currentPlanet, setCurrentPlanet] = useState(null)
    const [planets, setPlanets] = useState([])
    const [searchString, setSearchString] = useState ('')
    const [isLoading, setIsLoading] = useState(true)

    async function fetchPlanets() {
        
        try {
            const { results } = await (await fetch('https://swapi.co/api/planets/')).json ()
            setPlanets (results)
            setIsLoading(false)

        } catch (error) {
            console.error (error)
            setTimeout (fetchPlanets, 1000)
        }
    }

    useEffect(() => {
        fetchPlanets()
    }, [])

    function planetFilter (planet) {
        const str = searchString.toLowerCase()
        return !str || planet.name.toLowerCase().includes (str) || planet.terrain.toLowerCase().includes(str)
    }

    return <div className='container'>
            <input className='search' value={searchString} onChange={element => setSearchString (element.target.value)} type="text" placeholder="search by planet name, weather or terrain" />
            <div className='table'>
                <ul>
                    {isLoading && <div className='loading'><CircularLoader /></div>}
                    {planets
                        .filter (planetFilter)
                        .map(planet => <li key={planet.name} onClick={() => setCurrentPlanet(planet)}>{planet.name}</li>)}
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