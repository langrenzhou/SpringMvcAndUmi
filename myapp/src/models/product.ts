import { useState } from "react"

export default ()=>{
  const [collapsed, setCollapsed] = useState(false);
  const [breadArr,setBreadArr] =useState(["/首页"]);
  const [open, setOpen] = useState(false);
  const [dates,setDates]=useState("");
  const [productArr,setProductArr]=useState([]);
<<<<<<< HEAD

=======
>>>>>>> origin/master
  return {
    collapsed,setOpen,
    open,setCollapsed,
    breadArr,setBreadArr,
    dates,setDates,
<<<<<<< HEAD
    productArr,setProductArr,
=======
    productArr,setProductArr
>>>>>>> origin/master
  };
}
//         id:2,
        //         producrName:"北京",
        //         departureRime:"2021-01-12 12:00",
        //         productPrice:99,
        //         productDesc:"快来一起玩耍吧",
        //         productStatus:1,
        //         productNum:2,
        //         cityName:"北京"