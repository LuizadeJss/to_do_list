package com.example.demo.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;



@Entity
@Table(name="Tarefa")
public class Tarefa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nova_tarefa;
    private boolean concluido;
    private LocalDate data_tarefa;

    public Long getId() {
        return id;
    }

    public String getNovaTarefa() {
        return nova_tarefa;
    }

    public void setNovaTarefa(String novaTarefa) {
        this.nova_tarefa = novaTarefa;
    }

    public boolean isConcluida() {
        return concluido;
    }

    public void setConcluida(boolean concluida) {
        this.concluido = concluida;
    }

    public LocalDate getDataTarefa() {
        return data_tarefa;
    }

    public void setDataTarefa(LocalDate dataTarefa) {
        this.data_tarefa = dataTarefa;
    }

}
