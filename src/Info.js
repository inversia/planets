import React from 'react'
import { useKey } from 'react-use'

export default function Info ({ currentPlanet, setCurrentPlanet }) {

    const close = () => setCurrentPlanet (null)

    const planetData = {'Diameter' :        currentPlanet.diameter,
                        'Rotation period' : currentPlanet.rotation_period,
                        'Climate' :         currentPlanet.climate,
                        'Terrain' :         currentPlanet.terrain,
                        'Surface water' :   currentPlanet.surface_water}

    useKey ('Escape', close)

    return <div className="info-wrapper">
            <button className="close" onClick={close}></button>
            <div className="list-wrapper">
                <h1>Planet<span>{currentPlanet.name}</span></h1>
                <ul>
                    {Object.entries (planetData).map (([key, value]) => <div key={key} className='info-item-wrapper'>
                                                                            <label>{key + ':'}</label>
                                                                            <li>{value}</li>
                                                                        </div>)})
                </ul>
            </div>
        </div>
}