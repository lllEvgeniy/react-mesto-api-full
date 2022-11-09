class Api {
  constructor(host) {
    this._host = host;
    this._getJsonOrError = this._getJsonOrError.bind(this);
    this._getHeaders = this._getHeaders.bind(this);
  }

  _getJsonOrError(res) {
    if (res.ok) {
      return res.json();
    }

    throw new Error("Ошибка при загрузке данных");
  }

  _getHeaders(token) {
    return {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
  }

  getInfo(section, subsection, token) {
    return fetch(`${this._host}/${section}${subsection}`, {
      headers: this._getHeaders(token),
    }).then(this._getJsonOrError);
  }

  createCard(name, link, token) {
    return fetch(`${this._host}/cards`, {
      method: "POST",
      headers: this._getHeaders(token),
      body: JSON.stringify({ name, link }),
    }).then(this._getJsonOrError);
  }

  editProfile(name, about, token) {
    return fetch(`${this._host}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(token),
      body: JSON.stringify({ name, about }),
    })
      .then(this._getJsonOrError)
      .then((result) => {
        return result;
      });
  }

  deleteCard(id, token) {
    return fetch(`${this._host}/cards/${id}`, {
      method: "DELETE",
      headers: this._getHeaders(token),
    }).then(this._getJsonOrError);
  }

  changeLike(id, status, token) {
    return fetch(`${this._host}/cards/${id}/likes`, {
      method: status ? "PUT" : "DELETE",
      headers: this._getHeaders(token),
    }).then(this._getJsonOrError);
  }

  editAvatar(avatar, token) {
    return fetch(`${this._host}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(token),
      body: JSON.stringify({ avatar }),
    }).then(this._getJsonOrError);
  }
}
const api = new Api(
  "vsemmestomesto.nomoredomains.icu",
);
export default api;