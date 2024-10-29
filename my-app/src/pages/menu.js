import React from 'react';
import styles from './menu.module.css'

import { useNavigate } from 'react-router-dom'

const Menu = () => {
    const navigate = useNavigate(); //useNavigate 훅 사용

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
                            <h1>TODAY'S</h1>
                        </div>
                        <div>
                            <h1>MENU</h1>
                        </div>
                    </section>
                    <div className={styles.dividingLine}></div>
                    <section className={styles.menuList}>
                        <div className={styles.menuImg}>
                            <div className={styles.picBox}>
                                <div onClick={navigateToDoma1} className={styles.pic1}></div>
                            </div>
                            <div className={styles.picBox}>
                                <div onClick={navigateToDoma1} className={styles.pic2}></div>
                            </div>
                            <div className={styles.picBox}>
                                <div onClick={navigateToDoma1} className={styles.pic3}></div>
                            </div>
                        </div>
                        <div className={styles.menuName}>
                            <div>salad</div>
                            <div>pancake</div>
                            <div>pasta</div>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
};

export default Menu;