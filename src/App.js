import { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

// const dummyList = [
//   {
//     id:1,
//     author:"차아린",
//     content:"하이!",
//     emotion: 5,
//     create_date: new Date().getTime()
//   },
//   {
//     id:2,
//     author:"차아린2",
//     content:"하이! 바이!",
//     emotion: 2,
//     create_date: new Date().getTime()
//   },
//   {
//     id:3,
//     author:"차아린3",
//     content:"하이!",
//     emotion: 4,
//     create_date: new Date().getTime()
//   },
// ];



function App() {
  
  const [data, setData] = useState([]);

  const dataId = useRef(0)

  const onCreate = (author, content, emotion) => {
    const create_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      create_date,
      id: dataId.current
    }
    dataId.current += 1;
    setData([newItem, ...data])
  }

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}/>
      <DiaryList diaryList={data}/>
    </div>
  );
};

export default App;
 