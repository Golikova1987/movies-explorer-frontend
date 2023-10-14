import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css";
import Button from "../Button/Button";

export default function NotFoundPage ({ status = 404, message = 'Страница не найдена' }) {
  const navigate = useNavigate();
  const goBack = () => {navigate(-1)};

  return (
    <main>
      <section className="not-found">
        <h1 className="not-found__title">{status}</h1>
        <h2 className="not-found__subtitle">{message}</h2>
        <Button className="not-found__button" onClick={goBack}>Назад</Button>
      </section>
    </main>
  );
}