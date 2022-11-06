import { useContext } from "react";
import elementTrash from "../img/Trash.svg";
import { CardsContext } from "../contexts/CardsContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const cards = useContext(CardsContext);

  const currentUser = useContext(CurrentUserContext);

  return (

    <section className="elements">
      {cards.map((card) => (
        <article key={card._id} className="element">
          <img
            onClick={function handleCardDelete() {
              props.onCardDelete(card);
            }}
            className={`element__trash ${
              card.owner === currentUser._id ? "element__trash_active" : ""
            }`}
            src={elementTrash}
            alt="кнопка для удаления картинки"
          />
          <img
            onClick={function handleClick() {
              props.onCardClick(card);
            }}
            className="element__img"
            src={card.link}
            alt={card.name}
          />
          <div className="element__wrapper">
            <h2 className="element__title">{card.name}</h2>
            <div className="element__details">
              <button
                onClick={function handleLikeClick() {
                  props.onCardLike(card);
                }}
                type="button"
                className={`element__like ${
                  card.likes.some((i) => i === currentUser._id)
                    ? "element__like_active"
                    : ""
                }`}
              ></button>
              <p className="element__counter">{card.likes.length}</p>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

export default Card;
