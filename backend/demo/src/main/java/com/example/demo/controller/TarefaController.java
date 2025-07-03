package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Tarefa;
import com.example.demo.model.TarefaDAO;

@RequestMapping("/tarefas")
@CrossOrigin("*")
@RestController
public class TarefaController {
    
    @Autowired
    TarefaDAO dao;

    @PostMapping
    public void inserirTarefa(@RequestBody Tarefa tarefa){
        dao.save(tarefa);
    }

    @GetMapping
    public List<Tarefa> obterTodos(){
        return dao.findAll();
    }
}
