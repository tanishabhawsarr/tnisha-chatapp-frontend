import moment from "moment";

const fileformat= (url="") =>{

    const fileExtension=url.split(".").pop();

    if( fileExtension === "mp4"|| fileExtension === "webm" || fileExtension === "ogg")
        return "video";

    if( fileExtension === "mp3" || fileExtension === "wav")
        return "audio";

    if( fileExtension === "png" || fileExtension=== "jpg" || fileExtension=== "jpeg" || fileExtension === "gif")
        return "image";

    return "file";
};

const transformImage = (url = "", width=100) => {
    
    if (typeof url !== 'string') {
        
        url = String(url);
      }
    
    const newUrl=url.replace("upload/",`upload/dpr_auto/w_${width}/`);

    return newUrl;
};

const getLast7Days=()=>{
    const currentDate=moment();

    const last7Days=[];

    for(let i=0;i<7;i++){
      const DayDate=currentDate.clone().subtract(i,"days");
      const dayName=DayDate.format("dddd");

      last7Days.unshift(dayName);
    }
    return last7Days;
};

const getOrSaveFromStorage=({key,value,get})=>{

    if(get) 
     return localStorage.getItem(key)?
     JSON.parse(localStorage.getItem(key)):
     null;
     else localStorage.setItem(key,JSON.stringify(value));
};

export { fileformat , transformImage ,getLast7Days, getOrSaveFromStorage};
