package service;

import java.sql.Connection;

import dao.DAO;
import static db.JdbcUtil.*;

public class IdcheckService {

	public String IdCheck(String userId) {
		DAO dao = DAO.getInstance();
		Connection con = getConnection();
		dao.setConnection(con);
		
		String checkResult = dao.IdCheck(userId);
		
		
		
		return checkResult;
	}

}
