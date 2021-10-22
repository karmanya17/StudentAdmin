const express= require("express")
const mongodb=require("mongodb")
const mongoclient=mongodb.MongoClient;
const URL="mongodb+srv://karmanya:admin123@cluster0.cwk7l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const cors=require("cors")
const app=express();
app.use(express.json())
app.use(cors({
    origin:"*"
}))
// Add Student
app.post("/student",async function(req,res){
    console.log(req.body)
    
    try{
        // req.body.id=students.length+1;
        let connection =await mongoclient.connect(URL)

        let db = connection.db("StudentAdmin")
        req.body.id= parseInt(await db.collection("students").count())+1          // Giving a Roll Id to the students .
        await db.collection("students").insertOne(req.body)

        await connection.close()
        res.json({
            Status:200,
            message:"Student Created"
        })
    }
    catch(err)
    {
        console.log(err)
        res.json({
            Status:500,
            message:err
        })
    }
    
})
// Read Student List
app.get("/student-list", async function(req,res){
    try{
        let connection =await mongoclient.connect(URL)

        let db = connection.db("StudentAdmin")

        let student=await db.collection("students").find().toArray()

        await connection.close()

        res.json(student)
    }
    catch(err)
    {
        console.log(err)
    }
})
app.get("/student/:id",async function(req,res){
    try{
        var id=parseInt(req.params.id)
        let connection =await mongoclient.connect(URL)

        let db = connection.db("StudentAdmin")

        let student=await db.collection("students").findOne({id:id})

        await connection.close()

        res.json(student)
    }
    catch(err)
    {
        console.log(err)
    }
})
//Edit a particular Student 
app.put("/student-edit/:id",async function(req,res){
    try{
        var id=parseInt(req.params.id)
        let connection =await mongoclient.connect(URL)

        let db = connection.db("StudentAdmin")

        req.body.id=id

        await db.collection("students").findOneAndUpdate({id:id},{$set:req.body})

        await connection.close()

        res.json({
            message: "student Edited"
        })
    }
    catch(err)
    {
        console.log(err)
    }
})
//Delete a particular student
app.delete("/student-delete/:id",async function(req,res){
    try{
        var id=parseInt(req.params.id)
        let conn =await mongoclient.connect(URL)

        let db = conn.db("StudentAdmin")


        await db.collection("students").deleteOne({id:id})

        await conn.close()

        res.json({
            message: "student deleted"
        })
    }
    catch(err)
    {
        console.log(err)
    }
})




app.listen(process.env.PORT ||3000,function(){
    console.log(`Server is up at 3000`);
})
