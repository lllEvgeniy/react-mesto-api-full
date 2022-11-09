import { useState, useEffect } from "react";

import { useNavigate, Routes, Route } from "react-router-dom";
import api from "../utils/Api";
import Main from "./Main";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardsContext } from "../contexts/CardsContext";
import { getContent, auth } from '../utils/Auth'

function App() {
  const navigate = useNavigate()
  const [selectedCard, setSelectedCard] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [currentUser, setСurrentUser] = useState("");
  const [cards, setСards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [state, setState] = useState('');
  const [register, setRegister] = useState(false);
  const [token, setToken] = useState('')

  useEffect(() => {
    getData();
  }, []);

  function handleGetToken(token) {
    setToken(token)
  }

  function handLeloggedIn() {
    setLoggedIn(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(data) {
    api
      .editProfile(data.name, data.about, token)
      .then((data) => {
        setСurrentUser(data.data);
        closeAllPopups();
      })
      .catch((errorMessage) => {
        console.log(errorMessage);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .editAvatar(data, token)
      .then((data) => {
        setСurrentUser(data.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateCard(card) {
    api
      .createCard(card.title, card.link, token)
      .then((newCard) => {
        setСards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsRegisterPopupOpen(false)
    setSelectedCard({});

  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api.changeLike(card._id, !isLiked, token).then((newCard) => {
      setСards((dataCards) => dataCards.map((c) => (c._id === card._id ? newCard.data : c)));
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id, token).then(() => {
      setСards((dataCards) =>
        dataCards.filter(function (el) {
          return el._id !== card._id;
        })
      )
    })
      .catch((errorMessage) => {
        console.log(errorMessage);
      })
  }

  function handleSubmitSignup({ email, password }) {
    auth(password, email, '/signup')
      .then((response) => {
        if (response) {
          setIsRegisterPopupOpen(true)
          if (response._id) {
            setRegister(true)
          }
        } else {
          console.log('Что-то пошло не так!');
        }
      })
      .catch((err) => console.log(err));
    setRegister(false)
  }

  function handleSubmitSignin({ email, password }) {
    auth(password, email, '/signin')
      .then((response) => {
        localStorage.setItem('jwt', response.token);
        if (response.token) {
          getData()
        } else {
          setIsRegisterPopupOpen(true)
          console.log('Что-то пошло не так!');
        }

      })
      .catch((err) => console.log(err));
  }

  function getData() {
    const token = localStorage.getItem('jwt')
    handleGetToken(token)
    Promise.all([api.getInfo("cards", "", token), api.getInfo("users", "/me", token)])
      .then(([dataCards, dataUser]) => {
        setСards(dataCards);
        setСurrentUser(dataUser.data);
      })
    getContent(token).then((res) => {
      if (res) {
        const userData = {
          email: res.data.email
        }
        setState(userData)
        handLeloggedIn()
        navigate("/")
      }
    })
      .catch((errorMessage) => {
        console.log(errorMessage);
      });
  }

  return (
    <div className="App">

      <CardsContext.Provider value={cards}>
        <CurrentUserContext.Provider value={currentUser}>
          <div className="page">
            <Routes>
              <Route path="*" element={<ProtectedRoute loggedIn={loggedIn} component={<Main
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
                onCardClick={handleCardClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                data={state}
              />}></ProtectedRoute>} />
              <Route path="/sign-in" element={<Login handleSubmit={handleSubmitSignin} handleChangePassword />} />
              <Route path="/sign-up" element={<Register handleSubmit={handleSubmitSignup} handleChangePassword />} />
            </Routes>
            <Footer />
            <PopupWithForm
              buttonText="Да"
              onClose={closeAllPopups}
              name="delete-card"
              title="Вы уверены?"
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleUpdateCard}
            />
            <EditAvatarPopup
              onUpdateAvatar={handleUpdateAvatar}
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
            />
            <EditProfilePopup
              onUpdateUser={handleUpdateUser}
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
            />
            <ImagePopup onClose={closeAllPopups} card={selectedCard} />
            <InfoTooltip complete={'Вы успешно зарегистрировались!'} cancel={'Что-то пошло не так! Попробуйте ещё раз.'} register={register} onClose={closeAllPopups} isOpen={isRegisterPopupOpen} />
          </div>
        </CurrentUserContext.Provider>
      </CardsContext.Provider>

    </div>
  );
}

export default App;
