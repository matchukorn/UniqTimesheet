import axios from 'axios';

var config = {headers: {"Accept": "application/json"}};
var Url = "http://43.249.106.78/api/";


export default class Service{
    // Get Token JWT
    gettoken = async (emp_code) => {
        let data = '';
        let formData = new FormData();
        formData.append("method", "tokeninfo");
        formData.append("emp_code", emp_code);
        try {
            data = await axios.post(Url, formData, config);
        } catch (e) {
        }
        return data;
    }
    // Get Authen
    getuserinfo = async (token) => {
        var config = {
            headers: {
                "Accept": "application/json",
                "Authorization": token
            }
        };
        let data = '';
        let formData = new FormData();
        formData.append("method", "getuserinfo");
        try {
            data = await axios.post(Url, formData, config);
        } catch (e) {
        }
        return data;
    }
}