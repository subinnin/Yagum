import React, { useState, useEffect } from 'react';
import styles from './doma1.module.css'
import { useNavigate } from 'react-router-dom'
const Doma1 = () => {
  const navigate = useNavigate(); //useNavigate 훅 사용

  const navigateToMenu = () => {
    navigate('/menu')
  }
  const navigateToHome = () => {
    navigate('/')
  }
  const navigateToDoma2 = () => {
    console.log("doma2로 이동 클릭됨")
    navigate('/doma2')
  }

  const [tinyInfo, setTinyInFo] = useState([]);
  const [needFood, setNeedFood] = useState([]);
  const [needTime, setNeedTime] = useState([]);
  useEffect(() => {
    // Json 형식의 데이터를 받아왔다고 생각하고 작정! ---- 정임이 작성중,,,
    const dbContent = [
      { title: "1. 당근 씻기", explanation: "파를 깨끗이 씻어줍니다." },
      { title: "2. 당근 자르기", explanation: "당근을 적당한 크기로 자릅니다." },
      { title: "3. 조리하기", explanation: "당근을 끓는 물에 넣고 조리합니다." },
      { title: "4. 파 씻기", explanation: "파를 깨끗이 씻어줍니다." },
      { title: "5. 볶기", explanation: "당근을 적당한 크기로 자릅니다." },
      { title: "6. 완성", explanation: "당근을 끓는 물에 넣고 조리합니다." },
    ];
    // 필요한 재료를 받아왔음!
    const dbNeedFood = ['감자' , '당근' , '돼지고기' , '계란' , '마늘' , '양파' ,'감자' , '당근' , '돼지고기' , '계란' , '마늘' , '양파' ];
    // 소요 시간을 받아왔음!!
    const needTime =[30];
    setNeedTime(needTime);
    // ====재료를 동적으로 넣기====
    let need =[];
    dbNeedFood.forEach((v,i)=>{
      need.push(<p className={styles.needFood}>{i+1}.{v}</p>)
    })
    setNeedFood(need);

    // ==== 만드는 법을 동적으로 넣기====
    const titles = dbContent.map((item) => item.title);
    let tiny =[];
    titles.forEach((v,i)=>{
      tiny.push(
        <p className={styles.makeFood}>{v}</p>
      );
    })
    setTinyInFo(tiny);
  }, []);

  return <div>
    <header className={styles.title}>냉장고를 야금야금</header>
    <div className={styles.cuttingBoard}>
      <div className={`${styles.side} ${styles.leftSide}`}>
        <div onClick={navigateToMenu} className={styles.sideInside}><p className={styles.writingMode}>레시피 선택</p></div>
      </div>
      <div className={`${styles.side} ${styles.rightSide}`}>
        <div onClick={navigateToDoma2} className={styles.sideInside}><p className={styles.writingMode}>음식 만들기</p></div>
      </div>
      <div className={styles.cookingArea}>
        <div className={`${styles.menu} ${styles.menuTitle}`}>김치찌개</div>
        <span className={styles.backHomeBtn} onClick={navigateToHome}>냉장고로<br></br>돌아가기</span>
      </div>
      <div className={styles.middleArea}>
        <div className={styles.leftColumn}>
          <div className={`${styles.item} ${styles.ingredientArea}`}>
            <p className={styles.titleNeedFood}>필요한 재료</p>
            <div className={styles.needFoodArea}>
            {needFood}
            </div>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={`${styles.item} ${styles.cookingTimeArea}`}>
            <p className={styles.titleNeedFood}>조리 예상 시간</p>
            <p className={styles.titleNeedFood2}>{needTime} 분</p>
          </div>
        </div>
      </div>
      <div className={styles.bottomArea}>
        <div id='tinyArea' className={`${styles.item} ${styles.cookingMethodArea}`}>
          <p className={styles.titleNeedFood}>만드는 법</p>
          <div className={styles.makeFoodArea}>
          {tinyInfo}
          </div>
        </div>
      </div>
    </div>
  </div>
}
export default Doma1;
// export default dbInHTML;