<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.io.PrintWriter"%>
<%@ page import="bbs.BbsDAO"%>
<%@ page import="java.util.*" %>
<%@ page import="org.apache.commons.fileupload.*" %>
<%@ page import="org.apache.commons.fileupload.disk.*" %>
<%@ page import="org.apache.commons.fileupload.servlet.*" %>
<%@ page import="util.FileUtil" %>

<jsp:useBean id="bbs" class="bbs.Bbs" scope="page" />
<jsp:setProperty name="bbs" property="bbsTitle" />
<jsp:setProperty name="bbs" property="bbsContent" />
<jsp:setProperty name="bbs" property="images" />


<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>시간표 게시판 웹 사이트</title>
</head>
<body>
	<%
		// 현재 세션 상태를 체크한다
		String userID = null;
		request.setCharacterEncoding("utf-8");
	
	    String uid = null, ucon = null, ufname = null;
	    byte[] ufile = null;
	    
	    if(session.getAttribute("userID") != null){
			userID = (String)session.getAttribute("userID");
		}
	
	    ServletFileUpload sfu = new ServletFileUpload(new DiskFileItemFactory());
	    List items = sfu.parseRequest(request);
	
	    Iterator iter = items.iterator();
	    while(iter.hasNext()) {
	        FileItem item = (FileItem) iter.next();
	        String name = item.getFieldName();
	        if(item.isFormField()) {
	            String value = item.getString();
	            if (name.equals("bbsTitle")) uid = value;
	            else if (name.equals("bbsContent")) ucon = value;
	        }
	        else {
	            if (name.equals("images")) {
	                ufname = item.getName();
	                ufile = item.get();
	                String root = application.getRealPath(java.io.File.separator);
	                FileUtil.saveImage(root, ufname, ufile);
	            }
	        }
	    }
  		
		
		
		// 로그인을 한 사람만 글을 쓸 수 있도록 코드를 수정한다
		if(userID == null){
			PrintWriter script = response.getWriter();
			script.println("<script>");
			script.println("alert('로그인을 하세요')");
			script.println("location.href='login.jsp'");
			script.println("</script>");
		}else{
			// 입력이 안 된 부분이 있는지 체크한다
			if(uid == null || ucon == null || ufname==null){
				PrintWriter script = response.getWriter();
				script.println("<script>");
				script.println("alert('입력이 안 된 사항이 있습니다')");
				script.println("history.back()");
				script.println("</script>");
			}else{
				// 정상적으로 입력이 되었다면 글쓰기 로직을 수행한다
				BbsDAO bbsDAO = new BbsDAO();
				int result = bbsDAO.write(uid, userID, ucon, ufname);	
				// 데이터베이스 오류인 경우
				if(result == -1){
					PrintWriter script = response.getWriter();
					script.println("<script>");
					script.println("alert('글쓰기에 실패했습니다')");
					script.println("history.back()");
					script.println("</script>");
				// 글쓰기가 정상적으로 실행되면 알림창을 띄우고 게시판 메인으로 이동한다
				}else {
					PrintWriter script = response.getWriter();
					script.println("<script>");
					script.println("alert('글쓰기 성공')");
					script.println("location.href='bbs.jsp'");
					script.println("</script>");
				}
			}
		}
	
	%>
</body>
</html>