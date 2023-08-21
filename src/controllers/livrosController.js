import NaoEncontrado from "../erros/NaoEncontrado.js";
import { livros } from "../models/index.js";

class LivroController{

  static listarLivros = async (req, res, next) => {
    try {
      const livrosResultado = await livros.find()
        .populate("autor")
        .exec();
        
      res.status(200).json(livrosResultado);
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultados = await livros.findById(id)    
        .populate("autor", "nome")
        .exec();

      if (livroResultados !== null) {
        res.status(200).send(livroResultados);
      } else {
        next (new NaoEncontrado("Id do livro não localizado."));
      }
      
    } catch (erro) {
      next(erro);
    }
  };

  static cadastraLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultados = await livro.save();

      res.status(201).send(livroResultados.toJSON());
    } catch (erro){
      next(erro);
    }     
     
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndUpdate(id, {$set: req.body});

      if (livroResultado !== null){
        res.status(200).send({message: "Livro atualizado com sucesso"});
      } else {
        next (new NaoEncontrado("Id do livro não localizado."));
      }
      
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndDelete(id);

      if(livroResultado !== null){
        res.status(200).send({message: "Livro removido com sucesso"});
      } else {
        next (new NaoEncontrado("Id do livro não localizado."));
      }
       
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) =>{
    try { 
      const { editora, titulo } = req.query;

      const livroResultado = await livros.find({
        editora: editora,
        titulo: titulo
      });
      res.status(200).send(livroResultado);
    } catch (erro) {
      next(erro);
    }
  };



}

export default LivroController;