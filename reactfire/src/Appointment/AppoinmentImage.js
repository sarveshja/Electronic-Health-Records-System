import logo from './hosp.jpeg';
import './homestyles.css';

function AppoinmentImage(){
    return (
        <div className='appimg'>
        <img id="ghst" src={logo} alt='summa' />
        <img id="ghst" src={logo} alt='summa' />
        <img id="ghst" src={logo} alt='summa' />
        </div>
    );
}

export default AppoinmentImage;