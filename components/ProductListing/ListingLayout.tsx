import { useState, useEffect } from "react";
import Card, { CardContainer } from "../global/Card.component";
import Navbar from "../global/Navbar.component";
import SearchBar from "../global/SearchBar.component";
import styled from "styled-components";
import axios from "axios";
import Filter from "../global/Filter.component";

export default function ListingLayout() {
  const [prodData, setProdData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    axios.get('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json')
      .then((res) => {
        setProdData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])
  return (
    <>
      <Navbar />
      <SearchBar data={prodData} />
      <Gap></Gap>
      <MainLayout>
        <FilterContainer>
          <Filter data={prodData} filterData={filterData} setFilterData={setFilterData} />
        </FilterContainer>
        <MainCardContainer>
          {
            filterData.length > 0 ? filterData.map((item: any, index: number) => {
              return <Card key={index} data={item} />
            }
            ) : prodData.map((item: any, index: number) => {
              return <Card key={index} data={item} />
            }
            )
          }
        </MainCardContainer>
      </MainLayout>
    </>
  );
}

export const Gap = styled.div`
  margin-top: 40px;
`;

export const MainCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  @media screen and (min-width: 768px) {
    width: 80%;
    margin: 0 auto;
  }
`;

export const MainLayout = styled.div`
    display: flex;
`;

export const FilterContainer = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    width: 20%;
  }
`