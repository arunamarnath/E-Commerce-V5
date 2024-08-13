import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Center from '@/components/Center';
import styled from 'styled-components';
import axios from 'axios';

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 10px;
  margin-top: 40px;
`;

const OrderBox = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  margin-top: 20px;
`;

const OrderItem = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
`;

export default function AccountPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (session) {
      axios.get(`/api/orders?email=${session.user.email}`)
        .then(response => setOrders(response.data))
        .catch(error => console.error('Error fetching orders:', error));
    }
  }, [session]);

  if (!session) {
    return (
      <>
        <Header />
        <Center>
          <h2>Please sign in to view your orders.</h2>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          {orders.length ? (
            orders.map(order => (
              <OrderBox key={order._id}>
                <h3>Order ID: {order._id}</h3>
                <p>Status: {order.paid ? 'Paid' : 'Pending'}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <h4>Products:</h4>
                {order.line_items.map((item, index) => (
                  <OrderItem key={index}>
                    <p>Product: {item.price_data.product_data.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: {item.price_data.unit_amount / 100} INR</p>
                  </OrderItem>
                ))}
              </OrderBox>
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
