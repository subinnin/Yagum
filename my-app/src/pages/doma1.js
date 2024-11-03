import React from 'react';
import styles from './doma1.module.css'

import { useNavigate } from 'react-router-dom'


const Doma1 = () =>{
    const navigate = useNavigate(); //useNavigate 훅 사용

    const navigateToMenu = () =>{
      navigate('/menu')
    }
    const navigateToDoma2 = () =>{
        console.log("doma2로 이동 클릭됨")
        navigate('/doma2')
    }
    return <div>
        <header className = {styles.title}>냉장고를 야금야금</header>
    <div className={styles.cuttingBoard}>
      <div className={`${styles.side} ${styles.leftSide}`}>
        <div onClick={navigateToMenu} className={styles.sideInside}><p className={styles.writingMode}>레시피 선택</p></div>
      </div>
      <div className={`${styles.side} ${styles.rightSide}`}>
        <div onClick={navigateToDoma2} className={styles.sideInside}><p className={styles.writingMode}>음식 만들기</p></div>
      </div>
      <div className={styles.cookingArea}>
        <div className={`${styles.menu} ${styles.menuTitle}`}>김치찌개</div>
      </div>
      <div className={styles.middleArea}>
        <div className={styles.leftColumn}>
          <div className={`${styles.item} ${styles.ingredientArea}`}>
            <p className={styles.titleNeedFood}>필요한 재료</p>
            <p className={styles.needFood}>김치</p>
            <p className={styles.needFood}>돼지고기</p>
            <p className={styles.needFood}>양파</p>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={`${styles.item} ${styles.cookingTimeArea}`}>
            <p className={styles.titleNeedFood}>조리 예상 시간</p>
            <p className={styles.titleNeedFood2}><input type="number" /> 시간</p>
          </div>
        </div>
      </div>
      <div className={styles.bottomArea}>
        <div className={`${styles.item} ${styles.cookingMethodArea}`}>
          <p className={styles.titleNeedFood}>만드는 법</p>
          <p className={styles.makeFood}>1. 김치를 썰어서 담아둡니다</p>
          <p className={styles.makeFood}>2. 돼지고기를 썰어서 담아둡니다.</p>
          <p className={styles.makeFood}>3. 국물을 끓이고 재료를 넣습니다.</p>
          <p className={styles.makeFood}>5. 10 분간 끓여줍니다.</p>
          <p className={styles.makeFood}>6. 요리가 완성되었습니다.</p>
        </div>
      </div>
    </div>
    </div>
}
export default Doma1;