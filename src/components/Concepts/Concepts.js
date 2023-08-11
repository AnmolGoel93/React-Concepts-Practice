import "./Concepts.css";
import Concept from "./Concept";

const Concepts = ({ concepts }) => {
  return (
    <ul className="concepts">
      {concepts.map((concept) => (
        <Concept
          image={concept.image}
          title={concept.title}
          description={concept.description}
        />
      ))}
    </ul>
  );
};

export default Concepts;
