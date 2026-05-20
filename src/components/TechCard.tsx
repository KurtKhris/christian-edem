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
          el.style.boxShadow = `0 0 24px ${color}55, 0 16px 40px rgba(0,0,0,0.4)`;
          const iconWrap = el.querySelector('.skill-icon-wrap') as HTMLElement;
          if (iconWrap) { iconWrap.style.borderColor = `${color}66`; iconWrap.style.boxShadow = `0 0 14px ${color}44`; }
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = '';
          el.style.boxShadow = '';
          const iconWrap = el.querySelector('.skill-icon-wrap') as HTMLElement;
          if (iconWrap) { iconWrap.style.borderColor = ''; iconWrap.style.boxShadow = ''; }
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
