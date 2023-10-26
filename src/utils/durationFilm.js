export default function durationFilm(time) {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return (hours === 0 ? `${minutes}м` : `${hours}ч ${minutes}м`);
};