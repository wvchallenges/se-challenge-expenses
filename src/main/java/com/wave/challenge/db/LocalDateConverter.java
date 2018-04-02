package com.wave.challenge.db;

import java.sql.Timestamp;
import java.time.LocalDate;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class LocalDateConverter implements AttributeConverter<LocalDate, Timestamp> {

  @Override
  public Timestamp convertToDatabaseColumn(LocalDate localDate) {
    return Timestamp.valueOf(localDate.atStartOfDay());
  }

  @Override
  public LocalDate convertToEntityAttribute(Timestamp sqlTimestamp) {
    return sqlTimestamp.toLocalDateTime().toLocalDate();
  }
}
