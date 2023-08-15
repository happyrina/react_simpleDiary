// React에서 필요한 기능들을 가져옴
import React,{ useMemo, useEffect, useRef, useCallback, useReducer, createContext} from 'react';
// 스타일 파일을 가져옴
import './App.css';
// 두 개의 컴포넌트를 가져옴
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
// import OptimizeTest from './OptimizeTest';
// import Lifecycle from './Lifecycle';

// https://jsonplaceholder.typicode.com/comments

export const DiaryStateContext = createContext();

export const DiaryDispatchContext = createContext();

const reducer = (state, action) => {
  switch(action.type){
    case 'INIT' : {
      return action.data
    }
    case 'CREATE' : {
      const create_date = new Date().getTime();
      const newItem = {
        ...action.data,
        create_date
      }
      return [newItem, ...state];
    }
    case 'REMOVE' : {
      return state.filter((it)=>it.id !== action.targetId);
    }
    case 'EDIT' : {
      return state.map((it)=>
      it.id === action.targetId?
      {...it, content: action.newContent} : it);
    }
    default :
      return state;
  }
};


const App = () => {
  
  // data라는 상태와 setData라는 상태 변경 함수 생성. 초기값은 빈 배열
  // const [data, setData] = useState([]);

  const[data, dispatch]=useReducer(reducer, []);

  // 다이어리 아이템의 id를 관리하기 위한 useRef. 현재 0으로 초기화
  const dataId = useRef(0);

  //react api 
  const getData = async() => {
    setTimeout(async() => {
      const res = await fetch ("https://jsonplaceholder.typicode.com/comments").then((res) => res.json());
     // console.log(res);
    //  console.log(res.slice(0,20));

     const initData = res.slice(0, 20).map((it)=>{
       return {
         author: it.email,
         content: it.body,
         emotion: Math.floor(Math.random() * 5)+1,
         created_date: new Date().getTime(),
         // id:dataId.current++
         id:dataId.current++
       };
     });

     dispatch({type:"INIT", data:initData});
    }, 2000);
    //  setData(initData);
   };

  useEffect(() => {
    getData();
  },[]);

  // 새로운 다이어리 아이템을 생성하는 함수
  const onCreate = useCallback((author, content, emotion) => {
  
    dispatch({type:'CREATE',data:{author, content, emotion, id:dataId.current}
  }); 


    // // 현재 시간을 create_date로 설정
    // const create_date = new Date().getTime();
    // // 새 아이템 객체 생성
    // const newItem = {
    //   author,
    //   content,
    //   emotion,
    //   create_date,
    //   id: dataId.current
    // };
    // id 값 증가
    dataId.current += 1;
    // 새 아이템을 데이터 배열의 맨 앞에 추가
    // setData((data)=>[newItem, ...data]);
  }, 
  []);

  // 특정 id를 가진 아이템을 제거하는 함수
  const onRemove = useCallback((targetId) => {
    dispatch({type:"REMOVE", targetId});
    // setData(data => data.filter((it)=>it.id !== targetId));
  }, []);

  // 특정 id를 가진 아이템의 내용을 수정하는 함수
  const onEdit = useCallback((targetId, newContent) => {
    dispatch({type:"EDIT", targetId, newContent});

  //   setData((data) =>
  //   data.map((it) =>
  //     it.id === targetId ? {...it, content:newContent}: it
  //   )
  // );
}, []);

const memoizedDispatches = useMemo(() => {
  return {onCreate, onRemove, onEdit};
}, []);

  const getDiaryAnalysis = useMemo (() => {
    const goodCount = data.filter((it)=>it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return {goodCount, badCount, goodRatio};
  } , [data.length]);

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;
  
  // 컴포넌트를 렌더링
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          {/*<OptimizeTest />*/}
          {/*<Lifecycle />*/}
          {/* 다이어리 편집 컴포넌트 */}
          <DiaryEditor />
          <div>전체 일기 : {data.length}</div>
          <div>기분 좋은 일기 개수 : {goodCount}</div>
          <div>기분 나쁜 일기 개수 : {badCount}</div>
          <div>기분 좋은 일기 비율 : {goodRatio}%</div>
          {/* 다이어리 목록 컴포넌트 */}
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};

// App 컴포넌트를 다른 파일에서 사용할 수 있도록 export
export default App;

