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
    gettokenm = async (emp_code, emp_pass) => {
        let data = '';
        let formData = new FormData();
        formData.append("method", "tokeninfom");
        formData.append("emp_code", emp_code);
        formData.append("emp_pass", emp_pass);
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
    projectactivity = async (token, par_projectcode, project_location, project_activity) => {
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
        formData.append("project_location", project_location);
        formData.append("project_activity", project_activity);
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
            formData.append("Em_Sicktype[]", item.leavesick);
            formData.append("Em_SickStartTime[]", item.sickstart);
            formData.append("Em_SickEndTime[]", item.sickend);
        });
        itemprogress.forEach((item) => {
            formData.append("TimeSheetProgrssWorkdone[]", item.detail);
            formData.append("TimeSheetProgressKM[]", item.km);
            formData.append("TimeSheetProgrssQuantity[]", item.volumn);
            formData.append("TimeSheetProgressUnit[]", item.unit);
        });
        try {
            data = await axios.post(Url, formData, config);
        } catch (e) {
        }
        return data;
    }

    // VERSION 2
    listEmployee = async(token) => {
        var config = {
            headers: {
                "Accept": "application/json",
                "Authorization": token
            }
        };
        let data = '';
        let formData = new FormData();
        formData.append("method", "listEmployee");
        try {
            data = await axios.post(Url, formData, config);
        } catch (e) {
        }
        return data;
    }

    // Month Sick Leave
    addMonthLeave = async(token, leave_day, leave_fristtime, leave_lasttime) => {
        var config = {
            headers: {
                "Accept": "application/json",
                "Authorization": token
            }
        };
        let data = '';
        let formData = new FormData();
        formData.append("method", "addMonthLeave");
        formData.append("leave_day", leave_day);
        formData.append("leave_fristtime", leave_fristtime);
        formData.append("leave_lasttime", leave_lasttime);
        try {
            data = await axios.post(Url, formData, config);
        } catch (e) {
        }
        return data;
    }
    getMonthLeave = async(token) => {
        var config = {
            headers: {
                "Accept": "application/json",
                "Authorization": token
            }
        };
        let data = '';
        let formData = new FormData();
        formData.append("method", "getMonthLeave");
        try {
            data = await axios.post(Url, formData, config);
        } catch (e) {
        }
        return data;
    }
    addMonthLeaveSubmit = async(token, leave_day, leave_fristtime, leave_lasttime) => {
        var config = {
            headers: {
                "Accept": "application/json",
                "Authorization": token
            }
        };
        let data = '';
        let formData = new FormData();
        formData.append("method", "addMonthLeaveSubmit");
        formData.append("leave_day", leave_day);
        formData.append("leave_fristtime", leave_fristtime);
        formData.append("leave_lasttime", leave_lasttime);
        try {
            data = await axios.post(Url, formData, config);
        } catch (e) {
        }
        return data;
    }
    addMonthTimeSheetSave = async(token, TimeSheetHeader_date, worktime_item) => {
        var config = {
            headers: {
                "Accept": "application/json",
                "Authorization": token
            }
        };
        let data = '';
        let formData = new FormData();
        formData.append("method", "addMonthTimeSheetSave");
        formData.append("TimeSheetHeader_date", TimeSheetHeader_date);
        worktime_item.forEach((item) => {
            formData.append("TimeSheetManday_fristtime[]", item.worktime_fristtime);
            formData.append("TimeSheetManday_lasttime[]", item.worktime_lasttime);
            formData.append("TimeSheetManday_project[]", item.worktime_projectvalue);
            formData.append("TimeSheetManday_department[]", item.worktime_departmentvalue);
            formData.append("TimeSheetManday_activity[]", item.worktime_activityvalue);
            formData.append("TimeSheetManday_comment[]", item.worktime_comment);
        });
        try {
            data = await axios.post(Url, formData, config);
        } catch (e) {
        }
        return data;
    }
    addMonthTimeSheetSubmit = async(token, TimeSheetHeader_date, worktime_item) => {
        var config = {
            headers: {
                "Accept": "application/json",
                "Authorization": token
            }
        };
        let data = '';
        let formData = new FormData();
        formData.append("method", "addMonthTimeSheetSubmit");
        formData.append("TimeSheetHeader_date", TimeSheetHeader_date);
        worktime_item.forEach((item) => {
            formData.append("TimeSheetManday_fristtime[]", item.worktime_fristtime);
            formData.append("TimeSheetManday_lasttime[]", item.worktime_lasttime);
            formData.append("TimeSheetManday_project[]", item.worktime_projectvalue);
            formData.append("TimeSheetManday_department[]", item.worktime_departmentvalue);
            formData.append("TimeSheetManday_activity[]", item.worktime_activityvalue);
            formData.append("TimeSheetManday_comment[]", item.worktime_comment);
        });
        try {
            data = await axios.post(Url, formData, config);
        } catch (e) {
        }
        return data;
    }
    getMonthTimeSheetNormal = async(token) => {
        var config = {
            headers: {
                "Accept": "application/json",
                "Authorization": token
            }
        };
        let data = '';
        let formData = new FormData();
        formData.append("method", "getMonthTimeSheetNormal");
        try {
            data = await axios.post(Url, formData, config);
        } catch (e) {
        }
        return data;
    }
    addMonthTimeSheetLeaveSave = async(token, TimeSheetHeader_date, txtworktimeleave_item) => {
        var config = {
            headers: {
                "Accept": "application/json",
                "Authorization": token
            }
        };
        let data = '';
        let formData = new FormData();
        formData.append("method", "addMonthTimeSheetLeaveSave");
        formData.append("TimeSheetHeader_date", TimeSheetHeader_date);
        txtworktimeleave_item.forEach((item) => {
            formData.append("TimeSheetManday_sfristtime[]", item.worktimeleave_fristtime);
            formData.append("TimeSheetManday_elasttime[]", item.worktimeleave_lasttime);
            formData.append("TimeSheetManday_fristtime[]", item.worktimeleave_sfristtime);
            formData.append("TimeSheetManday_lasttime[]", item.worktimeleave_elasttime);
            formData.append("TimeSheetManday_project[]", item.worktimeleave_project);
            formData.append("TimeSheetManday_department[]", item.worktimeleave_department);
            formData.append("TimeSheetManday_activity[]", item.worktimeleave_activity);
            formData.append("TimeSheetManday_comment[]", item.worktimeleave_comment);
        });
        try {
            data = await axios.post(Url, formData, config);
        } catch (e) {
        }
        return data;
    }
    addMonthTimeSheetLeaveSubmit = async(token, TimeSheetHeader_date, txtworktimeleave_item) => {
        var config = {
            headers: {
                "Accept": "application/json",
                "Authorization": token
            }
        };
        let data = '';
        let formData = new FormData();
        formData.append("method", "addMonthTimeSheetLeaveSubmit");
        formData.append("TimeSheetHeader_date", TimeSheetHeader_date);
        txtworktimeleave_item.forEach((item) => {
            formData.append("TimeSheetManday_sfristtime[]", item.worktimeleave_fristtime);
            formData.append("TimeSheetManday_elasttime[]", item.worktimeleave_lasttime);
            formData.append("TimeSheetManday_fristtime[]", item.worktimeleave_sfristtime);
            formData.append("TimeSheetManday_lasttime[]", item.worktimeleave_elasttime);
            formData.append("TimeSheetManday_project[]", item.worktimeleave_project);
            formData.append("TimeSheetManday_department[]", item.worktimeleave_department);
            formData.append("TimeSheetManday_activity[]", item.worktimeleave_activity);
            formData.append("TimeSheetManday_comment[]", item.worktimeleave_comment);
        });
        try {
            data = await axios.post(Url, formData, config);
        } catch (e) {
        }
        return data;
    }
    getMonthTimeSheetNormalLeave = async(token) => {
        var config = {
            headers: {
                "Accept": "application/json",
                "Authorization": token
            }
        };
        let data = '';
        let formData = new FormData();
        formData.append("method", "getMonthTimeSheetNormalLeave");
        try {
            data = await axios.post(Url, formData, config);
        } catch (e) {
        }
        return data;
    }
    projectmastermonth = async (token) => {
        var config = {
            headers: {
                "Accept": "application/json",
                "Authorization": token
            }
        };
        let data = '';
        let formData = new FormData();
        formData.append("method", "projectmastermonth");
        try {
            data = await axios.post(Url, formData, config);
        } catch (e) {
        }
        return data;
    }
    departmentrmonth = async (token, par_project) => {
        var config = {
            headers: {
                "Accept": "application/json",
                "Authorization": token
            }
        };
        let data = '';
        let formData = new FormData();
        formData.append("method", "departmentrmonth");
        formData.append("par_project", par_project);
        try {
            data = await axios.post(Url, formData, config);
        } catch (e) {
        }
        return data;
    }
    activitymonth = async (token, par_project, par_dep) => {
        var config = {
            headers: {
                "Accept": "application/json",
                "Authorization": token
            }
        };
        let data = '';
        let formData = new FormData();
        formData.append("method", "activitymonth");
        formData.append("par_project", par_project);
        formData.append("par_dep", par_dep);
        try {
            data = await axios.post(Url, formData, config);
        } catch (e) {
        }
        return data;
    }

}
