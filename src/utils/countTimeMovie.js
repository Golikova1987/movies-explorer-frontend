export default function countTimeMovie(duration) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return (hours === 0 ? `${minutes}м` : `${hours}ч ${minutes}м`);
};