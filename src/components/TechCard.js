const TechCard = ({ image, name, color }) => {
  return (
    <div className="col-6 col-md-3 mt-3">
      <div className="card h-100">
        <div className="card-body text-center">
          <div className="logo">
            <img src={image} alt={name} className="img-fluid" />
          </div>
          <div className="name mt-2">
            <h6 style={{ color }} className="text-uppercase">{name}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechCard;