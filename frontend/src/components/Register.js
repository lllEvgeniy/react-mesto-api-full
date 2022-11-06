import Header from "./Header";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value);
      }

      function handleChangePassword(e) {
        setPassword(e.target.value);
      }

    function onRegister(e) {
        e.preventDefault();
        props.handleSubmit({ email, password })
    }


    return (
        <>
            <Header >
                <Link to="/sign-in" className="header__register">Войти</Link>
            </Header>
            <section className="register">
                <h2 className="register__title">Регистрация</h2>
                <form className="register__form" onSubmit={onRegister} >
                    <input value={email || ""} onChange={handleChangeEmail} placeholder="Email" className="register__username" required id="email" name="email" type="text" />
                    <input value={password || ""} onChange={handleChangePassword} placeholder="Пароль" className="register__password" required id="password" name="password" type="password" autoComplete="on" />
                    <button type="submit" className="register__btn">Зарегистрироваться</button>
                </form>
                <Link to="/sign-in" className="register__already-registered">Уже зарегистрированы? Войти</Link>
            </section>
        </>
    );
}

export default Register;