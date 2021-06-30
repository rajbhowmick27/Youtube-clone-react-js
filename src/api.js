import axios from 'axios';

const request = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3/',
    params: {
        key: 'AIzaSyDTK_MaQclKjnKav7oc4Pc3vxW2WhICfOc',
    }
})

export default request
