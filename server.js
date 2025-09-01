	// Importar pacotes/bibliotecas
import express from "express";
import dotenv from "dotenv";

import dados from "./src/data/dados.js";
const { bruxos, varinhas, pocoes, animais } = dados;

// Criar aplicação com Express e configurar para aceitar JSON
const app = express();
app.use(express.json());

// Carregar variáveis de ambiente e definir constante para porta do servidor
dotenv.config();
const serverPort = process.env.PORT || 3001;

// Rota principal GET para "/"
app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando...");
});

// Rota para listar bruxos com filtros opcionais
app.get("/bruxos", (req, res) => {
    const { casa, ano, especialidade, nome } = req.query;
    let resultado = bruxos;

    if (casa) {
        resultado = resultado.filter((b) => b.casa.toLowerCase().includes(casa.toLowerCase()));
    }

    if (ano) {
        resultado = resultado.filter((b) => b.ano == ano);
    }

    if (especialidade) {
        resultado = resultado.filter((b) => b.especialidade.toLowerCase().includes(especialidade.toLowerCase()));
    }

    if (nome) {
        resultado = resultado.filter((b) => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }

    res.status(200).json({
        total: resultado.length,
        data: resultado,
    });
});

// Rota para adicionar um novo bruxo via POST
app.post("/bruxos", (req, res) => {
    // Acessando dados do body
    const { nome, casa, ano, varinha, mascote, patrono, especialidade, vivo } = req.body;

    // Validação de campos obrigatórios
    if (!nome || !casa) {
        return res.status(400).json({
            success: false,
            message: "Nome e casa são obrigatórios para um bruxo!",
        });
    }

    // Criar novo bruxo
    const novoBruxo = {
        // Id automatico
        id: bruxos.length + 1,
        // Daqui pra baixo tem que colocar no body no postman
        nome,
        casa,
        ano: ano,
        varinha: varinha,
        mascote: mascote,
        patrono: patrono,
        especialidade: especialidade || "Em desenvolvimento",
        vivo: vivo
    };

    // Adicionar à lista de bruxos
    bruxos.push(novoBruxo);

    res.status(201).json({
        success: true,
        message: "Novo bruxo adicionado a Hogwarts!",
        data: novoBruxo,
    });
});

// Rota para buscar varinhas
app.get("/varinhas", (req, res) => {
    const { material, nucleo } = req.query;
    let resultado = varinhas;

    if (material) {
        resultado = resultado.filter((b) => b.material.toLowerCase().includes(material.toLowerCase()));
    }

    if (nucleo) {
        resultado = resultado.filter((b) => b.nucleo == nucleo);
    }

    res.status(200).json({
        total: resultado.length,
        data: resultado,
    });
});

//Rota para adicionar varinhas
app.post("/varinhas", (req, res) => {
    // Acessando dados do body
    const { nucleo, material, comprimento } = req.body;

    // Validação de campos obrigatórios
    if (!nucleo || !material) {
        return res.status(400).json({
            success: false,
            message: "nucleo e material são obrigatórios para uma varinha!",
        });
    }

    // Criar novo bruxo
    const novaVarinha = {
        // Id automatico
        id: varinhas.length + 1,
        // Daqui pra baixo tem que colocar no body no postman
        nucleo,
        material,
        comprimento: comprimento
    };

    // Adicionar à lista de bruxos
    varinhas.push(novaVarinha);

    res.status(201).json({
        success: true,
        message: "Nova varinha adicionada",
        data: novaVarinha,
    });
});

//Rota para buscar poções
app.get("/pocoes", (req, res) => {
    const { nome, efeito } = req.query;
    let resultado = pocoes;

    if (nome) {
        resultado = resultado.filter((b) => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }

    if (efeito) {
        resultado = resultado.filter((b) => b.efeito == efeito);
    }

    res.status(200).json({
        total: resultado.length,
        data: resultado,
    });
});

//Rota para buscar animais
app.get("/animais", (req, res) => {
    const { tipo, nome } = req.query;
    let resultado = animais;

     if (tipo) {
        resultado = resultado.filter((b) => b.tipo == tipo);
    }

    if (nome) {
        resultado = resultado.filter((b) => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }

    res.status(200).json({
        total: resultado.length,
        data: resultado,
    });
});

// Iniciar servidor escutando na porta definida
app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});
