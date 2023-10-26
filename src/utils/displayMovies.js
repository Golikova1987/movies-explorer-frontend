import * as screen from "../utils/constants";

// функция отображения карточек при разном расширении экрана, и добавления карточек по кнопке "ещё"
export default function displayMovies() {

    //начальные значения при максимальном экране
    const numberCards = { cards: screen.Number_Сards_Max, add: screen.Add_Cards_Max };

    // отображение при экране < 1280
    if (window.innerWidth < screen.Max_Width_Screen) {
        numberCards.cards = screen.Number_Сards_Center;
        numberCards.add = screen.Add_Cards_Middle;
    }

    // отображение при экране < 990
    if (window.innerWidth < screen.Center_Width_Screen) {
        numberCards.cards = screen.Number_Сards_Middle;
        numberCards.add = screen.Add_Cards_Mobile;
    }

    // отображение при экране < 768
    if (window.innerWidth < screen.Mobile_Width_Screen) {
        numberCards.cards = screen.Number_Сards_Mobile;
        numberCards.add = screen.Add_Cards_Mobile;
    }
    return numberCards;
};