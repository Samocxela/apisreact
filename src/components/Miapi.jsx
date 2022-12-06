import {useEffect, useState} from 'react';
import "./miapi.css"

function Miapi (){  
  //se declaran los use state a utilizar
  const [temporadas, setTemporadas] = useState([]);
  const [tablaTemporadas, setTablatemporadas] = useState([]);
  const [ordenado,setOrdenar] =useState([]);
 
 
  
  //obtengo la informacion de la api a traves de una funcion asincrona 
  const obtenerInfo = async () => {
    try{
      const url = "https://api.sampleapis.com/simpsons/episodes";
      const response = await fetch(url)
      const data = await response.json()
      setTemporadas(data);
      setTablatemporadas(data);
     
    }
    catch(e){
      console.error(e)
    }
  }

  //se realiza el ordenamiento del array de objetos por el atributo rating de episodios
  function ordenar (x,y){
    if( x.rating > y.rating ){return -1;} //significa que el valor x va antes que el valor y
    if( x.rating < y.rating){return 1;}//significa que el valor y va antes que el valor x
    return 0;//no existen cambios ya que serian iguales

  }
  //se crea la función que va ser llamada para ejecutar el ordenamiento a través del botón ordenar por rating de episodios
 const handleOrdenar=()=>{
   setOrdenar(temporadas.sort(ordenar))
 }

   //se crea la función que va ser llamada para ejecutar el filtro por temporadas
  const handleChange = e => {
    if( e.target.value === '' ){
      setTemporadas(tablaTemporadas)
    }
    else{
      filtrarTemporada( e.target.value );
    }
  }

 

  //se realiza el filtro de usuario a través de un termino de busqueda donde podemos buscar por la temporada 
  const filtrarTemporada=(terminoBusqueda)=>{
    var temporadaFiltrada = tablaTemporadas.filter((el)=>{
      if(el.season.toString() === terminoBusqueda.toString()){
        
        return el;
      }
    });

    setTemporadas(temporadaFiltrada)
  }
  

  //aplicamos el useEffect para que se ejecute una vez y nos pueda cargar la informacion de la api que estamos utilizando
  useEffect(()=>{
    obtenerInfo();
  },[])

 


  return (
    <section className="App">
    
      <div className="container navbar bg-base-100">
        <div className="flex-1">
          <a href='#' className="btn btn-ghost normal-case text-xl">Temporadas de los Simpsons</a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input type="text" name={temporadas} placeholder="Buscar por N° de temporada" className=" inputBuscar input input-bordered input-md w-full max-w-xs" onChange={handleChange}/>
          </div>
          <div className="form-control">
            <button name={ordenado} type="button" className='btn' onClick={handleOrdenar}> Ordenar por Rating</button>
          </div>
        </div>
      </div>
        
      <div id='div_container'>
      {temporadas.map(temporada =>(
        <div key={temporada.id} className="tamaño_card card w-96 bg-base-100 shadow-xl">
          <h2 className='card card-title'>Temporada:{temporada.season}</h2>
          <h2 className='card card-title'>Episodio:{temporada.episode}</h2>
          <h2 className='card card-title'>Rating:{temporada.rating}</h2>
          <figure className="px-10 pt-10">
            <img src={temporada.thumbnailUrl} alt="los Simpsons" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
          <h2 className="card-title">{temporada.name}</h2>
          <p>{temporada.description}</p>
        </div>
      </div> ))}
    </div>      
  </section>
    
  );

}  
export default Miapi;