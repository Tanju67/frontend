import React from "react";
import classes from "./ColItem.module.css";
import { Link } from "react-router-dom";

function ColItem({ colIndex, places }) {
  const column = places.map((place, i) => {
    return (
      i % 3 === colIndex && {
        image: place.image,
        id: place._id,
        title: place.title,
      }
    );
  });
  return (
    <div className={classes.column}>
      {column.map(
        (item) =>
          item && (
            <Link key={item.id} to={`/places/${item.id}`}>
              <div
                className={classes.image}
                data-after={`${item.title} \nClick for detail`}
              >
                <img
                  key={item.id}
                  src={process.env.REACT_APP_BASE_URL + item.image}
                  alt={item.title}
                />
              </div>
            </Link>
          )
      )}
    </div>
  );
}

export default ColItem;
