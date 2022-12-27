import { useEffect, useState } from 'react'
import './App.css'
import { useValidBrackets } from './hooks/useValidBrackets'

function App() {
  //task1
  const [input, setInput] = useState('')
  const [count, setCount] = useState({countValid : 0, countNoValid: 0})

  useEffect(() => {
    setCount({...count, ...useValidBrackets(input)})
  }, [input])

  //task2
  const [list, setList] = useState([])

  const [id, setID] = useState(1);

  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }


  const add = () => {
    setID(id + 1)
    setList([...list, {id: id, second: getRandomIntInclusive(10, 30)}])
  }

  useEffect(() => {
    const interval = setInterval(() => {
      list.length && setList(list.map(obj => {
        let neg = obj.second - 1
        return {...obj, second: neg}
      }))
    }, 1000);
    return () => clearInterval(interval);
  }, [list]);

  useEffect(() => {
    for(let i = 0; i < list.length; i++){
      list[i].second <= 0 && setList(list.filter(e => e.id != list[i].id))
    }
  }, [list])

  return (
    <div className="App">
      <div className='tasks'>
        <h3>Задание 1</h3>
        <input type="text" value={input} onInput={e => setInput(e.target.value)}/>
        <div>Количество правильных скобок: {count.countValid}</div>
        <div>Количество неправильных скобок: {count.countNoValid}</div>
      </div>
      <div className='tasks'>
        <h3>Задание 2</h3>
        <input type="button" onClick={add} value='Добавить элемент'/>
        {!list.length? 
          <h4>Список пуст</h4>
          :
          <div className='table'>
            {list.map((e, index) => <div key={e.id}>{index + 1} Исчезнет через {e.second} секунд</div>)}
          </div>
        }
      </div>
    </div>
  )
}

export default App
