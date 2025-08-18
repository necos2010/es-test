import Header from "../../layouts/Header"
import "./Warning.css"
import RightIcom from "../../assets/arrow-right-large.svg"
import {Link} from "react-router-dom"
function Warning() {
  return (
    <div className="Warning">
        <Header/>
            <div className="section">
                <h1>Before Start the  Exam</h1>
                <h4>* TRY TO ANSWER TO THE QUESTIONS COMPLETELY.</h4>
                <h4>* DON'T CHOOSE 2 OPTIONS.</h4>  
                <h4>* DON'T DO THE TeST WHICH YOU AREN'T COMPELETY SURE ABOUT THE ANSWER OF IT BECAUSE IT HELPS US TO KNOW YOUR EXACT ENGLISH LEVEL.</h4>
                <Link to='/loading'><button>Start <img src={RightIcom} alt="" /></button></Link>
            </div>
    </div>
  )
}

export default Warning  