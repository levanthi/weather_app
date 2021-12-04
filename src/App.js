
import { useEffect,useState,useRef } from 'react';
import './App.css';
import cold from './static/image/cold.jpg'
import hot from './static/image/hot.jpg'

const api={
  key:'a099da34fdcd728112342f389af92965',
  base:'http://api.openweathermap.org/data/2.5/'
}
const defaut='ho chi minh'
const days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday']
const months = ['January','Febuary','Match','April','May','June','Junely','August','Septemper','Octorber','November','December']
function App() {

  const [query,setQuery] = useState()
  const [weather,setWeather] = useState()
  const now = new Date()
  const [submit,setSubmit] = useState(true)
  const [err,setErr] = useState(false)
  const img = useRef(cold)
  function handleSubmit(e)
  {
    if(e.key==='Enter')
      setSubmit(!submit)
  }

  if(weather)
  {
    if(Math.floor(weather.main.temp-273)>20)
    {
      img.current=hot
    }
    else{
      img.current=cold
    }
  }

  useEffect(()=>{
    fetch(`${api.base}weather?q=${query||defaut}&appid=${api.key}`)
      .then(res=>res.json())
      .then(res=>{
        console.log(res)
        if(res.cod==='404')
        {
          setErr(true)
          setWeather(weather)
        }
        else
        {
          setWeather(res)
          setQuery('')
          setErr(false)
        }
      })
      .catch(err=>console.log(err))
  },[submit])
  return (
    <div className="App" style={{backgroundImage:`url(${img.current})`}} >
      <input value={query} onKeyDown={handleSubmit} onChange={(e)=>{setQuery(e.target.value);setErr(false)}} placeholder='Enter...' />
      {err?<div className='err'>Thành phố không có trong dữ liệu</div>:''}
      {weather?
        <div className='group'>
          <div className='address'>{weather.name}, {weather.sys.country}</div>
          <div className='date'>{days[now.getDay()]} {now.getDate()} {months[now.getMonth()]} {now.getFullYear()}</div>
          <div className='temperature'><span>{Math.floor(weather.main.temp-273)}&deg;c</span></div>
          <div className='status'>{weather.weather[0].main}</div>
        </div>
        :''
      }
    </div>
  );
}

export default App;
