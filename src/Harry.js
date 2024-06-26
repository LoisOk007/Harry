import axios from 'axios'
import { useCallback, useEffect, useState } from 'react';

export const Hogwarts = () =>{
   const [School,setSchool]=useState();//state всех учеников
   const [Current,setCurrent]=useState();//state текущих учеников
   const [Student,setStudent]=useState('');//state фильтра имени
   const [SelectedHouse,setSelectedHouse]=useState('');//state фильтра факультета
   
    useEffect(async ()=>{
        const URL='https://hp-api.onrender.com/api/characters/students'//ссылка на студентов
        const res=await axios(URL)//сохранение данных с ссылки
        setSchool(res.data)//установка в пропс данных
    },[setSchool]);
    
    useEffect(()=>{
        setCurrent(School);
    },[School])
    
    const onChange=useCallback((event)=>{ //фильтр по имени
            setStudent(event.target.value)
            //console.log(event.target.value) //логирование в консоль полученных значений

            const tempData=School?.filter(x=>x.name.includes(event.target.value))
            //console.log(tempData) //логирование в консоль полученных после фильтрации объектов
            
            setCurrent(tempData);
    },[School])

    const onSelect=useCallback((event)=>{ //фильтр по факультету
            setSelectedHouse(event.target.value); //сохранение текущего состояния выбора
            //console.log(event.target.value); //логирование в консоль полученных значений 
           
            const tempData=School?.filter(x=>x.house.includes(event.target.value)); //фильтр на факультет
            //console.log(tempData) //логирование в консоль полученнх после фильтрации объектов
           
            setCurrent(tempData);//сохранение изменённого списка
    },[School])
    return(
        <>      
            <div className={'container'}>  
            <div>
                <select onChange={onSelect} value={SelectedHouse}>
                    <option value="">Выбери свой факультет</option>
                    <option value="Gryffindor">Гриффиндор</option>
                    <option value="Hufflepuff">Пуффендуй</option>
                    <option value="Ravenclaw">Когтевран</option>
                    <option value="Slytherin">Слизерин</option>
                </select>
            </div>
            <input onChange={onChange} value={Student} />
            <div className="row">
                {Current?.map((item, index) =>
                    <div key={index} className={'col'}>
                        <div className="card" style={{ width: '18rem' }}>
                            <div>
                                <img src={item.image} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.house}</p>
                                    <div>{item.dateOfBirth}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            </div>
        </>
    )
}
