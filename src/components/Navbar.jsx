import { useState } from 'react';
import useWindowDimensions from './hooks/WindowsDimensions';
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
      <div className='miNavbar__logo'>
        <h4>Vacunaciones</h4>
        <i className='fas fa-syringe'></i>
      </div>
      <ul
        className={
          leftBarActive
            ? 'miNavbar__links miNavbar__links-active'
            : 'miNavbar__links'
        }>
        <li>
          <a href='#'>Inicio</a>
        </li>
        <li>
          <a href='#'>¿Donde vacunarme?</a>
        </li>
        <li>
          <a href='#'>Turnos</a>
        </li>
        <li>
          <a href='#'>Autor</a>
        </li>
        <li>
          <a href='#'>Admin</a>
        </li>
      </ul>
      {width <= 768 ? <BurgerButton /> : <></>}
    </nav>
  );
};

export default NavBar;
