import $api, {API_URL} from "../http/http";

export default class UploadFileService {
    static upload(url, fileName, file) {
        const formData = new FormData();
        formData.append(fileName, file, file);
        console.log(...formData)
        return $api.post(url, {files: formData}, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}
