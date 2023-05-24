// import mysql from 'mysql2';
// import dotenv from 'dotenv';

const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise();

async function getNotes(runMe) {
  const [rows] = await pool.query("SELECT * FROM notes");
  runMe(rows);
  return rows;
}

async function getNote(runMe, id) {
  const [rows] = await pool.query(`
  SELECT * 
  FROM notes
  WHERE id = ?
  `, [id]);
  runMe(rows[0]);
}

async function createNote(runMe, title, contents) {
  const [result] = await pool.query(`
  INSERT INTO notes (title, contents)
  VALUES (?, ?)
  `, [title, contents]);

  console.log(`result.id = ${result.insertId}`); 
  getNote(runMe, result.insertId);
}

// const notes = getNotes((result)=> {
//   console.log(result); 
// });
// const note = getNote((result)=> {
//   console.log(result); 
// }, 2);
createNote((result)=> {
  console.log(result); 
}, "Another note", "What am I doing");
// const notes = await getNotes();
// console.log(notes); 

// ("Cinco", "Theolo", "Perfecto", "", "Chols", "https://scontent.fcrk1-3.fna.fbcdn.net/v/t39.30808-6/344349701_971076197361451_1081618838048611953_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFKkQhLrwp4h7fHm6ZeR_buf1i_0X5-PNx_WL_Rfn483OWplb6TFaBvrS3jNNb4lgqsYNuEL3JyaiTWs91FJ_wb&_nc_ohc=MNXWf6Y4STsAX9Nx5zc&_nc_ht=scontent.fcrk1-3.fna&oh=00_AfBRGxQ9ak4dlEMMhH_gu4CXzhzksRxw8bEcyoOFWmqjcA&oe=64596E40", "2001-05-01 00:00:00", "male", "Cinco", "Tristan", "Perfecto", "", "Kuya", "09776997477", "", "14", "Kalye Street", "Tabi ng poste", "Sample Elementary School", "2015", "6")