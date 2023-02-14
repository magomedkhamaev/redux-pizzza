import React from "react";

function Categories({ value, onClickCategory }) {
  

  const catArr = ['Все','Мясные','Вегетарианская','Гриль','Острые','Закрытые']
  //   const onClickCat = (index) => {
  //     //setcatIndex(index)
  //  }


    return (
        <div className="categories">
            <ul>
              {catArr.map((catName, i) => (
                 <li key={i} onClick={() => onClickCategory(i)} className={value === i ? 'active' : ''}>
                 {catName}
                </li>
              ))}
             
            </ul>
          </div>
    );
}
export default Categories;