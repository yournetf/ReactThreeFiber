import '../Styles/LoadingScreen.css';
import 'font-awesome/css/font-awesome.min.css';

function LoadingScreen({enterClicked, setEnterClicked}){
    return(
        <>
            <div id="loadingContainer">
                <div id='loadingContents'>
                    <h1 id='welcomeText'>WELCOME TO MY CITY!</h1>
                    <h3 id='introText'>I'm Frank, a Computer Science Graduate and an aspiring Software Engineer, who is determined to bring surreal experiences to people all around the world.</h3>
                    <button id='enterButton' onClick={()=> {setEnterClicked(true)}}>
                        EXPLORE MY CITY
                        <i id='arrow' className="fa fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </>
    );
}
export default LoadingScreen;
