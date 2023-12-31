import { useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useFormValidation from "../../hooks/useFormValidation";
import "./Profile.css";
import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";

export default function Profile({
  handleLogout,
  error,
  setError,
  isLoading,
  handleUpdateUser,
  isEdit,
  setIsEdit,
}) {
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    return () => {
      setError("");
      setIsEdit(false);
    };
  }, [setError, setIsEdit]);

  const initialValues = {
    name: currentUser.name || "",
    email: currentUser.email || "",
  };

  const validationRules = {
    name: [
      {
        regex: /^(?!\s*$).+/,
        message: "Поле обязательно для заполнения",
      },
      {
        regex: /^[A-Za-zА-Яа-я\s-]+$/,
        message:
          "Поле может содержать только латиницу, кириллицу, пробел или дефис",
      },
      {
        regex: /^.{2,30}$/,
        message: "Поле должно содержать от 2 до 30 символов",
      },
    ],
    email: [
      {
        regex: /^(?!\s*$).+/,
        message: "Поле обязательно для заполнения",
      },
      {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message:
          "Поле может содержать адрес электронной почты (например, test@test.test)",
      },
    ],
  };

  const { handleChange, values, errors, resetForm } = useFormValidation(
    initialValues,
    validationRules
  );
// console.log(errors);
  useEffect(() => {
    if (currentUser) {
      resetForm(
        {
          name: currentUser.name,
          email: currentUser.email,
        },
        {},
        false
      );
    }
  }, [currentUser, resetForm]);

  function handleSubmitSave(e) {
    e.preventDefault();
    handleUpdateUser({ name: values.name, email: values.email });
  };

  function handleSubmitEdit(e) {
    e.preventDefault();
    setIsEdit(true);
  };

  return (
    <main>
      <section className="profile">
        <h1 className="profile__title">{`Привет, ${
          currentUser.name || "Пользователь"
        }!`}</h1>
        <Form
          className={`profile__form ${isEdit ? "profile__form_type_save" : ""}`}
          name="profile"
          onSubmit={isEdit ? handleSubmitSave : handleSubmitEdit}
        >
          <div className="profile__inputs">
            <Input
              classNameInput={`profile__input ${
                errors.name ? "profile__input_type_error" : ""
              }`}
              classNameLabel="profile__label profile__label_type_name"
              type="text"
              name="name"
              placeholder="Имя"
              label="Имя"
              value={values.name || ""}
              disabled={!isEdit}
              onChange={(e) => handleChange(e)}
              minLength="2"
              maxLength="30"
              required
            >
            </Input>
            <span className="profile__input-error profile__input-error_type_name">
              {errors.name}
            </span>
            <Input
              classNameInput={`profile__input ${
                errors.email ? "profile__input_type_error" : ""
              }`}
              classNameLabel="profile__label profile__label_type_email"
              type="email"
              name="email"
              placeholder="E-mail"
              label="E-mail"
              value={values.email || ""}
              disabled={!isEdit}
              onChange={(e) => handleChange(e)}
              required
            />
            <span className="profile__input-error profile__input-error_type_email">
              {errors.email}
            </span>
          </div>
          <div
            className={`profile__buttons ${
              isEdit ? "profile__buttons_type_save" : ""
            }`}
          >
            {isEdit ? (
              <>
                <p className="profile__error">{error}</p>
                <Button
                  className="profile__button profile__button_type_save"
                  type="submit"
                  text="Сохранить"
                  disabled={
                    (errors.name ||
                      errors.email ||
                      (values.name === currentUser.name &&
                        values.email === currentUser.email) ||
                      isLoading) &&
                    true
                  }
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
                  className="profile__button profile__button_type_logout"
                  type="button"
                  text="Выйти из аккаунта"
                  onClick={handleLogout}
                />
              </>
            )}
          </div>
        </Form>
      </section>
    </main>
  );
}
