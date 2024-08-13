import React, { useContext, useEffect, useState } from 'react';
import Header from '@/components/Header';
import styled from 'styled-components';
import Center from '@/components/Center';
import Button from '@/components/Button';
import { CartContext } from '@/components/CartContext';
import axios from 'axios';
import Table from '@/components/Table';
import Input from '@/components/Input';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const NavLink = styled(Link)`
  display: block;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const AuthLink = styled(NavLink)`
  cursor: pointer;
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      if (cartProducts.length > 0) {
        axios.post('/api/cart', { ids: cartProducts, userId: session.user.id })
          .then(response => {
            setProducts(response.data);
          });
      } else {
        setProducts([]);
      }
    }
  }, [cartProducts, session]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  async function goToPayment() {
    try {
      // Send order details to your API and clear the cart
      await axios.post('/api/checkout', {
        name,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        cartProducts,
      });
      
      // Clear the cart after sending the order
      clearCart();
      
      // Redirect to Stripe checkout
      const response = await axios.post('/api/checkout', {
        name,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        cartProducts,
      });
      
      if (response.data.url) {
        window.location = response.data.url;
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find(p => p._id === productId)?.price || 0;
    total += price;
  }

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order is sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }

  if (!session) {
    return (
      <>
        <Header />
        <Center>
          <h2>Please sign in to view your cart.<AuthLink href={""} onClick={() => signIn()}>SignIn</AuthLink></h2>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Cart</h2>
            {!cartProducts.length && <div>Your cart is empty</div>}
            {products.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt="" />
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button onClick={() => lessOfThisProduct(product._id)}>-</Button>
                        <QuantityLabel>
                          {cartProducts.filter(id => id === product._id).length}
                        </QuantityLabel>
                        <Button onClick={() => moreOfThisProduct(product._id)}>+</Button>
                      </td>
                      <td>${cartProducts.filter(id => id === product._id).length * product.price}</td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 320 512">
                       <path d="M308 96c6.6 0 12-5.4 12-12V44c0-6.6-5.4-12-12-12H12C5.4 32 0 37.4 0 44v44.7c0 6.6 5.4 12 12 12h85.3c27.3 0 48.3 10 61 27.3H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h158.8c-6.2 36.1-33 58.6-74.8 58.6H12c-6.6 0-12 5.4-12 12v53c0 3.3 1.4 6.5 3.9 8.8l165.1 152.4a12 12 0 0 0 8.1 3.2h82.6c10.9 0 16.2-13.4 8.1-20.8L116.9 319.9c76.5-2.3 131.1-53.4 138.3-127.9H308c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-58.7c-3.5-11.5-8.3-22.2-14.3-32H308z" />
                        </svg>
                        {total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts.length && (
            <Box>
              <h2>Order information</h2>
              <Input type="text" placeholder="Name" value={name} name="name" onChange={ev => setName(ev.target.value)} />
              <Input type="text" placeholder="Email" value={email} name="email" onChange={ev => setEmail(ev.target.value)} />
              <CityHolder>
                <Input type="text" placeholder="City" value={city} name="city" onChange={ev => setCity(ev.target.value)} />
                <Input type="text" placeholder="Postal Code" value={postalCode} name="postalCode" onChange={ev => setPostalCode(ev.target.value)} />
              </CityHolder>
              <Input type="text" placeholder="Street Address" value={streetAddress} name="streetAddress" onChange={ev => setStreetAddress(ev.target.value)} />
              <Input type="text" placeholder="Country" value={country} name="country" onChange={ev => setCountry(ev.target.value)} />
              <Button black block onClick={goToPayment}>Continue to payment</Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
