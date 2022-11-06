import { useContext } from "react";
import Header from "./Header";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useNavigate, Link } from 'react-router-dom';


function Main(props) {


  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem('jwt');
    navigate('/sign-in');
  }

  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <Header >
        <div className="header__wrapper">
          <p className="header__email">{props.data.email}</p>
          <Link onClick={signOut} to="/sign-in" className="header__register">Выйти</Link>
        </div>
      </Header>
      <main className="content">
        <section className="profile">
          <div className="profile__wrapper">
            <img
              src={currentUser.avatar}
              alt="Фото профиля"
              className="profile__avatar"
            />
            <div onClick={props.onEditAvatar} className="profile__pic"></div>
            <div className="profile__info">
              <div className="profile__title">
                <h1 className="profile__name">{currentUser.name}</h1>
                <button
                  onClick={props.onEditProfile}
                  type="button"
                  className="profile__edit-button"
                ></button>
              </div>
              <p className="profile__occupation">{currentUser.about}</p>
            </div>
          </div>
          <button
            onClick={props.onAddPlace}
            type="button"
            className="profile__add-button"
          ></button>
        </section>
        <Card
          onCardDelete={props.onCardDelete}
          onCardLike={props.onCardLike}
          onCardClick={props.onCardClick}
        />
      </main>
    </>
  );
}

export default Main;
