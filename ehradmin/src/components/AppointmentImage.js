import logo from '../images/appointmentImage.jpeg';
import './NewAppointment.css';

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