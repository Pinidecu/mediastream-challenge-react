/**
 * Exercise 01: The Retro Movie Store
 * Implement a shopping cart with the next features for the Movie Store that is selling retro dvds:
 * 1. Add a movie to the cart
 * 2. Increment or decrement the quantity of movie copies. If quantity is equal to 0, the movie must be removed from the cart
 * 3. Calculate and show the total cost of your cart. Ex: Total: $150
 * 4. Apply discount rules. You have an array of offers with discounts depending of the combination of movie you have in your cart.
 * You have to apply all discounts in the rules array (discountRules).
 * Ex: If m: [1, 2, 3], it means the discount will be applied to the total when the cart has all that products in only.
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import "./assets/styles.css";
import { useState } from "react";

export default function Exercise01() {
  const movies = [
    {
      id: 1,
      name: "Star Wars",
      price: 20,
    },
    {
      id: 2,
      name: "Minions",
      price: 25,
    },
    {
      id: 3,
      name: "Fast and Furious",
      price: 10,
    },
    {
      id: 4,
      name: "The Lord of the Rings",
      price: 5,
    },
  ];

  const discountRules = [
    {
      m: [3, 2],
      discount: 0.25,
    },
    {
      m: [2, 4, 1],
      discount: 0.5,
    },
    {
      m: [4, 2],
      discount: 0.1,
    },
  ];

  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState({ 1: 0, 2: 0, 3: 0, 4: 0 });
  //const [discount, setDiscount] = useState(0);

  function addToCart(o) {
    console.log("Add to cart", o);
    let aux = false;
    cart.forEach((c, i) => {
      if (c.id === o.id) {
        let copyCart = cart;
        copyCart[i].quantity++;
        aux = true;
        setCart(copyCart);
      }
    });
    if (!aux) {
      o.quantity = 1;
      setCart([...cart, o]);
    }
  }

  const removeMovie = (id) => {
    const newCart = cart.filter((c) => c.id !== id);
    setCart(newCart);
  };
  const getDiscount = () => {
    let discount = 0;
    
    discountRules.forEach(dr=>{
      let makeDiscount = true;
      Object.keys(quantity).forEach(q=>{
        //console.log(quantity);
        console.log(q);
        console.log(dr.m);
        console.log(quantity);
        if(dr.m.includes(parseInt(q))){
          if(quantity[q]!==1) {
            makeDiscount = false;
            console.log("0000000000");
          };
        }else{
          if (quantity[q] !== 0) {
            makeDiscount = false;
            console.log("aaaaaa");
          };
        }
      })
      if(makeDiscount)discount=dr.discount;
    }); 

    return discount*getTotal();
  };
  const getTotal = () => {
    let total = 0;
    cart.forEach((c) => {
      total += c.price * quantity[c.id];
    });
    return total;
  };

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((o) => (
            <li className="movies__list-card">
              <ul>
                <li>ID: {o.id}</li>
                <li>Name: {o.name}</li>
                <li>Price: ${o.price}</li>
              </ul>
              <button
                onClick={() => {
                  console.log("Add to cart", o);
                  setQuantity({
                    ...quantity,
                    [o.id]: quantity[o.id] + 1,
                  });
                  let aux = false;
                  cart.forEach((c) => {
                    if (c.id === o.id) {
                      aux = true;
                    }
                  });
                  if (!aux) {
                    setCart([...cart, o]);
                  }
                }}
              >
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        {cart.length === 0 ? <p>Your cart is empty</p> : null}
        <ul>
          {cart.map((x) => (
            <li className="movies__cart-card">
              <ul>
                <li>ID: {x.id}</li>
                <li>Name: {x.name}</li>
                <li>Price: ${x.price}</li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button
                  onClick={() => {
                    console.log("Decrement quantity", x);
                    if (quantity[x.id] === 1) {
                      removeMovie(x.id);
                    }
                    setQuantity({
                      ...quantity,
                      [x.id]: quantity[x.id] - 1,
                    });
                  }}
                >
                  -
                </button>
                <span>{quantity[x.id]}</span>
                <button
                  onClick={() => {
                    console.log("Increment quantity", x);
                    setQuantity({
                      ...quantity,
                      [x.id]: quantity[x.id] + 1,
                    });
                  }}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Discount: ${getDiscount()}</p>
          <p>Total: ${getTotal() - getDiscount()}</p>
        </div>
      </div>
    </section>
  );
}
