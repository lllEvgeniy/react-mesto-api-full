const mongoose = require('mongoose');
const Card = require('../models/card');
const BadRequest = require('../errors/BadRequest');
const NotFoundError = require('../errors/Not-found-err');
const ImpossibleDelete = require('../errors/Impossible-to-delete');
const {
  ERROR_MESSAGE,
} = require('../utils/constants');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      next(err);
    });
};

const createCards = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequest(ERROR_MESSAGE.CREATE_CARDS_ERROR));
      }
      return next(err);
    });
};

const deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(ERROR_MESSAGE.NOT_FOUND_CARDSID);
      }
      if (card.owner.toString() !== req.user._id) {
        throw new ImpossibleDelete(ERROR_MESSAGE.IMPOSSIBLE_TO_DEL);
      }
      return Card.findByIdAndRemove(req.params.cardId)
        .then((removeCard) => res.send(removeCard));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequest(ERROR_MESSAGE.INCORRECT_CARDSID));
      }
      return next(err);
    });
};

const likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw new NotFoundError(ERROR_MESSAGE.NOT_FOUND_CARDSID);
    }
    return res.send({ data: card });
  })
  .catch((err) => {
    if (err instanceof mongoose.Error.CastError) {
      return next(new BadRequest(ERROR_MESSAGE.LIKE_CARDID_DATA_ERROR));
    }
    return next(err);
  });

const dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw new NotFoundError(ERROR_MESSAGE.NOT_FOUND_CARDSID);
    }
    return res.send({ data: card });
  })
  .catch((err) => {
    if (err instanceof mongoose.Error.CastError) {
      return next(new BadRequest(ERROR_MESSAGE.LIKE_CARDID_DATA_ERROR));
    }
    return next(err);
  });

module.exports = {
  createCards,
  getCards,
  deleteCardById,
  likeCard,
  dislikeCard,
};
