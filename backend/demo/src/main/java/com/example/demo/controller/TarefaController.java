package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @PutMapping("/{id}/concluir")
    public ResponseEntity<Tarefa> concluirTarefa(@PathVariable Long id) {
        Optional<Tarefa> opt = dao.findById(id);
        if (opt.isPresent()) {
            Tarefa tarefa = opt.get();
            tarefa.setConcluida(!tarefa.isConcluida());
            dao.save(tarefa);
            return ResponseEntity.ok(tarefa);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tarefa> atualizarTarefa(
            @PathVariable Long id,
            @RequestBody Tarefa atualizada
    ) {
        Optional<Tarefa> opt = dao.findById(id);
        if (opt.isPresent()) {
            Tarefa tarefa = opt.get();
            tarefa.setNovaTarefa(atualizada.getNovaTarefa());
            tarefa.setDataTarefa(atualizada.getDataTarefa());
            tarefa.setConcluida(atualizada.isConcluida());
            dao.save(tarefa);
            return ResponseEntity.ok(tarefa);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarTarefa(@PathVariable Long id) {
        if (dao.existsById(id)) {
            dao.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }   

}
