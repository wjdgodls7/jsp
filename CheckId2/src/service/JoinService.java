package service;

import static db.JdbcUtil.*;

import java.sql.Connection;

import dao.DAO;

public class JoinService {

	public int join(String id, String pw) {
		DAO dao = DAO.getInstance();
		Connection con = getConnection();
		dao.setConnection(con);
		int result = 0;
		
		System.out.println(id);
		
		
		result = dao.join(pw, id);
		if (result>0) {
			commit(con);
		} else {
			rollback(con);
		}
		close(con);
		
		return result;
	}

}
