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
    projectmaster = async (token) => {
        var config = {
            headers: {
                "Accept": "application/json",
                "Authorization": token
            }
        };
        let data = '';
        let formData = new FormData();
        formData.append("method", "projectmaster");
        try {
            data = await axios.post(Url, formData, config);
        } catch (e) {
        }
        return data;
    }
    zonename = async (token, par_projectcode) => {
        var config = {
            headers: {
                "Accept": "application/json",
                "Authorization": token
            }
        };
        let data = '';
        let formData = new FormData();
        formData.append("method", "zonename");
        formData.append("par_projectcode", par_projectcode);
        try {
            data = await axios.post(Url, formData, config);
        } catch (e) {
        }
        return data;
    }
    projectactivity = async (token, par_projectcode) => {
        var config = {
            headers: {
                "Accept": "application/json",
                "Authorization": token
            }
        };
        let data = '';
        let formData = new FormData();
        formData.append("method", "projectactivity");
        formData.append("par_projectcode", par_projectcode);
        try {
            data = await axios.post(Url, formData, config);
        } catch (e) {
        }
        return data;
    }
    projectsublocation = async (token, par_projectcode, par_location) => {
        var config = {
            headers: {
                "Accept": "application/json",
                "Authorization": token
            }
        };
        let data = '';
        let formData = new FormData();
        formData.append("method", "projectsublocation");
        formData.append("par_projectcode", par_projectcode);
        formData.append("par_location", par_location);
        try {
            data = await axios.post(Url, formData, config);
        } catch (e) {
        }
        return data;
    }
    employeesubactivity = async (token, ProjectActivity, ProjectSubActivityCode, EmployeeHead, EmployeeTypeCode) => {
        var config = {
            headers: {
                "Accept": "application/json",
                "Authorization": token
            }
        };
        let data = '';
        let formData = new FormData();
        formData.append("method", "employeesubactivity");
        formData.append("ProjectActivity", ProjectActivity);
        formData.append("ProjectSubActivityCode", ProjectSubActivityCode);
        formData.append("EmployeeHead", EmployeeHead);
        formData.append("EmployeeTypeCode", EmployeeTypeCode);
        try {
            data = await axios.post(Url, formData, config);
        } catch (e) {
        }
        return data;
    }


}