let courses;
$.getJSON("../staff/courses.json", function(json) {
    //console.log(json); // this will show the info it in firebug console
    courses=json
    var app = new Vue({
        el: '#app',
        data: {
            classes:courses
        },
        methods:{
            niceNames(ar){
                let n = [];
                for (const i in ar){
                    const sp = ar[i].split(', ');
                    n.push(((sp[1]||'')+' '+sp[0]).trim())
                }
                return n
            }
        }
    })
});
