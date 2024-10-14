import java.io.*;
import jakarta.servlet.*;             // Tomcat 10
import jakarta.servlet.http.*;        // Tomcat 10
import jakarta.servlet.annotation.*;  // Tomcat 10
import java.sql.*;

@WebServlet("/update") 
public class UpdateItemServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int id = Integer.parseInt(request.getParameter("id"));
        String table = request.getParameter("table");
        String name = request.getParameter("name");
        String size = request.getParameter("size");
        float price = Float.parseFloat(request.getParameter("price"));
        int quantity = Integer.parseInt(request.getParameter("quantity"));
        String imageUrl = request.getParameter("image_url");
        String description = request.getParameter("description");

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/ntushop", "root", "xxxx"); // Updated password

            // Modify the SQL statement to update the correct table
            String sql = "UPDATE " + table + " SET Name=?, Size=?, Price=?, Quantity=?, Image_URL=?, Description=? WHERE ID=?";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, name);
            stmt.setString(2, size);
            stmt.setFloat(3, price);
            stmt.setInt(4, quantity);
            stmt.setString(5, imageUrl);
            stmt.setString(6, description);
            stmt.setInt(7, id);

            stmt.executeUpdate();
            response.sendRedirect("admin-dashboard.jsp");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}