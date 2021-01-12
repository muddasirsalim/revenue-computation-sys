import Vue from 'vue'
Vue.mixin({
    methods:{
        validateEmail(string) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (re.test(String(string).toLowerCase())) {

                return true
                
            } else {
                
                return false
            }
        },

        confirmPassword(p1, p2) {


            p1.error = "Password do not match"
            if (p2.model && p1.model) {

                if (p1.model != p2.model) {

                    return p1.error = "Password do not match"

                } else {
                    return p1.error = null
                }

            } else {
                return p1.error = null
            }
        },

        validateName(str) {

            var regName = /^[a-zA-Z ]+$/;
            

            if(!regName.test(str.model)) {
                return false

            } else {
                return true
            }            
        },

        validatePhoneNumber(num) {

            if (!num.model) {
                return num.error = null
            }

            if (num.model.match(/\d/g).length===11) {

                return num.error = null

            } else {
                return num.error = "Cell Phone must be 11 digits long"
            }
        },

    }
})