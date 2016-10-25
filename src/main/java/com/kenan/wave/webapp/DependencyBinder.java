package com.kenan.wave.webapp;

import org.apache.log4j.Logger;
import org.glassfish.hk2.utilities.binding.AbstractBinder;

import com.kenan.wave.webapp.service.data.ExpenseStorage;
import com.kenan.wave.webapp.service.data.MySqlStorage;

public class DependencyBinder extends AbstractBinder {
	Logger LOGGER = Logger.getLogger(DependencyBinder.class);
	@Override
	protected void configure() {
		LOGGER.info("configuring dependecies");
		bind(MySqlStorage.class).to(ExpenseStorage.class);
	}

}
