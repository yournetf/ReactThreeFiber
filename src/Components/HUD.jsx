import '../Styles/HUD.css';

function HUD(){
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
                </div>
            </div>
        </>
    );
}
export default HUD;
