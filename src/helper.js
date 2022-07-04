import axios from "axios"

// export const apiUrl = 'https://realestate-si-backend.herokuapp.com'
export const apiUrl = 'http://merisahmatovic-001-site1.gtempurl.com'

export const exists = async (path) =>{
    await axios.get(`${apiUrl}/Images/${path}`)
        .then((res) => {
                
            return true
        })
        .catch((err) => {
            console.log(err)
            
        })
}
export function checkImage(url) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();
    request.onload = function() {
      if (request.status === 200) //if(statusText == OK)
      {
        console.log("image exists");
      } else {
        console.log("image doesn't exist");
      }
    }
  }