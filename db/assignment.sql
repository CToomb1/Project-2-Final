CREATE TABLE `scheduler`.`assignment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `shift_id` INT NOT NULL,
  `employee_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `assignment_shift_id_idx` (`shift_id` ASC) VISIBLE,
  INDEX `assignment_employee_id_idx` (`employee_id` ASC) VISIBLE,
  CONSTRAINT `assignment_shift_id`
    FOREIGN KEY (`shift_id`)
    REFERENCES `scheduler`.`shift` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `assignment_employee_id`
    FOREIGN KEY (`employee_id`)
    REFERENCES `scheduler`.`employee` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);