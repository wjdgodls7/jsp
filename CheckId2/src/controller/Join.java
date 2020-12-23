package controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.JoinService;


@WebServlet("/Join")
public class Join extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public Join() {
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
		
		String id = request.getParameter("userId");
		String pw = request.getParameter("userPw");
		int result = 0;
		JoinService js = new JoinService();
		result = js.join(id,pw);
		PrintWriter out = response.getWriter();
	if (result>0) {
		out.println("<script>alert('성공!');</script>");
		out.println("<script>location.href='index.html';</script>");
	} else {
		out.println("<script>alert('실패!');</script>");
		out.println("<script>location.href='index.html';</script>");
	}
		
		
}
}