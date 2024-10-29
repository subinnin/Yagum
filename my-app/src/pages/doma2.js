import React from 'react';
import styles from './doma2.module.css';

import { useNavigate } from 'react-router-dom'

const Doma2 = () => {
    const navigate = useNavigate(); //useNavigate 훅 사용
    const navigateToDoma1 = () =>{
        navigate('/doma1')
    }
    return (
        <div>
            <header className={styles.title}>냉장고를 야금야금</header>
            <div className={styles.cuttingBoard}>
                <div className={`${styles.side} ${styles.leftSide}`}> {/* 수정 */}
                    <div onClick={navigateToDoma1} className={styles.sideInside}>
                        <p className={styles.writingMode}>이전</p>
                    </div>
                </div>
                <div className={`${styles.side} ${styles.rightSide}`}> {/* 수정 */}
                    <div className={styles.sideInside}>
                        <p className={styles.writingMode}>다음</p>
                    </div>
                </div>
                <div>
                    <div className={styles.methodTitle}>1.당근씻기</div>
                </div>
                <div className={styles.middleArea}>
                    <div className={styles.imgArea}></div>
                </div>
                <div className={styles.bottomArea}>
                    <div className={styles.methodExplain}>파를 깨끗이 씻어줍니다.</div>
                </div>
            </div>
        </div>
    );
};

export default Doma2;
