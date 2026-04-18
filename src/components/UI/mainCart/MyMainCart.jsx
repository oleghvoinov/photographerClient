import "./myMainCart.scss";

const MyMainCart = ({ children, alt, src, ...props }) => {
  return (
    <div className="main-nav__item" {...props}>
      <div className="main-nav__link">
        <img src={src} alt={alt} />
      </div>
      <div className="main-nav__title-wrapper">
        <h2 className="main-nav__title">
          <span>{children}</span>
        </h2>
      </div>
    </div>
  );
};

export default MyMainCart;
