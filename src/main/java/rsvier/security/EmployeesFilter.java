package rsvier.security;

import java.io.IOException;
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
import rsvier.model.UserType;

@WebFilter(filterName = "EmployeesFilter", urlPatterns = {"/employees6646554/*"})
public class EmployeesFilter implements Filter {

    @EJB
    private TokenValidator tokenValidator;
    private static final boolean debug = true;

    public EmployeesFilter() {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
            FilterChain chain) throws IOException, ServletException {
        System.out.println("doFilter() draait!");

        if (debug) {
            log("NewFilter:doFilter()");
        }

        HttpServletRequest hsRequest = (HttpServletRequest) request;
        HttpServletResponse hsResponse = (HttpServletResponse) response;
        Cookie[] cookies = hsRequest.getCookies();
        String tokenFromCookie = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("AccessToken")) {
                    System.out.println("goede Cookie gevonden");
                    Cookie tokenCookie = cookie;
                    tokenFromCookie = tokenCookie.getValue();
                    break;
                }

            }
        }

        if (tokenFromCookie == null || !tokenValidator.validateToken(tokenFromCookie)) {
            System.out.println("User not allowed to go to /employees/*");
            // delete cookie and redirect to error page code 401
            hsResponse.sendRedirect("/Jee-Shop/error.html?Scheer&nbsp;weg&nbsp;jij&nbsp;deugniet!&nbsp;404");
            chain.doFilter(request, response);

        } else {
            String tokenUserType = tokenValidator.getUserType(tokenFromCookie);
            System.out.println("token user type= " + tokenUserType);
            if (tokenUserType.equals(UserType.CUSTOMER.name())) {
                // not authorized redirect to error page code 403
                hsResponse.sendRedirect("/Jee-Shop/error.html?Scheer&nbsp;weg&nbsp;jij&nbsp;deugniet!&nbsp;403");
                chain.doFilter(request, response);
            }
            // authorized
            System.out.println("Authorized to go to page");
            chain.doFilter(request, response);
        }

    }

    // The filter configuration object we are associated with.  If
    // this value is null, this filter instance is not currently
    // configured. 
    private FilterConfig filterConfig = null;

    /**
     * Init method for this filter
     */
    @Override
    public void init(FilterConfig filterConfig) {
        this.filterConfig = filterConfig;
        if (filterConfig != null) {
            if (debug) {
                log("NewFilter:Initializing filter");
            }
        }
    }

    @Override
    public void destroy() {
    }

    public void log(String msg) {
        filterConfig.getServletContext().log(msg);
    }

}
