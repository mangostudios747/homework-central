
$.getJSON("../staff/courses.json", function(json) {
    //console.log(json); // this will show the info it in firebug console
    vapp.classes=json

});
let iso;
function indexOfCI(ar,q){
    let lq;
    let lreal;
    let real;
    for (let i in ar) {
        real = ar[i];
        lreal = ar[i].toLowerCase();
        lq = q.toLowerCase()
        if (lreal==lq){
            return real
        }
    }
    return false
}

var vapp = new Vue({
    el: '#app',
    data: {
        classes: {},
        categories:{subjects:[],
            benefits:[],length:[]},
        selectedFilters:{subjects:[],
            benefits:[],length:[]},
        isotop: {filteredItems:{length:191}}
    },
    methods:{
        filterFits(elem){

        },
        niceNames(ar){
            let n = [];
            for (const i in ar){
                const sp = ar[i].split(', ');
                n.push(((sp[1]||'')+' '+sp[0]).trim())
            }
            if (n[0]==NaN){
                return []
            }
            return n
        },

        registerFilter(t){
            let bindex = indexOfCI(this.categories.benefits, t);
            let sindex = indexOfCI(this.categories.subjects, t);
            let lindex = indexOfCI(this.categories.length, t);

            if (bindex && !(indexOfCI(this.selectedFilters.benefits, t))){
                this.selectedFilters.benefits.push(bindex);
                return true
            }
            else if (sindex && !(indexOfCI(this.selectedFilters.subjects, t))){
                this.selectedFilters.subjects.push(sindex);
                return true
            }
            else if (lindex && !(indexOfCI(this.selectedFilters.length, t))){
                this.selectedFilters.length.push(lindex);
                return true
            }
            else {
                return false
            }
        },
        registerTag(t,c){
            //t is the name, c is the type of tag.
            if (!(['benefits','subjects','length'].includes(c))){
                return console.error('Got an invalid key, '+c+' while registering the tag '+t)
            }
            else if (!(this.categories[c].includes(t))){
                this.categories[c].push(t);
                return t
            }
            else {
                return t
            }

        }
    },
    mounted(){

        var $check = $("input[type=checkbox]"), el;
        $check
            .data('checked',0)
            .click(function(e) {

                el = $(this);

                switch(el.data('checked')) {

                    // unchecked, going indeterminate
                    case 0:
                        el.data('checked',1);
                        el.prop('indeterminate',true);
                        break;

                    // indeterminate, going checked
                    case 1:
                        el.data('checked',2);
                        el.prop('indeterminate',false);
                        el.prop('checked',true);
                        break;

                    // checked, going unchecked
                    default:
                        el.data('checked',0);
                        el.prop('indeterminate',false);
                        el.prop('checked',false);

                }

            });


    },
    ready(){

    }
})


function getElementTags(elem){
    return [[...elem.querySelectorAll('.badge-info')].map(function(el){return el.innerHTML}),[...elem.querySelectorAll('.badge-warning')].map(function(el){return el.innerHTML}),[...elem.querySelectorAll('.badge-purple')].map(function(el){return el.innerHTML})]
}

function refreshSelect() {
    if (vapp.selectedFilters.subjects.length > 0 && vapp.selectedFilters.benefits.length > 0) {
        iso.arrange({
            filter: function () {
                tags = getElementTags(this);
                return tags[0].filter(x=>vapp.selectedFilters.subjects.includes(x)).length>0 && tags[1].filter(x=>vapp.selectedFilters.benefits.includes(x)).length>0 && (vapp.selectedFilters.length.length==0 ||vapp.selectedFilters.length.includes(tags[2][0]) )


            }
        })
    }
    else if (vapp.selectedFilters.subjects.length > 0) {
        iso.arrange({
            filter: function () {
                tags = getElementTags(this);
                return tags[0].filter(x=>vapp.selectedFilters.subjects.includes(x)).length>0 && (vapp.selectedFilters.length.length==0 ||vapp.selectedFilters.length.includes(tags[2][0]) )


            }
        })
    }
    else if (vapp.selectedFilters.benefits.length > 0) {
        iso.arrange({
            filter: function () {
                tags = getElementTags(this);
                return tags[1].filter(x=>vapp.selectedFilters.benefits.includes(x)).length>0 && (vapp.selectedFilters.length.length==0 ||vapp.selectedFilters.length.includes(tags[2][0]) )


            }
        })
    }
    else{
        iso.arrange({filter:function(){
            tags = getElementTags(this);
            return (vapp.selectedFilters.length.length==0 ||vapp.selectedFilters.length.includes(tags[2][0]) )
        }})
    }
}

function newTag(){
    if (!iso){
        iso = new Isotope(document.querySelector('[data-isotope]'),{});
        vapp.isotop = iso
    }
    let validTag = vapp.registerFilter(inpPl.innerHTML);
    if (validTag) {
        inpPl.innerHTML = ''
    } else {
        shake(inpPl.parentElement, 20, true)
    }

    //apply the filter now

    refreshSelect()

}

inpPl =document.getElementById('newTagInput');
inpPl.addEventListener('keypress',function(e){
     //we only need to initialize when someone bothers to type something.
    let validTag;
    if (e.code === "Enter") {
        e.preventDefault();
        newTag()

    }
})

var shakingElements = [];

var shake = function (element, magnitude = 15, angular = false) {
    //First set the initial tilt angle to the right (+1)
    var tiltAngle = 1;

    //A counter to count the number of shakes
    var counter = 1;

    //The total number of shakes (there will be 1 shake per frame)
    var numberOfShakes = 15;

    //Capture the element's position and angle so you can
    //restore them after the shaking has finished
    var startX = 0,
        startY = 0,
        startAngle = 0;

    // Divide the magnitude into 10 units so that you can
    // reduce the amount of shake by 10 percent each frame
    var magnitudeUnit = magnitude / numberOfShakes;

    //The `randomInt` helper function
    var randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    //Add the element to the `shakingElements` array if it
    //isn't already there
    if(shakingElements.indexOf(element) === -1) {
        //console.log("added")
        shakingElements.push(element);

        //Add an `updateShake` method to the element.
        //The `updateShake` method will be called each frame
        //in the game loop. The shake effect type can be either
        //up and down (x/y shaking) or angular (rotational shaking).
        if(angular) {
            angularShake();
        } else {
            upAndDownShake();
        }
    }

    //The `upAndDownShake` function
    function upAndDownShake() {

        //Shake the element while the `counter` is less than
        //the `numberOfShakes`
        if (counter < numberOfShakes) {

            //Reset the element's position at the start of each shake
            element.style.transform = 'translate(' + startX + 'px, ' + startY + 'px)';

            //Reduce the magnitude
            magnitude -= magnitudeUnit;

            //Randomly change the element's position
            var randomX = randomInt(-magnitude, magnitude);
            var randomY = randomInt(-magnitude, magnitude);

            element.style.transform = 'translate(' + randomX + 'px, ' + randomY + 'px)';

            //Add 1 to the counter
            counter += 1;

            requestAnimationFrame(upAndDownShake);
        }

        //When the shaking is finished, restore the element to its original
        //position and remove it from the `shakingElements` array
        if (counter >= numberOfShakes) {
            element.style.transform = 'translate(' + startX + ', ' + startY + ')';
            shakingElements.splice(shakingElements.indexOf(element), 1);
        }
    }

    //The `angularShake` function
    function angularShake() {
        if (counter < numberOfShakes) {
            //console.log(tiltAngle);
            //Reset the element's rotation
            element.style.transform = 'rotate(' + startAngle + 'deg)';

            //Reduce the magnitude
            magnitude -= magnitudeUnit;

            //Rotate the element left or right, depending on the direction,
            //by an amount in radians that matches the magnitude
            var angle = Number(magnitude * tiltAngle).toFixed(2);
            //console.log(angle);
            element.style.transform = 'rotate(' + angle + 'deg)';
            counter += 1;

            //Reverse the tilt angle so that the element is tilted
            //in the opposite direction for the next shake
            tiltAngle *= -1;

            requestAnimationFrame(angularShake);
        }

        //When the shaking is finished, reset the element's angle and
        //remove it from the `shakingElements` array
        if (counter >= numberOfShakes) {
            element.style.transform = 'rotate(' + startAngle + 'deg)';
            shakingElements.splice(shakingElements.indexOf(element), 1);
            //console.log("removed")
        }
    }

};