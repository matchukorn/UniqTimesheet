import axios from 'axios';

var config = {headers: {"Accept": "application/json"}};
var Url = "http://43.249.106.78:7000/api/";


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
    masterjobid = async (token, ProjectCode, ProjectActivityCode, ProjectSubActivityCode, ProjectLocationCode, ProjectSubLocationCode) => {
        var config = {
            headers: {
                "Accept": "application/json",
                "Authorization": token
            }
        };
        let data = '';
        let formData = new FormData();
        formData.append("method", "masterjobid");
        formData.append("ProjectCode", ProjectCode);
        formData.append("ProjectActivityCode", ProjectActivityCode);
        formData.append("ProjectSubActivityCode", ProjectSubActivityCode);
        formData.append("ProjectLocationCode", ProjectLocationCode);
        formData.append("ProjectSubLocationCode", ProjectSubLocationCode);
        try {
            data = await axios.post(Url, formData, config);
        } catch (e) {
        }
        return data;
    }
    listmasteremployee = async (token) => {
        var config = {
            headers: {
                "Accept": "application/json",
                "Authorization": token
            }
        };
        let data = '';
        let formData = new FormData();
        formData.append("method", "listmasteremployee");
        try {
            data = await axios.post(Url, formData, config);
        } catch (e) {
        }
        return data;
    }
    savetimesheet = async (
        token, 
        Sublocation, // H
        EmployeeCode, // H
        WorkingDate, // H
        ProjectCode, // H
        ProjectLocationCode, // H
        ProjectActivityCode, // H
        JobCode, // H
        ProjectSubActivityCode,// H
        CostCenterCode, // H
        TimeSheetTarget, // H
        TimeSheetTargetUnit, // H
        TimeSheetActual, // H
        TimeSheetActualUnt, // H
        item_employee,
        itemprogress
    ) => {
        var config = {
            headers: {
                "Accept": "application/json",
                "Authorization": token
            }
        };
        let data = '';
        let formData = new FormData();
        formData.append("method", "savetimesheet");
        formData.append("ProjectSublocationCode", Sublocation);
        formData.append("EmployeeCode", EmployeeCode);
        formData.append("WorkingDate", WorkingDate);
        formData.append("ProjectCode", ProjectCode);
        formData.append("ProjectLocationCode", ProjectLocationCode);
        formData.append("ProjectActivityCode", ProjectActivityCode);
        formData.append("JobCode", JobCode);
        formData.append("ProjectSubActivityCode", ProjectSubActivityCode);
        formData.append("CostCenterCode", CostCenterCode);
        formData.append("TimeSheetTarget", TimeSheetTarget);
        formData.append("TimeSheetTargetUnit", TimeSheetTargetUnit);
        formData.append("TimeSheetActual", TimeSheetActual);
        formData.append("TimeSheetActualUnt", TimeSheetActualUnt);
        item_employee.forEach((item) => {
            formData.append("Em_EmployeeTypeCode[]", item.emptype);
            formData.append("Em_EmployeeCode[]", item.empcode);
            formData.append("Em_EmployeeDisplayName[]", item.empname);
            formData.append("Em_StartTimeOTPart1[]", item.befotstart);
            formData.append("Em_EndTimeOTPart1[]", item.befotend);
            formData.append("Em_StartTimePart1[]", item.befstart);
            formData.append("Em_EndTimePart1[]", item.befend);
            formData.append("Em_StartTimePart2[]", item.atfstart);
            formData.append("Em_EndTimePart2[]", item.atfend);
            formData.append("Em_OverTimeStartTime[]", item.otstart);
            formData.append("Em_OverTimeEndTime[]", item.otend);
        });
        itemprogress.forEach((item) => {
            formData.append("TimeSheetProgrssWorkdone[]", item.detail);
            formData.append("TimeSheetProgrssQuantity[]", item.volumn);
            formData.append("TimeSheetProgressUnit[]", item.unit);
        });
        try {
            data = await axios.post(Url, formData, config);
        } catch (e) {
        }
        return data;
    }


}
