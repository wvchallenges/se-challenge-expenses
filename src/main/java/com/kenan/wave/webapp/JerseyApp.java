package com.kenan.wave.webapp;

import org.glassfish.jersey.server.ResourceConfig;

public class JerseyApp extends ResourceConfig {
	public JerseyApp() {
        // Tells Jersey which REST service/class to load.
		packages("com.kenan.wave.webapp.resource","com.fasterxml.jackson.jaxrs.json");
		
		//Tells Jersey about the HK2 dependency binder
		register(new DependencyBinder());

	}

}
