import '../Styles/HUD.css';
import { DarkmodeContext } from '../App';
import { useContext } from 'react';

function HUD(){
    const {darkMode, setDarkMode} = useContext(DarkmodeContext);

    const handleDarkModeButton = () => {
        if(darkMode === false){
            setDarkMode(true);
        }
        else if(darkMode === true){
            setDarkMode(false);
        }
        
    }

    return(
        <>
            <div id="HUD">
                {/* Horizontal HUD On Top */}
                <div id="topBar">
                    {/* Vertical Logo In Top Left */}
                    <div id="franksCity">
                        <h2 style={{color: 'white'}}>Frank's</h2>
                        <h3 style={{color: 'white'}}>City</h3>
                    </div>
                    <button id="hamburgerLogo">
                        
                    </button>
                    {darkMode === false ? 
                        <button id='darkModeButton' onClick={handleDarkModeButton}>
                            🌙
                        </button>
                        :
                        <button id='darkModeButton' onClick={handleDarkModeButton}>
                        🌞
                        </button>
                    }
                    
                    

                </div>
            </div>
        </>
    );
}
export default HUD;
