import { useEffect, useState } from 'react';
import './AdsGenerator.styles.scss';
import { LuSettings2 } from "react-icons/lu";
import { SiCodemagic } from "react-icons/si";
import { Parameters } from '../Parameters/parameters.component';
import { useDispatch, useSelector } from 'react-redux';
import { ParameterToggleSelector } from '../../store/Parameters/Parameters.selector';
import { UPDATE_PARAMETER_TOOGLE } from '../../store/Parameters/Parameters.actions';
import { Landscape } from '../landscape/landscape.component';
import { Portrait } from '../Portrait/Portrait.component';
import { AdsSelector } from '../../store/Ads/Ads.selector';




export const AdsGenerator = () => {
    const ParameterToggle = useSelector(ParameterToggleSelector)
    const dispatch = useDispatch();
    const [ParametersToggle, setParametersToggle] = useState(ParameterToggle)
    const Ads = useSelector(AdsSelector)

    useEffect(() => {
        setParametersToggle(ParameterToggle)
    }, [ParameterToggle])
    
    function HandleToggle(){
        dispatch(UPDATE_PARAMETER_TOOGLE())
    }

    return (
        <div className="AdsGenerator-container">
            <button className="settings-icon" onClick={HandleToggle}><LuSettings2/></button>
            <div className="header">
         <h1>Ads Generator</h1>
         <p>A powerful AI-driven ad generation tool that creates high-quality advertisements across multiple aspect ratios simultaneously. Perfect for diverse platforms, it ensures visually stunning, brand-consistent designs optimized for every format. Tailor prompts, color schemes, and audience preferences to generate ads quickly and effortlessly, ready for immediate deployment.</p>
         </div>
        {ParametersToggle && <Parameters/>}
        <div className="image-container">
            <h2>LandScape</h2>
            {Ads["landscape"] && <Landscape folder_name={Ads["images_folder_path"]} landscape_images={Ads["landscape"]}/>}
            <h2>Portrait</h2>
            {Ads["portrait"] && <Portrait folder_name={Ads["images_folder_path"]} portrait_images={Ads["portrait"]}/>}
        </div>
        </div>
    )
}