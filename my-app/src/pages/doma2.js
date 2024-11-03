import React,{useEffect, useState}  from 'react';
import styles from './doma2.module.css';

import { useNavigate} from 'react-router-dom'

// const content = [
//     { title: "1. 당근 씻기", explanation: "파를 깨끗이 씻어줍니다." },
//     { title: "2. 당근 자르기", explanation: "당근을 적당한 크기로 자릅니다." },
//     { title: "3. 조리하기", explanation: "당근을 끓는 물에 넣고 조리합니다." },
//     // 더 많은 페이지 내용을 추가할 수 있습니다.
// ];

const Doma2 = () => {
    const navigate = useNavigate(); //useNavigate 훅 사용
    const navigateToDoma1 = () =>{
        navigate('/doma1')
    }
    const navigateToHome =()=>{
        navigate('/')
    }
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData ] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const handleNextPage = () =>{
        
        if(currentPage < data.length-1){
            setCurrentPage(currentPage+1)
            console.log(currentPage)
        }
    }
    const handleBeforePage = () =>{
        if(currentPage === 0) {
            navigateToDoma1(); //0번째 페이지면 doma1으로 이동
            console.log(currentPage)
        }else if(currentPage > 0){
            setCurrentPage(currentPage-1)
            console.log(currentPage)
        }
    }
    

    useEffect(()=>{
        const fetchData = async() =>{
            try{
                const response = await fetch('http://localhost:8000/api/content/')
                if(!response.ok){
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                console.log('Fetched data:', jsonData); // 데이터 출력
                setData(jsonData)
            }catch(err){
                console.error('Fetch error:', err); // 오류 출력
                setError(err.message); // 오류처리
            } finally{
                setLoading(false)
            }
        }
        fetchData();
    },[])
    
    
    return (
        <div>
            <header className={styles.title}>냉장고를 야금야금</header>
            <div className={styles.cuttingBoard}>
                <div className={styles.backHomeBtn} onClick={navigateToHome}>냉장고로<br></br>돌아가기</div>
                <div className={`${styles.side} ${styles.leftSide}`}> {/* 수정 */}
                    <div onClick={handleBeforePage} className={styles.sideInside}>
                        <p className={styles.writingMode}>이전</p>
                    </div>
                </div>
                <div className={`${styles.side} ${styles.rightSide}`}> {/* 수정 */}
                    <div className={styles.sideInside} onClick={handleNextPage}>
                        <p className={styles.writingMode}>다음</p>
                    </div>
                </div>
                <div>
                    <div className={styles.methodTitle}>{data[currentPage] ? data[currentPage].title : ''}</div>
                </div>
                <div className={styles.middleArea}>
                    <div className={styles.imgArea}></div>
                </div>
                <div className={styles.bottomArea}>
                    <div className={styles.methodExplain}>{data[currentPage] ? data[currentPage].explanation : ''}</div>
                </div>
            </div>
        </div>
    );
};

export default Doma2;
