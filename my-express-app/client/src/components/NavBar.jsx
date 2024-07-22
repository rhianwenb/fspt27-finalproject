import React, { useContext} from 'react'
import "../styles/NavBar.css"
import { Link } from 'react-router-dom';
import NavContext from '../context/NavContext';


export default function NavBar() {

  const currentPage = useContext(NavContext).currentPage;
  const setCurrentPage = useContext(NavContext).setCurrentPage;


  return (
    <div id="navbar">
        {/* <button className={currentPage==="Search"?"active":"inactive"}
                onClick={()=>setCurrentPage("Search")}
        ><Link to="/">
          <svg xmlnsXlink="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 513.749 513.749" style={{enableBackground:"new 0 0 513.749 513.749", height:"100%"}} xmlSpace="preserve" width="512" height="512">
<g>
	<path d="M504.352,459.061l-99.435-99.477c74.402-99.427,54.115-240.344-45.312-314.746S119.261-9.277,44.859,90.15   S-9.256,330.494,90.171,404.896c79.868,59.766,189.565,59.766,269.434,0l99.477,99.477c12.501,12.501,32.769,12.501,45.269,0   c12.501-12.501,12.501-32.769,0-45.269L504.352,459.061z M225.717,385.696c-88.366,0-160-71.634-160-160s71.634-160,160-160   s160,71.634,160,160C385.623,314.022,314.044,385.602,225.717,385.696z"/>
</g>

          </svg> </Link></button> */}

        <button className={currentPage==="Map"?"active":"inactive"}
                onClick={()=>setCurrentPage("Map")}
        ><Link to="/">
          <svg xmlnsXlink="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
  <path d="m22.5,12c-.828,0-1.5.672-1.5,1.5v.5h-5.462l-4.538-4.16V3h.5c.829,0,1.5-.672,1.5-1.5s-.671-1.5-1.5-1.5h-6C2.467,0,0,2.468,0,5.5v13c0,3.032,2.467,5.5,5.5,5.5h13c3.032,0,5.5-2.468,5.5-5.5v-5c0-.828-.672-1.5-1.5-1.5ZM5.5,3h2.5v6.573l-5,2.5v-6.573c0-1.379,1.122-2.5,2.5-2.5Zm-2.5,15.5v-3.073l6.248-3.124,4.291,3.934-3.175,4.763h-4.864c-1.378,0-2.5-1.121-2.5-2.5Zm15.5,2.5h-4.531l2.667-4h4.364v1.5c0,1.379-1.121,2.5-2.5,2.5Zm-.387-9.874c.493.482,1.281.482,1.774,0l2.648-2.59c1.953-1.953,1.953-5.118,0-7.071C21.559.488,20.28,0,19,0c-1.28,0-2.559.488-3.536,1.464-1.953,1.953-1.953,5.118,0,7.071l2.648,2.59Zm.887-7.572c.828,0,1.5.672,1.5,1.5s-.672,1.5-1.5,1.5-1.5-.672-1.5-1.5.672-1.5,1.5-1.5Z"/>
          </svg></Link></button>

        <button className={currentPage==="Add A Review"?"active":"inactive"}
                onClick={()=>setCurrentPage("Add A Review")}
        ><Link to="/addareview">
        <svg id="Layer_1" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m12 0a12 12 0 1 0 12 12 12.013 12.013 0 0 0 -12-12zm0 21a9 9 0 1 1 9-9 9.01 9.01 0 0 1 -9 9zm5-9a1.5 1.5 0 0 1 -1.5 1.5h-2v2a1.5 1.5 0 0 1 -3 0v-2h-2a1.5 1.5 0 0 1 0-3h2v-2a1.5 1.5 0 0 1 3 0v2h2a1.5 1.5 0 0 1 1.5 1.5z"/></svg>
        </Link></button>

        {/* <button className={currentPage==="Community"?"active":"inactive"}
                onClick={()=>setCurrentPage("Community")}
        ><Link to="/community">
        <svg xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24" width="512" height="512"><path d="M24,11.246A12.011,12.011,0,1,0,12.017,24H18.5A5.507,5.507,0,0,0,24,18.5V11.34ZM21,18.5A2.5,2.5,0,0,1,18.5,21H12.017a9.041,9.041,0,0,1-6.731-3.011,8.926,8.926,0,0,1-2.227-7.034,9.038,9.038,0,0,1,7.788-7.882A9.484,9.484,0,0,1,12.02,3a8.933,8.933,0,0,1,5.739,2.066A9.038,9.038,0,0,1,21,11.389Z"/><path d="M9.5,11h3a1.5,1.5,0,0,0,0-3h-3a1.5,1.5,0,0,0,0,3Z"/><path d="M16.5,13h-7a1.5,1.5,0,0,0,0,3h7a1.5,1.5,0,0,0,0-3Z"/></svg>
        </Link></button> */}

        <button className={currentPage==="Profile"?"active":"inactive"}
                onClick={()=>setCurrentPage("Profile")}
        ><Link to="/profile">
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style={{enableBackground:"new 0 0 512 512"}} xmlSpace="preserve" width="512" height="512">
<g>
	<path d="M244.317,299.051c-90.917,8.218-160.183,85.041-158.976,176.32V480c0,17.673,14.327,32,32,32l0,0c17.673,0,32-14.327,32-32   v-5.909c-0.962-56.045,40.398-103.838,96-110.933c58.693-5.82,110.992,37.042,116.812,95.735c0.344,3.47,0.518,6.954,0.521,10.441   V480c0,17.673,14.327,32,32,32l0,0c17.673,0,32-14.327,32-32v-10.667c-0.104-94.363-76.685-170.774-171.047-170.67   C251.854,298.668,248.082,298.797,244.317,299.051z"/>
	<path d="M256.008,256c70.692,0,128-57.308,128-128S326.7,0,256.008,0s-128,57.308-128,128   C128.078,198.663,185.345,255.929,256.008,256z M256.008,64c35.346,0,64,28.654,64,64s-28.654,64-64,64s-64-28.654-64-64   S220.662,64,256.008,64z"/>
</g></svg>
        </Link></button>
        
    </div>
  )
}
