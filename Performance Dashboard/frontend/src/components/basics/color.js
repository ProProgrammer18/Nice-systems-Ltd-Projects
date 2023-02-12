export default function colorManager (isLight, response){
    function getColour(response) {
        if (response >= 100 && response <= 200) {
            // return "#ACE7A4";
            return  'rgba(75, 192, 192, 0.2)';
        } else if (response > 200 && response < 300) {
            // return "#84BE6A";
            return 'rgb(221,255,221)';
        } else if (response >= 300 && response < 400) {
            return "#FFA500";
        } else if (response >= 400 && response < 500) {
            // return "#FF8888";
            return  'rgba(255, 99, 132, 0.2)';
        } else if (response >= 500 && response < 600) {
            // return "#FDF7B8";
            return 'rgba(255, 205, 86, 0.2)';
        } else {
            return "#000000";
        }
    }
    
    function getLightColor (response) {
        if (response >= 100 && response <= 200) {
            // return "#FFFF00";
            return 'rgb(75, 192, 192)';
        } else if (response > 200 && response < 300) {
            // return "#00FF00";
            return 'rgb(0,255,0)';
        } else if (response >= 300 && response < 400) {
            return "#FFD700";
        } else if (response >= 400 && response < 500) {
            // return "#FF4500";
            return  'rgb(255, 99, 132)';
        } else if (response >= 500 && response < 600) {
            // return "#0000CD";
            return   'rgb(255, 205, 86)';
        } else {
            return "#000000";
        }
    }
    if (isLight) {
        return getLightColor(response);
    }
    return getColour(response);   
}