import React from 'react'
import { useKey } from 'react-use'

export default function Info ({ currentPlanet, setCurrentPlanet }) {

    const close = () => setCurrentPlanet (null)

    useKey ('Escape', close)

    return <div className="info-wrapper">
            <button className="close" onClick={close}></button>
            <div className="list-wrapper">
                <h1>Planet<span>{currentPlanet.name}</span></h1>

                <ul>
                <div className="info-item-wrapper">
                    <label>Diameter:</label>
                    <li>{currentPlanet.diameter}</li>
                </div>

                <div className="info-item-wrapper">
                    <label>Rotation period:</label>
                    <li>{currentPlanet.rotation_period}</li>
                </div>

                <div className="info-item-wrapper">
                    <label>Climate:</label>
                    <li>{currentPlanet.climate}</li>
                </div>

                <div className="info-item-wrapper">
                    <label>Terrain:</label>
                    <li>{currentPlanet.terrain}</li>
                </div>

                <div className="info-item-wrapper">
                    <label>Surface water:</label>
                    <li>{currentPlanet.surface_water}</li>
                </div>
                </ul>
            </div>
        </div>
}