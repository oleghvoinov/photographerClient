import "./mySubCart.scss";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const MySubCart = ({ post, key }) => {
  console.log(post);
  return (
    <Link
      to={`/case/${post._id}`}
      key={key + 1}
      className="portfolio-grid__item"
    >
      <img src={post.prewieImg[0]?.path} alt={post.name} />
      <div className="portfolio-grid__title">
        {post.name}{" "}
        <span>
          {post.date ? `/${dayjs(post.date).format("DD.MM.YYYY")}` : null}
        </span>
      </div>
    </Link>
  );
};

export default MySubCart;
