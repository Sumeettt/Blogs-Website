import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3005;

let blogs = [];
let nextId = 0;

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("index.ejs", {blogs : blogs} );
});


app.post("/submit", (req, res) => {    
    let post = {
        id: nextId++,
        topic: req.body.topic,
        content : req.body.content,
        edit : false
        };
    blogs.push(post);
    res.redirect("/")

    console.log(blogs)
    
});


//delete functionality 
app.post("/delete", (req,res) => {
    const id = parseInt(req.body.id);
    const index = (blogs.findIndex(blog => blog.id === id));
    blogs.splice(index,1);
    res.redirect("/")
});


//update functionality
app.post("/edit", (req, res) => {
    const id = parseInt(req.body.id);
    console.log(id)
    const index = (blogs.findIndex(blog => blog.id ===id));
    console.log(index + "insex")
    console.log(blogs[index].edit)
    blogs[index].edit = true;
    res.render("index.ejs", {blogs: blogs})
    //console.log(blogs)
});

//update functionality save
app.post("/submit/edit", (req, res) => {
    const id = parseInt(req.body.editId);
    const {editTopic, editContent} = req.body;
    const index = blogs.findIndex(blog => blog.id ===id); 
    
    blogs[index].topic = editTopic;
    blogs[index].content = editContent; 
    blogs[index].edit = false;

    res.redirect("/");
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);

});

