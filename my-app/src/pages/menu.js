import React from 'react';
import styles from './menu.module.css'
import { useNavigate } from 'react-router-dom'

const Menu = () => {
    const navigate = useNavigate(); //useNavigate 훅 사용
    const navigateToHome = () => {
        navigate('/')
      }
    const navigateToDoma1 = () =>{
        navigate('/doma1')
    }
    return (
        <div>
            <header className={styles.title}>냉장고를 야금야금</header>
            <section className={styles.mainArea}>
                <div className={styles.menu}>
                    <section className={styles.todays}>
                        <div>
                            <h1>TODAY'S MENU</h1>
                            
                        </div>
                        <div className={styles.btnArea}>
                        <div className={styles.againMenu}>🌮다른 메뉴 추천받기🍜</div>
                        <span className={styles.backHomeBtn} onClick={navigateToHome}>냉장고로 돌아가기</span>
                        </div>
                        
                    </section>
                    <div className={styles.dividingLine}></div>
                    <section className={styles.menuList}>
                        <div className={styles.menuImg}>
                            <div className={styles.picBox}>
                                <div onClick={navigateToDoma1} className={styles.pic1}></div>
                            </div>
                        </div>
                        <div className={styles.dividingLine}></div>
                        <div className={styles.menuName}>
                            <div>salad</div>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
};

export default Menu;