import { useState } from "react";
import "./Profile.css";
import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";

export default function Profile({ setLoggedIn }) {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEdit(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEdit(false);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <Form
        className={`profile__form ${isEdit ? "profile__form_type_save" : ""}`}
        name="profile"
        onSubmit={isEdit ? handleSave : handleEdit}
      >
        <div className="profile__inputs">
          <Input
            classNameInput="profile__input"
            classNameLabel="profile__label profile__label_type_name"
            type="text"
            name="name"
            placeholder="Имя"
            label="Имя"
            defaultValue="Виталий"
            disabled={!isEdit && "disabled"}
            min="2"
            max="30"
          />
          <Input
            classNameInput="profile__input"
            classNameLabel="profile__label profile__label_type_email"
            type="email"
            name="email"
            placeholder="E-mail"
            label="E-mail"
            defaultValue="pochta@yandex.ru"
            disabled={!isEdit && "disabled"}
          />
        </div>
        <div
          className={`profile__buttons ${
            isEdit ? "profile__buttons_type_save" : ""
          }`}
        >
          {isEdit ? (
            <>
              <p className="profile__error"></p>
              <Button
                className="profile__button profile__button_type_save"
                type="submit"
                text="Сохранить"
                disabled={false}
              />
            </>
          ) : (
            <>
              <Button
                className="profile__button profile__button_type_edit"
                type="submit"
                text="Редактировать"
              />
              <Button
                className="profile__button profile__button_type_exit"
                type="button"
                text="Выйти из аккаунта"
                onClick={handleLogout}
              />
            </>
          )}
        </div>
      </Form>
    </section>
  );
}
