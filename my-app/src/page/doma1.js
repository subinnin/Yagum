import React from 'react';
import styles from './doma1.module.css'

import { useNavigate } from 'react-router-dom'

const Doma1 = () =>{
    const navigate = useNavigate(); //useNavigate 훅 사용
    const navigateToDoma2 = () =>{
        console.log("doma2로 이동 클릭됨")
        navigate('/doma2')
    }
    return <div>
        <header className = {styles.title}>냉장고를 야금야금</header>
    <div className={styles.cuttingBoard}>
      <div className={`${styles.side} ${styles.leftSide}`}>
        <div className={styles.sideInside}><p className={styles.writingMode}>선택 레시피</p></div>
      </div>
      <div className={`${styles.side} ${styles.rightSide}`}>
        <div onClick={navigateToDoma2} className={styles.sideInside}><p className={styles.writingMode}>만들기 음식 </p></div>
      </div>
      <div className={styles.cookingArea}>
        <div className={`${styles.menu} ${styles.menuTitle}`}>김치찌개</div>
      </div>
      <div className={styles.middleArea}>
        <div className={styles.leftColumn}>
          <div className={`${styles.item} ${styles.ingredientArea}`}>
            <p>필요한 재료</p>
            <div className={styles.cookingIngredientItem}></div>
            <div className={styles.cookingIngredientItem}></div>
            <div className={styles.cookingIngredientItem}></div>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={`${styles.item} ${styles.cookingTimeArea}`}>
            <p>조리 예상 시간</p>
            <label><input type="number" /> 시간</label>
          </div>
        </div>
      </div>
      <div className={styles.bottomArea}>
        <div className={`${styles.item} ${styles.cookingMethodArea}`}>
          <p>만드는 법</p>
          <div className={styles.cookingMethodItem}></div>
          <div className={styles.cookingMethodItem}></div>
          <div className={styles.cookingMethodItem}></div>
          <div className={styles.cookingMethodItem}></div>
          <div className={styles.cookingMethodItem}></div>
          <div className={styles.cookingMethodItem}></div>
          
        </div>
      </div>
    </div>
    </div>
}
export default Doma1;