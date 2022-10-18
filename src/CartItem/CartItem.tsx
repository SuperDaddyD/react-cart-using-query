import Button from "@material-ui/core/Button";
import { CartItemType } from "../App";
import { Wrapper } from "./CartItem.styles";
import { whatPropsAreNeededInComponent } from "../Cart/Cart";

type CartItemPropsItNeeds = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<CartItemPropsItNeeds> = ({
  item,
  addToCart,
  removeFromCart,
}) => (
  <Wrapper>
    <div>
      <h3>{item.title}</h3>
      <div className="information">
        <p>Price: ${item.price}</p>
        <p>Total ${(item.amount * item.price).toFixed(2)}</p>
      </div>
     <div className="buttons">
     <Button
        className="buttons"
        size="small"
        disableElevation
        variant="contained"
        onClick={() => removeFromCart(item.id)}
      >
        {" "}
        - Remove
      </Button>
      <p>{item.amount}</p>
      <Button
        className="buttons"
        size="small"
        disableElevation
        variant="contained"
        onClick={() => addToCart(item)}
      >
        + Add
      </Button>
     </div>
    </div>
    <img src={item.image} alt={item.title} />
  </Wrapper>
);

export default CartItem;
