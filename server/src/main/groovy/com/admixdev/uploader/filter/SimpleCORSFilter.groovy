package com.admixdev.uploader.filter

import org.springframework.stereotype.Component
import javax.servlet.Filter
import javax.servlet.FilterChain
import javax.servlet.FilterConfig
import javax.servlet.ServletException
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

/**
 * Created by alexander on 2017-02-12.
 */

@Component
class SimpleCORSFilter implements Filter {
    void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req
        HttpServletResponse response = (HttpServletResponse) res

        response.setHeader("Access-Control-Allow-Origin", request.getHeader("origin"))
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, HEAD, DELETE")
        response.setHeader("Access-Control-Max-Age", "3600")
        response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-mvp-readonly");
        response.setHeader("Access-Control-Allow-Credentials", "true")

        // allow AJAX request to get the following custom header value
        response.setHeader("Access-Control-Expose-Headers", "Authorization, x-mvp-readonly")

        // to make sure browsers (especially internet explorer) do not return cached data
        response.setHeader("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");
        response.setHeader("Pragma", "no-cache")
        response.setHeader("Expires", "0")

        chain.doFilter(req, res)
    }

    void init(FilterConfig filterConfig) {}
    void destroy() {}
}
