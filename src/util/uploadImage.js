import { storage } from '../firebase';

export default handleUpload = () => {
    const image  = photo;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on('state_changed',
        (snapshot) => {
            // progrss function ....
        },
        (error) => {
            // error function ....
            console.log(error);
        },
        () => {
            // complete function ....
            storage.ref('images').child(image.name).getDownloadURL().then(url => {
                console.log(url);
                setUrl(url);
            })
        });
}