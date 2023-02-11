export default function colorManager (isLight, response){
    function getColour(response) {
        if (response >= 100 && response <= 200) {
            return "#ACE7A4";
        } else if (response > 200 && response < 300) {
            return "#84BE6A";
        } else if (response >= 300 && response < 400) {
            return "#FFA500";
        } else if (response >= 400 && response < 500) {
            return "#FF8888";
        } else if (response >= 500 && response < 600) {
            return "#FDF7B8";
        } else {
            return "#000000";
        }
    }
    
    function getLightColor (response) {
        if (response >= 100 && response <= 200) {
            return "#FFFF00";
        } else if (response > 200 && response < 300) {
            return "#00FF00";
        } else if (response >= 300 && response < 400) {
            return "#FFD700";
        } else if (response >= 400 && response < 500) {
            return "#FF4500";
        } else if (response >= 500 && response < 600) {
            return "#0000CD";
        } else {
            return "#000000";
        }
    }
    if (isLight) {
        return getLightColor(response);
    }
    return getColour(response);   
}