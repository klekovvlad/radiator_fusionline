import Plyr from "plyr";

export const initVideo = () => {
    const video = document.querySelector('#player');

    if(video) {
        const player = new Plyr(video);
    }
}