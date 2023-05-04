
import './App.css';
import { useEffect } from 'react';
import apiCall from "./helper/Axios"
import MainComponent from './views/MainComponent';
import Nav from './views/Nav';


function App() {
  useEffect(() => {
 console.log("heyy")
    func()   
  }, [])

  const func=async()=>{
    console.log("Hekko")

    const result =  await apiCall.get('/api/get-csrf-token',{ headers: {"Authorization" : `Bearer ${"tokenStr"}`} } )
    console.log(result)
  }
  
  return (
      <Nav/>
  );
}

export default App;
