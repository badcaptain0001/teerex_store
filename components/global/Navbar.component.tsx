import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
export default function Navbar() {
    const [userCartData, setUserData] = useState([] as any);
    useEffect(() => {
        const cartData = localStorage.getItem('cartData');
        if (cartData) {
            const cartDataParse = JSON.parse(cartData);
            setUserData(cartDataParse);
        }
    }, []);
    const router = useRouter();
    const handleCart = () => {
        router.push('/cart');
    };
    return (
        <>
            <NavbarContainer>
                <NavbarLogo className="heading">TeeRex Store</NavbarLogo>
                <NavbarMenu className="heading">
                    <NavbarItem>Products</NavbarItem>
                    <NavbarCart onClick={handleCart}>
                        <svg width="128" height="128" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor" d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1V2m6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5H16Z" />
                        </svg>
                        {userCartData.length > 0 && <CartValue>{userCartData.length > 0 ? userCartData.length : '' }</CartValue>}
                    </NavbarCart>
                </NavbarMenu>
            </NavbarContainer>
        </>
    );
}

export const NavbarContainer = styled.div`
  height: 60px;
  width: 100%;
  background-color: var(--primary-color);
  position: sticky;
  top: 0;
  left: 0;
  z-index: 999;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media screen and (min-width: 768px) {
  }
`;

export const NavbarLogo = styled.div`
  padding-left: 20px;
  font-size: 1.2rem;
  font-weight: 500;
  color: #fff;
  @media screen and (min-width: 768px) {
    padding-left: 60px;
  }
`

export const NavbarMenu = styled.div`
  display: flex;
  padding-right: 20px;
    @media screen and (min-width: 768px) {
        padding-right: 60px;
    }
`

export const NavbarItem = styled.div`
  display:none;
    @media screen and (min-width: 768px) {
        display: block;
        color: #fff;
        font-size: 1rem;
        cursor: pointer;
        padding-right: 40px;
        letter-spacing: 1px;
        &:hover {
            color: #fff;
            opacity: 0.8;
            transition: all 0.3s ease-in-out;
        }
    }
`

export const NavbarCart = styled.div` 
    color: #fff;
    cursor: pointer;
    position: relative;
    svg {
        width: 24px;
        height: 24px;
    }
`

export const CartValue = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    background-color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    color: #000;
    font-weight: 500;
    margin-top: -10px;
    margin-right: -10px;

`