const express = require("express"); 
const app = express(); 
const port = 3006; 
const cors = require("cors");

app.use(express.json({ limit: '10mb' }));     // padidintas photo upload limitas + sql confige taip pat padidintas

app.use(cors());

const mysql = require("mysql");
const md5 = require('js-md5');
const uuid = require('uuid');

app.use(

express.urlencoded({

    extended: true,

})
);

app.use(express.json());

const con = mysql.createConnection({

host: "localhost",
user: "root",
password: "",
database: "egzaminas",
});



// AUTH // 
const doAuth = function(req, res, next) {
  if (0 === req.url.indexOf('/admin')) { // admin
      const sql = `
      SELECT
      name, role
      FROM users
      WHERE session = ?
  `;
      con.query(
          sql, [req.headers['authorization'] || ''],
          (err, results) => {
              if (err) throw err;
              if (!results.length || results[0].role !== 'admin') {
                  res.status(401).send({});
                  req.connection.destroy();
              } else {
                  next();
              }
          }
      );
  } else if (0 === req.url.indexOf('/login-check') || 0 === req.url.indexOf('/login')) {      // jeigu noriu tikrint tik admin, o fronta palikti visiems, istirnti visa front dali ir vietoj else if palikti tik - else ir next();
      next();
  } else { // front
      const sql = `
      SELECT
      name, role
      FROM users
      WHERE session = ?
  `;
      con.query(
          sql, [req.headers['authorization'] || ''],
          (err, results) => {
              if (err) throw err;
              if (!results.length) {
                  res.status(401).send({});
                  req.connection.destroy();
              } else {
                  next();
              }
          }
      );
  }
}
app.use(doAuth)


// Route
// app.get("/", (req, res) => {
//   res.send("Hello Barsukai!");
// });


// app.get("/admin/hello", (req, res) => {
//   res.send("Hello Admin!");
// });


// AR ILEIDZIA AR NE //
app.get("/login-check", (req, res) => {
  let sql;
  let requests;
  if(req.query.role === 'admin') {
    sql = `
    SELECT
    name
    FROM users
    WHERE session = ? AND role = ?
    `;
    requests =  [req.headers['authorization'] || '', req.query.role]
  } else {
      sql = `
      SELECT
      name
      FROM users
      WHERE session = ?
      `;
      requests =  [req.headers['authorization'] || '']
  }
  con.query(sql, requests, (err, result) => {   // req.query.role + AND role = ? (tik dabar ismeciau)
      if (err) throw err;
      if (!result.length) {
          res.send({ msg: 'error' });
      } else {
          res.send({ msg: 'ok' });
      }
  });
});


app.post("/login", (req, res) => {
  const key = uuid.v4();
  const sql = `
  UPDATE users
  SET session = ?
  WHERE name = ? AND pass = ?
`;
  con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
      if (err) throw err;
      if (!result.affectedRows) {
          res.send({ msg: 'error', key: '' });
      } else {
          res.send({ msg: 'ok', key });
      }
  });
});



//////////////////////////////////////////////
///////////////  FRONT SHOP  /////////////////

// GET Workers //    // pakeistas del filtro // ir adinau c.id AS cid //
app.get("/front/workers", (req, res) => {
  let sql;
  let requests;
  // console.log(req.query['cat-id']);
  if (!req.query['service-id'] && !req.query['s']) {
      sql = `
      SELECT w.id, s.id AS sid, w.name, surname, spec, s.title AS ser, city, photo, rate_sum, rates
      FROM worker AS w
      LEFT JOIN services AS s
      ON s.id = w.service_id
      ORDER BY name
      `;
      requests = [];
  } else if (req.query['service-id']){
      sql = `
      SELECT w.id, s.id AS sid, w.name, surname, spec, s.title AS ser, city, photo, rate_sum, rates
      FROM worker AS w
      LEFT JOIN services AS s
      ON s.id = w.service_id
      WHERE w.service_id = ?
      ORDER BY name
      `;
      requests = [req.query['service-id']];
  } else {
      sql = `
      SELECT w.id, s.id AS sid, w.name, surname, spec, s.title AS ser, city, photo, rate_sum, rates
      FROM worker AS w
      LEFT JOIN services AS s
      ON s.id = w.service_id
      WHERE w.name LIKE ?
      ORDER BY name
      `;
      requests = ['%' + req.query['s'] + '%'];
  }
  con.query(sql, requests, (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});


/// CREATE rate

app.put("/front/rate/:id", (req, res) => {
  const sql = `
  UPDATE worker
  SET rates = rates + 1, rate_sum = rate_sum + ?
  WHERE id = ?
`;
  con.query(sql, [req.body.rate, req.params.id], (err, result) => {     // !!! tarp sql ir(err,result) IDEDU !!!! masyva [req.body.type, req.body.title, req.body.height]
    if (err) throw err;   
    res.send({result, msg: {text: 'Rated successfully', type: 'success'}});
  });
});


// GET Services
app.get("/front/services", (req, res) => {
  const sql = `
SELECT *
FROM services
ORDER BY title
`;
  con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});



//////////////////////////////////////////////
///////////////  BACK SHOP  //////////////////

// GET Services //
app.get("/admin/services", (req, res) => {
  const sql = `
  SELECT *
  FROM services
  ORDER BY title

`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});


// CREATE Services//
app.post("/admin/services", (req, res) => {
    const sql = `
    INSERT INTO services
    (title, city)
    VALUES (?, ?)
  `;

  con.query(sql, [req.body.title, req.body.city], (err, result) => {
    if (err) throw err;   
    res.send({result, msg: {text: 'New SERVICE created', type: 'success'}});
  });
});


// DELETE Services //
app.delete("/admin/services/:id", (req, res) => {
  const sql = `
  DELETE FROM services
  WHERE id = ?
`;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;   
    res.send({ result, msg: { text: 'SERVICE deleted', type: 'success' } });
  });
});

// EDIT Services //
app.put("/admin/services/:id", (req, res) => {
  const sql = `
  UPDATE services
  SET title = ?, city = ?
  WHERE id = ?
  `;
  con.query(sql, [req.body.title, req.body.city, req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'SERVICE updated', type: 'success' } });
    });
});

///////////////////////////////////////////////////////////////////////////////////

// GET Worker //
app.get("/admin/workers", (req, res) => {
  const sql = `
  SELECT w.id, name, surname, spec, s.title AS service, city, photo
  FROM worker AS w
  LEFT JOIN services AS s
  ON s.id = w.service_id
  ORDER BY title
  `;
  con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});


// CREATE Worker //
app.post("/admin/workers", (req, res) => {
  const sql = `
  INSERT INTO worker
  (name, surname, spec, service_id, photo)
  VALUES (?, ?, ?, ?, ?)
  `;
  con.query(sql, [req.body.name, req.body.surname, req.body.spec, req.body.service, req.body.photo], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'New WORKER has been created', type: 'success' } });
  });
});


// DELETE Worker //
app.delete("/admin/workers/:id", (req, res) => {
  const sql = `
  DELETE FROM worker
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'WORKER deleted', type: 'success' } });
  });
});


// EDIT Worker //
app.put("/admin/workers/:id", (req, res) => {
  const sql = `
  UPDATE worker
  SET name = ?, surname = ?, spec = ?, service_id = ?, photo = ?
  WHERE id = ?
  `;
  con.query(sql, [req.body.name, req.body.surname, req.body.spec, req.body.service, req.body.photo, req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'WORKER updated', type: 'success' } });
  });
});


// delete/edit photo //
app.delete("/admin/photos/:id", (req, res) => {
  const sql = `
  UPDATE worker
  SET photo = null
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'PHOTO removed', type: 'success' } });
  });
});


app.listen(port, () => {

  console.log(`Alo - alo, Baločka Jonas klauso - ${port}`);
  });
  