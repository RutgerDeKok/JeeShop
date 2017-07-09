package rsvier.security;

import org.glassfish.jersey.server.ResourceConfig;


public class RestApplicationConfig extends ResourceConfig {
	
	public RestApplicationConfig() {
        packages( "rsvier.resources" );
		register( RestAuthenticationFilter.class );
	}
}
