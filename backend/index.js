import Express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";


const app = Express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "skyrefdb",
})

app.use(Express.json());
app.use(cors())
app.get('/users/:userid', (req, res) => {
  const id = req.params.userid
  db.query("SELECT * FROM user WHERE userid = ?", [id], (err, results) => {
    if (err) {
      console.log(err)
      res.status(500).send('Error retrieving data')
    }
    else {
      res.json(results);;
    }
  })
})

app.get("/user", (req, res) => {
  const q = "SELECT * FROM user";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/user", (req, res) => {
  const sql = "INSERT INTO user(`username`, `password`) VALUES (?,?)";
  const values = [
    req.body.username,
    req.body.password,
  ];

  db.query(sql, values, (err, data) => {

    if (err) return res.send(err);
    return res.json("register  success");
  }
  )
})

app.get('/users/:username', (req, res) => {
  const name = req.params.username
  db.query("SELECT * FROM user WHERE username = ?", [name], (err, results) => {
    if (err) {
      console.log(err)
      res.status(500).send('Error retrieving data')
    }
    else {
      res.json(results);;
    }
  })
})

app.post('/compare', (req, res) => {
  const { field1, field2 } = req.body;
  db.query(
    'SELECT * FROM user WHERE username = ? AND password = ?',
    [field1, field2],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching data.' });
      } else if (results.length > 0) {
        res.json({ results });
      } else {
        res.status(404).json({ message: 'No match found.' });

      }
    }
  );
});
app.get('/api/table/:tableName', (req, res) => {
  const { tableName } = req.params;
  const query = `SELECT * FROM user WHERE username = ${tableName}`;
  db.query(query, (error, results) => {
    if (error) res.status(404);
    res.send(results);
  });
});
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT id FROM user WHERE username = ? AND password = ?`;
  db.query(query, [username, password], (error, results) => {
    if (error) throw error;

    if (results.length > 0) {
      const user = results[0];
      res.send({ id: user.id });
    } else {
      res.status(401).send({ message: 'Invalid username or password' });
    }
  });
});

app.get('/api/user/:userId', (req, res) => {
  const { userId } = req.params;

  const query = `SELECT * FROM users WHERE id = ?`;
  db.query(query, [userId], (error, results) => {
    if (error) throw error;

    if (results.length > 0) {
      const user = results[0];
      res.send(user);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  });
});

app.delete('/user/:id', (req, res) => {
  const userid = req.params.id;
  const q = "DELETE FROM user WHERE userid = ?"
  db.query(q, [userid], (err, data) => {
    if (err) return res.json(err);
    return res.json("user is deleted");
  })
})
app.post('/update-view-count/:id', (req, res) => {
  const modelid = req.params.id;

  db.query(
    'UPDATE model SET viewcount = viewcount + 1 WHERE modelid = ?',
    [modelid],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(200).json({ message: 'View count updated successfully' });
      }
    }
  );
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, ".././frontend/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, `image-${Date.now()}.${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  const {text,number,uploadername} = req.body;
  const file = req.file;
  const path = req.file.path
  const modPath = path.substring(19);
  db.query(
    "INSERT INTO model (name, path,link,uploader,uploadername) VALUES (?, ?, ?, ?, ?)",
    [file.originalname, modPath,text,number,uploadername],
    (error, results) => {
      if (error) {
        console.error("Error inserting file into database: ", error);
        res.status(500).json({ error: "Error inserting file into database." });
      } else {
        console.log("File inserted into database.");
        res.json({ message: "File uploaded successfully." });
      }
    }
  );
});

app.get('/image', (req, res) => {
  const sql = 'SELECT * FROM model';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching image path from MySQL: ', err);
      res.status(500).send('Internal server error');
      return;
    }
    if (!result || result.length === 0) {
      res.status(404).send('Image not found');
      return;
    }
    res.send(result);
  });
});

app.get('/images/:id', (req, res) => {
  const modelid = req.params.id
  const sql = 'SELECT * FROM model WHERE modelid = ?';
  db.query(sql,[modelid], (err, result) => {
    if (err) {
      console.error('Error fetching image path from MySQL: ', err);
      res.status(500).send('Internal server error');
      return;
    }
    if (!result || result.length === 0) {
      res.status(404).send('Image not found');
      return;
    }
    res.send(result);
  });
});

app.get('/images/w/:id', (req, res) => {
  const modelid = req.params.id
  const sql = 'SELECT * FROM model WHERE uploader = ?';
  db.query(sql,[modelid], (err, result) => {
    if (err) {
      console.error('Error fetching image path from MySQL: ', err);
      res.status(500).send('Internal server error');
      return;
    }
    if (!result || result.length === 0) {
      res.status(404).send('Image not found');
      return;
    }
    res.send(result);
  });
});

app.delete('/image/:id', (req, res) => {
  const modelid = req.params.id;
  const q = "DELETE FROM model WHERE modelid = ?"
  db.query(q, [modelid], (err, data) => {
    if (err) return res.json(err);
    return res.json("model is deleted");
  })
})

app.listen(8800, () => {
  console.log("backend started");
})