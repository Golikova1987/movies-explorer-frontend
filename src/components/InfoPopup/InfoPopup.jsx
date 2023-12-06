import "./InfoPopup.css";
import imageSrcErr from "../../images/error.svg";
import imageSrcOk from "../../images/ok.svg";

export default function InfoPopup({ isOpen, onClose, isError, error }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__button-exit"
          type="button"
          onClick={onClose}
        ></button>
        <div className="popup__container-icon">
          <img
            className="popup__icon"
            src={isError ? imageSrcOk : imageSrcErr}
            alt={isError ? "Успешно" : "Ошибка"}
          />
          <h2 className="popup__label">{error}</h2>
        </div>
      </div>
    </div>
  );
}