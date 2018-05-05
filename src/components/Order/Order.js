import React from 'react';

import classes from './Order.css';

const order = (props) => {
  const ingredients = [];
  for (let key in props.ingredients) {
    ingredients.push(`${key} (${props.ingredients[key]})`);
  }

  return (
    <div className={classes.Order}>
      <p>
        Ingredients:{' '}
        <span style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px'
        }}>
          {ingredients.join(', ')}
        </span>
      </p>
      <p>
        Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
