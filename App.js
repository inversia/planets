import React, { useState, useEffect} from 'react'
import Info from './Info'

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