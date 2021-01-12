
import Vue from 'vue'

Vue.mixin({
    methods:{

        dataTableOfVechileRecords: () => {
            return [
                { 
                    "Vechile Id": { 
                        name: "SAMXL3", type: "TEXT"
                    }, 
                    "Vechile Type": { 
                        name: "Car", type: "TEXT"
                    }, 
                    "Vechile Color": { 
                        name: "Black", type: "TEXT"
                    }, 
                    "Licence Plate": { 
                        name: "IDF 341", type: "TEXT"
                    }, 
                    "Status": {
                        name: "Completed", type: "STATUS", status: "COMPLETED"
                    },
                    "Date": {
                        name: "16-11-2020", type: "TEXT"
                    }, 
                    "Details": {
                        name: "Details", type: "BUTTON"
                    },
                },          
            ]

        },

        dataTable: () => {
            return [
                { 
                    "Order Id": { 
                        name: "SAMXL3", type: "TEXT"
                    }, 
                    "Order Date": {
                        name: "16-11-2020", type: "TEXT"
                    }, 
                    "Order Status": {
                        name: "Completed", type: "STATUS", status: "COMPLETED"
                    },
                    "Payment": {
                        name: "43.00$", type: "TEXT"
                    },
                    "Order Details": {
                        name: "Details", type: "BUTTON"
                    },
                    "Complaint": {
                        name: "View", type: "BUTTON"
                    },
                    "Chat": {
                        name: "Chat", type: "BUTTON"
                    },
                    "Rating": {
                        name: 4, type: "RATING"
                    },
                },
    
                { 
                    "Order Id": { 
                        name: "SAMXL3", type: "TEXT"
                    }, 
                    "Order Date": {
                        name: "16-11-2020", type: "TEXT"
                    }, 
                    "Order Status": {
                        name: "Cancelled", type: "STATUS", status: "CANCELLED"
                    },
                    "Payment": {
                        name: "43.00$", type: "TEXT"
                    },
                    "Order Details": {
                        name: "Details", type: "BUTTON"
                    },
                    "Complaint": {
                        name: "View", type: "BUTTON"
                    },
                    "Chat": {
                        name: "Chat", type: "BUTTON"
                    },
                    "Rating": {
                        name: 3, type: "RATING"
                    },
                },            
            ]
        },

        setCookie(name,value,days) {
            value = JSON.stringify(value)
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days*24*60*60*1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "")  + expires + "; path=/";
        },
        getCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return JSON.parse(c.substring(nameEQ.length,c.length));
            }
            return null;
        },
        eraseCookie(name) {   
            document.cookie = name+'=; Max-Age=-99999999;';  
        },
    }
})