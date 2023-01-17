export default function colorManager (isLight, response){
    function getColour(response) {
        if (response >= 100 && response <= 200) {
            return "#FFD700";
        } else if (response > 200 && response < 300) {
            return "#228B22";
        } else if (response >= 300 && response < 400) {
            return "#FFA500";
        } else if (response >= 400 && response < 500) {
            return "#FF0000";
        } else if (response >= 500 && response < 600) {
            return "#0000FF";
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