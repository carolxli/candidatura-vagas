import { db } from "../db.js";

export const getUsers = (req, res) => {
  const query = "SELECT * FROM usuarios WHERE userid = $1";

  db.query(query,[req.params.userid] ,(err, data) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar usuários." });

    return res.status(200).json(data.rows);
  });
};

export const addUser = (req, res) => {
const checkDuplicateQuery = "SELECT * FROM usuarios WHERE cpf = $1 OR email = $2";
  const checkDuplicateValues = [req.body.cpf, req.body.email];

  db.query(checkDuplicateQuery, checkDuplicateValues, (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Erro ao verificar duplicidade de CPF ou e-mail:", checkErr);
      return res.status(500).json({ error: "Erro ao verificar duplicidade de CPF ou e-mail." });
    }

    if (checkResult.rows.length > 0) {
      return res.status(400).json({ error: "CPF ou e-mail já cadastrados." });
    }

    const insertQuery = `
      INSERT INTO usuarios
        (cpf, rg, nome, email, senha, telefone, endereco, data_nascimento, genero, estado_civil, formacao_academica, experiencia_profissional, habilidades, idiomas) 
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    `;

    const insertValues = [
      req.body.cpf,
      req.body.rg,
      req.body.nome,
      req.body.email, 
      req.body.senha, 
      req.body.telefone, 
      req.body.endereco, 
      req.body.data_nascimento, 
      req.body.genero, 
      req.body.estado_civil, 
      req.body.formacao_academica, 
      req.body.experiencia_profissional, 
      req.body.habilidades, 
      req.body.idiomas
    ];

    db.query(insertQuery, insertValues, (insertErr) => {
      if (insertErr) {
        console.error("Erro ao inserir usuário:", insertErr);
        return res.status(500).json({ error: "Erro ao inserir usuário." });
      }

      return res.status(201).json({ message: "Usuário criado com sucesso." });
    });
  });
};

export const updateUser = (req, res) => {
  
  const query = `
    UPDATE usuarios 
    SET cpf = $1,
        rg = $2,
        nome = $3, 
        email = $4, 
        senha = $5, 
        telefone = $6, 
        endereco = $7, 
        data_nascimento = $8, 
        genero = $9, 
        estado_civil = $10, 
        formacao_academica = $11, 
        experiencia_profissional = $12, 
        habilidades = $13, 
        idiomas = $14 
    WHERE userid = $15
  `;

  const values = [
    req.body.cpf,
    req.body.rg,
    req.body.nome, 
    req.body.email, 
    req.body.senha, 
    req.body.telefone, 
    req.body.endereco, 
    req.body.data_nascimento, 
    req.body.genero, 
    req.body.estado_civil, 
    req.body.formacao_academica, 
    req.body.experiencia_profissional, 
    req.body.habilidades, 
    req.body.idiomas, 
  ];

  db.query(query,[...values, req.params.userid], (err) => {
    if (err) return res.json(err);

    return res.status(200).json({ message: "Usuário atualizado com sucesso." });
  });
};

export const deleteUser = (req, res) => {
  const query = 'DELETE FROM usuarios WHERE userid = $1';

  db.query(query, [req.params.userid], (err) => {
    if (err) {
      console.error("Erro ao deletar usuário:", err);
      return res.status(500).json({ error: "Erro ao deletar usuário." });
    }

    return res.status(200).json({ message: "Usuário deletado com sucesso." });
  });
};
