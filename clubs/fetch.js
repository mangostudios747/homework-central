import { clubs } from "./data.js";
import {staff} from "../staff/staff.js";

import {sched} from "../staff/staffsched.js";

let cArray = [];
for (var clubName in clubs){
    cArray.push([clubName, clubs[clubName]])
}
app.clubs = cArray;
//console.log(cArray)

let sArray = [];
for (var sName in staff){
    sArray.push([sName, staff[sName]])
}
app.staff = sArray;

app.staffsched = sched;