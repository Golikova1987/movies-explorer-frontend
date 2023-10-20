// import "./AboutProject.css";

// const AboutProject = () => {
//   return (
//     <section id="about-project" className="about-project">
//       <h2 className="about-project__title">О проекте</h2>
//       <ul className="about-project__list">
//         <li className="about-project__item">
//           <h3 className="about-project__subtitle">
//             Дипломный проект включал 5 этапов
//           </h3>
//           <p className="about-project__about">
//             Составление плана, работу над бэкендом, вёрстку, добавление
//             функциональности и финальные доработки.
//           </p>
//         </li>
//         <li className="about-project__item">
//           <h3 className="about-project__subtitle">
//             На выполнение диплома ушло 5 недель
//           </h3>
//           <p className="about-project__about">
//             У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
//             соблюдать, чтобы успешно защититься.
//           </p>
//         </li>
//       </ul>
//       <ul className="about-project__list-progress">
//         <li className="about-project__item-progress">
//           <p className="about-project__about-progress">1 неделя</p>
//           <p className="about-project__part-progress">Back-end</p>
//         </li>
//         <li className="about-project__item-progress">
//           <p className="about-project__about-progress about-project__about-progress_part_front">
//             4 недели
//           </p>
//           <p className="about-project__part-progress">Front-end</p>
//         </li>
//       </ul>
//     </section>
//   );
// };

// export default AboutProject;


import "./AboutProject.css";

export default function AboutProject() {
  return (
    <section className="about-project" id='about-project'>
      <h2 className="about-project__header">О проекте</h2>
      <div className="about-project__container">
        <div className="about-project__info">
          <h3 className="about-project__title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__info">
          <h3 className="about-project__title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__deadline-container">
        <div className="about-project__deadline">
          <h4 className="about-project__deadline-title">1 неделя</h4>
          <p className="about-project__deadline-subject">Back-end</p>
        </div>
        <div className="about-project__deadline">
          <h4 className="about-project__deadline-title about-project__deadline-title_type_color">4 недели</h4>
          <p className="about-project__deadline-subject">Front-end</p>
        </div>
      </div>
    </section>
  );
}