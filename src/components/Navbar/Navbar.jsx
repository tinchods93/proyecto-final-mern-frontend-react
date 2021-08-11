import { useState } from 'react';
import useWindowDimensions from '../helpers/hooks/WindowsDimensions';
import './Navbar.css';
const NavBar = () => {
  const { width } = useWindowDimensions();
  const [leftBarActive, setLeftBarActive] = useState(false);

  const BurgerButton = () => {
    return (
      <div className='burger' onClick={() => setLeftBarActive(!leftBarActive)}>
        <div className='line1'></div>
        <div className='line2'></div>
        <div className='line3'></div>
      </div>
    );
  };

  return (
    <nav className='miNavbar'>
      <a href='/' className='miNavbar__logo'>
        <h4>Vacunaciones</h4>
        <i className='fas fa-syringe'></i>
      </a>
      <ul
        className={
          leftBarActive
            ? 'miNavbar__links miNavbar__links-active'
            : 'miNavbar__links'
        }>
        <li>
          <a href='/'>Inicio</a>
        </li>
        <li>
          <a href='/appointments'>Turnos</a>
        </li>
        <li>
          <a href='/admin'>Admin</a>
        </li>
      </ul>
      {width <= 768 ? <BurgerButton /> : <></>}
    </nav>
  );
};

export default NavBar;
