input  = require('./combined.json')

for (const i in input){
    input[i].course = JSON.parse(input[i].course)
}