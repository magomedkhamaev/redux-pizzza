import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";
import NotFoundBlock from "../NotFoundBlock";
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pizza from '../components/Pizza';
import { fetchPizzas } from "../redux/slices/pizzaSlice";


const Home = () => {
  const dispatch = useDispatch();
  const {items, status} = useSelector((state) => state.pizza);
  const {categoryId, sort, searchValue }= useSelector((state) => state.filter);
  const sortType = sort.sortProperty;

 
    // const [items, setItems] = React.useState([]);
    
   const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
   }
   
   const getPizzas = async () => {
    const sortBy = sortType.replace('-', '');
   const order = sortType.includes('-')  ? 'asc': 'desc';
   const category = categoryId > 0 ? `category=${categoryId}` : '';
   const search = searchValue  ? `&search=${searchValue}` : '';
   
   dispatch(fetchPizzas({ sortBy , order, category, search,}))
  }

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue])
  // React.useEffect(() => {
  //  const sortBy = sortType.replace('-', '');
  //  const order = sortType.includes('-')  ? 'asc': 'desc';
  //  const category = categoryId > 0 ? `category=${categoryId}` : '';
  //  const search = searchValue  ? `&search=${searchValue}` : '';

  // // fetch(`https://6358e229c27556d28945ce93.mockapi.io/story?${category}&sortBy=${sortBy}&order=${order}${search}`)
  // // .then((res) => res.json())
  // // .then((data) => {
  // //     setItems(data);
  // //     })
  // //   axios.get(`https://6358e229c27556d28945ce93.mockapi.io/story?${category}&sortBy=${sortBy}&order=${order}${search}`)
  // //   .then((res) => {
  // //     setItems(res.data);
  // //   });

  //  }, [categoryId, sortType, searchValue]);
     const pizzas = items.map((obj) => <Pizza key={obj.id} {...obj}/>)
    
return <>
        <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory}/>
        <Sort  />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
      {status === 'loading' ? <NotFoundBlock/> : pizzas}
      </div>
      
        </>
        
    
}
export default Home;



