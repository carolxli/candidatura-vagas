import { db } from "../db.js";

export const getVagas = (_, res) => {
  const query = "SELECT *, to_char(data_publicacao, 'DD/MM/YYYY') as data_publicacao_formatada FROM vagas";


  db.query(query, (err, data) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar as vagas disponíveis." });

    return res.status(200).json(data.rows);
  });
};