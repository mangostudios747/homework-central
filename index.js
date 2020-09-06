Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}



Vue.component('course-block', {
    props: ["color","name","teacher","assignments","index","completed"],
    template: `<div class="card" >
            <div :class="'card-body text-'+color">
                <h4 class="card-title">{{name}}<button data-toggle="modal" :onclick="'app.focusedClass='+index+';document.getElementById(\`eCName\`).value=\`'+name+'\`;document.getElementById(\`eCColor\`).value=\`'+color+'\`;document.getElementById(\`eCTeacher\`).value=\`'+teacher+'\`'"  data-target="#ecm" class="float-right btn"><i class="fas fa-pen"></i></button>
</h4>
                <p class="card-text">{{teacher}}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li v-if="assignments.length==0" class="list-group-item blank column" ><div class="row text-muted "><img height="10rem" src="bootstrap-icons/done.svg"/></div><div class="row text-center"><p class="text-muted">Nothing to do!</p></div></li>
                <template>
                <li v-for="(assignment,aIndex) in assignments" :class="'list-group-item list-group-item-'+color"><a :onclick="'app.classes['+index+'].assignments.splice('+aIndex+',1);save()'" style="text-decoration: none;cursor: pointer" class="display-6 mt-4 text-muted close float-right">&times;</a><h5 class="pt-2"><div class="">
  <button type="button" class="btn" :id="index+'-'+aIndex" :onclick="'setTimeout(()=>{app.classes['+index+'].completed.push(app.classes['+index+'].assignments['+aIndex+']);app.classes['+index+'].assignments.splice('+aIndex+',1);save();},100)'"><i class="far text-white fa-square"></i></button>
  <label class="" :for="index+'-'+aIndex">{{assignment.name}} <i  class="ml-2 fas fa-pen"></i></label>
</div>  </h5><p class="text-muted">{{assignment.due.toDateString() }}</p></li>
            </template>
           <li class="list-group-item blank dropdown-toggle" style="cursor: pointer" data-toggle="collapse" :href="'#completed-'+index" aria-expanded="false" aria-controls="'completed-'+index">
         Completed  
</li>
            </ul>
            
            <ul class="list-group list-group-flush collapse" :id="'completed-'+index" >
                            <li v-if="completed.length==0" class="list-group-item blank column" ><div class="row text-muted "><i style="height:3rem;width:3rem" class="mx-auto fas fa-tasks"></i></div><div class="row text-center"><p class="text-muted">Nothing done yet!</p></div></li>

                            <li v-for="(cAssignment,cIndex) in completed" :class="'list-group-item list-group-item-'+color"><a :onclick="'app.classes['+index+'].completed.splice('+cIndex+',1);save()'" style="text-decoration: none;cursor: pointer" class="display-6 mt-4 text-muted close float-right">&times;</a><h5 class="pt-2">  <button type="button" class="btn" :id="index+'-'+cIndex" :onclick="'setTimeout(()=>{app.classes['+index+'].assignments.push(app.classes['+index+'].completed['+cIndex+']);app.classes['+index+'].completed.splice('+cIndex+',1);save();},100)'"><i class="fas fa-check-square"></i></button>
<s>{{cAssignment.name}}</s> </h5><p class="text-muted">{{cAssignment.due.toDateString() }}</p></li>
</ul>
            <div class="card-body">
                <div class=" float-right ">
                <a href="./" :class="'card-link btn btn-'+color" data-toggle="modal" :onclick="'app.focusedClass='+index"  data-target="#nam">New</a>
                <button href="./" :class="'card-link btn btn-outline-'+color" :onclick="'app.classes['+index+'].completed = app.classes['+index+'].completed.concat(app.classes['+index+'].assignments);app.classes['+index+'].assignments = [];'">Mark all as done</button>
                </div>
            </div>
    </div>`
})


Vue.component('dcourse-block', {
    props: ["color","name","teacher","assignments","index","completed"],
    template: `<div class="card" >
            <div :class="'card-body text-'+color">
                <h4 class="card-title">{{name}} <button data-toggle="modal" :onclick="'app.focusedClass='+index+';document.getElementById(\`eDCName\`).value=\`'+name+'\`;document.getElementById(\`eDCColor\`).value=\`'+color+'\`;document.getElementById(\`eDCTeacher\`).value=\`'+teacher+'\`'"  data-target="#edcm" class="float-right btn" :class="'text-'+color"><i class="fas fa-pen"></i></button>
</h4>
                <p class="card-text">{{teacher}}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li v-if="assignments.length==0" class="list-group-item blank column" ><div class="row text-muted "><img height="15rem" class="mb-4" src="bootstrap-icons/done.svg"/></div><div class="row text-center"><p class="text-muted">Nothing to do!</p></div></li>
                <template>
                <li v-for="(assignment,aIndex) in assignments" :class="'list-group-item text-white bg-'+color"><a :onclick="'app.dclasses['+index+'].assignments.splice('+aIndex+',1);save()'" style="text-decoration: none;cursor: pointer" class="display-6 mt-4 text-muted close float-right">&times;</a><h5 class="pt-2"><div class="">
  <button type="button" class="btn" :id="index+'-'+aIndex" :onclick="'setTimeout(()=>{app.dclasses['+index+'].completed.push(app.dclasses['+index+'].assignments['+aIndex+']);app.dclasses['+index+'].assignments.splice('+aIndex+',1);save();},100)'"><i class="far text-white fa-square"></i></button>
  <span><label class="" :for="index+'-'+aIndex">{{assignment.name}} </label> <a class="btn" :onclick="'app.focusedClass= '+ index+';app.focusedAssig = '+ aIndex+';document.getElementById(\`eDATitle\`).value= \`'+assignment.name+'\`'" data-toggle="modal" data-target="#edam"><i class=" text-white fas fa-pen"></i></a></span>
</div>  </h5><p class="text-white">{{assignment.due.toDateString() }}</p></li>
            </template>
           <li class="list-group-item blank dropdown-toggle" style="cursor: pointer" data-toggle="collapse" :href="'#dcompleted-'+index" aria-expanded="false" aria-controls="'dcompleted-'+index">Completed</li>
            </ul>
            
            <ul class="list-group list-group-flush collapse" :id="'dcompleted-'+index" >
                            <li v-if="completed.length==0" class="list-group-item blank column" ><div class="row text-muted "><i style="height:3rem;width:3rem" class="mx-auto fas fa-tasks"></i></div><div class="row text-center"><p class="text-muted">Nothing done yet!</p></div></li>

                            <li v-for="(cAssignment,cIndex) in completed" :class="'list-group-item list-group-item-'+color"><a :onclick="'app.dclasses['+index+'].completed.splice('+cIndex+',1);save()'" style="text-decoration: none;cursor: pointer" class="display-6 mt-4 text-muted close float-right">&times;</a><h5 class="pt-2">  <button type="button" class="btn" :id="index+'-'+cIndex" :onclick="'setTimeout(()=>{app.dclasses['+index+'].assignments.push(app.dclasses['+index+'].completed['+cIndex+']);app.dclasses['+index+'].completed.splice('+cIndex+',1);save();},100)'"><i class="fas fa-check-square"></i></button>
<s>{{cAssignment.name}}</s> </h5><p class="text-muted">{{cAssignment.due.toDateString() }}</p></li>
</ul>
            <div class="card-body">
                <div class=" float-right ">
                <a href="./" :class="'card-link btn btn-'+color" data-toggle="modal" :onclick="'app.focusedClass='+index"  data-target="#ndam">New</a>
                <button href="./" :class="'card-link btn btn-outline-'+color" :onclick="'app.dclasses['+index+'].completed = app.dclasses['+index+'].completed.concat(app.dclasses['+index+'].assignments);app.dclasses['+index+'].assignments = [];'">Mark all as done</button>
                </div>
            </div>
    </div>`
})


var app = new Vue({
    el: '.tab-content',
    data: {
        theme:importTheme(),
        style:importStyle(),
        time:new Date(),
        focusedClass: null,
        clubs: [],
        staff:[],
        holidayReason:null,
        staffsched:{},
        focusedAssig:null,
        timemode: 12,
        schedule:theSchedule,
        focusedDate: new Date(),
        classes: importData()[0] || [
            // test data
            /*{
                //index:0,
                name:"Chemistry H",
                teacher:"O'Connell",
                color:"success",
                assignments:[
                    {name:"Complete Survey",
                    due:new Date()}
                ]
            },
            {
                //index:1,
                name:"Cont Lit",
                teacher:"Munger",
                color:"info",
                assignments:[
                    {name:"Complete Survey",
                        due:new Date()}
                ]
            }*/
        ],
        dclasses: importData()[1]||[

            {name:"Period 1",
            hcname:"Period 1",
                color:"danger",
                teacher:"",
                completed:[],
            assignments:[]},
            {name:"Period 2",
                hcname:"Period 2",
                color:"orange",
                teacher:"",
                completed:[],
                assignments:[]},
            {name:"Period 3",
                hcname:"Period 3",
                color:"warning",
                teacher:"",
                completed:[],
                assignments:[]},
            {name:"Period 4",
                hcname:"Period 4",
                color:"success",
                teacher:"",
                completed:[],
                assignments:[]},
            {name:"Period 5",
                hcname:"Period 5",
                color:"primary",
                teacher:"",
                completed:[],
                assignments:[]},
            {name:"Period 6",
                hcname:"Period 6",
                color:"purple",
                teacher:"",
                completed:[],
                assignments:[]},
            {name:"Period 7",
                hcname:"Period 7",
                color:"pink",
                teacher:"",
                completed:[],
                assignments:[]},
            {name:"Period 8",
                hcname:"Period 8",
                color:"info",
                teacher:"",
                completed:[],
                assignments:[]},
            {name:"Lunch",
                hcname:"Lunch",
                color:"dark",
                teacher:"",
                completed:[],
                assignments:[]},
            {name:"SELF",
                hcname:"SELF",
                color:"dark",
                teacher:"",
                completed:[],
                assignments:[]}
        ]
    },
    computed:{
        hours: function(){
            return this.time.getHours()
        },
        minutes: function(){
            return this.time.getMinutes()
        },
        seconds: function(){

            return this.time.getSeconds()
        },
        focusedSched: function(){
            return this.getSched(this.focusedDate.addDays(0),this.schedule)
        },
        nextSched: function(){
            return this.getSched(this.focusedDate.addDays(1),this.schedule)
        },
        prevSched: function(){
            return this.getSched(this.focusedDate.addDays(-1),this.schedule)
        }
    },
    mounted: function () {
        window.setInterval(() => {
            this.time = new Date();
        }, 1000)
    },
    methods: {
        doubleZero: function (num){
        if (num<10){
            return "0"+num;
        }
        else{
            return num;
        }
    },
    badgeContent:function(period){
        const l = (this.dclasses.filter(function(c){return c.hcname==period.name})[0] || {assignments:[]}).assignments.length;if (l!==0){return l} else {return ""}
    },
    getSched:function (dob,sched,mainView=true){
            if (sched.overrides==undefined || sched.holidays==undefined){
                if (mainView){ this.holidayReason =  null;}
                return []
            }
        const ref = dob.getMonth()+ "-"+dob.getDate()+"-"+dob.getFullYear();
        if (ref in sched.overrides){
            //console.log("overridden");

            return sched.overrides[ref];
        }
        else if (ref in sched.holidays){
            if (mainView) {
                this.holidayReason = sched.holidays[ref]
            }
            return null //empty schedule, and set the holiday reason to what it is
        }
        else{
            //console.log("default");
            if (mainView) this.holidayReason = null;
            return sched.defaults[dob.getDay()];//regular schedule for this day of the week
        }
    },
        niceHours: function (num){
            let raw = num % this.timemode;
            if (raw==0 && num==12){
                return num
            }
            else {
                return raw
            }
        },
        setTheme: function (th) {
            this.theme = th;
            localStorage.setItem('theme',th)
        },
        setStyle: function (th) {
            this.style = th;
            localStorage.setItem('style',th)
        }

    }
});

//save()
function importData(){
    let raw = localStorage.getItem("classes");
    if(raw===null){
        raw = undefined;
    }
    else {
        raw = JSON.parse(raw);
        for (var n in raw) {
            for (var m in raw[n].assignments) {
                raw[n].assignments[m].due = new Date(raw[n].assignments[m].due);
            }
            for (var l in raw[n].completed) {
                raw[n].completed[l].due = new Date(raw[n].completed[l].due);
            }

        }
    }
    let raw2 = localStorage.getItem("dclasses");
    if(raw2===null){
        raw2 =  undefined;
    }
    else {
        raw2 = JSON.parse(raw2);
        for (var n in raw2) {
            for (var m in raw2[n].assignments) {
                raw2[n].assignments[m].due = new Date(raw2[n].assignments[m].due);
            }
            for (var l in raw2[n].completed) {
                raw2[n].completed[l].due = new Date(raw2[n].completed[l].due);
            }

        }
    }

    return [raw,raw2]
}


function importTheme(){
    const theme = localStorage.getItem("theme");
    if (!theme){
        return 'light'
    }

   document.querySelector('[value="light"]').checked=(theme=='light');
    document.querySelector('[value="dark"]').checked=(theme=='dark');
    document.body.setAttribute("data-theme",theme)

    return theme
}

function importStyle(){
    const style = localStorage.getItem("style");
    if (!style){
        return 'ios'
    }
    document.querySelector('[value="ios"]').checked=(style=='ios');
    document.querySelector('[value="material"]').checked=(style=='material');
    document.body.setAttribute("data-mode",style);
    if (style=='material'){
        document.getElementById('mode').href='https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.19.1/css/mdb.min.css'
    }
    else {
        document.getElementById('mode').href = ""
    }
    return style
}


function save(){
    let seen = [];
    localStorage.setItem("classes",
    JSON.stringify(app.classes, function(key, val) {
        if (val != null && typeof val == "object") {
            if (seen.indexOf(val) >= 0) {
                return;
            }
            seen.push(val);
        }
        return val;
    }))
    seen = [];
    localStorage.setItem("dclasses",
        JSON.stringify(app.dclasses, function(key, val) {
            if (val != null && typeof val == "object") {
                if (seen.indexOf(val) >= 0) {
                    return;
                }
                seen.push(val);
            }
            return val;
        }))
}