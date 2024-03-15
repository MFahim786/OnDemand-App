const images = {
    1: require('./1.png'),
    2: require('./1.png'),
    3: require('./1.png'),
    4: require('./1.png'),
    5: require('./1.png'),
    6: require('./1.png'),
}

export default function randomImage(){
    let min = 1;
    let max = 12;
    let random = Math.floor(Math.random()*(max-min + 1)) + min;
    return images[random];
}