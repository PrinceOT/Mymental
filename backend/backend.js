const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./database");

app.use(cors());
app.use(express.json());

const admin = require('firebase-admin');
const serviceAccount = require('./servicekey.json');
if(!admin.getApps){
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
}
const db = admin.firestore();
app

app.use('/', (req, res) => {
    res.send('Welcome to the Backend API!');
  });

// app.use("/api/", (request,response)=> {
  
//     // prettyPrintResponse(error.res);
//     // res.json(formatError(error.res));
//     response.json("Server is running")
//   });

// Middleware or route handler to verify the Firebase ID token
const verifyToken = async (token) => {
  

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
    //next();
  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

//signup
app.post("/signup",async(req,res)=>{
    try {
        
       //recieved data 
        const rd = req.body;
        
        //const processedData = rd.map((dataItem, index) => {  
            //const { username, password} = dataItem;
           console.log(rd);

            const query = "INSERT INTO users (email, username, password, fbid,profilepic) VALUES($1,$2,$3,$4,$5) RETURNING *";
            const values = [rd.email,rd.user,rd.psw,rd.fbid,rd.profilepic];

          const newUser = pool.query(query,values);
          res.json(newUser);
          console.log('Data inserted successfully');

        // });
         //res.json(processedData);
    } catch (error) {
        console.log(error.message);
        //console.log(req.body);
        //console.log(error.deatil);
        
    }
   // res.json(processedData);
})



// set progress data
app.post("/mymental/progress",async(req,res)=>{
    const idToken = req.headers.authorization;
    try {
        //recievd data 
        const rd= req.body;
      
        const decodedToken = await verifyToken(idToken);

    const fbid = await decodedToken.uid;
    console.log(fbid);
    console.log(rd.Total);
          const query = "INSERT INTO progress (fbid,total,depression,anxiety,ptsd,stress) VALUES($1,$2,$3,$4,$5,$6)";

          const values = [fbid,rd.Total,rd.Depression,rd.Anxiety,rd.Ptsd,rd.Stress];

         const newlog = await pool.query(query,values)
          res.json({ message: 'Data inserted successfully' });
          console.log('Data inserted successfully');
          //res.json(processedData);
        
    } catch (error) {
        console.error('Error inserting data:', error);
        
        res.status(500).json({ error: 'Internal server error' });
        console.error(error.message);
        console.log(req.body.total);
    }
  


});

app.post("/post",async(req,res)=>{
    const idToken = req.headers.authorization;
    try {
        //recievd data 
        const rd= req.body;
      
        const decodedToken = await verifyToken(idToken);
     console.log( rd.Content);
    const fbid =  decodedToken.uid;
  
          const query = "INSERT INTO post (fbid,imageurl,content,likes,comments) VALUES($1,$2,$3,$4,$4) ";

          const values = [fbid,rd.Image,rd.Content,0];

         const newlog = await pool.query(query,values)
          res.json({ message: 'Data inserted successfully' });
          console.log('Data inserted successfully');
          //res.json(processedData);
        
    } catch (error) {
        console.error('Error inserting data:', error);
        
        res.status(500).json({ error: 'Internal server error' });
        console.error(error.message);
        console.log(req.body.total);
    }
});


app.get("/post",async(req,res)=>{
   
    try {
      const query = "select imageurl,username,content,users.fbid,ptid,post.created_at, profilepic from post inner join users on users.fbid = post.fbid order by ptid ASC"
      const timeline = await pool.query(query);
      res.json(timeline.rows)
        
    } catch (error) {
        console.error('Error inserting data:', error);
        
        res.status(500).json({ error: 'Internal server error' });
        console.error(error.message);
        console.log(req.body.total);
    }
});

app.get("/likes",async(req,res)=>{
   
    
    try { 
        const ptid = req.headers.ptid;
        
        
      const query = "SELECT * FROM likes Where ptid = $1"
      const values = [ptid];
      const likes = await pool.query(query,values);
      res.json(likes.rowCount)
        
    } catch (error) {
        console.error('Error inserting data:', error);
        
        res.status(500).json({ error: 'Internal server error' });
        console.error(error.message);
        console.log(req.body.total);
    }
});
app.get("/count",async(req,res)=>{
    const idToken = req.headers.authorization;
    
    try { 
        const ptid = req.headers.ptid;
        const decodedToken = await verifyToken(idToken);

      const fbid =  decodedToken.uid;  
     // console.log(fbid);
      const query = "SELECT * FROM likes Where ptid = $1 and fbid = $2"
      const values = [ptid,fbid];
      const likes = await pool.query(query,values);
      const query1 = "SELECT likes FROM post Where ptid = $1"
      const values1 = [ptid];
      const likes1 = await pool.query(query1,values1);
      res.json(likes.rowCount)
      
        
    } catch (error) {
        console.error('Error inserting data:', error);
        
        res.status(500).json({ error: 'Internal server error' });
        console.error(error.message);
        console.log(req.body.total);
    }
});

app.post("/likes",async(req,res)=>{
    const idToken = req.headers.authorization;
  try {
      //recievd data 
     const ptid= req.body.Ptid;
     
    
      const decodedToken = await verifyToken(idToken);

  const fbid =  decodedToken.uid;
  const query = "INSERT INTO likes (fbid,ptid) VALUES($1,$2) "
  const query1 = "UPDATE post SET likes = likes + 1 where ptid = $1"
  const values = [fbid,ptid];
  const values1 = [ptid];
  const likes1 = await pool.query(query1,values1)
 const likes = await pool.query(query,values)
 
     res.json(likes.rowCount)
     
        
    } catch (error) {
        console.error('Error inserting data:', error);
        
        res.status(500).json({ error: 'Internal server error' });
        console.error(error.message);
        console.log(req.body.total);
    }
});

app.delete("/likes",async(req,res)=>{
    const idToken = req.headers.authorization;
    
  try {
      //recievd data 
      const ptid= req.headers.ptid;
     
    
      const decodedToken = await verifyToken(idToken);

  const fbid =  decodedToken.uid;
  const query1 = "UPDATE post SET likes = likes - 1 where ptid = $1"
  const query = "DELETE FROM likes WHERE fbid = $1 and ptid = $2";
  const values1 = [ptid];
  const values = [fbid,ptid];
  const likes1 = await pool.query(query1,values1)
 const likes = await pool.query(query,values)
     res.json(likes.rowCount)
     

        
    } catch (error) {
        console.error('Error inserting data:', error);
        
        res.status(500).json({ error: 'Internal server error' });
        console.error(error.message);
        console.log(req.body.total);
    }
});
app.get("/comments",async(req,res)=>{
    const ptid = req.headers.ptid;
    
    try {
        
      const query = "SELECT cid,comment,imageurl,comments.created_at,username,profilepic FROM comments join users  on comments.ptid = $1 and comments.fbid = users.fbid"
      const values = [ptid];
     const comments = await pool.query(query,values);
    
    
     res.json(comments.rows)
     //res.json(comments.rowCount)
        
    } catch (error) {
        console.error('Error inserting data:', error);
        
        res.status(500).json({ error: 'Internal server error' });
        console.error(error.message);
        console.log(req.body.total);
    }
});


app.post("/comments",async(req,res)=>{
    const idToken = req.headers.authorization;
    try {
        //recievd data 
        const rd= req.body;
        console.log(rd.Ptid);
        const decodedToken = await verifyToken(idToken);
    const fbid =  decodedToken.uid;
    const query1 = "UPDATE post SET comments = comments + 1 where ptid = $1"
    const values1 = [rd.Ptid]; 
   
          const query = "INSERT INTO comments (fbid,comment,imageurl,ptid) VALUES($1,$2,$3,$4) ";
          const values = [fbid,rd.Comment,rd.Image,rd.Ptid];

         const comment = await pool.query(query,values);
          const comments1 = await pool.query(query1,values1);
          //res.json({ message: 'Data inserted successfully' });
          res.json(comment.rowCount)
          console.log('Data inserted successfully');
          //res.json(processedData);
        
    } catch (error) {
        console.error('Error inserting data:', error);
        
        //res.status(500).json({ error: 'Internal server error' });
        console.error(error.message);
        console.log(req.body.total);
    }
});
app.patch("/user",async(req,res)=>{
    const idToken = req.headers.authorization;
    try {
        
        //recievd data 
        const rd= req.body;
    //     console.log(rd.bio);
        const decodedToken = await verifyToken(idToken);
    const fbid =  decodedToken.uid;
    const cityRef = db.collection('users').doc(fbid);

// Set the 'capital' field of the city

    // if(rd.bio === ''){
    //     const query = "UPDATE users SET username = $1 where fbid = $2"
    // const values = [rd.username,fbid];
    // const update = await pool.query(query,values);
    // }
    // else if(rd.username === ''){
    //     const query = "UPDATE users SET bio = $1 where fbid = $2"
    // const values = [rd.bio,fbid];
    // const update = await pool.query(query,values);
    // }
    // else {
    const query = "UPDATE users SET bio = $1 , username = $2 , profilepic = $3 , backgroundcolor = $4 where fbid = $5"
    const values = [rd.bio,rd.username,rd.profilepic,rd.backgroundColor,fbid];
    const update = await pool.query(query,values);
    const resp = await cityRef.update({username: rd.username , profilepic:rd.profilepic});
    
        

          
          res.json({ message: 'Data inserted successfully' });
          console.log('Data inserted successfully');
          //res.json(processedData);
        
    } catch (error) {
        console.error('Error inserting data:', error);
        
        res.status(500).json({ error: 'Internal server error' });
        console.error(error.message);
        console.log(req.body.total);
    }
});



app.get("/gameview",async(req,res)=> {
  const query = "SELECT * FROM games"
  const games = await pool.query(query);
  res.json(games.rows)
}) 


app.get("/user",async(req,res)=> {
    const idToken = req.headers.authorization;
    try{
        const decodedToken = await verifyToken(idToken);
        const fbid = await decodedToken.uid;

  const query = "SELECT * FROM users where fbid = $1"
  const userinfo = await pool.query(query,[fbid]);
  console.log("request recieved")
  res.json(userinfo.rows)
    }catch (error){
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'Internal server error' });
        console.error(error.message);

    }
}) 
app.get("/other",async(req,res)=> {
    const fbid = req.headers.authorization;
    try{
        
        

  const query = "SELECT * FROM users where fbid = $1"
  const userinfo = await pool.query(query,[fbid]);
  res.json(userinfo.rows)
    }catch (error){
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'Internal server error' });
        console.error(error.message);

    }
}) 
app.get("/userinfo",async(req,res)=> {
    const idToken = req.headers.authorization;
    try{
        const decodedToken = await verifyToken(idToken);
        const fbid = await decodedToken.uid;

  const query = "select imageurl , username, content,ptid,post.created_at,profilepic from post inner join users on users.fbid = post.fbid  where post.fbid = $1 order by ptid ASC"
  const userinfo = await pool.query(query,[fbid]);
  const query1 = "select post.ptid ,imageurl, profilepic,content,username,post.created_at from post inner join likes on likes.ptid = post.ptid inner join users on users.fbid = post.fbid where likes.fbid = $1  ;"
  const userinfo1 = await pool.query(query1,[fbid]);
 
  res.json((userinfo.rows).concat(userinfo1.rows))
    }catch (error){
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'Internal server error' });
        console.error(error.message);

    }
}) 
app.get("/otherinfo",async(req,res)=> {
    const fbid = req.headers.authorization;
    try{
        

  const query = "select imageurl , username, content,ptid,post.created_at,profilepic from post inner join users on users.fbid = post.fbid  where post.fbid = $1 order by ptid ASC;"
  const userinfo = await pool.query(query,[fbid]);
  const query1 = "select post.ptid ,imageurl, profilepic,content,username,post.created_at from post inner join likes on likes.ptid = post.ptid inner join users on users.fbid = post.fbid where likes.fbid = $1  ;"
  const userinfo1 = await pool.query(query1,[fbid]);
 
  res.json((userinfo.rows).concat(userinfo1.rows))
    }catch (error){
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'Internal server error' });
        console.error(error.message);

    }
}) 




app.get("/mymental/progress/get",async(req,res)=>{
    const idToken = req.headers.authorization;
    try {
        const decodedToken = await verifyToken(idToken);

        const fbid = await decodedToken.uid;
            const query = "SELECT * FROM Progress WHERE fbid = $1";
            const values = [fbid];

          const progress =  await pool.query(query,values);
          res.json(progress.rows);
          console.log(progress.rows);
      
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'Internal server error' });
        console.error(error.message);
        //console.log(req.body.total);
    }
        
    });
app.patch("/chat",async(req,res)=>{
   
    const rd = req.body.update;
    try {
        
       console.log(rd.combinedId)

        const fbid = req.body.uid;
       
        const cityRef = db.collection('userchats').doc(fbid);

         await cityRef.update({
            [rd.combinedId+".userInfo.uid"]:rd.uid,
            [rd.combinedId+".userInfo.email"]:rd.email,
            [rd.combinedId+".userInfo.username"]:rd.username,
            [rd.combinedId+".userInfo.profilepic"]:rd.profilepic,
            //date: FieldValue.serverTimestamp(),
        });
        //console.log(response);

     // res.json("Successful creation");
    } catch (error) {
        // console.error('Error inserting data:', error);
         res.status(500).json({ error: 'Internal server error' });
        // console.error(error.message);
        //console.log(req.body.total);
    }
        
    });

    app.get("/gameview",async(req,res)=>{
       
      try {
          //recievd data 
         const rd = req.body;
         
        
        
    
     
      const query = "SELECT * FROM games "
      
      //const values = [rd.title,rd.description,rd.topic,rd.genre,rd.level,rd.imageurl,rd.gameurl];
     
     
     const game = await pool.query(query)
     
         res.json(game.rows)
         
            
        } catch (error) {
            console.error('Error inserting data:', error);
            
            res.status(500).json({ error: 'Internal server error' });
            console.error(error.message);
            console.log(req.body.total);
        }
    });
    app.get("/onegame",async(req,res)=>{
       
      try {
          //recievd data 
         const rd = req.headers.imageurl;
         //console.log(rd)
         
        
        
    
     
      const query = "SELECT * FROM games where imageurl = $1 "
      
      //const values = [rd.title,rd.description,rd.topic,rd.genre,rd.level,rd.imageurl,rd.gameurl];
     
     
     const game = await pool.query(query,[rd])
     
         res.json(game.rows)
         
            
        } catch (error) {
            console.error('Error inserting data:', error);
            
            res.status(500).json({ error: 'Internal server error' });
            console.error(error.message);
            console.log(req.body.total);
        }
    });
    app.get("/getlikegame",async(req,res)=>{
       
      try {
          //recievd data 
         const gid = req.headers.gid;
        
         
         
        
        
    
     
      const query = "SELECT likes FROM games where gid = $1 "
      
    //   const values = [rd.title,rd.description,rd.topic,rd.genre,rd.level,rd.imageurl,rd.gameurl];
     
     
     const game = await pool.query(query,[gid])
     
     
         res.json(game.rows)
         
            
        } catch (error) {
            console.error('Error inserting data:', error);
            
            res.status(500).json({ error: 'Internal server error' });
            console.error(error.message);
            console.log(req.body.total);
        }
    });
    app.patch("/patchlikes",async(req,res)=>{
       
      try {
          //recievd data 
         const gid = req.body.gid
         
         
         
        
        
        const query = "UPDATE games SET likes = likes + 1 where gid = $1"
      
      //const values = [rd.title,rd.description,rd.topic,rd.genre,rd.level,rd.imageurl,rd.gameurl];
     
     
     const game = await pool.query(query,[gid])
     //console.log(game)
     
         //res.json(game.rows)
         
            
        } catch (error) {
            console.error('Error inserting data:', error);
            
            res.status(500).json({ error: 'Internal server error' });
            console.error(error.message);
            console.log(req.body.total);
        }
    });
   // res.json(processedData););

// get progress data
app.listen(3001,
console.log("server has started onport 3001"))


