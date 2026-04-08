import React from 'react';

interface TechCardProps {
  image: string;
  name: string;
  color?: string;
}

const TechCard = ({ image, name, color = '#FF5F6D' }: TechCardProps) => {
  return (
    <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4">
      <div
        className="skill-card"
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = color;
          el.style.boxShadow = `0 16px 40px ${color}22, 0 0 0 1px ${color}33`;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = '';
          el.style.boxShadow = '';
        }}
      >
        <div className="skill-icon-wrap">
          <img src={image} alt={name} />
        </div>
        <p className="skill-name">{name}</p>
      </div>
    </div>
  );
};

export default TechCard;