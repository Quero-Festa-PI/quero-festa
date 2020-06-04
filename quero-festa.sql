-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema quero-festa
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema quero-festa
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `quero-festa` DEFAULT CHARACTER SET utf8 ;
USE `quero-festa` ;

-- -----------------------------------------------------
-- Table `quero-festa`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quero-festa`.`usuarios` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(25) NOT NULL,
  `sobrenome` VARCHAR(50) NOT NULL,
  `email` VARCHAR(70) NOT NULL,
  `senha` VARCHAR(256) NOT NULL,
  `cpf` CHAR(11) NOT NULL,
  `data_nasc` DATE NOT NULL,
  `sexo` ENUM('M', 'F') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `quero-festa`.`enderecos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quero-festa`.`enderecos` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `usuarios_id` INT UNSIGNED NOT NULL,
  `estado` CHAR(2) NOT NULL,
  `cidade` VARCHAR(45) NOT NULL,
  `cep` CHAR(8) NOT NULL,
  `logradouro` VARCHAR(100) NOT NULL,
  `numeral` INT UNSIGNED NOT NULL,
  `complemento` VARCHAR(25) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_enderecos_usuarios1_idx` (`usuarios_id` ASC),
  CONSTRAINT `fk_enderecos_usuarios1`
    FOREIGN KEY (`usuarios_id`)
    REFERENCES `quero-festa`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `quero-festa`.`pagamentos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quero-festa`.`pagamentos` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `forma_pagamento` VARCHAR(45) NULL,
  `status` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `quero-festa`.`entregas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quero-festa`.`entregas` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `data_prev` DATE NULL,
  `data_real` DATE NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `quero-festa`.`lojas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quero-festa`.`lojas` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `usuarios_id` INT UNSIGNED NOT NULL,
  `nome` VARCHAR(30) NOT NULL,
  `descricao` VARCHAR(200) NULL,
  `avaliacao` FLOAT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_lojas_usuarios1_idx` (`usuarios_id` ASC),
  CONSTRAINT `fk_lojas_usuarios1`
    FOREIGN KEY (`usuarios_id`)
    REFERENCES `quero-festa`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `quero-festa`.`pedidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quero-festa`.`pedidos` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `usuarios_id` INT UNSIGNED NOT NULL,
  `lojas_id` INT UNSIGNED NOT NULL,
  `enderecos_id` INT UNSIGNED NOT NULL,
  `pagamentos_id` INT UNSIGNED NOT NULL,
  `entregas_id` INT UNSIGNED NOT NULL,
  `criada_em` TIMESTAMP NOT NULL,
  `valor_total` FLOAT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_pedidos_enderecos1_idx` (`enderecos_id` ASC),
  INDEX `fk_pedidos_pagamentos1_idx` (`pagamentos_id` ASC),
  INDEX `fk_pedidos_entregas1_idx` (`entregas_id` ASC),
  INDEX `fk_pedidos_usuarios1_idx` (`usuarios_id` ASC),
  INDEX `fk_pedidos_lojas1_idx` (`lojas_id` ASC),
  CONSTRAINT `fk_pedidos_enderecos1`
    FOREIGN KEY (`enderecos_id`)
    REFERENCES `quero-festa`.`enderecos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedidos_pagamentos1`
    FOREIGN KEY (`pagamentos_id`)
    REFERENCES `quero-festa`.`pagamentos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedidos_entregas1`
    FOREIGN KEY (`entregas_id`)
    REFERENCES `quero-festa`.`entregas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedidos_usuarios1`
    FOREIGN KEY (`usuarios_id`)
    REFERENCES `quero-festa`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedidos_lojas1`
    FOREIGN KEY (`lojas_id`)
    REFERENCES `quero-festa`.`lojas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `quero-festa`.`pedidos_has_compradores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quero-festa`.`pedidos_has_compradores` (
  `pedidos_id` INT UNSIGNED NOT NULL,
  `compradores_id` INT NOT NULL,
  PRIMARY KEY (`pedidos_id`, `compradores_id`),
  INDEX `fk_pedidos_has_compradores_pedidos_idx` (`pedidos_id` ASC),
  CONSTRAINT `fk_pedidos_has_compradores_pedidos`
    FOREIGN KEY (`pedidos_id`)
    REFERENCES `quero-festa`.`pedidos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `quero-festa`.`produtos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quero-festa`.`produtos` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `lojas_id` INT UNSIGNED NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `valor` FLOAT UNSIGNED NOT NULL,
  `descricao` VARCHAR(200) NULL,
  `disponibilidade` VARCHAR(45) NOT NULL,
  `avaliacao` FLOAT NULL,
  `subcategorias_id` INT UNSIGNED NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_produtos_lojas1_idx` (`lojas_id` ASC),
  CONSTRAINT `fk_produtos_lojas1`
    FOREIGN KEY (`lojas_id`)
    REFERENCES `quero-festa`.`lojas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `quero-festa`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quero-festa`.`categorias` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `quero-festa`.`pedidos_x_produtos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quero-festa`.`pedidos_x_produtos` (
  `pedidos_id` INT UNSIGNED NOT NULL,
  `produtos_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`pedidos_id`, `produtos_id`),
  INDEX `fk_pedidos_has_produtos_produtos1_idx` (`produtos_id` ASC),
  INDEX `fk_pedidos_has_produtos_pedidos1_idx` (`pedidos_id` ASC),
  CONSTRAINT `fk_pedidos_has_produtos_pedidos1`
    FOREIGN KEY (`pedidos_id`)
    REFERENCES `quero-festa`.`pedidos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedidos_has_produtos_produtos1`
    FOREIGN KEY (`produtos_id`)
    REFERENCES `quero-festa`.`produtos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `quero-festa`.`produtos_has_categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quero-festa`.`produtos_has_categorias` (
  `produtos_id` INT UNSIGNED NOT NULL,
  `categorias_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`produtos_id`, `categorias_id`),
  INDEX `fk_produtos_has_categorias_categorias1_idx` (`categorias_id` ASC),
  INDEX `fk_produtos_has_categorias_produtos1_idx` (`produtos_id` ASC),
  CONSTRAINT `fk_produtos_has_categorias_produtos1`
    FOREIGN KEY (`produtos_id`)
    REFERENCES `quero-festa`.`produtos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_produtos_has_categorias_categorias1`
    FOREIGN KEY (`categorias_id`)
    REFERENCES `quero-festa`.`categorias` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
