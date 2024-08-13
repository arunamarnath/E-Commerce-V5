import React from 'react'
import Header from '@/components/Header'
import styled from 'styled-components';
import Center from '@/components/Center';
import WhiteBox from '@/components/WhiteBox';
import { useSession } from 'next-auth/react';
import {  signIn, signOut } from 'next-auth/react';
import Link from 'next/link';



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

if (!session) {
    return (
      <>
        <Header />
        <Center>
          <h2>Please sign in to view your Account  <AuthLink href={""} onClick={() => signIn()}>SignIn</AuthLink></h2>
          
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
