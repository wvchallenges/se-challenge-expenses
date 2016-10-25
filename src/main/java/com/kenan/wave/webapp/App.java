package com.kenan.wave.webapp;

import org.apache.log4j.Logger;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.DefaultServlet;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
 
public class App {
    public static final int SERVER_PORT = 8008;
    static Logger LOGGER = Logger.getLogger(App.class);

	public static void main(String[] args) throws Exception {
        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.setContextPath("/");
 
        Server jettyServer = new Server(SERVER_PORT);
        jettyServer.setHandler(context);
        
        DefaultServlet defaultServlet = new DefaultServlet();
		ServletHolder assets = new ServletHolder("default", defaultServlet);
		assets.setInitParameter("resourceBase", "./src/main/webapp/");
			
		context.addServlet(assets, "/*");
       
 
        ServletHolder jerseyServlet = context.addServlet(org.glassfish.jersey.servlet.ServletContainer.class, "/api/*");
        jerseyServlet.setInitOrder(0);
        jerseyServlet.setInitParameter("javax.ws.rs.Application","com.kenan.wave.webapp.JerseyApp");
 
        try {
            jettyServer.start();
            jettyServer.join();
        } catch (Exception e){
            LOGGER.error("error during server starting",e);
            jettyServer.stop();
            jettyServer.destroy();
        }
    }
}