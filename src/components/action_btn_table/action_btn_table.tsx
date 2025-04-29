import add from '../../assets/add.png';
import detail from '../../assets/info_blue.png';
import del from '../../assets/delete_withe.png';
import list_add from '../../assets/list_add.png';

import "../action_btn/Action_btn.css"
import { useEffect, useState } from 'react';


interface ActionProps {
  module: string;
  asignModule: ()=>void;
}
const ActionBtnTable = ({module, asignModule}:ActionProps)=>{
 

 return (
   <div className="event-action">
     <div className="actions">
       <div className="btn-container">
         <button
           className="btn-secondary btn_action"
           onClick={asignModule}
         >
           <img alt="asignar eventos" src={list_add} />
         </button>
         <span className="tooltip">Asignar {module}</span>
       </div>
     </div>
   </div>
    )
}

export default ActionBtnTable;