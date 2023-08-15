// React에서 필요한 기능들을 가져옴
import { useMemo, useEffect, useRef, useState } from 'react';
// 스타일 파일을 가져옴
import './App.css';
// 두 개의 컴포넌트를 가져옴
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
// import OptimizeTest from './OptimizeTest';
// import Lifecycle from './Lifecycle';

// https://jsonplaceholder.typicode.com/comments


const App = () => {
  
  // data라는 상태와 setData라는 상태 변경 함수 생성. 초기값은 빈 배열
  const [data, setData] = useState([]);

  // 다이어리 아이템의 id를 관리하기 위한 useRef. 현재 0으로 초기화
  const dataId = useRef(0)

  //react api 
  const getData = async() => {
     const res = await fetch("https://jsonplaceholder.typicode.com/comments"
     ).then((res) => res.json());
     // console.log(res);
    //  console.log(res.slice(0,20));

     const initData = res.slice(0, 20).map((it)=>{
       return {
         author: it.email,
         content: it.body,
         emotion: Math.floor(Math.random() * 5)+1,
         created_date: new Date().getTime(),
         // id:dataId.current++
         id:it.id,
       }
     })

     setData(initData);
   };

  useEffect(() => {
    getData();
  },[])

  // 새로운 다이어리 아이템을 생성하는 함수
  const onCreate = (author, content, emotion) => {
    // 현재 시간을 create_date로 설정
    const create_date = new Date().getTime();
    // 새 아이템 객체 생성
    const newItem = {
      author,
      content,
      emotion,
      create_date,
      id: dataId.current
    };
    // id 값 증가
    dataId.current += 1;
    // 새 아이템을 데이터 배열의 맨 앞에 추가
    setData([newItem, ...data])
  };

  // 특정 id를 가진 아이템을 제거하는 함수
  const onRemove = (targetId) => {
   
    // 선택한 id를 제외한 새로운 리스트 생성
    const newDiaryList = data.filter((it)=>it.id !== targetId);
    // 상태 업데이트
    setData(newDiaryList);
  };

  // 특정 id를 가진 아이템의 내용을 수정하는 함수
  const onEdit = (targetId, newContent) => {
    // 선택한 id의 아이템의 내용만 수정하여 새로운 리스트 생성
    setData(
      data.map((it)=>
        it.id === targetId ? {...it, content:newContent}: it
      )
    );
  };

  const getDiaryAnalysis = useMemo (() => {
    const goodCount = data.filter((it)=>it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return {goodCount, badCount, goodRatio};
  } , [data.length]);

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;
  
  // 컴포넌트를 렌더링
  return (
    <div className="App">
      {/*<OptimizeTest />*/}
      {/*<Lifecycle />*/}
      {/* 다이어리 편집 컴포넌트 */}
      <DiaryEditor onCreate={onCreate}/>
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      {/* 다이어리 목록 컴포넌트 */}
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
};

// App 컴포넌트를 다른 파일에서 사용할 수 있도록 export
export default App;

