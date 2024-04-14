import { db } from "../db.js";

export const getCadUser = (_, res) => {
  const query = "SELECT * FROM usuarios";

  db.query(query, (err, data) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar usuários." });

    return res.status(200).json(data.rows);
  });
};

