import '../Styles/HUD.css';
import { DarkmodeContext } from '../App';
import { useContext } from 'react';
import 'font-awesome/css/font-awesome.min.css';

function HUD(){
    const {darkMode, setDarkMode} = useContext(DarkmodeContext);

    const handleDarkModeButton = () => {
        setDarkMode(!darkMode);
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

                <div id='sideBar'>
                        <a href="https://github.com/yournetf" target='blank'>
                            <i id='gitIcon' className={'fa fa-github-square'}/>
                        </a>
                        <a href="https://www.linkedin.com/in/frank-yournet" target='blank'>
                            <i id='gitIcon' className={'fa fa-linkedin-square'}/>
                        </a>
                        <a href="https://phat-black.web.app/" target='blank'>
                            <i id='gitIcon' className={'fa fa-pinterest-square'}/>
                        </a>
                        <a href="/Frank_Yournet_Resume.pdf" target='blank'>
                            <i id='gitIcon' className={'fa fa-file-pdf-o'}/>
                        </a>
                        <a href="/AWS_Course_Completion_Certificate.pdf" target='blank'>
                            <i id='gitIcon' className={'fa fa-certificate'}/>
                        </a>
                        
                        <a target='blank' onClick={(e) => {
                            if (!navigator.mailto) {
                                e.preventDefault();
                                alert("It seems you don't have an email client configured. Please email me at: FrankYournet@gmail.com !" );
                            }
                        }}>
                            <i id='gitIcon' className="fa fa-envelope-square"></i>
                        </a>
                </div>

                <div id="captions">
                    <div id='dragToExplore'>
                        
                    </div>
                    <div></div>
                </div>
            </div>
        </>
    );
}
export default HUD;
