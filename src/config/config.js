// backedn api
export const BACKEND_ENDPOINT = "http://localhost:8080";

// backend api token key
export const BACKEND_ACCESS_TOKEN = '';

// STATUS FLOW
export const STATUS_FLOW = {
    allStatus: [
        {code: 'draft', name: 'Draft'},
        {code: 'wait', name: 'Wait'},
        {code: 'approved', name: 'Approved'},
        {code: 'cancel', name: 'Cancel'}
    ]
}

//Language
export const LANGUAGE = [
    {name: 'en',flag: 'us',label: 'English'},
    {name: 'th',flag: 'th',label: 'Thai'},

];
//Roles
export const ROLES = {
    user: 'User',
    admin: 'Admin',
};
