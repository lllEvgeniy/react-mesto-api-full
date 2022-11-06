import Header from "./Header";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login(props) {
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
                <Link to="/sign-up" className="header__register">Регистрация</Link>
            </Header>
            <section className="login">
                <h2 className="login__title">Вход</h2>
                <form className="login__form" onSubmit={onRegister}>
                    <input value={email || ""} onChange={handleChangeEmail} placeholder="Email" className="login__username" required id="username" name="username" type="email" />
                    <input value={password || ""} onChange={handleChangePassword} placeholder="Пароль" className="login__password" required id="password" name="password" type="password" autoComplete="on" />
                    <button type="submit" className="login__btn">Войти</button>
                </form>
            </section>
        </>
    );
}

export default Login;
