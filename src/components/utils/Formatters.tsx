import numeral from "numeral";

function Formatters({ format, children, name }) {
  return (
    <div>
      <p> <span>{name} </span> R$ {numeral(children).format(format)}</p>
    </div>
  );
}

export default Formatters;
