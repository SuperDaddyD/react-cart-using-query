import CartItem from "../CartItem/CartItem";

//Styles
import { Wrapper } from "./Cart.styles";

//Types
import { CartItemType } from "../App";

export type whatPropsAreNeededInComponent = {
  cartItems: CartItemType[];
  addToCart: (arbitraryname: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<whatPropsAreNeededInComponent> = ({
  cartItems,
  addToCart,
  removeFromCart,
}) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack, item) => ack + item.price * item.amount, 0);

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>

      {cartItems.length === 0 ? <div>No Items in cart</div> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}

      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Cart;
