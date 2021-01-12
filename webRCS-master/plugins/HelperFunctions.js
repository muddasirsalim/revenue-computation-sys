import { callbackify } from 'util'
import Vue from 'vue'
const path = require('path')
const moment = require('moment')
const mimetype = ["image/jepg", "image/png", "image/jpg", "image/svg+xml"]
Vue.mixin({
    methods:{
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
        
        format_url(str) {
            if(str.split(" ").length > 1) {
                return str.split(" ").join("-").toLowerCase()
            } else {
                return str.toLowerCase()
            }
        },
        date_moment(date) {
            let now = this.date(),
                created = JSON.parse(date),
                start = moment([created.year, created.month, created.day]),
                end = moment([now.year, now.month, now.day])

                console.log(now, start, end, created)
            return start.from(end)
        },
        // posted(post) {
        //     post = post.split("-")
        //     let now = date(),
        //         start = moment([post[0], post[1], post[2]]),
        //         end = moment([now[0], now[1], now[2]])
        //     return start.from(end)
        
        // }        
        date() {
            var dateObj = new Date();
            var month = dateObj.getUTCMonth() + 1; //months from 1-12
            var day = dateObj.getUTCDate();
            var year = dateObj.getUTCFullYear();
            return {
                year, month, day
            }
        },
        dateV2() {
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            var dateObj = new Date();
            var month = monthNames[dateObj.getMonth()]
            var day = dateObj.getUTCDate();
            var year = dateObj.getUTCFullYear();
            return {
                year, month, day
            }
        },   
        
        getTime() {
            var d = new Date(); // for now
            const hour = d.getHours(); // => 9
            const min =  d.getMinutes(); // =>  30
            const sec = d.getSeconds(); // => 51

            return hour + ":" + min
        },       
        download_csv(csv, filename) {
            var csvFile;
            var downloadLink;
        
            // CSV FILE
            csvFile = new Blob([csv], {type: "text/csv"});
        
            // Download link
            downloadLink = document.createElement("a");
        
            // File name
            downloadLink.download = filename;
        
            // We have to create a link to the file
            downloadLink.href = window.URL.createObjectURL(csvFile);
        
            // Make sure that the link is not displayed
            downloadLink.style.display = "none";
        
            // Add the link to your DOM
            document.body.appendChild(downloadLink);
        
            // Lanzamos
            downloadLink.click();
        },
        
        export_table_to_csv(html, filename) {
            var csv = [];
            var rows = document.querySelectorAll("table tr");
            
            for (var i = 0; i < rows.length; i++) {
                var row = [], cols = rows[i].querySelectorAll("td, th");
                
                for (var j = 0; j < cols.length; j++) 
                    row.push(cols[j].innerText);
                
                csv.push(row.join(","));		
            }
        
            // Download CSV
            this.download_csv(csv.join("\n"), filename);
        },
        

        computationChart(callback) {
            
            let user = this.getCookie("rcs-localstorage")
            this.firebase_get("records", (records) => {
                
                if (user.username != "admin") {
                    records = records.filter(el => el.toll_id == user.toll.id)

                }
                let total = 0, estimated = 0, missing = 0,
                    collected_data = [], estimated_data = [], missing_data = []
    
                for (let i=0; i<records.length; i++) {
    
                    let record = records[i]
                    
                    let amount_collected = parseInt(record.amount_collected.match( /\d+/g ).join('')),
                        vechile_tax = parseInt(record.vechile_tax.match( /\d+/g ).join(''))
    
                    total += amount_collected
                    estimated += vechile_tax
    
                    collected_data.push(amount_collected)
                    estimated_data.push(vechile_tax)
                    missing_data.push(vechile_tax - amount_collected)
    
                }
    
                missing = estimated - total
    
                // this.analytics[0].value = `Rs. ${estimated}.00 PKR`
                // this.analytics[1].value = `Rs. ${total}.00 PKR`
                // this.analytics[2].value = `Rs. ${missing}.00 PKR`
    
                
                console.log(estimated_data, collected_data)
                // this.loading = false
    
                this.createCrossChart({
                    labels: estimated_data,
                    datasets: [{
                        label: "Missing Revenue",
                        data: missing_data,
                        borderColor: "#e53935",
                        backgroundColor: "rgba(183, 28, 28, 0.5)"
                    }, {
                        label: "Total Revenue Made",
                        data: collected_data,
                        borderColor: "rgba(0,0,255,0.8)",
                        backgroundColor: "rgba(0,0,255,0.5)"
    
                    }, {
                        label: "Estimated Revenue",
                        data: estimated_data,
                        borderColor: "#1b5e20",
                        backgroundColor: "rgba(124, 179, 66, 0.5)"
                    }]
                }, true)
                
                callback({ estimated : `Rs. ${estimated}.00 PKR` , total: `Rs. ${total}.00 PKR`, missing: `Rs. ${missing}.00 PKR` })
    
            })

        }
        

        
    }
})