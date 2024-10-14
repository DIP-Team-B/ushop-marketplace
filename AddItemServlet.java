import java.io.*;
import jakarta.servlet.*;             // Tomcat 10
import jakarta.servlet.http.*;        // Tomcat 10
import jakarta.servlet.annotation.*;  // Tomcat 10
import java.sql.*;

@WebServlet("/add")
public class AddItemServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String table = request.getParameter("table");
        String name = request.getParameter("name");
        String size = request.getParameter("size");
        float price = Float.parseFloat(request.getParameter("price"));
        int quantity = Integer.parseInt(request.getParameter("quantity"));
        String imageUrl = request.getParameter("image_url");
        String description = request.getParameter("description");

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/ntushop", "root", "1201");

            String sql = "INSERT INTO " + table + " (Name, Size, Price, Quantity, Image_URL, Description) VALUES (?, ?, ?, ?, ?, ?)";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, name);
            stmt.setString(2, size);
            stmt.setFloat(3, price);
            stmt.setInt(4, quantity);
            stmt.setString(5, imageUrl);
            stmt.setString(6, description);

            stmt.executeUpdate();
            response.sendRedirect("admin-dashboard.jsp");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}