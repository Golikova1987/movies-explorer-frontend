
const SERVER_ERROR = 500;
const UNAUTHORIZED = 401;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const FORBIDDEN = 403;
const CONFLICT = 409;
const NOT_UNIQE = 11000;

const SERVER_ERROR_TEXT = 'Ошибка на сервере.';
const UNAUTHORIZED_TEXT = 'Неверный логин или пароль.';
const CONFLICT_TEXT = 'Такой пользователь уже существует.';

module.exports = {
    SERVER_ERROR,
    UNAUTHORIZED,
    BAD_REQUEST,
    NOT_FOUND,
    FORBIDDEN,
    CONFLICT,
    NOT_UNIQE,
    SERVER_ERROR_TEXT,
    UNAUTHORIZED_TEXT,
    CONFLICT_TEXT,
};