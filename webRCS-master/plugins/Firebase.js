import Vue from 'vue'
import { db, auth } from '@/services/firebase'

Vue.mixin({
    methods:{
        async firebase_update({ ref, obj }, callback) {
            db.ref(ref).set(obj)
            .then((res) => {
                callback(res)
            })
        },
        async firebase_push_db({ref, obj }, callback) {
            db.ref(ref).push(obj)
            .then((snapshot) => {
                console.log(snapshot, 'snapshot')
                callback(snapshot)
            })
        },
        firebase_remove_one(ref, callback) {
            db.ref(ref).remove()
            .then(res => {
                callback(res)
            })
        },
        async firebase_put_db({ref, child, obj }, callback, error) {
            db.ref(ref).child(child)
            .set(obj)
            .then((snapshot) => {
                console.log(snapshot, 'snapshot')
                callback(snapshot)
            })
            .catch(err => error(err.response))
        },  
        firebase_get_one(ref, callback) {
            db.ref(ref).on('value', (snapshot) => {
                if(snapshot.val()) {
                    let item = {...snapshot.val(), key: snapshot.key}
                    callback(item)    
                } else {
                    callback(null)
                }
            })
        },
        firebase_get(ref, callback) {
            let array = [],
                $this = this
            db.ref(ref).once('value')
            .then((snapshot) => {
                snapshot.forEach(function(item) {
                    let key = item.key
                    item = item.val()
                    array.push({...item, key})
                })
                callback(array)
            })
        },
    }
})