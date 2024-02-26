const knex = require('../configs/conexao')

const cadastrarUsuario = async (req,res) =>{
    const {nome, email, telefone} = req.body;

    if (!nome || !email || !telefone){
        return res.status(400).json({"mensagem": "Algo está faltanddo em nome, email e telefone."});
    }

try {
    const novoUsuario = await knex('usuarios').insert({nome, email, telefone}).returning('*')

    if(novoUsuario.length === 0){
        return res.status(400).json({"mensagem": "Não foi possivel cadastrar usuario"});
    }

    return res.status(201).json(novoUsuario[0])
} catch (error) {
    return res.status(500).json({menssagem : 'Erro interno do servidor'});
}

}

const obterUsuario = async (req, res) =>{
    const {id} = req.params;

  try {
    const usuario = await knex('usuarios').where({id}).first();

    if(!usuario){
        return res.status(400).json({"mensagem": "Usuario não encontrado"});
    }
    return res.status(200).json(usuario)
  } catch (error) {
    return res.status(500).json({menssagem : 'Erro interno do servidor'});

  }

}

const listarUsuario = async (req, res) =>{
    try {
        const usuarios = await knex('usuarios')
        return res.status(200).json(usuarios)
    } catch (error) {
        
    }

}

const atualizarUsuario = async (req, res) =>{
    const {nome, email, telefone} = req.body;
    const {id} = req.params;

try {
    const usuarioExistente = await knex('usuarios').where({id}).first();
    
    if(!usuarioExistente){
        return res.status(400).json({"mensagem": "Usuario não encontrado"});
    }
    
    const usuarioAtualizado = await knex('usuarios').update({nome, email, telefone}).where({id}).returning('*');

    if(!usuarioAtualizado){
        return res.status(400).json({"mensagem": "Não foi possivel atualizar usuario"});
    }

    return res.status(200).json("Usuario atualizado com sucesso")

} catch (error) {
    return res.status(500).json({menssagem : 'Erro interno do servidor'});
}
}

const deletarUsuario = async (req, res) =>{
    const {id} = req.params;

try {  
    const usuarioExistente = await knex('usuarios').where({id}).first();

    if(!usuarioExistente){
        return res.status(400).json({"mensagem": "Usuario não encontrado"});
    }
    const usuario = await knex('usuarios').delete().where({id});

    if(!usuario){
        return res.status(400).json({"mensagem": "Não foi possivel excluir usuario"});
    }

    return res.status(200).json('Usuario excluido com sucesso')
} catch (error) {
    return res.status(500).json({menssagem : 'Erro interno do servidor'});
    
}
}

module.exports = {
    cadastrarUsuario,
    atualizarUsuario,
    deletarUsuario,
    obterUsuario,
    listarUsuario
}