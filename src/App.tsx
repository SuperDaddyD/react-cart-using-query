import { useState } from "react";
import { useQuery } from "react-query";

//Components
import Drawer from "@material-ui/core/Drawer";
import { LinearProgress } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
import Item from "./item/Item";
import { Wrapper, StyledButton } from "./App.styles";
import Cart from './Cart/Cart';
import { isTemplateSpan } from "typescript";

//Types
export type CartItemType = {
  id: number;
  category: number;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
  children: JSX.Element|JSX.Element[];
};




const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

const App = () => {
  //HOOKS
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  //METHODS

  //Query part!!!!!!!!!
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  //GRAB total ITEMS
  const getTotalItems = (items: CartItemType[]) =>
   items.reduce((ack:number, item) => ack + item.amount, 0);
  

  
  
   //ADD TO CART
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev)=>{
  //1.Check to see if the item has previously been added and already exist
  
      const isItemInCart = prev.find((item)=> item.id === clickedItem.id);
//If it does exist then just UPDATE IT, INSTEAD OF ADDING IT TO THE ARRAY UPDATE AMOUNT TO + 1
      if(isItemInCart){
        return prev.map((item)=>(
          item.id === clickedItem.id ?
          {...item, amount:item.amount + 1}: item

        ))
      }
    //If not that means this the first time it is being added TO THE ACTUAL ARRAY!! NOT UPDATE ADDING!!
      return [...prev,{...clickedItem, amount:1}]
    })
  };

  //REMOVE FROM CART

  const handleRemoveFromCart = (clientClickedId:number) =>{
   setCartItems(prev => 
    prev.reduce((ack,item)=>{
        if(item.id === clientClickedId){
         if(item.amount === 1) return ack;
         return [...ack, {...item, amount:item.amount - 1}];
        }else{
          return [...ack,item]
        }
    },[] as CartItemType[])
   );
  };









  if (isLoading) return <LinearProgress />;
  if (error) {
    <div className="claa">Some Thing Went Wrong. ...</div>;
  }

  console.log("This is the data--->", data);
  return (
    <Wrapper>
      <Drawer
        anchor={"right"}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      >
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart}/>
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
