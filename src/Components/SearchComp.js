import React,{useState} from 'react'

const SearchComp = ({data}) => {
    const [searchTerm,setSearchTerm]=useState('');
    const filteredData=data.filter(item=> item.id.includes(searchTerm));
  return (
    <div>
        <input type="text"
        placeholder='search by ID'
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
        />
        <ul>
            {filteredData.map(item=>(
                <li key={item.id}>{item.id}</li>
            ))}
        </ul>
    </div>
  )
}

export default SearchComp;