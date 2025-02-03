import '../Styles/HUD.css';
import { DarkmodeContext } from '../App';
import { RotationContext } from '../App';
import { useContext } from 'react';
import 'font-awesome/css/font-awesome.min.css';

function HUD(){
    
    const {darkMode, setDarkMode} = useContext(DarkmodeContext);
    const azimuthalAngle = useContext(RotationContext);
    
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
                    <p className={(-0.5 < azimuthalAngle && azimuthalAngle < 0.5) ? 'captionsText' : 'invisible'}>My journey as a software engineer began in New York City. </p>
                    <p className={(1 < azimuthalAngle && azimuthalAngle < 2) ? 'captionsText' : 'invisible'}>I attended The Bronx High School of Science, home to the most Nobel Piece Prize winners in the world! </p>
                    <p className={(2.5 < azimuthalAngle || azimuthalAngle < -2.5) ? 'captionsText' : 'invisible'}>I then went to Queens College, where I studied Computer Science and learned tons of theory and programming languages.</p>
                    <p className={(-2 < azimuthalAngle && azimuthalAngle < -1) ? 'captionsText' : 'invisible'}>I graduated with Dean's List Honors and began creating many projects, like this website and the ones you can view by checking out my GitHub!!!</p>
                </div>

            </div>
        </>
    );
}
export default HUD;
