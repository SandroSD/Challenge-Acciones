CREATE TABLE `usuario` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `mail` VARCHAR(45) NOT NULL,
  `clave` VARCHAR(70) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `usuario_accion` (
  `usuario` BIGINT NOT NULL,
  `accion` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`usuario`, `accion`),
  CONSTRAINT `usuario_accion_usuario` FOREIGN KEY (`usuario`)
    REFERENCES `usuario` (`id`)
);

