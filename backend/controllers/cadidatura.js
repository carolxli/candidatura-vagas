import { db } from "../db.js";

export const getCand = (_, res) => {
  const query = `SELECT c.id,u.userid,v.titulo, v.salario, v.localizacao, to_char(c.data_candidatura, 'DD/MM/YYYY') as data_candidatura
  FROM candidatura c
  JOIN usuarios u ON c.id_usuario = u.userid
  JOIN vagas v ON c.id_vaga = v.id`;

  db.query(query, (err, data) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar candidaturas." });

    return res.status(200).json(data.rows);
  });
};

export const addCand = (req, res) => {
  const checkDuplicateQuery = "SELECT * FROM candidatura WHERE id_vaga = $1 AND id_usuario = $2";
  const checkDuplicateValues = [req.body.id_vaga, req.body.id_usuario];

  db.query(checkDuplicateQuery, checkDuplicateValues, (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Erro ao verificar duplicidade de candidatura:", checkErr);
      return res.status(500).json("Erro ao verificar duplicidade de candidatura.");
    }

    if (checkResult.rows.length > 0) {

      return res.status(400).json("Você já se candidatou para esta vaga.");
    }
    const insertQuery = `
    INSERT INTO candidatura 
      (id_vaga, id_usuario, data_candidatura) 
    VALUES 
      ($1, $2, $3)
  `;

    const insertValues = [
      req.body.id_vaga,
      req.body.id_usuario,
      req.body.data_candidatura,
    ];

    db.query(insertQuery, insertValues, (insertErr) => {
      if (insertErr) {
        console.error("Erro ao se candidatar na vaga", insertErr);
        return res.status(500).json({ error: "Erro ao se candidatar na vaga" });
      }

      return res.status(201).json({ message: "Candidatura efetuada com sucesso!" });
    });
  });
};

export const deleteCand = (req, res) => {
  const query = 'DELETE FROM candidatura WHERE id = $1';

  db.query(query, [req.params.id], (err) => {
    if (err) {
      console.error("Erro ao cancelar candidatura.", err);
      return res.status(500).json({ error: "Erro ao cancelar candidatura" });
    }

    return res.status(200).json({ message: "Candidatura cancelada com sucesso." });
  });
};
