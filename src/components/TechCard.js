const TechCard = ({ image, name, color }) => {
    return (
      <div className="col-sm-3 mt-3">
        <div className="card">
          <div className="card-body text-center">
            <div className="logo">
              <img src={image} alt={name} className="img-fluid" />
            </div>
            <div className="name mt-2">
              <h6 style={{ color: color }} className="text-uppercase">{name}</h6>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default TechCard;
  