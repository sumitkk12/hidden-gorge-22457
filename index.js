const Joi = require('joi');
const express = require('express');
app=express();

app.use(express.json());

const courses = [
    { id:1 , name:'course1'},
    {id:2 , name:'course2'},
    {id:3 , name:'course3'}
];

app.get('/', function(req,res){
    res.send('hello world!!!!');
});

app.get('/api/courses', function(req,res){
    res.send(courses);
});

// /api/courses/1
app.get('/api/courses/:id',(req,res) => {
    const course = courses.find(c => c.id=== parseInt(req.params.id ))
    if(!course) return res.status(404).send('The course with given id not found') //404
    res.send(course);
});

app.post('/api/courses' , (req,res) => {
    const { error } = validateCourse(req.body); //result.error

    if(error){
        //400 Bad Request
        res.status(400).send(error.details[0].message);
        return;
    }

    
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

app.put('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id=== parseInt(req.params.id ))
    if(!course){
        return res.status(404).send('The course with given id not found') //404
        
    } 


    //validate
   
   
    const { error } = validateCourse(req.body); //result.error

    if(error){
        //400 Bad Request
        res.status(400).send(error.details[0].message);
        return;
    }


    //update course
    course.name = req.body.name;

    //Return updated course
    res.send(course);
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course ,schema);
}

app.delete('/api/courses/:id', (req,res) => {
    //lOOK UP THE COURSE
    const course = courses.find(c => c.id=== parseInt(req.params.id ))
     //NOT EXISTING RETURN 404
    if(!course) res.status(404).send('The course with given id not found') //404
  

    //DELETE
    const index = courses.indexOf(course);
    courses.splice(index,1);

    //RETURN THE SAME COURSE
    res.send(course);
});


// PORT 
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}..`)); 
