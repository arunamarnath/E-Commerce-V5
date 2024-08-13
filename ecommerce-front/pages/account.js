import React from 'react'
import Header from '@/components/Header'
import styled from 'styled-components';
import Center from '@/components/Center';
import WhiteBox from '@/components/WhiteBox';
import { useSession } from 'next-auth/react';



const account = () => {
const { data: session } = useSession();

 const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 10px;
  margin-top: 40px;
 
`;

if (!session) {
    return (
      <>
        <Header />
        <Center>
          <h2>Please sign in to view your Account</h2>
        </Center>
      </>
    );
  }


  return (
    <>
    <Header/>
  
    <Center>



        <ColumnsWrapper>
        <WhiteBox></WhiteBox>
        <WhiteBox></WhiteBox>
        </ColumnsWrapper>
    
   
    
    </Center>

    </>
  )
}

export default account
