package com.github.melandr.testproject.server.integration.db.init;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DBInitiator implements InitializingBean {

    @Autowired
    private JdbcTemplate template;

    @Override
    public void afterPropertiesSet() throws Exception {
        initCategoryTable();
        initUsersTable();
        initUserToCategoryTable();
    }

    private void initCategoryTable() {
        template.execute("CREATE TABLE IF NOT EXISTS roles(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL)");
    }

    private void initUsersTable() {
        template.execute("CREATE TABLE IF NOT EXISTS users("
                + " id INT AUTO_INCREMENT PRIMARY KEY,"
                + " login VARCHAR(255) NOT NULL,"
                + " password VARCHAR(255) DEFAULT '12345' NOT NULL,"
                + " first_name VARCHAR(255) NOT NULL,"
                + " last_name VARCHAR(255) NOT NULL,"
                + " middle_name VARCHAR(255) NOT NULL,"
                + " phone VARCHAR(13),"
                + " email VARCHAR(50),"
                + " photo BLOB(10K)"
                + ");");
    }

    private void initUserToCategoryTable() {
        template.execute("CREATE TABLE IF NOT EXISTS user_to_role("
                + " id INT AUTO_INCREMENT PRIMARY KEY,"
                + " user_id INT NOT NULL,"
                + " role_id INT NOT NULL,"
                + " FOREIGN KEY (user_id) REFERENCES users(id),"
                + " FOREIGN KEY (role_id) REFERENCES roles(id)"
                + ");");
    }
}
