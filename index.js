const Joi = require('joi');
const express = require ('express');
const app = express();

// This is a piece of Middleware. 
app.use(express.json());


const courses = [ { id: 1, name: 'course1'}, { id: 2, name: 'course2'}, { id: 3, name: 'course3'} ];

// GET Method accepts 2 Parameters 1: URL 2: request, response
app.get('/', (req, res) => {
 res.send('Place the Appropriate API Endpoint.');
}); 

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

//api/courses/1    
app.get ('/api/courses/:id', (req, res) => {
    //    res.send(req.query) 
   const course = courses.find( c => c.id === parseInt(req.params.id));
   if (!course) return res.status(404).send('The course with the Given ID was not Found');
   res.send(course);
});


// POST Request
app.post ('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body); // 
    if (error) {
        //400 Bad Request
    return res.status(400).send(error.details[0].message); // Validation
};
   const course = {
       id: courses.length + 1,
       name: req.body.name  // We read this from the Body of the Request
   };
   courses.push(course); //  Add the POST Data to the Array of Courses. 
   res.send(course); // Response the Result to the Client for Client information.
})


// PUT Request 
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the Given ID was not Found');
    // Look up the Course
    // If not existing, return 404 - resource not Found
      //Validate
    //If invalid, return 400 - Bad request
    // const result = validateCourse(req.body);
    const { error } = validateCourse(req.body); // 
    if (error) {
        //400 Bad Request
    return res.status(400).send(error.details[0].message); // Validation
};
    // Update Course
    course.name = req.body.name;
    // Return the updated course
    res.send(course);

});
function validateCourse (course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
};

// DELETE Request
app.delete('/api/courses/:id', (req, res) => {
        // Look up the Course
    
        // Not Existing, return 404

        const { error } = validateCourse(req.body); // 
    if (error) {
        //400 Bad Request
    return res.status(400).send(error.details[0].message); // Validation
    
};

        // Delete
        const index = courses.indexOf(courses);
        courses.splice(index, 1);

        //Return the same Course
        res.send(courses);
})

// ENVIROMENTAL PORT 
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})



