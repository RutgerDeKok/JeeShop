package rsvier.security;

import java.io.IOException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import javax.annotation.Priority;
import javax.annotation.security.DeclareRoles;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ejb.EJB;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.ext.Provider;

//@Provider
//@Priority(Priorities.AUTHENTICATION)
//@WebFilter(filterName = "RestAuthenticationFilter", urlPatterns = {"/rest/*"})
public class RestAuthenticationFilterBad implements Filter {

    @Context
    private ResourceInfo resourceInfo;
    @EJB
    private TokenValidator tokenValidator;
    private static final boolean debug = true;
    private FilterConfig filterConfig = null;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        System.out.println("REST FILTER METHOD RUNNING");
//        System.out.println("resourceInfo: "+resourceInfo);
//        Method method = resourceInfo.getResourceMethod();
//        System.out.println("method: " + method.getName());
//        // everybody can access (e.g. user/create or user/authenticate)
//        if (!method.isAnnotationPresent(PermitAll.class)) {
//            System.out.println("Permit all annotation not present");
//
//            if (debug) {
//                log("NewFilter:doFilter()");
//            }
//
//            if (method.isAnnotationPresent(RolesAllowed.class)) {
//
//                // get annotated roles
//                RolesAllowed rolesAnnotation = method.getAnnotation(RolesAllowed.class);
//                Set<String> rolesSet = new HashSet<String>(Arrays.asList(rolesAnnotation.value()));
//                System.out.println("roles allowed: " + rolesSet);
//
//                // get role in token in cookie from logged in user
//                String tokenUserType = null;
//                String tokenFromCookie = null;
//
//                HttpServletRequest hsRequest = (HttpServletRequest) request;
                HttpServletResponse hsResponse = (HttpServletResponse) response;
                
//                Cookie[] cookies = hsRequest.getCookies();
//
//                if (cookies != null) {
//                    for (javax.servlet.http.Cookie cookie : cookies) {
//                        if (cookie.getName().equals("AccessToken")) {
//                            System.out.println("goede Cookie gevonden");
//                            javax.servlet.http.Cookie tokenCookie = cookie;
//                            tokenFromCookie = tokenCookie.getValue();
//                            break;
//                        }
//
//                    }
//                }
//
//                for (Cookie cookie : hsRequest.getCookies()) {
//                    if (cookie.getName().equals("AccessToken")) {
//
//                        System.out.println("goede Cookie gevonden");
//                        tokenFromCookie = cookie.getValue();
//                        break;
//                    }
//                }
//
//                if (tokenFromCookie == null || !tokenValidator.validateToken(tokenFromCookie)) {
//                    System.out.println("No (valid)token found");
//                    hsResponse.sendRedirect("/Jee-Shop/error.html?User&nbsp;must&nbsp;login&nbsp;Error:&nbsp;404");
//                    chain.doFilter(request, response);
//
//                } else {
//                    tokenUserType = tokenValidator.getUserType(tokenFromCookie);
//                    System.out.println("token user type= " + tokenUserType);
//                }
//
//                // Compare allowed roles to user type from token
//                boolean allowed = false;
//                for (String role : rolesSet) {
//                    if (role.equals(tokenUserType.trim())) {
//                        System.out.println(role);
//                        allowed = true;
//                        break;
//                    }
//                }
//                System.out.println("allowed = " + allowed);
//
//                if (!allowed) {
//                    System.out.println("User not authorized");
//                    hsResponse.sendRedirect("/Jee-Shop/error.html?User&nbsp;not&nbsp;authorized&nbsp;Error:&nbsp;404");
//                    chain.doFilter(request, response);
//                }
//
//            }
//
//        }
        // if PermitAll annotation IS present just continue
        System.out.println("Authorized to go to page");
        chain.doFilter(request, response);

    }

    @Override
    public void destroy() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void init(FilterConfig filterConfig) {
        this.filterConfig = filterConfig;
        if (filterConfig != null) {
            if (debug) {
                log("NewFilter:Initializing filter");
            }
        }
    }

    public void log(String msg) {
        filterConfig.getServletContext().log(msg);
    }

}
