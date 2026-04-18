import "./mySidebarLink.scss";

const MySidebarLink = ({ children, handler, index, activeIndex }) => {
  return (
    <div
      onClick={() => handler(index)}
      className={`sidebar__link ${activeIndex === index ? "change" : ""}`}
    >
      {children}
    </div>
  );
};

export default MySidebarLink;
