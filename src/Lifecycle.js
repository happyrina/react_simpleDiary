// import React, {useEffect, useState} from 'react';

// const Lifecycle = () => {
  
//   const [count, setCount] = useState(0);
//   const [text, setText] = useState(" ");

//   useEffect(() => {
//     console.log("Mount");
//   }, []);

//   useEffect(() => {
//     console.log("Update!")
//   });

//   useEffect(()=>{
//     console.log(`count is update : ${count}`);
//     if(count > 5) {
//       alert("count가 5줄을 넘었습니다! 1로 초기화!");
//       setCount(1);
//     }
//   },[count]);
  

//   useEffect(()=>{
//     console.log(`text is update : ${text}`);
//   },[text])
 
//   //버튼 누르면 카운트 하나 증가하는 버튼
//   return <div style={{ padding : 20 }}>
//     <div>
//       {count}
//       <button onClick={() => setCount(count+1)}>+</button>
//     </div>
//     <div>
//       <input value={text} onChange={(e) => setText(e.target.value)} />
//     </div>
//   </div>
// }

// export default Lifecycle;



import React, {useEffect, useState} from 'react';

  const UnmountTest = () => {
    useEffect(() => {
      console.log("Mount");

      return () => {
        //Unmount 시점에 실행되게 함
        console.log("Unmount!");
      }
    },[])
    return <div>Unmount Testing Component!</div>
  }


const Lifecycle = () => {
  const [isVisible,setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);
 
 
  //버튼 누르면 카운트 하나 증가하는 버튼
  return <div style={{ padding : 20 }}>
  <button onClick={toggle}>On/Off</button>
  {isVisible && <UnmountTest />}
  </div>
}

export default Lifecycle;

