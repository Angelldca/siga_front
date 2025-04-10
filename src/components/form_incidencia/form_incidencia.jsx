import './incidencias.css'

const FormIncidencia =()=>{

    return (
        <>
        <form action="" className="incident-form">
          <h3>Reportar alguna incidencia</h3>
          
          <div className="row">
            <div>
              <label>Nombre</label>
              <input name="nombre" placeholder="Tu nombre..." type="text" />
            </div>
            <div>
              <label>Apellidos</label>
              <input name="apellidos" placeholder="Tus apellidos..." type="text" />
            </div>
          </div>
      
          <label>Correo</label>
          <input name="email" placeholder="...@uci.cu" type="email" />
      
          <label>Incidencia</label>
          <textarea name="incidencia" placeholder="Escribe tu problema aquí" />
      
          <button type="submit">Enviar</button>
        </form>
      </>
    )
}

export default FormIncidencia;