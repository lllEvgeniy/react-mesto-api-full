import logo from "../img/Vector.svg";


function Header(props) {


  return (


    <header className="header">
      <a className="header__logo" href="!#">
        <img className="header__img" src={logo} alt="Логотип Mesto" />
      </a>
      {props.children}
    </header>
  );
}

export default Header;