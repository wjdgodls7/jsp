package controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.IdcheckService;

/**
 * Servlet implementation class AjaxCheck
 */
@WebServlet("/idCheck")
public class IdCheck extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public IdCheck() {
        super();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doProcess(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doProcess(request, response);
	}
	
	protected void doProcess(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("html/text; charset=UTF-8");
		
		String userId = request.getParameter("userId");
		System.out.println("userId : " + userId);
		
		IdcheckService idsvc = new IdcheckService();
		String checkResult = idsvc.IdCheck(userId);
		
		// IdCheck Servlet과 다른 부분
		// jsp로 이동하지 않는다!
		// 값을 넘겨줄 때 setAttribute가 아니라 getWriter로 넘겨준다.
		PrintWriter out = response.getWriter();
		out.print(checkResult);
		
		
	}

}
