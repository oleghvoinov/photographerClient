import "./mySlide.scss";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import React, { forwardRef } from "react";

const MySlide = forwardRef(({ children, photo, date, path }, ref) => {
  return (
    <div ref={ref} className="portfolio-content">
      {photo.map((el, index) => (
        <div key={index} className="portfolio-content__item">
          <Link
            to={`/case/${path}`}
            className="portfolio-content__item-content"
          >
            <img loading="lazy" src={el.path} alt="main-photo" />
          </Link>
        </div>
      ))}

      <Link to={`/case/${path}`} className="portfolio-content__item-title">
        {children} <span>{date ? dayjs(date).format("DD.MM.YYYY") : null}</span>
      </Link>
    </div>
  );
});

export default MySlide;
