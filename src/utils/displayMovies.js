import * as screen from "../utils/constants";

//отображение карточек при разной ширине экрана, добавление по кнопке ещё
export default function displayMovies() {

    const numberCards = { cards: screen.Number_Сards_Max, add: screen.Add_Cards_Max };

    if (window.innerWidth < screen.Max_Width_Screen) {
        numberCards.cards = screen.Number_Сards_Center;
        numberCards.add = screen.Add_Cards_Middle;
    }

    if (window.innerWidth < screen.Center_Width_Screen) {
        numberCards.cards = screen.Number_Сards_Middle;
        numberCards.add = screen.Add_Cards_Mobile;
    }

    if (window.innerWidth < screen.Mobile_Width_Screen) {
        numberCards.cards = screen.Number_Сards_Mobile;
        numberCards.add = screen.Add_Cards_Mobile;
    }
    return numberCards;
};