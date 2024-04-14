import { db } from "../db.js";

export const loginUser = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const userData = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);

    if (userData.rows.length === 1) {
      const user = userData.rows[0];
      const passwordMatch = senha === user.senha;

      if (passwordMatch) {
        res.json({ success: true, userid: user.userid, nome: user.nome });
      } else {
        respondWithFailure(res);
      }
    } else {
      respondWithFailure(res);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Erro interno do servidor" });
  }
};

const respondWithFailure = (res) => {
  res.status(401).json({ success: false, message: "Credenciais inválidas" });
};
